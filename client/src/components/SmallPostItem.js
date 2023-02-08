import { Link } from 'react-router-dom';

export default function SmallPostItem(props) {

  return (
    <div>
      <Link to={`/posts/${props.id}`}>
        <article>
          <h3>{props.title}</h3>
          <img
            src={props.photo}
          />
          <p>{props.address}</p>
        </article>
      </Link>
    </div>
  );
}