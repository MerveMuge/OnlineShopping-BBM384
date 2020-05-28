import React from "react";

import StarRatingComponent from "react-star-rating-component";
import axios from "axios";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      quantity: 1,
      product: {
        brand: "",
        category: { name: "" },
        description: "",
        discount: "",
        id: "",
        name: "",
        price: "",
        stock: "",
        color: "",
        seller: {}
      },
      branch: []
    };

    this.addToCart = this.addToCart.bind(this);
    this.renderPrice = this.renderPrice.bind(this);
  }

  componentDidMount() {
    this.props.routeChange("Product");
    this.setState({ id: this.props.match.params.id });
    axios("http://localhost:8080/api/product/" + this.props.match.params.id)
      .then(response => {
        var category = response.data.product.category;
        var branch = [];
        while (category) {
          branch.push(category.name);
          category = category.parent;
        }
        var product = response.data.product;
        this.setState({ branch, product });
      })
      .catch(err => console.log(err));
  }

  addToCart() {
    axios
      .post(
        "http://localhost:8080/api/basket?productId=" +
          this.state.product.id +
          "&quantity=" +
          this.state.quantity
      )
      .then(res => this.props.history.push("/cart"))
      .catch(err => console.log(err));
  }

  renderPrice() {
    const { product } = this.state;
    if (product.discount > 0) {
      return (
        <div className='row ml-1'>
          <div
            className='text-center py-3 px-3'
            style={{ backgroundColor: "#c33", color: "#fff" }}
          >
            <div>
              %<b>{product.discount}</b>
            </div>
            <div>Sale</div>
          </div>
          <div className='col py-auto ml-2'>
            <del className='row' style={{ fontSize: 25, color: "#aaa" }}>
              {product.price}$
            </del>
            <b className='row' style={{ fontSize: 25 }}>
              {(
                product.price -
                (product.price * product.discount) / 100
              ).toFixed(2)}
              $
            </b>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { product } = this.state;
    var branch = this.state.branch.map((element, index) => (
      <div key={index} className='d-flex inline'>
        <div>{"/"}</div>
        <div className='px-1' style={{ color: "#37c", cursor: "pointer" }}>
          {element}
        </div>
      </div>
    ));
    return (
      <div>
        <div className='w-100 px-4 py-3' style={{ backgroundColor: "#F8F3EF" }}>
          <div className='row px-3 my-2'>{branch}</div>
          <div
            className='w-100 px-3 py-3 border'
            style={{ backgroundColor: "#F2EEEE" }}
          >
            <div className='col'>
              <div className='row'>
                {product.picture ? (
                  <img
                    className='border mr-3'
                    style={{ width: 400, height: 400 }}
                    src={"http://localhost:8080/files/" + product.picture}
                  />
                ) : (
                  <div
                    className='border mr-3'
                    style={{ width: 400, height: 400, textAlign: "center" }}
                  >
                    No image
                  </div>
                )}
                <div className='col'>
                  <div
                    className='row border mb-2 pl-2 inline'
                    style={{ backgroundColor: "#fff" }}
                  >
                    <div style={{ fontSize: 40 - product.name.length / 7 }}>
                      {product.name}
                    </div>
                    <div
                      className='my-auto'
                      style={{
                        color: "#aaa",
                        fontSize: 25 - product.name.length / 20
                      }}
                    >
                      (#{product.id})
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-7 mr-2'>
                      <div className='row border'>{this.renderPrice()}</div>
                      <div className='d-flex justify-content-center mt-3'>
                        <div
                          className='d-flex m-1 mr-4 py-1'
                          style={{ borderRadius: 7, backgroundColor: "#fff" }}
                        >
                          <div
                            className='text-center'
                            style={{
                              fontSize: 30,
                              cursor: "pointer",
                              width: 30
                            }}
                            onClick={() => {
                              var quantity = this.state.quantity - 1;
                              if (quantity >= 1) this.setState({ quantity });
                            }}
                          >
                            -
                          </div>
                          <input
                            className='text-center'
                            type='text'
                            value={this.state.quantity}
                            onChange={event => {
                              var quantity = event.target.value;
                              if (quantity <= 0) quantity = 0;
                              else quantity = parseInt(quantity, 10);
                              this.setState({ quantity });
                            }}
                            style={{ width: 50 }}
                          />
                          <div
                            className='text-center'
                            style={{
                              fontSize: 30,
                              cursor: "pointer",
                              width: 30
                            }}
                            onClick={() =>
                              this.setState({
                                quantity: this.state.quantity + 1
                              })
                            }
                          >
                            +
                          </div>
                        </div>
                        <button
                          className='btn btn-primary my-1'
                          onClick={this.addToCart}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                    <div className='col border'>
                      <div className='row' style={{ fontSize: 30 }}>
                        <StarRatingComponent
                          name='star'
                          value={this.state.product.seller.avg_rating}
                          editing={false}
                        />
                        <div
                          className='pt-1'
                          style={{ fontSize: 23, color: "#aaa" }}
                        >
                          ({this.state.product.seller.avg_rating})
                        </div>
                      </div>
                      <div className='row' style={{ fontSize: 18 }}>
                        Seller: {this.state.product.seller.name}
                      </div>
                      <div className='row' style={{ fontSize: 18 }}>
                        Email: {this.state.product.seller.email}
                      </div>
                      <div className='row' style={{ fontSize: 18 }}>
                        Phone: {this.state.product.seller.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div>
                    <b>Color: </b>
                    {this.state.product.color}
                  </div>
                </div>
                <div className='col'>
                  <b>Brand: </b>
                  {this.state.product.brand}
                </div>
              </div>
              <div className='row'>
                <b>Description:</b>
                {this.state.product.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
