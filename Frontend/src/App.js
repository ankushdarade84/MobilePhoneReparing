
import './App.css';


import { Provider } from "react-redux";
import { Store } from "./Redux/Store";

import Routing from "./Components/Routing";
import Navbar from './Components/Common/Navbar';

function App() {

  return (

    <Provider store={Store}>
      <Navbar/>
        <Routing></Routing>
   
    </Provider>
  );
}

export default App;
