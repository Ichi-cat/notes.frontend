

const SET_ANIMATION = "SET_ANIMATION";




let initialState = {
    blocks: [
        {
            tasks: [
                {name: "", tempName: ""}
            ],
            tempCategoryName: "",
            tempInput: "",
            isActive: false,
            color: "pink",
            scrollColor: "scroll_pink"
        },
        {
            tasks: [],
            tempCategoryName: "",
            tempInput: "",
            isActive: false,
            color: "yellow",
            scrollColor: "scroll_yellow"
        },
        {
            tasks: [],
            tempCategoryName: "",
            tempInput: "",
            isActive: false,
            color: "green",
            scrollColor: "scroll_green"
        },
        {
            tasks: [],
            tempCategoryName: "",
            tempInput: "",
            isActive: false,
            color: "blue",
            scrollColor: "scroll_blue"
        },
    ],
    isFetching: false
}

const matrixReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_ANIMATION:
            debugger;
            return {
                ...state,
                blocks: state.blocks.map((block, index) => {
                    if(index === action.index) block.isActive = action.isActive;
                    else block.isActive = false;
                    return block;
                })
            }
        default:
            return state;
    }
}



export const setAnimationActionCreator = (index, isActive) => ({type: SET_ANIMATION, index, isActive});


export default matrixReducer;