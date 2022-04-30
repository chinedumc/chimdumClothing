import { useState} from "react";
import {
	createAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	createUserDocFromAuth,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	// console.log(formFields)


	const SignInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocFromAuth(user);
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const {user} = await signInAuthUserWithEmailAndPassword(email, password);
			// const response = await signInAuthUserWithEmailAndPassword(email, password)
			// console.log(response)
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("Password is incorrect");
					break;

				case "auth/user-not-found":
					alert("User does not exist");
					break;
					default:
						console.log(error)
			}
			// if (error.code === 'auth/wrong password') {
			// 	alert('Password is incorrect')
			// } else if (error.code === 'auth/user-not-found') {
			// 	alert('User does not exist')
			// }
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-up-container">
			<h2>Already have an account</h2>
			<span>Sign in with your email and Password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>

				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button onClick={SignInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google} type="button">
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
