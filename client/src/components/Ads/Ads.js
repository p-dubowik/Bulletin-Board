import { Row, Col } from "react-bootstrap";
import AdCard from "../AdCard/AdCard";

const Ads = ({ data }) => {


    return (
        <Row className="g-4">
            {data.map(ad => (
                <Col sm={6} md={4}>
                    <AdCard ad={ad} />
                </Col>
            ))}
        </Row>
    );
};

export default Ads;