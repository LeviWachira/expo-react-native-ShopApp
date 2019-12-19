import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import CartItem from './CartItem';

import Colors from '../../constants/Colors';

const OrderItem = props => {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button
                title={showDetails ? "Hide Details" : "Show Details" }
                color={Colors.primary}
                onPress={() => {
                    setShowDetails(prevState => !prevState);
                }}
            />
            {showDetails &&
                <View style={styles.detailItems}>
                    {props.items.map(cartItem => (
                        <CartItem
                            key={cartItem.productId}
                            quantity={cartItem.quantity}
                            amount={cartItem.sum}
                            title={cartItem.productTitle}
                        />
                    ))}
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,           /** Handle BorderShadow  Platform 'android' **/
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'  /** Handle Buttun Platform 'android' **/
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    date: {
        fontSize: 13,
        color: '#888'
    },
    detailItems : {
        width : '100%',
    }
})

export default OrderItem;
