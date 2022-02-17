import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import EditUser from "./components/EditUser";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/dashboard">
          <Navbar/>
          <Dashboard/>
        </Route>
        <Route path="/editUser/:id">
          <Navbar/>
          <EditUser/>
        </Route>
        <Route path="/product">
          <Navbar/>
          <ProductList/>
        </Route>
        <Route path="/add">
            <Navbar/>
            <AddProduct/>
        </Route>
        <Route path="/edit/:id">
           <Navbar/>
            <EditProduct/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
