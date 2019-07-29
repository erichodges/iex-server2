import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  // JoinColumn
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class QuoteList extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", array: true, unique: false })
  tickers: string[];

  @Column({ unique: false })
  name: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.quoteList)
  user: User;
}
