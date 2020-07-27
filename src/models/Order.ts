// define relations between ordres and masters filtered by date, time and city
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Master } from "./Master";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  client_name!: string;

  @Column()
  master_id!: number;

  @Column()
  master_name!: string;

  @Column()
  city_name!: string;

  @Column()
  clock_size!: string;

  @Column()
  date!: string;

  @Column()
  time!: string;

  @Column()
  willClose!: string;

  @Column()
  createdAt!: string;

  @Column()
  updatedAt!: string;

  // something wrong
  @ManyToOne(() => Master, (master) => master.name)
  master!: Master;
}
