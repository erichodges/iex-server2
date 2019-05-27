import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne
  // JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class QuoteList extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", array: true })
  tickers: string[];

  @Column({ unique: true })
  name: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.quoteList)
  user: User;
}
