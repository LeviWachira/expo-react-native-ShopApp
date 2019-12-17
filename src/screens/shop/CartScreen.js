import React from 'react';
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

const CartScreen = props => {

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    total:<Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button title="Order Now" />
            </View>
            <View style={styles.screen}>
                <Text>CART ITEMS</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontSize: 18
    },
    amount: {
        color: Colors.primary,
    },

})

export default CartScreen;
