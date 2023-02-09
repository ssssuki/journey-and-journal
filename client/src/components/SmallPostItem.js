import { Link } from 'react-router-dom';

export default function SmallPostItem(props) {

  return (
    <div>
      <Link to={`/posts/${props.id}`}>
        <article>
            <div className="parent">
          <div className="col">
            <span>{props.title}</span>
            <img
              alt="entry-photo"
              src={props.photo}
            />
            <h3>{props.address}</h3>
              </div>
          </div>
        </article>
      </Link>
    </div>
  );
}