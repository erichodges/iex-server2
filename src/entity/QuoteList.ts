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
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", array: true })
  tickers: string[];
}
