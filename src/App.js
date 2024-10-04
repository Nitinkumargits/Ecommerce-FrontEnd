import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated import
import React, { useState } from "react";
import webFont from "webfontloader";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import Cart from "./component/Cart/Cart.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound.js";
// import Unauthorized from "./component/layout/unAuthorized/unAuth.js";
import { toast } from "react-toastify";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      toast.error(
        "Login to Enjoy Ecommerce-services || Error fetching Stripe API key"
      );
    }
  }
  React.useEffect(() => {
    if (!window.WebFontLoaded) {
      webFont.load({
        google: { families: ["Roboto", "Droid Sans", "Chilanka"] },
      });
      window.WebFontLoaded = true;
    }

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        {/* Use Routes instead of directly using Route */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/account"
          element={<ProtectedRoute isAdmin={false} element={<Profile />} />}
        />
        <Route
          path="login/shipping"
          element={<ProtectedRoute isAdmin={false} element={<Shipping />} />}
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute isAdmin={false} element={<UpdateProfile />} />
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute isAdmin={false} element={<UpdatePassword />} />
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute isAdmin={false} element={<OrderSuccess />} />
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute isAdmin={false} element={<ConfirmOrder />} />
          }
        />
        <Route
          path="/orders"
          element={<ProtectedRoute isAdmin={false} element={<MyOrders />} />}
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute isAdmin={false} element={<OrderDetails />} />
          }
        />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute isAdmin={true} element={<Dashboard />} />}
        />
        <Route
          path="/admin/products"
          element={<ProtectedRoute isAdmin={true} element={<ProductList />} />}
        />
        <Route
          path="/admin/product"
          element={<ProtectedRoute isAdmin={true} element={<NewProduct />} />}
        />
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true} element={<UpdateProduct />} />
          }
        />
        <Route
          path="/admin/orders"
          element={<ProtectedRoute isAdmin={true} element={<OrderList />} />}
        />
        <Route
          path="/admin/order/:id"
          element={<ProtectedRoute isAdmin={true} element={<ProcessOrder />} />}
        />
        <Route
          path="/admin/users"
          element={<ProtectedRoute isAdmin={true} element={<UsersList />} />}
        />
        <Route
          path="/admin/user/:id"
          element={<ProtectedRoute isAdmin={true} element={<UpdateUser />} />}
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true} element={<ProductReviews />} />
          }
        />
        <Route
          path="/process/payment"
          element={
            stripeApiKey ? (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            ) : (
              <NotFound />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
