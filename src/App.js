import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Default from "./components/Default";
import Details from "./components/Details";
import NavBar from "./components/NavBar";
import Modal from "./components/Modal";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/cart" component={Cart}/>
        <Route path="/details" component={Details} />
        <Route component = {Default} />
      </Switch>
      <Modal />
    </>
  );
}

export default App;
