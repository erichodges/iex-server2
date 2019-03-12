import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";
import { User } from "./entity/User";
import { QuoteList } from "./entity/QuoteList";

export const resolvers: IResolvers = {
  Query: {
    me: (_, __, { req }) => {
      if (!req.session.userId) {
        return null;
      }

      return User.findOne(req.session.userId, { relations: ["quoteList"] });
    },
    user: async (_, __, { req }) => {
      if (!req.session.userId) {
        return null;
      }
      const user = await User.findOne(req.session.userId, {
        relations: ["quoteList"]
      });
      console.log(user);
      return user;
    }
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        email,
        password: hashedPassword
      }).save();

      return true;
    },
    login: async (_, { email, password }, { req }) => {
      // console.log(req);
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return null;
      }

      req.session.userId = user.id;

      return user;
    },
    addQuoteList: async (_, { tickers }, { req }) => {
      console.log(req.session.userId);
      const user = await User.findOne(req.session.userId);
      if (!user) {
        return null;
      }
      user.quoteList = await QuoteList.create({
        tickers
      }).save();
      await user.save();
      return user.quoteList;
    }
  }
};
