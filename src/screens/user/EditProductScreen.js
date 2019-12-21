import React, { useCallback, useEffect, useReducer } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Platform,
    Alert
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import * as productsActions from '../../store/actions/products';


// main handler formReducer 
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };

        const updateValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };

        let updateFormIsValid = true;
        for (const key in updateValidities) {
            updateFormIsValid = updateFormIsValid && updateValidities[key];
        }
        return {
            formIsValid: updateFormIsValid,
            inputValidities: updateValidities,
            inputValues: updatedValues,
        };
    };
    return state;
};

// Main Functional Component of EditProductScreen 
const EditProductScreen = props => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProduct.find(prod => prod.id === prodId)
    );
    const dispatch = useDispatch();

    // initial State of formReducer
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    });

    // This Fn useCallback handler submit
    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                { text: 'Okay' }
            ]);
            return;
        }
        if (editedProduct) {
            dispatch(productsActions.updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl
            ));
        } else {
            dispatch(productsActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price
            ));
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler]);

    // This Fn handler Textinput and Action creator
    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false;

        if (text.trim().length > 0) {
            isValid = true;
        }

        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            input: inputIdentifier
        });
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.title}
                        onChangeText={textChangeHandler.bind(this, 'title')}
                        autoCapitalize="sentences"
                        keyboardType='default'
                        autoCorrect
                        returnKeyType='next'
                        onEndEditing={() => console.log('onEndEditing')}
                        onSubmitEditing={() => console.log('onSubmitEditing')}
                    />
                    {!formState.inputValidities.title && <Text style={styles.alertText}>Please enter a valid title!</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.imageUrl}
                        onChangeText={textChangeHandler.bind(this, 'imageUrl')}
                    />
                </View>
                {/* will render when your on Add Mode access Not render for Edit Mode*/}
                {editedProduct ? null : (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={formState.inputValues.price}
                            onChangeText={textChangeHandler.bind(this, 'price')}
                            keyboardType='decimal-pad'
                        />
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.description}
                        onChangeText={textChangeHandler.bind(this, 'description')}
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
        marginVertical: 8,
        fontSize : 16
        
    },
    input: {
        marginVertical: 2,
        marginHorizontal: 5,
        borderColor: '#ccc',
        borderBottomWidth: 1
    },
    alertText: {
        color: 'red'
    }
})

export default EditProductScreen;
