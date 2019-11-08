const getMessage = {
  type:'GET_MESSAGE',
  payload:new Array(20).fill('').map((v,i)=>i)
};

export default { getMessage }