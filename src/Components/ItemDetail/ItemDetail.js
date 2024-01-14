import React, { useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import { useCartContext } from '../Context/CartContext';
import './ItemDetail.css';

const ItemDetail = ({ item }) => {
  const [goToCart, setGoToCart] = useState(false);
  const { addProduct } = useCartContext();

  const onAdd = (quantity) => {
    setGoToCart(true);
    addProduct(item, quantity);
  };

  return (
    <div className="item-detail-container">
      <div className="item-detail-info">
        <img src={item.img} className="img-fluid" alt={item.title} />
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p> $ {item.price}</p>
        <p> Cantidad: {item.stock}</p>
      </div>
      <div className="item-detail-actions">
        {goToCart ? (
          <Link to="/cart" className="btn-finish-purchase">
            Terminar compra
          </Link>
        ) : (
          <ItemCount stock={10} initial={1} onAdd={onAdd} />
        )}
      </div>
    </div>
  );
};

export default ItemDetail;