import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function VODCard({ mediaID, image, name, onCardClick }) {

  function handleCardClick(mediaID){
    onCardClick(mediaID);
  }

  return (
    <Col xs='6' md='4' lg='3' xl='2' style={{ display: 'flex', alignItems: "stretch"}}>
      <Card
        className={`vod-card`}
        onClick={() => handleCardClick(mediaID)}
      >
        <Card.Img variant="top" src={image} loading="lazy"/>
        <Card.Body>
          <Card.Title className={`text-center`}>{name}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default VODCard;

{/* <div
  key={trending.id}
  className="col-md-3 col-sm-4 py-3 d-flex justify-content-center g-4"
  id="card"
>
  <div className="card bg-dark" key={trending.id}>
    <img
      src={poster_path ? `${img_300}/${poster_path}` : unavailable}
      className="card-img-top pt-3 pb-0 px-3"
    />
    <div className="card-body">
      <h5 className="card-title text-center fs-5">{trending.title || trending.name}</h5>
      <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
        <div>{media_type === "tv" ? "TV" : "Movie"}</div>
        <div>{first_air_date || release_date}</div>
      </div>
    </div>
  </div>
</div> */}