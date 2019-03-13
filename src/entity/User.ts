import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  JoinColumn
} from "typeorm";

import { QuoteList } from "./QuoteList";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { nullable: true })
  userName: string;

  @Column("text")
  email: string;

  @Column("text")
  password: string;

  @OneToMany(() => QuoteList, quoteList => quoteList.user)
  @JoinColumn()
  quoteList: QuoteList;
}
