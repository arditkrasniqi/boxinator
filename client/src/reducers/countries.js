const countriesReducer = (state = {
    countries: []
}, action) => {
    switch (action.type) {
        case "SET_COUNTRIES":
            state = {
                ...state,
                countries: [...state.countries, ...action.payload]
            };
            break;
    }
    return state;
};

export default countriesReducer;