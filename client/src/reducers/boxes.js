const boxesReducer = (state = {
    boxes: [],
    totalWeight: null,
    totalShippingCost: null
}, action) => {
    switch (action.type) {
        case "SET_BOXES":
            state = {
                ...state,
                boxes: [...action.payload]
            };
            break;
        case "SET_TOTAL_WEIGHT":
            state = {
                ...state,
                totalWeight: action.payload
            };
            break;
        case "SET_TOTAL_SHIPPING_COST":
            state = {
                ...state,
                totalShippingCost: action.payload
            };
            break;
    }
    return state;
};

export default boxesReducer;