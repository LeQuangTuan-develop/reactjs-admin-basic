import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import './app.css'
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Test from "./pages/test/Test";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
