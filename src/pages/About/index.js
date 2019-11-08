import React from 'react';
import {connect} from 'react-redux';
import { actions } from './store';
import './index.less';

console.log('actions',actions);

class About extends React.PureComponent{
  render(){
    return <span>about</span>
  }
}

const mapStateToProps=state=>({
  about:state.about
});
const mapDispatchToProps=dispatch=>{
  return {
    getMessage:dispatch(actions.getMessage),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(About);