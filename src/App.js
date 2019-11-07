import * as React from 'react';
import { Route } from 'react-router-dom';
import routes from './routes';
import { renderRoutes } from 'react-router-config';

class App extends React.PureComponent{
  render(){
    const Cpt = routes[0].component;
    const rendered = renderRoutes(routes);
    return <div>
      <button onClick={()=>console.log('你tm有毒啊')}>confirm</button>
      {
        routes.map(i=><Route {...i} />)
      }
    </div>
  }
}
export default App;