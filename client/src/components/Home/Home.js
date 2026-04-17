import Ads from '../Ads/Ads';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAds, getRequests, loadAdsRequest } from '../../redux/adsRedux';
import { useEffect } from 'react';


const Home = () => {

    const dispatch = useDispatch();
    const ads = useSelector(getAds);
    const requests = useSelector(getRequests);

    useEffect(() => {
        dispatch(loadAdsRequest());
    }, [dispatch]);



    return (
        <Container>
            <h1>Ads</h1>

            {requests['LOAD_ADS']?.pending && <p>Loading...</p>}
            {requests['LOAD_ADS']?.error && <p>Error: {requests['LOAD_ADS'].error}</p>}

            <Ads data={ads} />
        </Container>
    );
};

export default Home;