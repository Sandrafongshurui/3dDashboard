import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Board from './Board';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Board content={"A"}/>
    <Board content={"B"}/> */}
  </React.StrictMode>
);

