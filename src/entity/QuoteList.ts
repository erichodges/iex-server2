import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne
} from "typeorm";
import { User } from "./User";

@Entity()
export class QuoteList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", array: true })
  tickers: string[];

  @OneToOne(() => User)
  user: User;

  @Column()
  userId: number;
}
