import { PaymentInitializeOptions, StripeElementOptions } from '@bigcommerce/checkout-sdk';
import React, { useCallback, FunctionComponent } from 'react';
import { Omit } from 'utility-types';

import { withCheckout, CheckoutContextProps } from '../../checkout';
import {  withLanguage, TranslatedString, WithLanguageProps } from '../../locale';

import HostedWidgetPaymentMethod, { HostedWidgetPaymentMethodProps } from './HostedWidgetPaymentMethod';
import StripeV3CustomCardForm from './StripeV3CustomCardForm';

export type StripePaymentMethodProps = Omit<HostedWidgetPaymentMethodProps, 'containerId'>;

export interface StripeOptions {
    alipay?: StripeElementOptions;
    card: StripeElementOptions;
    cardCvc: StripeElementOptions;
    cardExpiry: StripeElementOptions;
    cardNumber: StripeElementOptions;
    iban: StripeElementOptions;
    idealBank: StripeElementOptions;
}
interface WithCheckoutStripePaymentMethodProps {
    storeUrl: string;
}
export enum StripeElementType {
    alipay = 'alipay',
    card = 'card',
    cardCvc = 'cardCvc',
    cardExpiry = 'cardExpiry',
    cardNumber = 'cardNumber',
    iban = 'iban',
    idealBank = 'idealBank',
}
const StripePaymentMethod: FunctionComponent<StripePaymentMethodProps & WithCheckoutStripePaymentMethodProps & WithLanguageProps> = ({
      initializePayment,
      language,
      method,
      storeUrl,
      ...rest
  }) => {
    const shouldRenderCustom = true;
    const paymentMethodType = method.id as StripeElementType;
    const additionalStripeV3Classes = paymentMethodType !== StripeElementType.alipay ? 'optimizedCheckout-form-input widget--stripev3' : '';
    const containerId = `stripe-${paymentMethodType}-component-field`;
    const validateInitializeOptions = useCallback((shouldRenderCustomComponents: boolean, stripeOptions: StripeOptions) => {
        if (shouldRenderCustomComponents && method.id === 'card') {
            return {
                cardCvcElementOptions: { containerId: 'stripe-cvc-element', options: stripeOptions[StripeElementType.cardCvc] },
                cardExpiryElementOptions: { containerId: 'stripe-expiry-element', options: stripeOptions[StripeElementType.cardExpiry] },
                cardNumberElementOptions: { containerId: 'stripe-number-element', options: stripeOptions[StripeElementType.cardNumber] },
            };
        }

        return stripeOptions[paymentMethodType];
    }, [paymentMethodType, method.id]);

    const initializeStripePayment = useCallback(async (options: PaymentInitializeOptions) => {
        const classes = {
            base: 'form-input optimizedCheckout-form-input',
        };
        const stripeOptions: StripeOptions = {
            [StripeElementType.card]: {
                classes,
            },
            [StripeElementType.cardCvc]: {
                classes,
                placeholder: language.translate('payment.credit_card_cvv_label'),
            },
            [StripeElementType.cardExpiry]: {
                classes,
            },
            [StripeElementType.cardNumber]: {
                classes,
                placeholder: language.translate('payment.credit_card_text'),
            },
            [StripeElementType.iban]: {
                ...{ classes },
                supportedCountries: ['SEPA'],
            },
            [StripeElementType.idealBank]: {
                classes,
            },
        };

        return initializePayment({
            ...options,
            stripev3: { containerId,
                options: validateInitializeOptions(shouldRenderCustom, stripeOptions) },
        });
    }, [initializePayment, containerId, validateInitializeOptions, shouldRenderCustom, language]);

    const CustomCardRender = () => {
        return <StripeV3CustomCardForm />;
    };

    return <>
        <HostedWidgetPaymentMethod
            { ...rest }
            additionalContainerClassName= { additionalStripeV3Classes }
            containerId={ containerId }
            hideContentWhenSignedOut
            initializePayment={ initializeStripePayment }
            method={ method }
            shouldRenderCustomInstrument={ shouldRenderCustom }
            validateCustomRender={ CustomCardRender }
        />
        {
            method.id === 'iban' &&
                <p className="stripe-sepa-mandate-disclaimer">
                    <TranslatedString data={ {storeUrl} } id="payment.stripe_sepa_mandate_disclaimer" />
                </p>
        }
    </>;
};

function mapFromCheckoutProps(
    { checkoutState }: CheckoutContextProps) {
    const { data: { getConfig } } = checkoutState;
    const config = getConfig();

    if (!config) {
        return null;
    }

    return {
        storeUrl: config.links.siteLink,
    };
}
export default withLanguage(withCheckout(mapFromCheckoutProps)(StripePaymentMethod));
