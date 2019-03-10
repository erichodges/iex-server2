import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne
} from "typeorm";

@Entity()
export class QuoteList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", array: true })
  tickers: string[];

  @OneToOne()
  user: User;
}
