// define relations between ordres and masters filtered by date, time and city
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  clientName!: string;

  @Column()
  masterId!: number;

  @Column()
  masterName!: string;

  @Column()
  cityName!: string;

  @Column()
  clockSize!: string;

  @Column()
  date!: string;

  @Column()
  time!: string;

  @Column()
  willClose!: string;

  @Column()
  isDone!: boolean;

  @Column()
  createdAt!: string;

  @Column()
  updatedAt!: string;
}
