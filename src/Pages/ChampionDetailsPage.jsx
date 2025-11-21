import { useEffect, useState } from "react";
import ChampionsService from "../Services/ChampionsService";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ChampionDetailsPage = () => {
    const { id } = useParams({});
    const [championDetails, setChampionDetails] = useState(null);

    const fetchChampionDetails = async () => {
        try {
            const response = await ChampionsService.getChampionDetails(id);
            setChampionDetails(response.data.data[id]);


        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchChampionDetails();
    }, [id])

    if (!championDetails) {
        return <Container className="text-center pt-5">Chargement du Champion....</Container>
    }

    return <>

        <Container className="d-flex align-items-center">
            <Container className="d-flex flex-column align-items-center ">
                <Container className="d-flex flex-column align-items-center gap-3 pt-5">
                    <h3>{championDetails.name}</h3>
                    <h3>{championDetails.title}</h3>
                    <h3>{championDetails.tags}</h3>
                </Container>
                <Container className="d-flex justify-content-center pt-5">
                    {championDetails.image && <img
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championDetails.id}_0.jpg`}
                        alt={championDetails.name}
                    />}
                </Container>
                <Container className="d-flex gap-3 justify-content-center ">
                    <h4 >Stats :</h4>
                    <p>Attaque : {championDetails.info.attack}</p>
                    <p>Défense : {championDetails.info.defense}</p>
                    <p>Difficulté : {championDetails.info.difficulty}</p>
                    <p>Magie : {championDetails.info.magic}</p>
                </Container>
            </Container>

            <Container className="d-flex flex-column align-items-center gap- 1 col-6">
                <h4 className="d-flex justify-content-center text-center pt-5">Légende</h4>
                <p className="d-flex flex-column align-items-center gap-3 pt-3">{championDetails.lore}</p>
                <h4 className="text-center pt-5">Conseils d'alliés</h4>
                <p className="d-flex flex-column align-items-center pt-3">{championDetails.allytips}</p>
                <h4 className="text-center pt-5">Astuces</h4>
                <p className="d-flex flex-column align-items-center pt-3">{championDetails.enemytips}</p>
            </Container>
        </Container>

    </>
}

export default ChampionDetailsPage;