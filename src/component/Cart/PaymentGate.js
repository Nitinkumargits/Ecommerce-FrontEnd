import React, { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loader from "../layout/Loader/Loader";
import Payment from "./Payment";
import { toast } from "react-toastify";

// Loads Stripe.js only when the user actually navigates to the payment page,
// so its telemetry/CORS chatter doesn't pollute the rest of the app.
const PaymentGate = () => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await axios.get("/api/v1/stripeapikey");
        if (!cancelled && data?.stripeApiKey) {
          setStripePromise(loadStripe(data.stripeApiKey));
        }
      } catch (err) {
        toast.error("Could not initialize payment. Please try again.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!stripePromise) return <Loader />;

  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default PaymentGate;
