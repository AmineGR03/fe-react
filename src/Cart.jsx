import React, { useState } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from './ProjectRedux/cart/cartReducer';

const Cart = () => {
  const cartItems = useSelector(state => state.items); 
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({}); 

  
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * (quantities[item.id] || 1)), 0);

  
  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  
  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities({ ...quantities, [itemId]: newQuantity });
    dispatch(updateQuantity({ itemId, quantity: newQuantity }));
  };

  return (
    <>
      <header className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link className="navbar-brand logo" to="/">Chicken Forever</Link>
        </div>
      </header>
      <div className="container mt-5 pt-4">
        <h2 className="mb-4">Cart</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={quantities[item.id] || 1}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  />
                </td>
                <td>${(item.price * (quantities[item.id] || 1)).toFixed(2)}</td>
                <td className="text-end">
                  <button className="btn delete" onClick={() => handleRemoveItem(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-start">Total:</td>
              <td className="text-end">${totalPrice.toFixed(2)}</td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="5" className="text-end">
                <button className="btn btn-primary">Order Now</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Cart;
