import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  mail!: string;

  @Column()
  city!: string;

  @Column()
  password!: string;

  @Column()
  createdAt!: string;

  @Column()
  updatedAt!: string;
}
