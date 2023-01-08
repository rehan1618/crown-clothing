import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey =
		"pk_test_51MAEBMSCzpOnWmy71ELHx9vARJ6GXp3mTYlginR3ebR7FnaMbyi6YVAcvtZcyEcYViBCx8XdFHkqQ53DpBpjyiA500ahlpO3Km";

	const onToken = token => {
		axios({
			url: "http://localhost:5000/payment",
			method: "post",
			data: {
				amount: priceForStripe,
				token,
			},
		})
			.then(response => {
				console.log(response);
				alert("Payment Successful");
			})
			.catch(error => {
				console.log("Payment Error", error);
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

export default StripeCheckoutButton;
