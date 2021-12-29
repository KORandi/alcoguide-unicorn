import { Label } from 'semantic-ui-react';
import Rating from '../../Rating/Rating';

function SearchCard() {
  const x = '';
  return (
    <div className="card">
      <svg
        className="bd-placeholder-img card-img-top"
        width="100%"
        height="180"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder: Image cap"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#868e96" />
        <text x="50%" y="50%" fill="#dee2e6" dy=".3em" dx="-2em">
          Image cap
        </text>
      </svg>
      <div className="card-body">
        <h5 className="card-title">Reciepe title</h5>
        <div className="mb-2">
          <Label className="mt-1">apple</Label>
          <Label className="mt-1">pineapple</Label>
          <Label className="mt-1">peach</Label>
          <Label className="mt-1">watermelon</Label>
          <Label className="mt-1">something</Label>
        </div>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
        </p>
        <a href="#" className="btn btn-primary">
          Open reciepe
        </a>
        <Rating />
      </div>
    </div>
  );
}

export default SearchCard;
