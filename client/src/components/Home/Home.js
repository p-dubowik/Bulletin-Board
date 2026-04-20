import Ads from '../Ads/Ads';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAds, getRequests, loadAdsRequest, searchAdsRequest } from '../../redux/adsRedux';
import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';


const Home = () => {

    const dispatch = useDispatch();
    const ads = useSelector(getAds);
    const requests = useSelector(getRequests);

    useEffect(() => {
        dispatch(loadAdsRequest());
    }, [dispatch]);

    const [search, setSearch] = useState('');

    const handleSearch = e => {
        e.preventDefault();

        if(!search.trim()) {
            dispatch(loadAdsRequest());
            return;
        }

        dispatch(searchAdsRequest(search));
    }


    return (
        <Container>

            <Form className='my-3 d-flex mx-auto col-12 col-sm-5' onSubmit={handleSearch}>
                <Form.Control type='text' placeholder='Search...' value={search} onChange={e => setSearch(e.target.value)} />
                <Button type='submit'>Search</Button>
            </Form>

            <h1>Ads</h1>

            {requests['LOAD_ADS']?.pending && <p>Loading...</p>}
            {requests['LOAD_ADS']?.error && <p>Error: {requests['LOAD_ADS'].error}</p>}

            <Ads data={ads} />
        </Container>
    );
};

export default Home;