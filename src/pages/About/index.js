import React from 'react';
import {connect} from 'react-redux';
import { actions } from './store';
import './index.less';
import { getMessage } from './store';

const About = props =>{
  const { about:{ loading=[] } }=props;
  return <div>
    <button onClick={props.getMessage.bind(null,1)}>按时</button>
    <span className="red">{loading.join(',')}</span>
  </div>
};

const mapStateToProps=state=>({ about:state.about });
const mapDispatchToProps = dispatch =>({ getMessage:(params) => dispatch(getMessage(params)) });

About.loadData = ({dispatch, state, params, query,route}) =>{
  return dispatch(getMessage(0))
}

export default connect(mapStateToProps,mapDispatchToProps)(About);