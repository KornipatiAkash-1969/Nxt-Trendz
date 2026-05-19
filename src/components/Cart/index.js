import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const showEmptyView = cartList.length === 0

      const rederRemoveAllButton = () => {
        const onClickRemoveAll = () => {
          const {removeAllCartItems} = value
          removeAllCartItems()
        }

        return (
          !showEmptyView && (
            <button
              type="button"
              onClick={onClickRemoveAll}
              className="remove-all-button"
              data-testid="remove"
            >
              Remove all
            </button>
          )
        )
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                {rederRemoveAllButton()}
                <CartListView />
                <CartSummary />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
