import "./sign-in.scss";
import { connect } from "react-redux";
import React from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import {
	googleSignInStart,
	emailSignInStart,
} from "../../redux/user/user-actions";
import { useState } from "react";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
	const [userCredentials, setUserCredentials] = useState({
		email: "",
		password: "",
	});

	const { email, password } = userCredentials;

	const handleSubmit = async e => {
		e.preventDefault();
		emailSignInStart(email, password);
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<div className="sign-in">
			<h2 className="title">I already have an account</h2>
			<span>Sign in with email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					name="email"
					type="email"
					value={email}
					handleChange={handleChange}
					label="Email"
					required
				/>
				<FormInput
					name="password"
					type="password"
					value={password}
					handleChange={handleChange}
					label="Password"
					required
				/>
				<div className="buttons">
					<CustomButton type="submit">Sign In</CustomButton>
					<CustomButton
						type="button"
						onClick={googleSignInStart}
						isGoogleSignIn
					>
						Sign In with Google
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) =>
		dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
