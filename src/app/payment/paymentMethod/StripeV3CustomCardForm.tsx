import classNames from 'classnames';
import React from 'react';

import { withLanguage, TranslatedString, WithLanguageProps } from '../../locale';
import { IconHelp, IconLock } from '../../ui/icon';
import { TooltipTrigger } from '../../ui/tooltip';

import CreditCardCodeTooltip from '../../payment/creditCard/CreditCardCodeTooltip';

const StripeV3CustomCardForm: React.FunctionComponent<WithLanguageProps> = ({language}) => (
    <div className="form-ccFields">
        <div className={ classNames(
            'form-field',
            'form-field--stripe-ccNumber',
            ) }
        >
            <label className="form-label optimizedCheckout-form-label" htmlFor="stripe-number-element">
                <TranslatedString id="payment.credit_card_number_label" />
            </label>
            <>
                <div className="widget-input--stripev3 has-icon optimizedCheckout-form-input " data-cse="CardNumber" id="stripe-number-element" />
                <IconLock />
            </>
        </div>
        <div className="form-field form-field--ccExpiry">
            <label className="form-label optimizedCheckout-form-label" htmlFor="stripe-expiry-element">
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
        <div className="form-field form-ccFields-field--ccCvv">
            <label className="form-label optimizedCheckout-form-label" htmlFor="stripe-cvc-element">
                <TranslatedString id="payment.credit_card_cvv_label" />
                <TooltipTrigger
                placement="top-start"
                tooltip={ <CreditCardCodeTooltip /> }
            >
                <span className="has-tip">
                    <IconHelp />
                </span>
            </TooltipTrigger>
            </label>
            <>
            <div
                className={ classNames(
                    'form-input',
                    'optimizedCheckout-form-input',
                    'has-icon',
                    'widget-input--stripev3',
                ) }
                data-cse="SecurityCode"
                id="stripe-cvc-element"
            />
            <IconLock />
            </>
        </div>
        <div className="form-field form-field--stripe-postalCode">
            <label className="form-label optimizedCheckout-form-label" htmlFor="stripe-postal-code">
                <TranslatedString id="payment.postal_code_label" />
            </label>
            <input
                className={ classNames(
                    'form-input',
                    'optimizedCheckout-form-input',
                    'widget-input--stripev3',
                    'has-icon'
                ) }
                data-cse="stripe-postal-code"
                id="stripe-postal-code"
                placeholder={ language.translate('payment.postal_code_label') }
            />
        </div>
    </div>
);

export default withLanguage(StripeV3CustomCardForm);
