import { useEffect } from 'react';
import axios from 'axios';

// Component
import Home from "../components/Home"

export default function HomePage() {

  useEffect(() => {
    axios.get('http://localhost:8080/').then(res => {
      console.log('hi')
      console.log(res.data);
    });
  }, []);

  return <h1>"I am home page!"
    <Home />
  </h1>
}