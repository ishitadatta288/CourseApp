import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(
  "pk_test_51Rfc9FC4MTgTeJbn4HivI1n7UNfZvUsVsheFLZBWzF5YvLE4hByUnsKnaE4jD0mtYElmZUMDsqbuopCu3H9WgekY00y7CPDcl6"
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
);
