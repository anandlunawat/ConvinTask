let initState = [{bucketId:"",cardName:"",url:"",id:""}]

export function cardReducer(state=initState,action) {
    localStorage.setItem("InitState",initState)
    switch (action.type) {
        case "CREATE_CARD" :
            initState.push({
                bucketId:action.bucketId,
                cardName:action.cardName,
                url:action.url,
                id:action.id
            })
            state = initState
            return state;
        case "DELETE_CARD" :
            initState = initState.filter(item => item.id !== action.payload)
            state = initState
            return state
        case "EDIT_CARD" :
            const edit_card = initState.find((element) => element.id === action.id);
            initState.map((edit) => {
                console.log("line no. 24",edit.id,"also show edit_card id",edit_card.id);
                if(edit.id===edit_card.id){
                    edit.cardName=action?.name;
                    edit.url = action?.url;
                }
                return edit;
            });
            state = initState;
            return state;
        default :
            return state
    }
}