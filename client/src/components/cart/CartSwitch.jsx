import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import Checkout from './Checkout/Checkout';
import {useSelector} from 'react-redux'

export default function CartSwitch() {
    const cartState = useSelector(state => state.cartReducer.cartState)
    const [component, setComponent] = useState(<Cart />)

    useEffect(() => {
        cartState === 'cart' && setComponent(<Cart />)
        cartState === 'created' && setComponent(<Checkout />)
        cartState === 'processing' && setComponent(<Checkout />)
    }, [cartState])

    return (
        <>
            { component }
        </>
    )
}
