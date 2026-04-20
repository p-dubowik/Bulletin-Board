import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAd, getRequests, loadAdRequest } from "../../redux/adsRedux";
import API_URL, { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";

import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";


const Ad = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    const ad = useSelector(getAd);
    const requests = useSelector(getRequests);

    useEffect(() => {
        dispatch(loadAdRequest(id));
    }, [dispatch, id]);

    if(requests['LOAD_AD']?.pending || !ad) {
        return <p>Loading...</p>;
    }

    if(requests['LOAD_AD']?.error) {
        return <p>Error</p>;
    }

    const isOP = user && ad.userInfo && user._id === ad.userInfo._id;

    const handleDelete = async () => {
        try {
            const options = {
                method: 'DELETE',
                credentials: 'include'
            }

            const res = await fetch(`${API_URL}/ads/${ad._id}`, options);

            if(res.ok) {
                navigate('/');
            }
            else {
                console.log('failed')
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    


    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <Image
                        src={`${BASE_URL}/uploads/${ad.image}`} 
                        rounded
                        fluid
                        style={{ height: '400px', objectFit: 'cover'}}
                    />
                </Col>

                <Col>
                    <Card className="p-3">
                        <h2>{ad.title}</h2>
                        <p className="text-muted">{ad.location}</p>
                        <h3>{ad.price}$</h3>
                        <hr/>
                        <p>{ad.text}</p>
                        <hr/>
                        <p className="text-muted">{ad.date}</p>
                    </Card>

                    <Card className="p-3 mt-2">
                        <h5>Seller</h5>
                        <p>{ad.userInfo?.login}</p>
                    </Card>

                    {isOP && (

                        <Card className="p-3 mt-1">
                            <div className="d-flex gap-3">
                                <Button className="w-100" variant="outline-primary" onClick={() => navigate(`/edit/${ad._id}`)}>Edit</Button>
                                <Button className="w-100" variant="outline-danger" onClick={handleDelete}>Delete</Button>
                            </div>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Ad;