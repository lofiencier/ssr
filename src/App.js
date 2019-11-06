import React from 'react';
import { Route,Switch} from 'react-router-dom';
import routes from './routes';

const App =()=>{
  return <Switch>
    <Route {...routes[0]}/>
  </Switch>
}
export default App;