import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBarDesk from './components/NavBarDesk';
import BodyContent from './components/BodyContent'
import NotFoundPage from './components/404notfound';
function App() {
  return (
    // <div className="App">
    //   <NavBarDesk />
    //   <BodyContent />
    // </div>
    <Router>
      <NavBarDesk />
      <Routes>
        <Route path='/' element={<div style={{
          position: "absolute", margin: " auto", color: "white",
          fontSize: "40px", top: "50%", left: "50%"
        }}>Hola mundo</div>} />
        <Route path='/CryptoT' element={<BodyContent />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
