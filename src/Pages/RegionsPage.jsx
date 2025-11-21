import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import RegionsService from "../Services/RegionsService";
import RegionsCard from "../Components/RegionsCard";


const RegionsPage = () => {
    const [regions, setRegions] = useState([]);

    const fetchRegions = async () => {
        try {
            const response = await RegionsService.getRegions();
            const regionsObject = response.data; 

            // Transforme l'objet {Demacia: {...}} en tableau [{id: Demacia, ...}]
            const regionsArray = Object.entries(regionsObject).map(([name, data]) => ({
                id: name,
                // On insère toutes les autres propriétés (description, image, etc.)
                ...data
            }));

            setRegions(regionsArray);

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchRegions()
    }, [])

    return <>
        <Container className="d-flex flex-column align-items-center gap-5">
             <h1 className="text-decoration-underline" style={{ color: '#EDD991' }}>Régions</h1>
            <div className="d-flex flex-wrap justify-content-center">
                {regions.map((region) => {
                    return <RegionsCard region={region} key={region} />
                })}
            </div>
        </Container>
    </>
}

export default RegionsPage;