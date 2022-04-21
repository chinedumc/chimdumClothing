import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemToCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotalAmount: 0
});

const addCartItem = (cartItems, productToAdd) => {
	// Find if cartItems contains productToAdd
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);
	// If found, increment quantity
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}
	// Return new array with modified cartItems/new cart item
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
	//Find the cart item to remove
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	//Check if quantity = 1, if it is remove that item from the cart
if(existingCartItem.quantity === 1) {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
}

	//Return back cartitems with matching cart item with reduced quantity
		return cartItems.map((cartItem) =>
			cartItem.id === cartItemToRemove.id
				? { ...cartItem, quantity: cartItem.quantity - 1 }
				: cartItem
		);
	
}

const clearCartItem = (cartItems, cartItemToClear) => {
return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}


export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0)
	const [cartTotalAmount, setCartTotalAmount] = useState(0)

useEffect(() => {
	const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
	setCartCount(newCartCount)
}, [cartItems])

useEffect(() => {
	const newCartTotalAmount = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
	setCartTotalAmount(newCartTotalAmount)
}, [cartItems])

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};
	const removeItemFromCart = (cartItemToRemove) => {
		setCartItems(removeCartItem(cartItems, cartItemToRemove));
	};
	const clearItemFromCart = (cartItemToClear) => {
		setCartItems(clearCartItem(cartItems, cartItemToClear));
	};

	const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotalAmount };
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
