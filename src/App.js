import * as React from 'react';
import { Route } from 'react-router-dom';
import routes from './routes';

class App extends React.PureComponent{
  render(){
    const Cpt = routes[0].component;
    return <div>
      <Route render={props=><Cpt {...props} />} />
    </div>
  }
}
export default App;