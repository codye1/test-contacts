import { HashRouter } from 'react-router-dom';
import Routing from './rout/routing';

const App = () => {
  return (
    <HashRouter basename="/test-contacts">
      <Routing />
    </HashRouter>
  );
};

export default App;
