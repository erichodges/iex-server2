"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcryptjs"));
const User_1 = require("./entity/User");
const QuoteList_1 = require("./entity/QuoteList");
exports.resolvers = {
    Query: {
        me: (_, __, { req }) => {
            if (!req.session.userId) {
                return null;
            }
            return User_1.User.findOne(req.session.userId, { relations: ["quoteList"] });
        },
        user: (_, __, { req }) => __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            const user = yield User_1.User.findOne(req.session.userId, {
                relations: ["quoteList"]
            });
            return user;
        }),
        users: () => __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.User.find({ relations: ["quoteList"] });
            return users;
        })
    },
    Mutation: {
        register: (_, { userName, email, password }) => __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt.hash(password, 10);
            yield User_1.User.create({
                userName,
                email,
                password: hashedPassword
            }).save();
            return true;
        }),
        login: (_, { email, password }, { req }) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                return null;
            }
            const valid = yield bcrypt.compare(password, user.password);
            if (!valid) {
                return null;
            }
            req.session.userId = user.id;
            return user;
        }),
        logout: (_, __, { req, res }) => __awaiter(this, void 0, void 0, function* () {
            yield new Promise(res => req.session.destroy(() => res()));
            res.clearCookie("connect.sid");
            return true;
        }),
        addQuoteList: (_, { tickers, name }, { req }) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.session.userId);
            const quoteList = yield QuoteList_1.QuoteList.create({
                name,
                tickers,
                userId: req.session.userId
            }).save();
            return quoteList;
        }),
        updateQuoteList: (_, { id, tickers, name }, { req }) => __awaiter(this, void 0, void 0, function* () {
            yield QuoteList_1.QuoteList.update({ id: id, userId: req.session.userId }, { tickers, name });
            return QuoteList_1.QuoteList.findOne(id);
        }),
        removeQuoteList: (_, { id }, { req }) => __awaiter(this, void 0, void 0, function* () {
            yield QuoteList_1.QuoteList.delete({ id: id, userId: req.session.userId });
            return true;
        })
    }
};
//# sourceMappingURL=resolvers.js.map