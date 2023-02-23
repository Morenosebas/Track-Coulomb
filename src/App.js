import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import NavBarDesk from './components/NavBarDesk';
import BodyContent from './components/BodyContent'
import NotFoundPage from './components/404notfound';
import BodyContentIndex from './componentIndex/BodyContenTIndex';
function App() {
  return (
    // <div className="App">
    //   <NavBarDesk />
    //   <BodyContent />
    // </div>
    <Router>
      <NavBarDesk />
      <Routes>
        <Route path='/' element={<BodyContentIndex />} />
        <Route path='/CryptoT' element={<BodyContent />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
