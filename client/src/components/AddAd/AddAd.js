import AdForm from "../AdForm/AdForm";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";


const AddAd = () => {
    const navigate = useNavigate();

    const handleAdd = fd => {
        const options = {
            method: 'POST',
            body: fd,
            credentials: 'include'
        }

        fetch(`${API_URL}/ads`, options)
            .then(res => {
                if(res.status === 201) {
                    navigate('/');
                }
            });
    };


    return (
        <div>
            <h1>Post Ad</h1>
            <AdForm func={handleAdd} funcName='POST' />
        </div>
    )
}

export default AddAd;