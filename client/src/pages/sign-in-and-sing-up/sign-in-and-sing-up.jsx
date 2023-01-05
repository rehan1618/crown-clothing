import './sign-in-and-sing-up.scss';

import React from 'react';
import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';

const SignInAndSingUpPage = () => {
  return (
    <div className='sign-in-and-sing-up'>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInAndSingUpPage;
