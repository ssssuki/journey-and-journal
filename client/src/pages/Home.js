import { useEffect } from 'react';
import axios from 'axios';

export default function Home() {

  useEffect(() => {
    axios.get('http://localhost:8080/').then(res => {
      console.log('hi')
      console.log(res.data);
    });
  }, []);

  return <h1>"I am home!"</h1>
}