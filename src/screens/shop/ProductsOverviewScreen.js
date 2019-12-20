import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandle = (id, title) => {
        props.navigation.navigate('ProductsDetails', {
            productId: id,
            productTitle: title
        })
    }

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandle(itemData.item.id, itemData.item.title);
                    }}
                >
                    <Button
                        color={Colors.primary}
                        title="View Details"
                        onPress={() => {
                            selectItemHandle(itemData.item.id, itemData.item.title);
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title="To Cart"
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item))
                        }}
                    />
                </ProductItem>
            }
        />
    )
}

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Order'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Cart'
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
        )
    }
}

export default ProductsOverviewScreen;
