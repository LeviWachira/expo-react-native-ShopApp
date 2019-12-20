import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT } from '../actions/products';
import Product from '../../models/product'

const initialState = {
    availableProducts: PRODUCTS,
    userProduct: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
    switch (action.type) {

        case CREATE_PRODUCT:
            const newProduct = new Product(
                new Date().toString(),
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProduct: state.userProduct.concat(newProduct)
            };

        case UPDATE_PRODUCT: 
            const productIndex = state.userProduct.findIndex(
                prod => prod.id === action.pid
            );
            const updateProduct = new Product(
                action.pid,
                state.userProduct[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProduct[productIndex].price,
            );
            const updateUserProducts = [...state.userProduct];
            updateUserProducts[productIndex] = updateProduct;

            const availableProductIndex = state.availableProducts.findIndex(
                prod => prod.id === action.pid
            );
            const updateAvailableProducts = [...state.availableProducts];
            updateAvailableProducts[availableProductIndex] = updateProduct;

            return {
                ...state,
                availableProducts: updateAvailableProducts,
                userProduct: updateUserProducts
            }


        case DELETE_PRODUCT:
            return {
                ...state,
                userProduct: state.userProduct.filter(
                    product => product.id !== action.pid
                ),
                availableProducts: state.availableProducts.filter(
                    product => product.id !== action.pid
                )
            };
    }
    return state;
};

