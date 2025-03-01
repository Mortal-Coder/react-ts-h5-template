import { BrowserRouter as Router } from 'react-router-dom';
import TabBarView from '@/layout/tabbarView';
import RouteRender from './router/RouteRender';

const App = () => {
  return (
    <Router>
      <RouteRender />
      <TabBarView />
    </Router>
  );
};

export default App;
