import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn
} from "typeorm";

import { QuoteList } from "./QuoteList";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  email: string;

  @Column("text")
  password: string;

  @OneToOne(() => QuoteList)
  @JoinColumn()
  quoteList: QuoteList;
}
