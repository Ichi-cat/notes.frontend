import logo from './logo.svg';
import './App.css';
import Header from './componnents/Header/Header';
import Home from './componnents/Content/Home'
import {Route, Routes} from "react-router-dom";
import Notes from "./componnents/Notes/Notes";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
              <Routes>
                  <Route path="/home" element={<Home/>} />
                  <Route path="/notes" element={<Notes/>} />
              </Routes>
      </div>
    </div>
  );
}

export default App;
