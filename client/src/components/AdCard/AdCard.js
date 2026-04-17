import { BASE_URL } from "../../config";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const AdCard = ({ ad }) => {


    return (

                <Card>
                    <Card.Img 
                    src={`${BASE_URL}/uploads/${ad.image}`}
                    style={{ height: '200px', objectFit: 'cover'}}
                />

                <Card.Body>
                    <Card.Title>{ad.title}</Card.Title>
                    <Card.Text className="text-muted">{ad.location}</Card.Text>
                    <Card.Text className="fw-bold">{ad.price}$</Card.Text>

                    <Button
                        as={Link} 
                        to={`/ads/${ad._id}`}
                        variant="primary"
                        className="mt-auto"
                    >More...</Button>
                </Card.Body>

                </Card>

    );
};

export default AdCard;