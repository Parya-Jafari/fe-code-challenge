import React, {useCallback, useState, useRef, useEffect, useMemo} from 'react';
import SpotItem from '../spot/SpotItem';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import {updateEmail} from '../checkout/checkout-actions';
import axios from 'axios';

const Checkout = ({spot, pushTo, setCheckoutEmail}) => {
    const [reservationData, setReservationData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        tel: ''
    });

    const {firstName, lastName, email, tel} = useMemo(() => reservationData, [reservationData]);
    const emailRef = useRef();
    const telRef = useRef();
    const [checkEmailError, setCheckEmailError] = useState(false);
    const [checkTelError, setCheckTelError] = useState(false);

    useEffect(() => {
        if (!spot) {
            pushTo('/');
        }
    }, [spot, pushTo]);

    const onPurchase = useCallback(async () => {
        setCheckoutEmail(email);
        try {
            const requestData = {
                spotId: spot.id,
                email,
                phone: tel,
                lastName,
                firstName
            };

            await axios.post('/reservations', requestData);

            pushTo('/confirmation');
        } catch (error) {
            console.error('Error making the reservation:', error); // eslint-disable-line no-console

            return;
        }
    }, [email, tel, pushTo, setCheckoutEmail, firstName, lastName, spot.id]);

    const handlePurchaseAttempt = useCallback(e => {
        const checkField = (inputRef, setShouldValidate) => {
            if (!inputRef) {
                return false;
            }
            const inputField = inputRef.current;

            if (inputField.willValidate && !inputField.validity.valid) {
                inputField.className = 'input-error';
                setShouldValidate(true);

                return false;
            }
            inputField.className = 'input';
            setShouldValidate(false);

            return true;
        };
        
        e.preventDefault();
        const emailOK = checkField(emailRef, setCheckEmailError);
        const telOK = checkField(telRef, setCheckTelError);

        if (emailOK && telOK) {
            onPurchase();
        }
    }, [emailRef, telRef, onPurchase]);

    const onInputFocus = setShouldValidate => {
        setShouldValidate(false);
    };

    const onInputBlur = (event, setShouldValidate) => {
        event.target.className = 'input';
        if (event.target.value) {
            setShouldValidate(true);
        } else {
            setShouldValidate(false);
        }
    };
    
    const handleUpdateTel = event => {
        const input = event.target.value;
        const formattedInput = input.replace(/\D/g, '');
        // Format phone number (xxx) xxx-xxxx
        const phoneRegExp = /^(\d{3})(\d{3})(\d{4})$/;
        const matched = phoneRegExp.exec(formattedInput);

        if (matched) {
            const formatted = `(${matched[1]}) ${matched[2]}-${matched[3]}`;
    
            setReservationData(prev => ({...prev, tel: formatted}));
        } else {
            setReservationData(prev => ({...prev, tel: formattedInput}));
        }
    };

    return (
        <div className="Checkout">
            <h4>
                <span onClick={() => pushTo('/')}>
                    {`< Back to Search`}
                </span>
            </h4>
            <SpotItem
                showDetails={false}
                data={spot}
                isSelected={false}
            />
            <form
                className="Checkout-form"
                id="checkout-form"
            >
                <label htmlFor="first-name">
                    First Name
                </label>
                <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    value={firstName}
                    onChange={e => setReservationData(prev => ({...prev, firstName: e.target.data}))}
                />
                <label htmlFor="last-name">
                    Last Name
                </label>
                <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    value={lastName}
                    onChange={e => setReservationData(prev => ({...prev, lastName: e.target.value}))}
                />
                <fieldset
                    id="email-field"
                >
                    <label
                        htmlFor="checkout-email"
                        className={checkEmailError ? 'label-check' : 'label'}
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="checkout-email"
                        id="checkout-email"
                        required
                        placeholder=" "
                        onFocus={() => onInputFocus(setCheckEmailError)}
                        onBlur={e => onInputBlur(e, setCheckEmailError)}
                        onChange={e => setReservationData(prev => ({...prev, email: e.target.value}))}
                        ref={emailRef}
                        value={email}
                    />
                    <span className="error-email">
                        Please enter a valid email.
                    </span>
                </fieldset>
                <fieldset>
                    <label
                        htmlFor="checkout-phone"
                        className={checkTelError ? 'label-check' : 'label'}
                    >
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="checkout-phone"
                        id="checkout-phone"
                        required
                        placeholder=" "
                        onFocus={() => onInputFocus(setCheckTelError)}
                        onBlur={e => {
                            onInputBlur(e, setCheckTelError);
                        }}
                        onChange={handleUpdateTel}
                        ref={telRef}
                        value={tel}
                        maxLength={14}
                    />
                    <span className="error-tel">
                        Please enter a valid phone number.
                    </span>
                </fieldset>
                <Button
                    color="go-ahead"
                    type="submit"
                    block={false}
                    onClick={handlePurchaseAttempt}
                >
                    Purchase for ${(spot.price / 100).toFixed(2)}
                </Button>
            </form>
        </div>
    );
};

Checkout.propTypes = {
    spot: PropTypes.object.isRequired,
    pushTo: PropTypes.func.isRequired,
    setCheckoutEmail: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const {
        spot: {
            selected: spot
        }
    } = state;

    return {
        spot
    };
};

const mapDispatchToProps = {
    pushTo: push,
    setCheckoutEmail: updateEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
