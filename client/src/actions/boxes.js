export function setBoxes(boxes) {
    return {
        type: 'SET_BOXES',
        payload: boxes
    }
}

export function setTotalWeight(weight) {
    return {
        type: 'SET_TOTAL_WEIGHT',
        payload: weight
    }
}

export function setTotalShppingCost(cost) {
    return {
        type: 'SET_TOTAL_SHIPPING_COST',
        payload: cost
    }
}