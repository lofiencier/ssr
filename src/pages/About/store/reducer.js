export const reducer = (initial={
  loading:''
},action)=>{
  switch(action.type){
    case "GET_MESSAGE_SUCCESS":
      return {
        ...initial,
        loading:action.payload
      }
      break;
    default:
      return initial;
  }
}
