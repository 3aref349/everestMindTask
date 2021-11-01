import { Exclude } from "class-transformer";
import {
    Entity as TYPEORM_ENTITY, PrimaryGeneratedColumn, Column, Index, JoinColumn,
    ManyToOne, CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
} from "typeorm";
import Category from "./Category";
import Entity from "./Entity";
import Order from "./Order";
import Subcategory from "./SubCategory";
import Tag from "./Tag";


@TYPEORM_ENTITY("products")
export default class Product extends Entity {
    constructor(product: Partial<Product>) {
        super();
        Object.assign(this, product);
    }

    @Index()
  @Column({ unique: true })
  productName: string;

  @Index()
  @Column()
  productPrice: number;

  @Column({ default: "defaultpp.jpg" })
  imageUrn: string;

      
  @Exclude()
  @ManyToOne(() => Category, (category) => category.category, {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
  })
  @JoinColumn()
  category: Category;

  @Exclude()
  @ManyToOne(() => Subcategory, (subcategory) => subcategory.subcategory, {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
  })
  @JoinColumn()
  subcategory: Subcategory;
  @Exclude()

  @ManyToOne(() => Tag, (tag) => tag.tag, {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
  })
  @JoinColumn()
  tag: Tag;


  @OneToMany(() => Order, (order) => order.product, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  product: Product;




  // @OneToMany(() => Location, (location) => location.project, {
  //   onUpdate: "CASCADE",
  //   onDelete: "CASCADE",
  // })
  // project: Project[];
  

//     @ManyToOne(() => Project, (project) => project.project, {
//     onUpdate: "CASCADE",
//     onDelete: "CASCADE",
// })
// @JoinColumn({ name: "locationId", referencedColumnName: "id" })
// project: Project;

// // @ManyToOne(() => Project, project => project.location)
// // project: Project;



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
