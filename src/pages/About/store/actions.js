import axios from 'axios';

export const getMessage = params => dispatch =>{
  return axios.get('http://127.0.0.1:3000/user').then(({data})=>{
    console.log('data',data.data);
    dispatch({
      type:'GET_MESSAGE_SUCCESS',
      payload:data.data
    })
  })
}
