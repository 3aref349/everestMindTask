import { Exclude } from "class-transformer";
import {
    Entity as TYPEORM_ENTITY, PrimaryGeneratedColumn, Column, Index, JoinColumn,
    ManyToOne, CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
} from "typeorm";

import Entity from "./Entity";

import Category from "./Category";
import Product from "./Products";


@TYPEORM_ENTITY("subcategories")
export default class Subcategory extends Entity {
    Unit: any;
    subcategory: any;
    constructor(subcategory: Partial<Subcategory>) {
        super();
        Object.assign(this, subcategory);
    }
    @Index()
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    createdAt: Date;


    @Index()
    @Column({ unique: true })
    name: string;

    @ManyToOne(() => Product, (product) => product.subcategory, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })


    
    @Exclude()
    @ManyToOne(() => Category, (category) => category.category, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn()
    category: Category;

 

    // @OneToOne(() => Unit)
    // @JoinColumn()
    // unit: Unit;


  
//   @ManyToOne(() => Unit, (unit) => unit.projectdata, {
//     onUpdate: "CASCADE",
//     onDelete: "CASCADE",
// })
//   @JoinColumn({ name: "unitId", referencedColumnName: "id" })
//   unit: Unit;

    // @OneToOne(() => Actualcost)
    // @JoinColumn()
    // actualcost: Actualcost;


}
