import { useState } from "react";
import { useCartContext } from "../Context/CartContext";
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import "./CheckOut.css";

export const CheckOut = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmacion, setEmailConfirmacion] = useState('');
  const [error, setError] = useState('');
  const [ordenId, setOrdenId] = useState('');

  const { cart, totalPrice, removeProduct } = useCartContext();

  const manejadorFormulario = (event) => {
    event.preventDefault();

    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError('Por favor complete todos los campos requeridos');
      return;
    }

    if (email !== emailConfirmacion) {
      setError('Los email no coinciden');
      return;
    }

    const total = totalPrice();
    const orden = {
      total: total,
      fecha: new Date(),
      nombre,
      apellido,
      telefono,
      email,
    };

    Promise.all(
      cart.map(async (productoOrden) => {
        const db = getFirestore();
        const productoRef = doc(db, 'products', productoOrden.id);

        const productoDoc = await getDoc(productoRef);
        const stockActual = productoDoc.data().stock;

        await updateDoc(productoRef, {
          stock: stockActual - productoOrden.quantity,
        });
      })
    )
      .then(() => {
        const db = getFirestore();
        addDoc(collection(db, 'orders'), orden)
          .then((docRef) => {
            setOrdenId(docRef.id);
            removeProduct();
          })
          .catch((error) => {
            console.log('No se pudo crear la orden', error);
            setError('Error en la orden');
          });
      })
      .catch((error) => {
        console.log('No se puede actualizar el stock', error);
        setError('No se actualizo el stock');
      });

    setNombre('');
    setApellido('');
    setTelefono('');
    setEmail('');
    setEmailConfirmacion('');
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-heading">Complete el formulario para confirmar la compra</h2>
      <form onSubmit={manejadorFormulario}>
        <div>
          <label className="checkout-label">Nombre:</label>
          <input
            className="checkout-input"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div>
          <label className="checkout-label">Apellido:</label>
          <input
            className="checkout-input"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>

        <div>
          <label className="checkout-label">Telefono:</label>
          <input
            className="checkout-input"
            type="number"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <div>
          <label className="checkout-label">Email:</label>
          <input
            className="checkout-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="checkout-label">Confirmar email:</label>
          <input
            className="checkout-input"
            type="email"
            value={emailConfirmacion}
            onChange={(e) => setEmailConfirmacion(e.target.value)}
          />
        </div>

        {error && <p className="checkout-error">{error}</p>}
        {ordenId && <p className="checkout-success">¡Gracias por tu compra! Tu número de seguimiento es: {ordenId}</p>}

        <div>
          <button type="submit" className="checkout-button">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOut;