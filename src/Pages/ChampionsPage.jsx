import { useEffect, useState } from "react";
import ChampionsService from "../Services/ChampionsService";
import { Container } from "react-bootstrap";
import ChampionsCard from "../Components/ChampionsCard";

const ChampionsPage = () => {
    const [champions, setChampions] = useState([]);

    const fetchChampions = async () => {
        try {
            const response = await ChampionsService.getChampions();
            // Object.values permet de transformer un objet en tableau
            setChampions(Object.values(response.data.data));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchChampions();
    }, [])

    return <>
        <Container className="d-flex flex-column align-items-center gap-5">
            <h1 className="text-decoration-underline" style={{ color: '#EDD991' }}>Champions</h1>
            <div className="d-flex flex-wrap justify-content-center">
                {champions.map((champion) => {
                    return <ChampionsCard key={champion.id} champion={champion} />
                })}
            </div>

        </Container>
    </>;
}



export default ChampionsPage;