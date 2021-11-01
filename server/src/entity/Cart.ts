import {
    Entity as TYPEORM_ENTITY, PrimaryGeneratedColumn, Column, Index, JoinColumn,
    ManyToOne, CreateDateColumn,
    UpdateDateColumn, OneToMany, OneToOne,
} from "typeorm";


import User from "./User";
import Entity from "./Entity";

import Subcategory from "./SubCategory";
import Product from "./Products";
import { Allow } from "class-validator";
import Order from "./Order";
// import ProjectData from "./ProjectData";

@TYPEORM_ENTITY("carts")
export default class Cart extends Entity {

    constructor(cart: Partial<Cart>) {
        super();
        Object.assign(this, cart);
    }
 

    @Index()
    @Column({
        default:true
    })
    opened: boolean;

  
    @Index()
    @Column({nullable:true})
    totalPrice: number;

    @ManyToOne(() => User, (user) => user.cart, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "username", referencedColumnName: "username" })
    user: User;

    @OneToMany(() => Order, (order) => order.cart, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      cart: Cart;

    // @OneToMany(() => Project, (project) => project.user, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    // projects: Project[];


    // @ManyToOne(() => Result, (Result) => Result.project, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })



    // @OneToMany(() => Subcategory, (subcategory) => subcategory.category, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    // category: Category;

    // @OneToMany(() => Unit, (unit) => unit.project, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    // unitid: Project;


    // @OneToMany(() => Actualcost, (actualcost) => actualcost.project, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    // projectid: Project;

    // @OneToMany(() => Output, (output) => output.project, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    // projectoutput: Project;

    // @OneToMany(() => Unit, (unit) => unit.project, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    // projectunit: Project;

    // @JoinColumn({ name: "projectname", referencedColumnName: "name" })
    // project: Project;

    //   @ManyToOne(() => Project, (project) => project.Location, {
    //     onUpdate: "CASCADE",
    //     onDelete: "CASCADE",
    // })
    //   @JoinColumn({ name: "locationId", referencedColumnName: "id" })
    //   location: Location;

    // @OneToMany(() => Location, (location) => location.project, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    // location: Project[];
    // // @OneToMany(() => Location, location => location.project)
    // // location: Location[];

    //   @ManyToOne(() => Location, (location) => location.project, {
    //     onUpdate: "CASCADE",
    //     onDelete: "CASCADE",
    // })
    //   @JoinColumn({ name: "locationId", referencedColumnName: "id" })
    //   location: Location;


    //   @ManyToOne(() => Currency, (currency) => currency.project, {
    //     onUpdate: "CASCADE",
    //     onDelete: "CASCADE",
    // })
    //   @JoinColumn({ name: "currencyId", referencedColumnName: "id" })
    //   currency: Currency;


    // @OneToMany(() => Project, (project) => project.Location, {
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    // })
    // project: Project[];

    // @OneToOne(() => Location)
    // @JoinColumn()
    // location: Project;
    // @OneToOne(() => Location, location => Location.project) // specify inverse side as a second parameter
    // @JoinColumn()
    // project: Project;


    // @OneToOne(() => Profile, profile => profile.user) // specify inverse side as a second parameter
    // @JoinColumn()
    // profile: Profile;

}
