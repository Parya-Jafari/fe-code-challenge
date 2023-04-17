export const CHECKOUT_UPDATE_EMAIL = 'CHECKOUT_UPDATE_EMAIL';

export const updateEmail = checkout => {
    return {
        type: CHECKOUT_UPDATE_EMAIL,
        payload: checkout
    };
};
