const initState =[{key:"",tab:""}]

export function bucketReducer(state = initState,action) {
    switch (action.type) {
        case "ADD_BUCKET":
            // console.log("action.payload",action.payload)
           initState.push({key:action.id,tab:action.name})
            console.log("initState",initState)
            console.log("Final State",state)
            return state
        default :
            return state
    }
}

