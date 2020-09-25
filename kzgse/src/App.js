import React from 'react';
import './App.css';
import './App.sass';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ShoppingCartPage from './pages/shoppingcart/shoppingcart.js'
import ItemPage from './pages/itemPage/index'
import ConfirmationPage from './pages/confirmOrderPage/index.js'
import ErrorPage from './pages/404Page/index'
import HomePage from './pages/HomePage/index'

function App() {
  return (
    <Router>
      <Switch>
        <Route path = '/' exact component={HomePage}/>
        <Route path ='/cart' component={ShoppingCartPage}/>
          {/* <ShoppingCartPage/>
        </Route> */}
        <Route path = '/item/:store/:itemID' component={ItemPage}/>
        <Route path ='/confirmation' component = {ConfirmationPage}/>
        <Route component={ErrorPage}/>
      </Switch>
    </Router>
    
  );
}

export default App;
