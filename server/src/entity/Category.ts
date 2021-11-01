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
// import ProjectData from "./ProjectData";

@TYPEORM_ENTITY("categories")
export default class Category extends Entity {
  Location: any;
  constructor(category: Partial<Category>) {
    super();
    Object.assign(this, category);
  }
  @Index()
  @Column({ unique: true })
  name: string;

  @Index()
  @Column({ nullable:true})
  description: string;





  // @OneToMany(() => Project, (project) => project.user, {
  //   onUpdate: "CASCADE",
  //   onDelete: "CASCADE",
  // })
  // projects: Project[];

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.category, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  
  @ManyToOne(() => Product, (product) => product.category, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  // @ManyToOne(() => Result, (Result) => Result.project, {
  //   onUpdate: "CASCADE",
  //   onDelete: "CASCADE",
  // })



  @OneToMany(() => Subcategory, (subcategory) => subcategory.category, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  category: Category;

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
