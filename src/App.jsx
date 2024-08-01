import { BrowserRouter } from "react-router-dom";
import Routing from "./rout/routing";


const App = () => {
  return (
    <BrowserRouter basename="/test-contacts">
      <Routing/>
    </BrowserRouter>
  );
};

export default App;