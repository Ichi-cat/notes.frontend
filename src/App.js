import logo from './logo.svg';
import './App.css';
import Header from './componnents/Header/Header';
import Home from './componnents/Content/Home'
import {Route, Routes} from "react-router-dom";
import Notes from "./componnents/Notes/Notes";
import Progress from "./componnents/Progress/Progress";
import MatrixContainer from "./componnents/Matrix/MatrixContainer";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/home" element={<Home/>} />
                  <Route path="/notes" element={<Notes/>} />
                  <Route path="/matrix" element={<MatrixContainer/>} />
                  <Route path="/progress" element={<Progress/>} />
              </Routes>
      </div>
    </div>
  );
}

export default App;
