import React from "react";

import { SlideLabel } from "../components/SlideLabel";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Authentication from "../helpers/Authentication";

const slideContext = [
  {
    href: "/products",
    src:
      "https://www.androidguys.com/wp-content/uploads/2019/02/galaxy_s10_trio.png",
    title: "Samsung S10 Family"
  },
  {
    href: "/products",
    src: "https://www.furniturenation.com/uploads/28327_6870218.jpg",
    title: "Bellona Sofa"
  },
  {
    href: "/products",
    src:
      "https://www.shanethegamer.com/wp-content/uploads/2017/10/frametv_fd_main_visual_03.jpg",
    title: "Samsung Frame TV"
  }
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      mProduct: {
        brand: "bran",
        category: { name: "cat" },
        description: "desc",
        discount: 10,
        id: 55,
        name: "name",
        price: 555,
        stock: 1
      },
      products: [
        {
          brand: "bran",
          category: { name: "cat" },
          description: "desc",
          discount: 10,
          id: 54,
          name: "name",
          price: 555,
          stock: 1,
          seller: {}
        },
        {
          brand: "bran1",
          category: { name: "cat" },
          description: "desc",
          discount: 10,
          id: 56,
          name: "name2",
          price: 555,
          stock: 1,
          seller: {}
        },
        {
          brand: "bran2",
          category: { name: "cat" },
          description: "desc",
          discount: 10,
          id: 57,
          name: "name3",
          price: 555,
          stock: 1,
          seller: {}
        }
      ]
    };

    this.toggleLogin = this.toggleLogin.bind(this);
  }

  componentDidMount() {
    this.props.routeChange("Home");
  }

  toggleLogin() {
    this.setState({ isLogin: !this.state.isLogin });
  }

  render() {
    var products = this.state.products.map(product => (
      <div
        className='container row border ml-1 mt-2'
        style={{
          height: "30%",
          position: "relative"
        }}
        key={product.id}
      >
        <div className='border mr-5 px-5'>Image</div>
        <div className='mr-3 mb-3'>
          Name: {product.name}
          <br />
          Brand: {product.brand}
          <br />
          Price: {product.price} TL
          <br />
          Discount: {product.discount}%
          <br />
        </div>
        <button
          type='button'
          className='container btn btn-primary mb-2 px-0 py-0'
          onClick={() => {
            this.props.history.push("/admin");
          }}
        >
          Go to product page
        </button>
      </div>
    ));
    return (
      <div style={{ backgroundColor: "#F2EEEE" }}>
        <React.Fragment>
          <div className='mx-5 px-5 mt-md-2'>
            <button
              type='button'
              onClick={() => {
                this.props.history.push("/admin");
              }}
            >
              Admin Account Page
            </button>
            <button
              type='button'
              onClick={() => {
                this.props.history.push("/products");
              }}
            >
              Products
            </button>
            <div className='w-75 mx-auto my-3'>
              <SlideLabel slideContext={slideContext} />
            </div>
            <div style={{ height: "600px" }} className='row w-100 mx-auto mt-2'>
              <div className='col text-center bg-light mr-3'>
                RECOMMENDED PRODUCTS {products}
              </div>
              <div className='col w-100 bg-light'>
                <div
                  className='row-4 h-25 w-100 text-center align-middle border'
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    this.props.history.push("/admin");
                  }}
                >
                  <h6>LAPTOPS</h6>
                  <img
                    onClick={() => {
                      this.props.history.push("/admin");
                    }}
                    src='https://cdn2.techadvisor.co.uk/cmsdata/features/3214583/best_budget_laptop_thumb336.jpg'
                    style={{ width: 325, height: 120, cursor: "pointer" }}
                  />
                </div>
                <div
                  className='row-6 h-50 text-center my-auto border'
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    this.props.history.push("/admin");
                  }}
                >
                  <h6>TELEVISIONS</h6>
                  <img
                    onClick={() => {
                      this.props.history.push("/admin");
                    }}
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm3rDi_t-4eCzA-m860eicyKt-nr842qJwn3GWN_dIRBF3iS8w'
                    style={{ width: 320, height: 250, cursor: "pointer" }}
                  />
                </div>
                <div
                  className='row-2 h-25 align-middle text-center border'
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    this.props.history.push("/admin");
                  }}
                >
                  <h6>BOOKS</h6>
                  <img
                    onClick={() => {
                      this.props.history.push("/admin");
                    }}
                    src='https://www.incimages.com/uploaded_files/image/970x450/getty_508400521_2000133320009280263_305526.jpg'
                    style={{ width: 325, height: 120, cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className='col bg-light ml-3'>
                <div
                  className='row-4 h-25 w-100 text-center border'
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    this.props.history.push("/admin");
                  }}
                >
                  <h6>SMART PHONES</h6>
                  <img
                    onClick={() => {
                      this.props.history.push("/admin");
                    }}
                    src='https://www.apple.com/v/iphone/home/z/images/meta/og.png?201905132138'
                    style={{ width: 340, height: 120, cursor: "pointer" }}
                  />
                </div>
                <div
                  className='row-6 h-50 text-center border'
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    this.props.history.push("/admin");
                  }}
                >
                  <h6>HOME</h6>
                  <img
                    onClick={() => {
                      this.props.history.push("/admin");
                    }}
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQzPgoDKyA4EfaOWW88jnijTYFb-s7UObs-NGbmT6wOraNxS32FQ'
                    style={{ width: 320, height: 250, cursor: "pointer" }}
                  />
                </div>
                <div
                  className='row-2 h-25 text-center border'
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    this.props.history.push("/admin");
                  }}
                >
                  <h6>FURNITURE</h6>
                  <img
                    onClick={() => {
                      this.props.history.push("/admin");
                    }}
                    src='http://biggiebestwebshop.co.za/images/furn%20%282%29%20%28Medium%29.jpg'
                    style={{ width: 340, height: 120, cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <Modal show={this.state.isLogin}>
            <Modal.Body
              className='text-center'
              style={{ color: "#090", fontSize: 25 }}
            >
              Successfully Edited
            </Modal.Body>
            <Modal.Footer>
              <Button variant='primary'>Close</Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      </div>
    );
  }
}

export default Home;
