import React, { Fragment, useEffect, useRef } from "react";
import { PiMouseScroll } from "react-icons/pi";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { getProduct, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const isInitialMount = useRef(true); // Track the initial render

  useEffect(() => {
    if (isInitialMount.current) {
      // Run only on the initial mount
      isInitialMount.current = false; // Set to false after the first render

      // Fetch products only if they are not already loaded
      if (!products || products.length === 0) {
        dispatch(getProduct());
      }
    } else {
      // If not the initial mount, handle errors
      if (error) {
        toast.error(`Error: ${error}`);
        dispatch(clearErrors());
      }
    }
  }, [dispatch, error, products]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="E-Commerce" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <PiMouseScroll />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
