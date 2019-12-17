import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    Button
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));
    const dispatch = useDispatch();
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectProduct.imageUrl }} />
            <View style={styles.action}>
                <Button
                    onPress={() => {
                        dispatch(cartActions.addToCard(selectProduct));
                    }}
                    title="Add to Card"
                    color={Colors.primary}
                />
            </View>
            <Text style={styles.price}>${selectProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectProduct.description}</Text>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    action: {
        alignItems: 'center',
        marginVertical: 10
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 13,
        textAlign: 'center',
        marginHorizontal: 10
    }
})

export default ProductDetailScreen
