import {
  Entity as TYPEORM_ENTITY,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";

import Entity from "./Entity";
import Project from "./Category";
import Cart from "./Cart";

enum Role {
  ADMIN = "admin",
  EDITOR = "editor",
  USER = "user",
}

@TYPEORM_ENTITY("users")
export default class User extends Entity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Index()
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column({ default: "false" })
  disable: string;

  @Column({
    type: "enum",
    default: "user",
    enum: Role,
  })
  role: Role;

  @OneToMany(() => Cart, (cart) => cart.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  cart: Cart[];

  // @OneToMany(() => Project, (project) => project.user, {
  //   onUpdate: "CASCADE",
  //   onDelete: "CASCADE",
  // })
  // projects: Project[];
}
