import React from "react";
import { GlobalStyle } from "./global-styles";
import Homepage from "./pages/homepage/homepage";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/header/header";
import SignInAndSignUpPage from "./pages/sign-in-and-sing-up/sign-in-and-sing-up";

import { connect } from "react-redux";

import { selectCurrentUser } from "./redux/user/user-selector";
import { createStructuredSelector } from "reselect";
import Checkout from "./pages/checkout/checkout";
import ShopPage from "./pages/shop/shop";
import { checkUserSession } from "./redux/user/user-actions";

class App extends React.Component {
	componentDidMount() {
		const { checkUserSession } = this.props;
		checkUserSession();
	}

	render() {
		return (
			<div className="app">
				<GlobalStyle />
				<Header />
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route path="/shop" component={ShopPage} />
					<Route exact path="/checkout" component={Checkout} />
					<Route
						exact
						path="/signin"
						render={() =>
							this.props.currentUser ? (
								<Redirect to="/" />
							) : (
								<SignInAndSignUpPage />
							)
						}
					/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
	checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
