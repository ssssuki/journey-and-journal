import "./App.css";
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  useEffect(() => {
    axios.get('http://localhost:8080/').then(res => {
      console.log('hi')
      console.log(res.data);
    });
  }, []);

  return <div className="App">
    Home
  </div>;
}

export default App;
