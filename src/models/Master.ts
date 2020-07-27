import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./Order";

@Entity({ name: "masters" })
export class Master {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  city!: string;

  @Column({ nullable: true })
  rate!: number;

  @Column("int", { array: true, nullable: true })
  rateArr!: number[];

  @Column()
  createdAt!: string;

  @Column()
  updatedAt!: string;

  @OneToMany(() => Order, (order: Order) => order.master_id)
  orderMaster!: Order;
}
