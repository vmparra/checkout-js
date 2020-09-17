import { PaymentInitializeOptions, StripeElementOptions } from '@bigcommerce/checkout-sdk';
import React, { useCallback, FunctionComponent } from 'react';
import { Omit } from 'utility-types';

import { withCheckout, CheckoutContextProps } from '../../checkout';
import { TranslatedString } from '../../locale';

import HostedWidgetPaymentMethod, { HostedWidgetPaymentMethodProps } from './HostedWidgetPaymentMethod';
import StripeV3CardValidation from './StripeV3CardValidation';

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
const StripePaymentMethod: FunctionComponent<StripePaymentMethodProps & WithCheckoutStripePaymentMethodProps> = ({
      initializePayment,
      method,
      storeUrl,
      ...rest
  }) => {
    const paymentMethodType = method.id as StripeElementType;
    const additionalStripeV3Classes = paymentMethodType !== StripeElementType.alipay ? 'optimizedCheckout-form-input widget--stripev3' : '';
    const containerId = `stripe-${paymentMethodType}-component-field`;
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
                placeholder: 'CVV',
            },
            [StripeElementType.cardExpiry]: {
                classes,
            },
            [StripeElementType.cardNumber]: {
                classes,
                placeholder: 'Enter Card Number',
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
            stripev3: {
                containerId,
                options: { cardCvcElementOptions: { containerId: 'stripe-cvc-element', options: stripeOptions[StripeElementType.cardCvc] },
                    cardExpiryElementOptions: { containerId: 'stripe-expiry-element', options: stripeOptions[StripeElementType.cardExpiry] },
                    cardNumberElementOptions: { containerId: 'stripe-number-element', options: stripeOptions[StripeElementType.cardNumber] },
            },
        });
    }, [initializePayment, containerId, paymentMethodType]);

    const cardCustomRender = () => {
        return <StripeV3CardValidation />;
    };

    return <>
        <HostedWidgetPaymentMethod
            { ...rest }
            additionalContainerClassName= { additionalStripeV3Classes }
            containerId={ containerId }
            hideContentWhenSignedOut
            initializePayment={ initializeStripePayment }
            method={ method }
            shouldRenderCustomInstrument={ false }
            validateCustomRender={ cardCustomRender }
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
export default withCheckout(mapFromCheckoutProps)(StripePaymentMethod);
