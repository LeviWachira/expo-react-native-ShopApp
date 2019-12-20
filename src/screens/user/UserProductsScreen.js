import React from 'react';
import { StyleSheet, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';



const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.userProduct);
    const dispacth = useDispatch();

    const editProductHandle = (id) => {
        props.navigation.navigate('EditProduct', { productId: id });
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    title={itemData.item.title}
                    image={itemData.item.imageUrl}
                    price={itemData.item.price}
                    onSelect={() => { }}

                >
                    <Button
                        color={Colors.primary}
                        title="Edit"
                        onPress={() => {
                            editProductHandle(itemData.item.id);
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title="Delete"
                        onPress={() => {
                            dispacth(productsActions.deleteProduct(itemData.item.id))
                        }}
                    />
                </ProductItem>
            )}
        />
    )
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Yours Products',
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
        headerRight : (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Add'
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navData.navigation.navigate('EditProduct');
                    }}
                />
            </HeaderButtons>
        )

    }
}

export default UserProductsScreen;
