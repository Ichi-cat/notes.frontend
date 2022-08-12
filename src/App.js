import './App.css';
import Header from './componnents/Header/Header';
import Home from './componnents/Content/Home'
import {Route, Routes} from "react-router-dom";
import Notes from "./componnents/Notes/Notes";
import MatrixContainer from "./componnents/Matrix/MatrixContainer";
import ProgressContainer from "./componnents/Progress/ProgressContainer";

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
                  <Route path="/progress" element={<ProgressContainer/>} />
              </Routes>
      </div>
    </div>
  );
}

export default App;
