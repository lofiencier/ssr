export const reducer = (initial={
  loading:''
},action)=>{
  return {
    ...initial,
    loading:action.payload
  }
}
