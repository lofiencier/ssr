import React from 'react';
import { connect } from 'react-redux';
import './index.less';
import { getMessage } from './store';

const About = props =>{
  const { about:{ loading=[] } }=props;
  return <div>
    <button onClick={props.getMessage.bind(null,'intime')}>按时</button>
    <span>{loading.join(',')}</span>
  </div>
};

const mapStateToProps=state=>({ about:state.about });
const mapDispatchToProps = dispatch =>({ getMessage:(params) => dispatch(getMessage(params)) });

About.loadData = ({dispatch, state, params, query,route}) =>{
  return dispatch(getMessage(params))
}

export default connect(mapStateToProps,mapDispatchToProps)(About);