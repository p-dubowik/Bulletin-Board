import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AdForm = ({ func, funcName, data={} }) => {

    const [title, setTitle] = useState(data.title || '');
    const [text, setText] = useState(data.text || '');
    const [price, setPrice] = useState(data.price || '');
    const [location, setLocation] = useState(data.location || '');
    const [image, setImage] = useState(null);


    const handleSubmit = e => {
        e.preventDefault();

        const fd = new FormData();
        fd.append('title', title);
        fd.append('text', text);
        fd.append('price', price);
        fd.append('location', location);

        if(image) {
            fd.append('image', image);
        };

        func(fd);
    }

    return (
        <Form className="col-12 col-sm-4 mx-auto" onSubmit={handleSubmit}>

            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={4} value={text} onChange={e => setText(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control value={price} onChange={e => setPrice(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control value={location} onChange={e => setLocation(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={e => setImage(e.target.files[0])} />
            </Form.Group>

            <Button type="submit" className="my-3">
                {funcName}
            </Button>

        </Form>
    );
};

export default AdForm;