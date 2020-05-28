import React from 'react';

import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mProduct: {
        brand: 'brand',
        category: { name: 'cat' },
        description: 'desc',
        discount: 10,
        id: 55,
        name: 'name',
        price: 555,
        stock: 1
      },
      products: [],
      filters: {
        minPrice: null,
        maxPrice: null,
        colors: [],
        brands: [],
        minRate: 0
      },
      availableFilters: {
        minPrice: null,
        maxPrice: null,
        colors: [],
        brands: []
      },
      category: null
    };

    this.applyFilters = this.applyFilters.bind(this);
  }

  componentDidMount() {
    this.props.routeChange('Products');
    this.initApp();
  }

  addProductToCart(productId) {
    axios
      .post(
        'http://localhost:8080/api/basket?productId=' +
          productId +
          '&quantity=1'
      )
      .then(res => this.props.history.push('/cart'))
      .catch(err => console.log(err));
  }

  applyFilters() {
    const requestOptions = {
      headers: { 'Content-Type': 'application/json' }
    };
    axios
      .post(
        'http://localhost:8080/api/products/' + this.state.category,
        this.state.filters,
        requestOptions
      )
      .then(res => {
      });
  }

  initApp() {
    var category = this.props.match.params.category;
    var url = 'http://localhost:8080/api/products';
    if (!!category) {
      this.setState({ category });
      url += '/' + category;
    }
    axios
      .post(url)
      .then(res => {
        this.setState({ products: res.data.content });
      })
      .catch(err => console.log(err));
    if (!category) category = 'root';
    axios
      .get('http://localhost:8080/api/filters/' + category)
      .then(res => {
        this.setState({ availableFilters: res.data });
      })
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(props) {
    var category = props.match.params.category;
    if (this.state.category !== category) {
      this.setState({ category });
      this.initApp();
    }
  }

  render() {
    var colors = this.state.availableFilters.colors.map(color => (
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          var filters = this.state.filters;
          if (!filters.colors.includes(color)) filters.colors.push(color);
          else filters.colors.splice(filters.colors.indexOf(color), 1);
          this.setState({ filters });
        }}
      >
        <input
          type='checkbox'
          checked={this.state.filters.colors.includes(color)}
        />
        {color}
      </div>
    ));
    var products = this.state.products.map(product => (
      <div
        style={{
          width: '30%',
          minWidth: 210,
          height: 350,
          position: 'relative'
        }}
        className='mt-2 mb-3 pb-2 px-2 pt-3 border'
        key={product.id}
      >
        <img
          style={{
            width: '95%',
            height: '50%',
            cursor: 'pointer'
          }}
          className='mx-auto border mt-2'
          onClick={() => {
            this.props.history.push('/product/' + product.id);
          }}
          src={'http://localhost:8080/files/' + product.picture}
        />
        <small>Seller Rating: {product.seller.avg_rating}</small>
        <div
          style={{
            color: '#056866',
            maxHeight: 60,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: 14,
            cursor: 'pointer'
          }}
          onClick={() => {
            this.props.history.push('/product/' + product.id);
          }}
        >
          {product.name}
        </div>
        <div className='row mr-1 my-2'>
          <div className='col'>
            <strong>Brand: </strong>
            {product.brand}
          </div>
          <div style={{ color: '#f00' }}>
            $
            {(product.price - (product.price * product.discount) / 100)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </div>
          <sub>
            <del>${product.discount > 0 ? product.price : null}</del>
          </sub>
        </div>
        <div
          style={{ position: 'absolute', bottom: 0 }}
          className='w-100 row justify-content-center'
        >
          <button
            type='button'
            className='btn btn-primary ml-2'
            onClick={() => this.addProductToCart(product.id)}
          >
            Add to Cart
          </button>
        </div>
        {product.discount > 0 ? (
          <div
            style={{
              backgroundColor: '#f95447',
              position: 'absolute',
              right: 0,
              top: 0,
              width: 50,
              textAlign: 'center',
              color: '#fff'
            }}
          >
            -%{product.discount}
          </div>
        ) : null}
      </div>
    ));
    return (
      <div style={{ backgroundColor: '#F8F3EF' }} className='py-4 px-4'>
        <div
          style={{ backgroundColor: '#F2EEEE' }}
          className='py-4 px-3 border'
        >
          <div className='row px-3'>
            <div
              style={{
                backgroundColor: '#fff',
                minHeight: 900,
                maxHeight: 1200
              }}
              className='col-3 border'
            >
              <div
                style={{ color: 'darkblue', marginTop: 20, fontSize: 20 }}
                className='filters'
              >
                <b>All Categories</b>
                <hr />
                <a
                  style={{ marginTop: 10, fontSize: 15, color: 'black' }}
                  href='/products/TV'
                >
                  TV
                </a>
                <br />
                <a
                  style={{ marginTop: 10, fontSize: 15, color: 'black' }}
                  href='/products/Mobile%20Phones'
                >
                  Mobile Phone
                </a>
                <br />
                <a
                  style={{ marginTop: 10, fontSize: 15, color: 'black' }}
                  href='/products/Smart%20Phones'
                >
                  Smart Phone
                </a>
                <br />
                <a
                  style={{ marginTop: 10, fontSize: 15, color: 'black' }}
                  href='/products/Home'
                >
                  Home
                </a>
                <br />
                <a
                  style={{ marginTop: 10, fontSize: 15, color: 'black' }}
                  href='/products/Furniture'
                >
                  Furniture
                </a>
                <hr />
                <h1 style={{ color: 'darkblue', marginTop: 15, fontSize: 16 }}>
                  <b>Colors</b>
                </h1>
                <hr />
                {colors}
                <hr />
                <h1 style={{ marginTop: 15, fontSize: 16 }}>
                  <b>Seller Rate</b>
                </h1>
                <hr />
                <div
                  style={{
                    color: this.state.filters.minRate == 0 ? '#f00' : null
                  }}
                  onClick={() => {
                    var filters = this.state.filters;
                    filters.minRate = 0;
                    this.setState({ filters });
                  }}
                >
                  0+
                </div>
                <div
                  style={{
                    color: this.state.filters.minRate == 1 ? '#f00' : null
                  }}
                  onClick={() => {
                    var filters = this.state.filters;
                    filters.minRate = 1;
                    this.setState({ filters });
                  }}
                >
                  1+
                </div>
                <div
                  style={{
                    color: this.state.filters.minRate == 2 ? '#f00' : null
                  }}
                  onClick={() => {
                    var filters = this.state.filters;
                    filters.minRate = 2;
                    this.setState({ filters });
                  }}
                >
                  2+
                </div>
                <div
                  style={{
                    color: this.state.filters.minRate == 3 ? '#f00' : null
                  }}
                  onClick={() => {
                    var filters = this.state.filters;
                    filters.minRate = 3;
                    this.setState({ filters });
                  }}
                >
                  3+
                </div>
                <div
                  style={{
                    color: this.state.filters.minRate == 4 ? '#f00' : null
                  }}
                  onClick={() => {
                    var filters = this.state.filters;
                    filters.minRate = 4;
                    this.setState({ filters });
                  }}
                >
                  4+
                </div>
                <div
                  style={{
                    color: this.state.filters.minRate == 5 ? '#f00' : null
                  }}
                  onClick={() => {
                    var filters = this.state.filters;
                    filters.minRate = 5;
                    this.setState({ filters });
                  }}
                >
                  5
                </div>
                <br />
                <h1 style={{ marginTop: 15, fontSize: 16 }}>
                  <b>Price</b>
                </h1>
                <br />
                <div style={{ alignItems: 'center' }}>
                  <input
                    style={{ width: 100 }}
                    onChange={e => {
                      var filters = this.state.filters;
                      filters.minPrice = e.target.value;
                      this.setState(filters);
                    }}
                    value={this.state.filters.minPrice}
                    type='text'
                  />
                  -
                  <input
                    style={{ width: 100 }}
                    value={this.state.filters.maxPrice}
                    onChange={e => {
                      var filters = this.state.filters;
                      filters.maxPrice = e.target.value;
                      this.setState(filters);
                    }}
                    type='text'
                  />
                </div>
                <hr />
                <br />
                <button className='btn btn-primary' onClick={this.applyFilters}>
                  Apply
                </button>
              </div>
            </div>
            <div className='col ml-3 '>
              <div style={{ backgroundColor: '#fff' }} className='border mb-3'>
                <div
                  style={{ backgroundColor: 'white' }}
                  className='border mb-3 product-sorting d-flex'
                >
                  <p style={{ fontSize: 15 }}>Sort by:</p>
                  <form
                    style={{ marginLeft: 20, marginTop: 5 }}
                    action='#'
                    method='get'
                  >
                    <select
                      style={{ fontSize: 13 }}
                      name='select'
                      id='sortByselect'
                    >
                      <option value='value'>Highest Rated</option>
                      <option value='value'>Discount Amount</option>
                      <option value='value'>Price Increasing</option>
                      <option value='value'>Price Decreasing</option>
                    </select>
                    <input type='submit' className='d-none' value='' />
                  </form>
                </div>
              </div>
              <div style={{ backgroundColor: '#fff' }} className='border '>
                <div className='row justify-content-center'>
                  {products.length > 0 ? products : 'No products found'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;