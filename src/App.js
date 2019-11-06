import * as React from 'react';
import { Route } from 'react-router-dom';
import routes from './routes';

class App extends React.PureComponent{
  render(){
    const Cpt = routes[0].component;
    return <div>
      <button onClick={()=>console.log('你tm有毒啊')}>confirm</button>
      <Route render={props=><Cpt {...props} />} />
    </div>
  }
}
export default App;