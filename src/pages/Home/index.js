import React from 'react';
import { renderRoutes } from 'react-router-config';

const Home = ({route}) => <React.Fragment><span>home</span>{renderRoutes(route.routes)}</React.Fragment>;

export default Home;