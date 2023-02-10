import { Link } from 'react-router-dom';

export default function SmallPostItem(props) {

  return (
    <div>
      <Link to={`/posts/${props.id}`}>
        <article>
            <span>{props.title}</span>
            <div className="city-card">
              <figure>
              <img
                className="child"
                alt="entry-photo"
                src={props.photo}
              />
            <figcaption>{props.address}</figcaption>
            </figure>
            </div>
        </article>
      </Link>
    </div>
  );
}