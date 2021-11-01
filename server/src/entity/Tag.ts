import { Exclude } from "class-transformer";
import {
    Entity as TYPEORM_ENTITY, PrimaryGeneratedColumn, Column, Index, JoinColumn,
    ManyToOne, CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,ManyToMany,JoinTable
} from "typeorm";
import Entity from "./Entity";
import Project from "./Category";
import ProjectData from "./SubCategory";
import Product from "./Products";

@TYPEORM_ENTITY("tags")
export default class Tag extends Entity {
    constructor(tag: Partial<Tag>) {
        super();
        Object.assign(this, tag);
    }
    @Index()
  @Column({ unique: true })
  tagName: string;




  @OneToMany(() => Product, (product) => product.tag, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  tag: Tag[];
  

//     @ManyToOne(() => Product, (product) => product.product, {
//     onUpdate: "CASCADE",
//     onDelete: "CASCADE",
// })
// @JoinColumn({ name: "tagid", referencedColumnName: "id" })
// product: Product;

// // @ManyToOne(() => Project, project => project.location)
// // project: Project;
// @OneToMany(() => Location, (location) => location.project, {
//   onUpdate: "CASCADE",
//   onDelete: "CASCADE",
// })
// project: Project[];


  //   @ManyToOne(() => Location, (location) => location.Project, {
//     onUpdate: "CASCADE",
//     onDelete: "CASCADE",
// })
//   @JoinColumn({ name: "locationId", referencedColumnName: "id" })
//   location: Location;

// @OneToOne(() => Location, project => project.Location) // specify inverse side as a second parameter
// project: Project;
// @OneToOne(() => Project)
// @JoinColumn()
// project: Project;

}
