import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/shoppingCartStore";
import CartContent from "./CartContent";

export default function CartBox() {
  const isCartOpen = useSelector((state) => state.uiState.isCartOpen);
  const cartData = useSelector((state) => state.cartState.items);
  const totalAmount = useSelector((state) => state.cartState.totalAmount);

  let isCartEmpty = cartData.length === 0;

  const dispatch = useDispatch();

  useEffect(() => {
    const dialog = document.querySelector(".cart-box");
    if (isCartOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isCartOpen]);
  return (
    <dialog className="cart-box">
      <h2>Shopping Cart</h2>
      {isCartEmpty ? 
      <p>Your cart is empty</p> 
      : cartData.map((item) => {
        return <CartContent item={item} key={item.id} />;
      })}

      <div className="cart-total">
        {!isCartEmpty && <p>Cart Total: ${totalAmount}</p>}
        <button
          className="cart-checkout-button"
          onClick={() => dispatch(uiActions.toggleCart())}
        >
          {isCartEmpty ? "Close" : "Checkout"}
        </button>
      </div>
    </dialog>
  );
}
