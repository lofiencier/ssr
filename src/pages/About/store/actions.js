import axios from 'axios';

export const getMessage = params => dispatch =>{
  return axios.get(`http://localhost:3000/user?base=${params}`).then(({data})=>{
    dispatch({
      type:'GET_MESSAGE_SUCCESS',
      payload:data.data
    })
  })
}
