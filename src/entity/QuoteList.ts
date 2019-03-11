import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
  // OneToOne,
  // JoinColumn
} from "typeorm";
// import { User } from "./User";

@Entity()
export class QuoteList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", array: true })
  tickers: string[];

  // @OneToOne(() => User)
  // @JoinColumn({ name: "userId" })
  // user: User;

  // @Column()
  // userId: number;
}
