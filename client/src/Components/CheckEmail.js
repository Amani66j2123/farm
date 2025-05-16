import React from 'react';

const CheckEmail = () => {
  return (
    <div>
      <h1>Check Your Email</h1>
      <p>
        We've sent you an email with a link to verify your account. Please check your inbox and click the link to activate your account.
      </p>
      {/* Optionally, add a link back to the login page */}
      {/* <Link to="/login">Back to Login</Link> */}
    </div>
  );
};

export default CheckEmail;