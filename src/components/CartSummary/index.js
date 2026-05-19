import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartCount = cartList.length
      const totalPrice = cartList.reduce(
        (total, eachProduct) =>
          total + eachProduct.price * eachProduct.quantity,
        0,
      )
      return (
        <div className="cart-summary-container">
          <h1 className="total-price">
            Order Total: <span className="total">{`Rs ${totalPrice}`}</span>
          </h1>
          <p className="product-count">{`${cartCount} items in cart`}</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
