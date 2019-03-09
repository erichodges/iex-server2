import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class QuoteList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", array: true })
  tickers: string[];
}
