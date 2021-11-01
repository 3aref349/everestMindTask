import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'

/** import Redux Slice  */
import { getCategories } from "../../../../redux/categories";
import { getProducts } from "../../../../redux/products";
import { Link } from "react-router-dom";

export default function SearchCategory() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories)




    const getCategoriesData = () => {

        console.log("get Categories")

        return dispatch(getCategories());

    };




    useEffect(() => {

        getCategoriesData();

    }, []);
    return (
        <div>
            <h1> Products</h1>
            <div>
                {categories.categories.map((item) => (
                    <div key={item.id} value={item.id} >

                        <h1> {item.name}</h1>

                        <Link to={`/prodsub/${item.id}`}>
                            <button style={{ color: "blue" }} >products by category</button>
                        </Link>



                    </div>
                ))}
            </div>



        </div>
    )
}
