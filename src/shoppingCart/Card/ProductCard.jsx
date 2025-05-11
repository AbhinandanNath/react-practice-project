import { useId } from 'react';
import { cartActions } from '../store/shoppingCartStore';
import { useDispatch } from 'react-redux';

export default function ProductCard({product}) {
  const dispatch = useDispatch();

  function addItemToCart(product) {
    dispatch(cartActions.addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    }));
  }
  return (
    <article className="product-card" key={product.id + useId}>
      <img src={product.image} alt="Majestic Vintage Mocha Overcoat" />
      <div className="product-details">
        <p className="product-details-header">{product.title}</p>
        <p className="product-details-price">${product.price}</p>
        <p className="product-details-description">{product.description}</p>
      </div>
      <button className="product-details-button" onClick={() => addItemToCart(product)}>Add to Cart</button>
    </article>
  );
}
