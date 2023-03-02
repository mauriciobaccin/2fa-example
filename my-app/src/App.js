import './App.css';
import Login from './components/Login';
import TwoFA from './components/TwoFA';

import { Buffer } from 'buffer';
window.Buffer = Buffer;

function App() {
  return (
    <div className="App">
      <Login />
      <TwoFA />
    </div>
  );
}

export default App;
