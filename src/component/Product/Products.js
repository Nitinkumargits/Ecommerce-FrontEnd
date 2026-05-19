import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const DEFAULT_PRICE = [0, 25000];
const PRICE_MIN = 0;
const PRICE_MAX = 25000;

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  // priceDraft tracks the slider position while dragging; price is the committed
  // value that actually triggers the API call.
  const [priceDraft, setPriceDraft] = useState(DEFAULT_PRICE);
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [category, setCategory] = useState("");
  const [ratingsDraft, setRatingsDraft] = useState(0);
  const [ratings, setRatings] = useState(0);

  const { keyword } = useParams();
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => setCurrentPage(e);

  const selectCategory = (c) => {
    setCategory((prev) => (prev === c ? "" : c)); // toggle off if clicked again
    setCurrentPage(1);
  };

  const commitPrice = (event, newPrice) => {
    setPrice(newPrice);
    setCurrentPage(1);
  };

  const commitRatings = (event, newRating) => {
    setRatings(newRating);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setPriceDraft(DEFAULT_PRICE);
    setPrice(DEFAULT_PRICE);
    setCategory("");
    setRatingsDraft(0);
    setRatings(0);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    category !== "" ||
    ratings !== 0 ||
    price[0] !== DEFAULT_PRICE[0] ||
    price[1] !== DEFAULT_PRICE[1];

  useEffect(() => {
    if (error) {
      toast.error(error, {
        closeButton: true,
        closeOnClick: true,
        autoClose: 5000,
      });
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword || "", currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <div className="filterHeader">
              <Typography>Filters</Typography>
              <button
                type="button"
                className="clearFiltersBtn"
                onClick={clearFilters}
                disabled={!hasActiveFilters}>
                Clear
              </button>
            </div>

            <Typography>Price</Typography>
            <Slider
              value={priceDraft}
              onChange={(e, v) => setPriceDraft(v)}
              onChangeCommitted={commitPrice}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={PRICE_MIN}
              max={PRICE_MAX}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((c) => (
                <li
                  className={
                    "category-link" + (category === c ? " category-active" : "")
                  }
                  key={c}
                  onClick={() => selectCategory(c)}>
                  {c}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratingsDraft}
                onChange={(e, v) => setRatingsDraft(v)}
                onChangeCommitted={commitRatings}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
