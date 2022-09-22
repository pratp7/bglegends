import LandingPage from "./components/LandingPage/LandingPage";
import Cart from "./components/Cart/Cart";
import classes from "./App.module.scss";
import LoginPage from "./components/LoginPage/LoginPage";
import Checkout from "./components/Checkout/Checkout";
import PaymentGateway from "./components/Payment/PaymentGateway";
import { Route, Routes, Navigate } from "react-router-dom";
function App() {
  return (
    <div className={classes.layout}>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="sign-in" element={<LoginPage />} />
        <Route path="user-cart" element={<Cart />} />
        <Route path="check-out" element={<Checkout />} />
        <Route path="payment-gateway" element={<PaymentGateway />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
