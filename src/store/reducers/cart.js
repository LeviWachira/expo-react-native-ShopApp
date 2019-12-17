import { ADD_TO_CARD } from "../actions/cart";
import CartItem from "../../models/cart-item";

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CARD:
            const addProduct = action.product;
            const prodPrice = addProduct.price;
            const prodTitle = addProduct.title;

            let updateOrNewCartItem;

            if (state.items[addProduct.id]) {
                updateOrNewCartItem = new CartItem(
                    state.items[addProduct.id].quanity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addProduct.id].sum + prodPrice
                );
            } else {
                updateOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
            }
            return {
                ...state,
                items: { ...state.items, [addProduct.id]: updateOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            };
    }
    return state;
}