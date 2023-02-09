import { Link } from 'react-router-dom';

export default function SmallPostItem(props) {

  return (
    <div>
      <Link to={`/posts/${props.id}`}>
        <article>
          <div className="col">
            <h3>{props.title}</h3>
            <img
              alt="entry-photo"
              src={props.photo}
            />
            <p>{props.address}</p>
          </div>
        </article>
      </Link>
    </div>
  );
}