import StripeCheckout from 'react-stripe-checkout';

import React from 'react';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51MAEBMSCzpOnWmy71ELHx9vARJ6GXp3mTYlginR3ebR7FnaMbyi6YVAcvtZcyEcYViBCx8XdFHkqQ53DpBpjyiA500ahlpO3Km';

  const onToken = (token) => {
    // console.log(token);
    alert('Payment Successful');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CROWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
