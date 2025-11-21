import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegionsCard = ({ region }) => {
    const navigate = useNavigate();

    return <>
        <Card className="col-2" onClick={() => { navigate('/regionDetails/' + region.id) }}>
            <Card.Img variant="top" src={region.image} alt="{`image de ${region.id}`}" />
            <Card.Body>
                <Card.Title className="text-decoration-underline text-center">{region.id}</Card.Title>
            </Card.Body>
        </Card >
                   



    </>;
}

export default RegionsCard;