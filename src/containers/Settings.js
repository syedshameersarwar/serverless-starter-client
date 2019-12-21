import React, { useState } from "react";
import { API } from "aws-amplify";
import { Elements, StripeProvider } from "react-stripe-elements";
import BillingForm from "../components/BillingForm";
import config from "../config";
import "./Settings.css";

const Settings = props => {
  const [isLoading, setIsLoading] = useState(false);

  const billUser = details =>
    API.post("notes", "/billing", {
      body: details
    });

  const handleFormSubmit = async (storage, { token, error }) => {
    if (error) {
      alert(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({ storage, source: token.id });
      alert("Your card has been charged successfully!");
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  };

  return (
    <div className='Settings'>
      <StripeProvider apiKey={config.STRIPE_KEY}>
        <Elements>
          <BillingForm
            isLoading={isLoading}
            onSubmit={handleFormSubmit}
            setIsLoading={setIsLoading}
          />
        </Elements>
      </StripeProvider>
    </div>
  );
};

export default Settings;
