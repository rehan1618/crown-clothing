import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ReactComponent as Logo } from "../../assets/4.1 crown.svg";

import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";

import { selectCartHidden } from "../../redux/cart/cart-selector";

import { selectCurrentUser } from "../../redux/user/user-selector";

import { signOutStart } from "../../redux/user/user-actions";

import {
	HeaderContainer,
	LogoContainer,
	OptionsContainer,
	OptionLink,
} from "./header-styles";

const Header = ({ currentUser, hidden, signOutStart }) => {
	return (
		<HeaderContainer>
			<LogoContainer to="/">
				<Logo className="logo" />
			</LogoContainer>
			<OptionsContainer>
				<OptionLink className="option" to="/shop">
					SHOP
				</OptionLink>
				{/* <OptionLink className="option" to="/contact">
					CONTACT
				</OptionLink> */}
				{currentUser ? (
					<OptionLink as="div" onClick={signOutStart}>
						SIGN OUT
					</OptionLink>
				) : (
					<OptionLink className="option" to="/signin">
						SIGN IN
					</OptionLink>
				)}
				<CartIcon />
			</OptionsContainer>
			{hidden ? null : <CartDropdown />}
		</HeaderContainer>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
});

const mapDispatchToProps = dispatch => ({
	signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
