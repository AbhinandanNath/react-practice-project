import { uiActions } from "./store/shoppingCartStore";
import { useDispatch,useSelector } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();
    const totalItems = useSelector((state) => state.cartState.totalItems);
  return (
    <div id="cart-header">
      <p>Shopping Cart</p>
      <button onClick={() => dispatch(uiActions.toggleCart())}>
        <span>Cart </span>
        <span id='cartBadge'>( {totalItems} )</span>
      </button>
    </div>
  );
}
