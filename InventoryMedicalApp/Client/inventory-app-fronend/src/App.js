import Navbar from './Navbar';
import Home from './Home';
import CreateArticle from './CreateArticle';
import UpdateArticle from './UpdateArticle';
import DeleteArticle from './DeleteArticle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styling/fontStyling.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './styling/App.css';



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateArticle/>} />
            <Route path="/updatera" element={<UpdateArticle/>} />
            <Route path="/delete" element={<DeleteArticle/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
