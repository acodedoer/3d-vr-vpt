import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { useDrag, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

