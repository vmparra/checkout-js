import classNames from 'classnames';
import React from 'react';

import { TranslatedString } from '../../locale';

const StripeV3CardValidation: React.FunctionComponent = () => (
        <div className="form-ccFields">
            <div className={ classNames(
                'form-field',
                'form-field--ccNumber'
                ) }
            >
                <label htmlFor="CardNumber">
                    <TranslatedString id="payment.credit_card_number_label" />
                </label>
                <div className="form-input optimizedCheckout-form-input" data-cse="CardNumber" id="stripe-number-element" />
            </div>
            <div className="form-field form-field--ccExpiry">
                <label htmlFor="ExpiryDate">
                    <TranslatedString id="payment.credit_card_expiration_label" />
                </label>
                <div
                    className={ classNames(
                        'form-input',
                        'optimizedCheckout-form-input'
                    ) }
                    data-cse="eExpiryDate"
                    id="stripe-expiry-element"
                />
            </div>
            <div className="form-field form-ccFields-field--ccCvv">
                <label htmlFor="SecurityCode">
                    <TranslatedString id="payment.credit_card_cvv_label" />
                </label>
                <div
                    className={ classNames(
                        'form-input',
                        'optimizedCheckout-form-input'
                    ) }
                    data-cse="SecurityCode"
                    id="stripe-cvc-element"
                />
            </div>
            <div className="form-field form-field--postalCode">
                <label htmlFor="encryptedPostalCode">
                    <TranslatedString id="payment.postal_code_label" />
                </label>
                    <input
                        className={ classNames(
                            'form-input',
                            'optimizedCheckout-form-input'
                        ) }
                        data-cse="encryptedPostalCode"
                        id="encryptedPostalCode"
                    />
            </div>
        </div>
);

export default StripeV3CardValidation;
