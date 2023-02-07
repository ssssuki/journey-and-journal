import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home (props) {

  return(
    <div>
      <article>
        <h3>{props.title}</h3>
        <img 
          src={props.photo}
        />
        <p>{props.address}</p>
      </article>
    </div>
  )
}