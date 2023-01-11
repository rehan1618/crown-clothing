import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { connect } from "react-redux";
import { clearCart } from "../../redux/cart/cart-action";
import { withRouter } from "react-router-dom";

const StripeCheckoutButton = ({ price, clearCart, history, currentUser }) => {
	const priceForStripe = price * 100;
	const publishableKey =
		"pk_test_51MAEBMSCzpOnWmy71ELHx9vARJ6GXp3mTYlginR3ebR7FnaMbyi6YVAcvtZcyEcYViBCx8XdFHkqQ53DpBpjyiA500ahlpO3Km";

	const onToken = token => {
		axios({
			url: "payment",
			method: "post",
			data: {
				amount: priceForStripe,
				token,
			},
		})
			.then(res => {
				alert("Payment Successful");
				clearCart();
				history.push("/");
			})
			.catch(error => {
				alert("There was an issue with your payment");
			});
	};

	return (
		<StripeCheckout
			label="Pay with Card"
			name="CROWN Clothing Ltd."
			currency="INR"
			billingAddress
			shippingAddress
			image="https://svgshare.com/i/CUz.svg"
			description={`Your total is ₹${price}`}
			amount={priceForStripe}
			panelLabel="Pay"
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

const mapDispatchToProps = dispatch => ({
	clearCart: () => dispatch(clearCart()),
});

export default withRouter(
	connect(null, mapDispatchToProps)(StripeCheckoutButton)
);
