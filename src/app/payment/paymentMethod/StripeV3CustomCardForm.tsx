import classNames from 'classnames';
import React from 'react';

import { withLanguage, TranslatedString, WithLanguageProps } from '../../locale';

const StripeV3CustomCardForm: React.FunctionComponent<WithLanguageProps> = ({language}) => (
    <div className="form-ccFields">
        <div className={ classNames(
            'form-field',
            'form-field--ccNumber'
            ) }
        >
            <label htmlFor="stripe-number-element">
                <TranslatedString id="payment.credit_card_number_label" />
            </label>
            <div className="form-input optimizedCheckout-form-input widget-input--stripev3" data-cse="CardNumber" id="stripe-number-element" />
        </div>
        <div className="form-field form-field--ccExpiry">
            <label htmlFor="stripe-expiry-element">
                <TranslatedString id="payment.credit_card_expiration_label" />
            </label>
            <div
                className={ classNames(
                    'form-input',
                    'optimizedCheckout-form-input',
                    'widget-input--stripev3'
                ) }
                data-cse="ExpiryDate"
                id="stripe-expiry-element"
            />
        </div>
        <div className="form-field form-ccFields-field--ccCvv ">
            <label htmlFor="stripe-cvc-element">
                <TranslatedString id="payment.credit_card_cvv_label" />
            </label>
            <div
                className={ classNames(
                    'form-input',
                    'optimizedCheckout-form-input',
                    'widget-input--stripev3'
                ) }
                data-cse="SecurityCode"
                id="stripe-cvc-element"
            />
        </div>
        <div className="form-field form-field--postalCode">
            <label htmlFor="stripe-postal-code">
                <TranslatedString id="payment.postal_code_label" />
            </label>
            <input
                className={ classNames(
                    'form-input',
                    'optimizedCheckout-form-input'
                ) }
                data-cse="stripe-postal-code"
                id="stripe-postal-code"
                placeholder={ language.translate('payment.postal_code_label') }
            />
        </div>
    </div>
);

export default withLanguage(StripeV3CustomCardForm);
