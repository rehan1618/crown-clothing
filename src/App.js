import React from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header/header';
import SignInAndSignUpPage from './pages/sign-in-and-sing-up/sign-in-and-sing-up';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, createUserProfileDocument } from './firebase/firebase-utils';
import { onSnapshot } from 'firebase/firestore';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user-actions';

import { selectCurrentUser } from './redux/user/user-selector';
import { createStructuredSelector } from 'reselect';
import Checkout from './pages/checkout/checkout';
import ShopPage from './pages/shop/shop';

class App extends React.Component {
  unsubscribe = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, (snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className='app'>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={Checkout} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
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

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
