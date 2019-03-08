import { Entity, Column, BaseEntity } from "typeorm";

@Entity("quoteList")
export class QuoteList extends BaseEntity {
  @Column({ type: "text", array: true })
  tickers: string[];
}
