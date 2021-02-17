import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../components/admin/dashboard/main/dashboard.jsx";
import CartSwitch from "../components/cart/CartSwitch";
import Catalog from "../components/catalog/Catalog";
import Home from "../components/landingPage/Home";
import Login from "../components/login/Login";
import NavBar from "../components/navbar/Navbar";
import ProductDetail from "../components/productDetail/ProductDetail";
import RegisterForm from "../components/register/RegisterForm";
import Footer from "../components/footer/Footer.jsx";
import Profile from "../components/profile/Profile";
import OrderDetail from "../components/profile/ordersList/OrderDetail";
import AboutUs from "../components/about/aboutTeam";
import DetailFs from "../components/about/aboutCartDetail/gordoDetail";
import DetailAj from "../components/about/aboutCartDetail/agusDetail";
import DetailNz from "../components/about/aboutCartDetail/zabaDetail";
import DetailJs from "../components/about/aboutCartDetail/jereDetail";
import DetailCr from "../components/about/aboutCartDetail/carlosDetail";
import DetailFm from "../components/about/aboutCartDetail/facuDetail";
import ResetPassword from "../components/login/ResetPassword.jsx";
import Forgot from "../components/login/Forgot.jsx";
import WishList from "../components/wishList/WishList";
import NotFoundPage from "../components/404/NotFoundPage.jsx";

const Routes = () => {
  const user = useSelector((state) => state.loginReducer.user);

  const adminProfile = () => {
    if (user.role === 1) {
      return <Route path="/dashboard" component={Dashboard} />;
    } else {
      return <Route path="/dashboard" component={NotFoundPage} />;
    }
  };

  return (
    <>
      {adminProfile()}
      <Route path="/product" component={NavBar} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/register" component={NavBar} />
      <Route path="/register" component={RegisterForm} />
      <Route exact path="/" component={Home} />
      <Route path="/products" component={NavBar} />
      <Route exact path="/products" component={Catalog} />
      <Route exact path="/products/category/:idCat" component={Catalog} />
      <Route exact path="/products/search/:name" component={Catalog} />
      <Route path="/cart" component={NavBar} />
      <Route path="/cart" component={CartSwitch} style={{ height: "90vh" }} />
      <Route path="/me" component={NavBar} />
      <Route exact path="/me" component={Profile} />
      <Route exact path="/me/:userId/order/:orderId/" component={OrderDetail} />
      <Route path="/login" component={NavBar} />
      <Route exact path="/login" component={Login} />
      <Route path="/about" component={NavBar} />
      <Route path="/about" component={AboutUs} />
      <Route path="/Facundo-A-Siri" component={NavBar} />
      <Route path="/Facundo-A-Siri" component={DetailFs} />

      <Route path="/Nicolas-Zabattaro" component={NavBar} />
      <Route path="/Nicolas-Zabattaro" component={DetailNz} />

      <Route path="/Agustin-Diego-Jaime" component={NavBar} />
      <Route path="/Agustin-Diego-Jaime" component={DetailAj} />

      <Route path="/Jeremias-Santochi" component={NavBar} />
      <Route path="/Jeremias-Santochi" component={DetailJs} />

      <Route path="/Carlos-Ramirez" component={NavBar} />
      <Route path="/Carlos-Ramirez" component={DetailCr} />

      <Route path="/Facundo-Marilao" component={NavBar} />
      <Route path="/Facundo-Marilao" component={DetailFm} />
      <Route path="/login/reset" component={ResetPassword} />
      <Route path="/login/forgot" component={Forgot} />
      <Route path="/wishlist" component={NavBar} />
      <Route path="/wishlist" component={WishList} />
      <Route path="/" component={Footer} />
    </>
  );
};

export default Routes;
