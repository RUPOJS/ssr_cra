const initialState = {
    data: [],
    cartItems: []
};

export const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_DATA':
            return {
                ...state,
                data: action.data,
            };
        case 'ADD_TO_CART':
            return {
                ...state,
                cartItems: [...state.cartItems, ...action.data],
            };     
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: action.data,
            };                   
        default:
            return state;
    }
}

export const setData = (data) => ({
    type: 'SET_DATA',
    data: data
});

export const addToCart = (data) => ({
    type: 'ADD_TO_CART',
    data: data
});

export const removeFromCart = (data) => ({
    type: 'REMOVE_FROM_CART',
    data: data
});



