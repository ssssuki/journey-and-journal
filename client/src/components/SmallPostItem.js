import { Link } from 'react-router-dom';

export default function SmallPostItem(props) {

  return (
    <div>
      <Link to={`/posts/${props.id}`}>
        <div className="city-card">
          <figure>
            <img
              className="child"
              alt="entry-photo"
              src={props.photo}
            />
            <figcaption id="title">{props.title}</figcaption>
            <figcaption id="city">{props.address}</figcaption>
          </figure>
        </div>
      </Link>
    </div>
  );
}