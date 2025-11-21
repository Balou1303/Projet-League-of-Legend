import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ChampionsCard = ({ champion }) => {
    const navigate = useNavigate();


    return <>

        <Card className="col-2" onClick={() => { navigate('/championDetails/' + champion.id) }}>
            <Card.Img variant="top" src={`https://ddragon.leagueoflegends.com/cdn/15.22.1/img/champion/${champion.id}.png`}
            alt={`splash art de ${champion.name}`} />
            <Card.Body>
                <Card.Title className="text-decoration-underline text-center">{champion.name}</Card.Title>
                <Card.Text>
                    {champion.blurb}
                </Card.Text>
            </Card.Body>
        </Card >
    </>;
}

export default ChampionsCard;