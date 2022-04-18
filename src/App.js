import './App.css';

import React from 'react';
 
import FeaturedPage from './FeaturedPage';
import SearchPage from './SearchPage';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import Navbar from './Navbar';


function App() {
  
  return (
    <Router>
    <div className="App">
      
      <Navbar/>

      <div className='content'>

        <Routes>
          <Route exact path="/" element={<FeaturedPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
      
    </div>
    </Router>
  );
}

export default App;
