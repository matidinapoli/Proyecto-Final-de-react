import React from 'react';
import { useCartContext } from '../Context/CartContext';
import "./ItemCart.css";

const ItemCart = ({ product }) => {
    const { removeProduct } = useCartContext();
    return (
        <div className='itemCart'>
            <img className='cart-img' src={product.img} alt={product.title} />
            <div className='cart-details'>
                <p className='cart-title'>Título: {product.title}</p>
                <p className='cart-quantity'>Cantidad: {product.quantity}</p>
                <p className='cart-price'>Precio u.: $ {product.price}</p>
                <p className='cart-subtotal'>Subtotal: ${product.quantity * product.price}</p>
                <button className='cart-remove-btn' onClick={() => removeProduct(product.id)}>Eliminar</button>
            </div>
        </div>
    );
};

export default ItemCart;