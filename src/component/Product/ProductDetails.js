import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductDetails,
  clearErrors,
  newReview,
} from "../../actions/productAction";
import { addItemsToCart } from "../../actions/cartAction";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import Loader from "../layout/Loader/Loader";
import ReviewCard from "./ReviewCard";
import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import noImage from "../../images/noimage.png";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  // eslint-disable-next-line
  const [previousTotal, setPreviousTotal] = useState(null);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const unitPrice = product?.price || 0;
  const totalPrice = unitPrice * quantity;

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    toast.success("Item Added To Cart");
    dispatch(addItemsToCart(id, quantity));
  };

  const submitReviewToggle = () => setOpen(!open);

  // const reviewSubmitHandler = () => {
  //   if (!isAuthenticated) {
  //     toast.error("Please log in to submit a review.");
  //     navigate("/login");
  //   } else {
  //     const myForm = new FormData();
  //     myForm.set("rating", rating);
  //     myForm.set("comment", comment);
  //     myForm.set("productId", id);

  //     console.log(myForm);

  //     dispatch(newReview(myForm));
  //     setOpen(false);
  //   }
  // };
  const reviewSubmitHandler = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to submit a review.");
      navigate("/login");
    } else {
      const reviewPayload = {
        rating,
        comment,
        productId: id,
      };

      dispatch(newReview(reviewPayload));
      setOpen(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, success, reviewError]);

  // Track previous total price when quantity changes
  useEffect(() => {
    if (product && product.price !== undefined) {
      setPreviousTotal((prev) => (prev === totalPrice ? prev : totalPrice));
    }
  }, [quantity, product, totalPrice]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />

          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images && product.images.length > 0 ? (
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = noImage;
                      }}
                    />
                  ))
                ) : (
                  <img className="CarouselImage" src={noImage} alt="Fallback" />
                )}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>

              <div className="detailsBlock-3">
                <h1
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>₹{totalPrice}</span>
                </h1>

                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1}
                    onClick={addToCartHandler}>
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? " Out of Stock" : " In Stock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}>
            <DialogTitle>Submit Your Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
