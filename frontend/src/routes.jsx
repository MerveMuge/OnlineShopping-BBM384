import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Home from './pages/Home';
import Seller from './pages/Seller';
import Admin from './pages/Admin';
import Login from './pages/Login';
import SellerRegister from './pages/SellerRegister';
import CustomerRegister from './pages/CustomerRegister';
import Products from './pages/Products';
import Product from './pages/Product';
import Demo from './pages/Demo';
import { ShoppingCart } from './pages/ShoppingCart';
import { OrderStep1 } from './components/OrderStep1';
import { OrderStep2 } from './components/OrderStep2';
import { OrderStep3 } from './components/OrderStep3';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Authentication from './helpers/Authentication';
import Customer from './pages/Customer';
import CartHelper from './helpers/CartHelper';

const headerlessPages = ['Login', 'seller', 'Admin'];

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeader: true,
      headerCart: true,
      user: null
    };

    this.routeChange = this.routeChange.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  componentDidMount() {
    CartHelper.deleteCart();
    this.initialize();
    var token = Authentication.getToken();
    if (token != null) Authentication.setupAxiosInterceptors(token);
  }

  initialize() {
    var user = Authentication.getUser();
    this.setState({ user });
  }

  login() {
    this.initialize();
  }

  logout() {
    Authentication.logout();
    this.setState({ user: null });
  }

  addProductToCart(productId) {
    CartHelper.addProduct(productId);
    CartHelper.getProducts();
  }

  routeChange(page) {
    if (headerlessPages.includes(page)) this.setState({ isHeader: false });
    else if (!this.state.isHeader) this.setState({ isHeader: true });
    if (page.includes('seller')) this.setState({ headerCart: false });
    else if (!this.state.headerCart) this.setState({ headerCart: true });
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header
              user={this.state.user}
              logout={this.logout}
              isHeader={this.state.isHeader}
              cart={this.state.headerCart}
            />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Home routeChange={this.routeChange} {...props} />
                )}
              />
              <Route
                path='/demo'
                render={props => (
                  <Demo routeChange={this.routeChange} {...props} />
                )}
              />
              <Route
                path='/register/seller'
                render={props => (
                  <SellerRegister routeChange={this.routeChange} {...props} />
                )}
              />
              <Route
                path='/register/customer'
                render={props => (
                  <CustomerRegister routeChange={this.routeChange} {...props} />
                )}
              />
              <Route
                exact
                path='/register'
                render={() => <Redirect to='/register/customer' />}
              />
              <Route
                path='/login'
                render={props =>
                  !!this.state.user ? (
                    <Redirect to='/' />
                  ) : (
                    <Login
                      routeChange={this.routeChange}
                      login={this.login}
                      {...props}
                    />
                  )
                }
              />
              <Route
                path='/seller'
                render={props => (
                  <Seller
                    routeChange={this.routeChange}
                    seller={this.state.user}
                    logout={this.logout}
                    {...props}
                  />
                )}
              />
              <Route
                path='/customer'
                render={props => (
                  <Customer
                    routeChange={this.routeChange}
                    customer={this.state.user}
                    {...props}
                  />
                )}
              />
              <Route
                path='/admin'
                render={props => (
                  <Admin routeChange={this.routeChange} {...props} />
                )}
              />
              <Route
                exact
                path='/products'
                render={props => (
                  <Products
                    routeChange={this.routeChange}
                    addProductToCart={this.addProductToCart}
                    {...props}
                  />
                )}
              />
              <Route
                path='/products/:category'
                render={props => (
                  <Products routeChange={this.routeChange} {...props} />
                )}
              />
              <Route
                path='/product/:id'
                render={props => (
                  <Product routeChange={this.routeChange} {...props} />
                )}
              />
              <Route
                path='/order1'
                render={props => (
                  <OrderStep1 routeChange={this.routeChange} {...props} />
                )}
              />
              <Route
                path='/order2'
                render={props => (
                  <OrderStep2 routeChange={this.routeChange} {...props} />
                )}
              />
              <Route
                path='/order3'
                render={props => (
                  <OrderStep3 routeChange={this.routeChange} {...props} />
                )}
              />
              <Route
                path='/cart'
                render={props => (
                  <ShoppingCart routeChange={this.routeChange} {...props} />
                )}
              />
              <Redirect from='/*' to='/' />
            </Switch>
            <Footer isFooter={this.state.isHeader} />
          </div>
        </Router>
      </div>
    );
  }
}