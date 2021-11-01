//
// ─── REACT ──────────────────────────────────────────────────────────────────────
//

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//
// ─── UI ─────────────────────────────────────────────────────────────────────────
//

import "./App.css";
import { MediaContextProvider } from "./utilities/Artsy";

//
// ─── COMPONENTS ─────────────────────────────────────────────────────────────────
//
import Navbar from "./shared/Navbar";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import TabPanel from './components/admin/dashboard/Dashboard'

//
// ─── CUSTOM ROUTES ──────────────────────────────────────────────────────────────
//

import RouteUser from "./routes/RouterUser";
import RouteGuest from "./routes/RouteGuest";
import RouteAdmin from "./routes/RouteAdmin";
import Landing from "./components/Landing";


//
// ─── ACTIONS ────────────────────────────────────────────────────────────────────
//

import { loadAdmin, loadUser } from "./redux/auth";
import Finish from "./components/finish/Finish";
import ActualCost from "./components/Inputs/actualCost/ActualCost";
import Actual from  "./components/Inputs/actualCost/actual"

import Input from "./components/Inputs/inputs/input";

import ReslultByProject from "./components/result/ReslultByProject";
import Edit from "./components/admin/products/Edit";
import PaginatedProducts from "./components/users/PaginatedProducts"

import ProductCategory from "./components/users/ProductCategory";
import ProductTag from "./components/users/ProductTag";
import Sub from "./components/users/Categories/Sub";
import Categories from "./components/users/Categories/Categories";
import SubCategory from "./components/users/SubCategories/Subcategory";
import ProductSub from "./components/users/SubCategories/ProductSub";

import ProdSub from "./components/users/Products/search/ProdSub";
import SearchCategory from "./components/users/Products/search/SearchCategory"
import SearchTags from "./components/users/Products/search/SearchTags";
import ProdTag from "./components/users/Products/search/ProdTag";
import TagPro from "./components/admin/tagToProduct/TagPro";
import Carts from "./components/users/Carts/Carts";
import OrderByCart from "./components/users/Carts/OrderByCart";
import FullWidthTabs from "./components/admin/dashboard/AdminDashboard";

function App() {
  const dispatch = useDispatch();
  // ────────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadAdmin());
  }, [dispatch]);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Router>
      <MediaContextProvider>
        <Navbar>
          <Switch>
            {/* NORMAL ROUTES */}
            {/* <Route path="/" component={Landing} exact /> */}
            <Route path="/" component={Landing} exact />
            <Route  path="/categories" component={Categories} exact/>
            <Route path="/subcategory" component={SubCategory} exact />
           
            <Route component={Sub} path="/sub/:id" exact />
            <Route component={ProductSub} path="/prod/:id" exact/>
            {/* GUEST ROUTES */}
            <RouteGuest path="/login" component={Login} exact />
            <RouteGuest path="/register" component={Register} exact />

            {/* USER ROUTES */}
            {/* <RouteUser path="/dashboard" component={TabPanel} exact />  */}
            
            {/* <RouteUser path="/categories" component={Categories} exact /> 
            <RouteUser path="/subcategory" component={SubCategory} exact />  */}
            <RouteUser path="/products" component={SearchCategory} exact />
            <RouteUser path="/carts" component={Carts} exact />
            {/* <RouteUser path="/paginatedproducts" component={PaginatedProducts} exact />  */}




 {/***Route Admin */}

 <RouteAdmin path="/dashboard" component={FullWidthTabs} exact />
            {/* <RouteUser path="/productscategory" component={ProductCategory} exact /> 
            <RouteUser path="/productstag" component={ProductTag} exact />  */}
            {/* <RouteUser component={Edit} path="/edit/:id" exact/>
            <RouteUser component={Sub} path="/sub/:id" exact/>
            <RouteUser component={ProductSub} path="/prod/:id" exact/> */}
            <RouteUser component={ProdSub} path="/prodsub/:id" exact/>
            <RouteUser component={ProdTag} path="/prodtag/:id" exact/>
            <RouteUser component={TagPro} path="/tagtopro/:id" exact/>
            <RouteUser component={OrderByCart} path="/order/:id" exact/>
           
            {/* <RouteUser component={ProductCategory} path="/productstag/:id" exact/> */}
         <RouteUser component={Input} path="/input/:id" exact/>

      <RouteUser component={ReslultByProject} path="/resultbyproject/:id" exact/> 
        <RouteUser path="/test" component={Finish} exact /> 

     {/* <RouteUser path="/ac" component={Test} exact /> 
     <RouteUser component={Actual} path="/actual/:id" exact/>
     <RouteUser path="/test" component={TestTwo} exact /> 
     <RouteUser component={Input} path="/input/:id" exact/>
     <RouteUser path="/dashboard" component={DashboardInputs} exact /> 
     <RouteUser path="/result" component={Result} exact /> 
     <RouteUser component={ReslultByProject} path="/resultbyproject/:id" exact/> */}
            {/* <RouteUser path="/dashboard" component={Main} exact />
            <RouteUser component={Edit} path="/edit/:id" exact/> */} 
          </Switch>
        </Navbar>
      </MediaContextProvider>
    </Router>
  );
}

export default App;
