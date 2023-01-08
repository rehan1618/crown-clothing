const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));

	app.get("*", function (req, res) {
		res.sendFile(path.join(__dirname, "client/build", "index.html"));
	});
}

app.post("/payment", async (req, res) => {
	// const data = {
	// 	// source: req.body.token.id,
	// 	amount: req.body.amount,
	// 	currency: "usd",
	// };

	const paymentIntent = await stripe.paymentIntents.create({
		amount: req.body.amount,
		currency: "inr",
		automatic_payment_methods: {
			enabled: true,
		},
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
	});

	// const charge = await stripe.paymentIntents.create(data);
	// try {
	// 	console.log(charge);
	// 	res.send({ charge });
	// } catch (error) {
	// 	res.send({
	// 		error: `what the fuck ${error}`,
	// 		charge: charge ? charge : "fuckkkk",
	// 	});
	// }

	// stripe.charges.create(data).then((response, stripeRes) => {
	// 	if (stripeErr) {
	// 		res.status(500).send({ error: stripeErr });
	// 	} else {
	// 		res.status(200).send({ success: stripeRes });
	// 	}
	// });
});

const endpointSecret =
	"whsec_dd93bbe9b09a573bf0ed757866ddf5b04892c7bc1278c933d0ac6971577afc99";

app.post(
	"/webhook",
	express.raw({ type: "application/json" }),
	(request, response) => {
		const sig = request.headers["stripe-signature"];

		let event;

		try {
			event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
		} catch (err) {
			response.status(400).send(`Webhook Error: ${err.message}`);
			return;
		}

		// Handle the event
		switch (event.type) {
			case "payment_intent.succeeded":
				const paymentIntent = event.data.object;
				// Then define and call a function to handle the event payment_intent.succeeded
				console.log(`payment Succeed`);
				break;
			// ... handle other event types
			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		// Return a 200 response to acknowledge receipt of the event
		response.send();
	}
);

app.listen(port, error => {
	if (error) throw error;
	console.log("Server running at port" + port);
});
