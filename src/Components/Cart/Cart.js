import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../Context/CartContext';
import ItemCart from '../ItemCart/ItemCart';
import './Cart.css'; 

const Cart = () => {
  const { cart, totalPrice } = useCartContext();

  if (cart.length === 0) {
    return (
      <div className="cart-empty-container">
        <div className="cart-empty">
          <p>No hay elementos en el carrito</p>
          <Link to="/">Hacer compras</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {cart.map((product) => (
        <ItemCart key={product.id} product={product} />
      ))}
      <p className="cart-total">Total: $ {totalPrice()}</p>
  
      <Link to="/checkout" className="checkout-link">
        <button className="btn-total">Finalizar Compra</button>
      </Link>
    </div>
  );  
};

export default Cart;