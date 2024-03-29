import { Address, Coupon } from '@/framework/types';
import { CHECKOUT } from '@/lib/constants';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
interface DeliveryTime {
  id: string;
  title: string;
  description: string;
}
interface VerifiedResponse {
  total_tax: number;
  shipping_charge: number;
  unavailable_products: any[];
  wallet_amount: number;
  wallet_currency: number;
}
interface CheckoutState {
  //billing_address: Address | null;
  delivery_type: any | null;
  shipping_address: Address | null;
  payment_method: any | null;
  delivery_time: DeliveryTime | null;
  pickup_time: DeliveryTime | null;
  customer: any;
  note: string | null;
  //verified_response: VerifiedResponse | null;
  //coupon: Coupon | null;
  //payable_amount: number;
  //use_wallet: boolean;
  [key: string]: unknown;
}
export const defaultCheckout: CheckoutState = {
  //billing_address: null,
  delivery_type: null,
  shipping_address: null,
  note: '',
  delivery_time: null,
  pickup_time: null,
  payment_method: null,
  customer: null,
  //verified_response: null,
  //coupon: null,
  //payable_amount: 0,
  //use_wallet: false,
};

// Original atom.
export const checkoutAtom = atomWithStorage('', defaultCheckout);
export const clearCheckoutAtom = atom(null, (_get, set, _data) => {
  return set(checkoutAtom, defaultCheckout);
});
/* export const billingAddressAtom = atom(
  (get) => get(checkoutAtom).billing_address,
  (get, set, data: Address) => {
    const prev = get(checkoutAtom);
    return set(checkoutAtom, { ...prev, billing_address: data });
  }
); */
export const deliveryTypeAtom = atom(
  (get) => get(checkoutAtom).delivery_type,
  (get, set, data: any) => {
    const prev = get(checkoutAtom);
    return set(checkoutAtom, { ...prev, delivery_type: data, pickup_time: null, delivery_time: null });
  }
);
export const checkoutNoteAtom = atom(
  (get) => get(checkoutAtom).note,
  (get, set, data: string) => {
    const prev = get(checkoutAtom);
    return set(checkoutAtom, { ...prev, note: data });
  }
);
export const pickupTimeAtom = atom(
  (get) => get(checkoutAtom).pickup_time,
  (get, set, data: any) => {
    const prev = get(checkoutAtom);
    return set(checkoutAtom, { ...prev, pickup_time: data });
  }
);
export const shippingAddressAtom = atom(
  (get) => get(checkoutAtom).shipping_address,
  (get, set, data: Address) => {
    const prev = get(checkoutAtom);
    return set(checkoutAtom, { ...prev, shipping_address: data });
  }
);
export const deliveryTimeAtom = atom(
  (get) => get(checkoutAtom).delivery_time,
  (get, set, data: DeliveryTime) => {
    const prev = get(checkoutAtom);
    return set(checkoutAtom, { ...prev, delivery_time: data });
  }
);
export const paymentMethodAtom = atom(
  (get) => get(checkoutAtom).payment_method,
  (get, set, data: any) => {
    const prev = get(checkoutAtom);
    return set(checkoutAtom, { ...prev, payment_method: data });
  }
);
export const verifiedTokenAtom = atom(
  (get) => get(checkoutAtom).token,
  (get, set, data: string) => {
    const prev = get(checkoutAtom);
    return set(checkoutAtom, { ...prev, token: data });
  }
);
export const customerAtom = atom(
  (get) => get(checkoutAtom).customer,
  (get, set, data: any) => {
    const prev = get(checkoutAtom);
    return set(checkoutAtom, { ...prev, customer: data });
  }
);
export const verifiedResponseAtom = atom(
  (get) => get(checkoutAtom).verified_response,
  (get, set, data: VerifiedResponse | null) => {
    const prev = get(checkoutAtom);
    return set(checkoutAtom, { ...prev, verified_response: data });
  }
);
export const couponAtom = atom(
  (get) => get(checkoutAtom).coupon,
  (get, set, data: Coupon | null) => {
    const prev = get(checkoutAtom);
    return set(checkoutAtom, { ...prev, coupon: data });
  }
);
//export const discountAtom = atom((get) => get(checkoutAtom).coupon?.amount);

export const walletAtom = atom(
  (get) => get(checkoutAtom).use_wallet,
  (get, set) => {
    const prev = get(checkoutAtom);
    return set(checkoutAtom, { ...prev, use_wallet: !prev.use_wallet });
  }
);
export const payableAmountAtom = atom(
  (get) => get(checkoutAtom).payable_amount,
  (get, set, data: number) => {
    const prev = get(checkoutAtom);
    return set(checkoutAtom, { ...prev, payable_amount: data });
  }
);
