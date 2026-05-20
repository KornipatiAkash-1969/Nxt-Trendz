import {useState} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => {
  // States
  const [showPopup, setShowPopup] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState('')

  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  // Open Popup
  const openPopup = () => {
    setShowPopup(true)
  }

  // Close Popup
  const closePopup = () => {
    setShowPopup(false)

    setPaymentMethod('')

    setIsOrderPlaced(false)
  }

  // Select Payment Method
  const selectPaymentMethod = event => {
    setPaymentMethod(event.target.value)
  }

  // Confirm Order
  const confirmOrder = () => {
    setIsOrderPlaced(true)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        // Cart Count
        const cartCount = cartList.length

        // Total Price
        const totalPrice = cartList.reduce(
          (total, eachProduct) =>
            total + eachProduct.price * eachProduct.quantity,
          0,
        )

        return (
          <>
            {/* Cart Summary */}
            <div className="cart-summary-container">
              <h1 className="total-price">
                Order Total:
                <span className="total">{` Rs ${totalPrice}`}</span>
              </h1>

              <p className="product-count">{`${cartCount} items in cart`}</p>

              <button
                type="button"
                className="checkout-button"
                onClick={openPopup}
              >
                Checkout
              </button>
            </div>

            {/* Payment Popup */}
            {showPopup && (
              <div className="popup-overlay">
                <div className="popup-container">
                  {!isOrderPlaced ? (
                    <>
                      <h1 className="popup-heading">Select Payment Method</h1>

                      {/* Payment Options */}
                      <div className="payment-options">
                        <label className="payment-option">
                          <input type="radio" disabled />
                          Card
                        </label>

                        <label className="payment-option">
                          <input type="radio" disabled />
                          Net Banking
                        </label>

                        <label className="payment-option">
                          <input type="radio" disabled />
                          UPI
                        </label>

                        <label className="payment-option">
                          <input type="radio" disabled />
                          Wallet
                        </label>

                        <label className="payment-option">
                          <input
                            type="radio"
                            name="payment"
                            value="Cash on Delivery"
                            onChange={selectPaymentMethod}
                          />
                          Cash on Delivery
                        </label>
                      </div>

                      {/* Summary */}
                      <div className="summary-details">
                        <p>{`Items: ${cartCount}`}</p>

                        <p>{`Total: Rs ${totalPrice}`}</p>
                      </div>

                      {/* Confirm Button */}
                      <button
                        type="button"
                        className="confirm-button"
                        disabled={paymentMethod !== 'Cash on Delivery'}
                        onClick={confirmOrder}
                      >
                        Confirm Order
                      </button>

                      {/* Close Button */}
                      <button
                        type="button"
                        className="close-button"
                        onClick={closePopup}
                      >
                        Close
                      </button>
                    </>
                  ) : (
                    // Success Message
                    <div className="success-view">
                      <p className="success-message">
                        Your order has been placed successfully
                      </p>

                      <button
                        type="button"
                        className="close-button"
                        onClick={closePopup}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
