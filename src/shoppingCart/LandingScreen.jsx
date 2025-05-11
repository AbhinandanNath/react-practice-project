
import ProductScreen from "./Card/ProductScreen";
import CartBox from "./Cart/CartBox";
import Header from "./Header";
import "./shoppingCart.css";

export default function LandingScreen() {

   
    return (
        <div className="landing-screen">
            <CartBox />
            <Header />
            <ProductScreen />
        </div>
    )
}