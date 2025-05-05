import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import {store} from './Redux/store/store' 
// import { UserProvider } from "./contexts/user.context";
// import { CategoriesProvider } from "./contexts/categories.context";
import "./index.scss";
// import { CartProvider } from "./contexts/cart.context";
import { CartProvider } from "./reducers/cart.reducer";

ReactDOM.render(
	<React.StrictMode>
		<Provider store = {store} >
		<BrowserRouter>
			{/* <UserProvider> */}
				{/* <CategoriesProvider> */}
					<CartProvider>
						<App />
					</CartProvider>
				{/* </CategoriesProvider> */}
			{/* </UserProvider> */}
		</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
