import UserList from "../userList/UserList";
import User from "../user/User";
import NewUser from "../newUser/NewUser";
import ProductList from "../productList/ProductList";
import ProductListDel from "../productListDel/ProductListDel";
import Product from "../product/Product";
import NewProduct from "../newProduct/NewProduct";
import Test from "../test/Test";
import Home from "../home/Home";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import {
    Switch,
    Route,
  } from "react-router-dom";

export default function Admin() {
    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <Switch>
                    <Route path="/test">
                        <Test />
                    </Route>
                    <Route path="/user/:userId">
                        <User />
                    </Route>
                    <Route path="/users">
                        <UserList />
                    </Route>
                    <Route path="/newUser">
                        <NewUser />
                    </Route>
                    <Route path="/doctors/store">
                        <ProductListDel />
                    </Route>
                    <Route path="/doctors">
                        <ProductList />
                    </Route>
                    <Route path="/doctor/:doctorId">
                        <Product />
                    </Route>
                    <Route path="/newDoctor">
                        <NewProduct />
                    </Route>
                    <Route path="/" >
                        <Home />
                    </Route>
                </Switch>
            </div>
        </>
    )
}
