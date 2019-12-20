import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import * as productsActions from '../../store/actions/products';

const EditProductScreen = props => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProduct.find(
        prod => prod.id === prodId)
    );
    const dispatch = useDispatch();

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');


    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(productsActions.updateProduct(prodId, title, description, imageUrl));
        } else {
            dispatch(productsActions.createProduct(title, description, imageUrl, +price));
        }
    }, [dispatch, prodId, title, description, imageUrl, price]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)}
                    />
                </View>
                {/* will render when your on Add Mode access Not render for Edit Mode*/}
                {editedProduct ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={text => setPrice(text)}
                    />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {

    const submitFn = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add Product',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Add'
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitFn}
                />
            </HeaderButtons>
        )
    };
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontWeight: 'bold',
        marginVertical: 8
    },
    input: {
        marginVertical: 2,
        marginHorizontal: 5,
        borderColor: '#ccc',
        borderBottomWidth: 1
    },
})

export default EditProductScreen
