import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItems from '../../components/shop/ProductItem';

const ProductsOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts);

    return (
        <FlatList
            data={products}
            keyExtractor={(item, index) => item.id}
            renderItem={itemData =>
                <ProductItems
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={() => { }}
                    onAddCart={() => { }}
                />
            }
        />
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
}

export default ProductsOverviewScreen;
