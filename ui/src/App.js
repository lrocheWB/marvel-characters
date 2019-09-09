import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Characters from './Characters.js';
import Character from './Character.js';
import './App.css';

function Index() {
  return <h2>Bienvenue SmartRenting !</h2>;
}

function App() {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/characters'>Characters</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Route path='/' exact component={Index} />
        <Route path='/characters' exact component={Characters} />
        <Route path='/characters/:id' component={Character} />
      </div>
    </Router>
  );
}

export default App;
