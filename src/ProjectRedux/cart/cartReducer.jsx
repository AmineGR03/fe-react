export const addToCart = (item) => {
    return {
        type: 'ADD_TO_CART',
        payload: item,
    };
};

export const removeFromCart = (itemId) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: itemId,
    };
};

export const updateQuantity = ({ itemId, quantity }) => {
    return {
        type: 'UPDATE_QUANTITY',
        payload: { itemId, quantity },
    };
};

const initialState = {
    items: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex].quantity += 1; 
                return {
                    ...state,
                    items: updatedItems,
                };
            } else {
                
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }], 
                };
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        case 'UPDATE_QUANTITY':
            const { itemId, quantity } = action.payload;
            const updatedItems = state.items.map(item =>
                item.id === itemId ? { ...item, quantity } : item
            );
            return {
                ...state,
                items: updatedItems,
            };
        default:
            return state;
    }
};

export default cartReducer;
