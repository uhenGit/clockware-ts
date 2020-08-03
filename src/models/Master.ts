import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
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
}
