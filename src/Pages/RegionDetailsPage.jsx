// src/Pages/RegionDetailsPage.jsx

import { useEffect, useState } from "react";
import RegionsService from "../Services/RegionsService";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ChampionsCard from "../Components/ChampionsCard";

// Constante définie en dehors du composant pour ne pas être recréée à chaque rendu
const DDRAGON_VERSION = "15.22.1";

// Fonction utilitaire pour construire l'URL de l'image du champion
const getChampionImageUrl = (championId) => {
    return `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${championId}.png`;
};

const RegionDetailsPage = () => {
    // Récupère l'ID (ex: Demacia) depuis la route /regionDetails/:id
    const { id } = useParams();
    const [regionDetails, setRegionDetails] = useState(null);

    const fetchRegionDetails = async () => {
        try {
            const response = await RegionsService.getRegions();
            const regionsObject = response.data;

            // trouver la région par sa clé dans l'objet
            const foundRegion = regionsObject[id];

            if (foundRegion) {
                // Ajoute 'name' pour un meilleur affichage et stocke l'objet
                setRegionDetails({ ...foundRegion, name: id });
            } else {
                console.error(`Région non trouvée pour l'ID: ${id}`);
            }

        } catch (error) {
            console.error("Erreur de chargement ou de filtre des régions", error);
        }
    }

    useEffect(() => {
        fetchRegionDetails();
    }, [id]);

    // Condition de garde
    if (!regionDetails) {
        return <Container >Chargement de {id}...</Container>
    }

    const regionImageSrc = regionDetails.image;

    return (
        <Container className="pt-5">
            <h1 className="text-decoration-underline text-center" style={{ color: '#EDD991' }}>
                {regionDetails.name}
            </h1>
            {regionImageSrc && (
                <img
                    src={regionImageSrc}
                    alt={`Image de la région ${regionDetails.name}`}
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        border: '3px solid #EDD991',
                        boxShadow: '0 0 15px rgba(237, 217, 145, 0.5)'
                    }}
                />
            )}
            <h4 className="text-decoration-underline text-center pt-5">Légende de la région</h4>
            <p className="text-center pt-5">{regionDetails.description}</p>

            <h4 className="text-decoration-underline text-center pt-5">
                Champions notables ({regionDetails.championIds.length})
            </h4>

            <Container className="d-flex flex-wrap justify-content-center pt-3 col-8">
                {regionDetails.championIds.map((championId) => (
                    <ChampionsCard
                        champion={{
                            id: championId,
                            name: championId,
                            imageUrl: getChampionImageUrl(championId)
                        }}
                    />

                ))}
            </Container>


        </Container>
    );
}

export default RegionDetailsPage;