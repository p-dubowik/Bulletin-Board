import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import API_URL from "../../config";
import AdForm from "../AdForm/AdForm";


const AdEdit = () => {

    const { id } = useParams();
    const [ad, setAd] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/ads/${id}`)
            .then(res => res.json())
            .then(data => setAd(data));
    }, [id]);


    const handleEdit = fd => {
        const options = {
            method: 'PUT',
            body: fd,
            credentials: 'include'
        }
        fetch(`${API_URL}/ads/${id}`, options)
            .then(res => {
                if(res.status === 201) {
                    navigate('/');
                }
            });
    };

    if(!ad) return <Spinner>Loading</Spinner>

    return (
        <div>
            <h1>Edit Ad</h1>
            <AdForm func={handleEdit} funcName='EDIT AD' data={ad} />
        </div>
    )
};

export default AdEdit;