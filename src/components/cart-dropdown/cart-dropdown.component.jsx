import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";
// import { CartContext } from "../../contexts/cart.context";
import { CartContext } from "../../reducers/cart.reducer";
import {CartDropdownContainer, EmptyMessage, CartItems} from "./cart-dropdown.styles";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);
	const navigate = useNavigate();

	const navigateToCheckoutHandler = () => {
		navigate("/checkout");
	};
	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
				) : (
					<EmptyMessage>Your cart is empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={navigateToCheckoutHandler}>GO TO CHECKOUT</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
