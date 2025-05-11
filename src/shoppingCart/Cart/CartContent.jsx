import { cartActions } from "../store/shoppingCartStore";
import { useDispatch } from "react-redux";

export default function CartContent({item}) {


  const dispatch = useDispatch();

  function updateProductQuantity(quantity) {
    dispatch(cartActions.updateQuantity({
      id: item.id,
      quantity: quantity,
    }));
  }
  return (
    <ul className="cart-items">
        <li>
          <div className="cart-item">
            <span>{item.title}</span>
            <span>${item.price}</span>
            <div className="cart-item-actions">
              <button onClick={() => updateProductQuantity(-1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateProductQuantity(1)}>+</button>
            </div>
          </div>
        </li>
      </ul>
  );
}