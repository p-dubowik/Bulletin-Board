import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAd, getRequests, loadAdRequest } from "../../redux/adsRedux";
import { BASE_URL } from "../../config";

import { Container, Row, Col, Image, Card } from "react-bootstrap";


const Ad = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

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


    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <Image src
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

                    <Card className="p-3 mt-3">
                        <h5>Seller</h5>
                        <p>{ad.userInfo.login}</p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Ad;