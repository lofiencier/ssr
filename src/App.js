import * as React from 'react';
import { Route } from 'react-router-dom';
import routes from './routes';
import { renderRoutes } from 'react-router-config';
import './global.less';

class App extends React.PureComponent{
  render(){
    return <div>
      <button onClick={()=>console.log('你tm有毒啊')}>confirm</button>
      {
        renderRoutes(routes)
      }
    </div>
  }
}
export default App;