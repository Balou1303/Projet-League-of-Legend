import { useEffect, useState } from "react";
import mainPageService from "../Services/mainPageService";
import { useNavigate } from "react-router-dom";
import { Button, Container, Modal } from "react-bootstrap";


const MainPage = () => {
    const [mapRegions, setMapRegions] = useState([]);
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);

    const modalOff = () => {
        setModal(false)
    }

    const fetchMap = async () => {
        try {
            const response = await mainPageService.getMap();
            setMapRegions(response.data);

        } catch (error) {
            console.error("Erreur lors du chargement de la map", error);

        }
    }
    useEffect(() => {
        fetchMap()
        const welcomeToRuneterra = localStorage.getItem('welcomeToRuneterra');
        if (!welcomeToRuneterra) {
            setModal(true)
        }
    }, []);


    const regionClick = (regionId) => {
        navigate(`/regionDetails/${regionId}`)
    };

    if (mapRegions.length === 0) {
        return <Container className="text-center pt-5">Chargement de la carte</Container>
    }

    return <>

        <Modal className="text-center" show={modal} onHide={modalOff} centered size="lg">
            <Modal.Header style={{ backgroundColor: '#010a13', borderBottom: '1px solid #EDD991', textAlign:'center' }}>
                <Modal.Title style={{ color: '#EDD991', textAlign:'center'}}>
                    Bienvenue sur Runeterra
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: '#010a13', color: '#c4c4c4' }}>
                
                <p>
                    Venez découvrir les légendes de Runeterra, ses champions et ses regions.
                    L'aventure commence ici
                </p>
            </Modal.Body>

            <Modal.Footer style={{ backgroundColor: '#010a13', borderTop: '1px solid #EDD991', display:'flex', justifyContent:'center' }}>
                <Button className="buttonModal"  variant="outline-warning" onClick={modalOff}>
                    Commencer l'Exploration
                </Button>
            </Modal.Footer>
        </Modal>

        {/* Conteneur principal de la carte */}
        <div
            style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%',
                height: 0,
                backgroundImage: `url('/assets/RuneterraMap.png')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            {/* 💡 Itération et positionnement des points cliquables (Régions) */}
            {mapRegions.map((region) => (
                <div
                    key={region.id}
                    onClick={() => regionClick(region.id)}
                    title={region.name} // Nom affiché au survol
                    style={{
                        position: 'absolute',
                        top: region.map_position?.top,
                        left: region.map_position?.left,
                        transform: 'translate(-50%, -50%)', // Centrage du point sur la coordonnée
                        cursor: 'pointer',
                        width: '50px',
                        height: '50px',

                        // Style visuel (l'icône de la région)
                        backgroundImage: `url(${region.icon})`,
                        backgroundSize: 'contain', // Ajuste l'icône à la taille du div
                        backgroundRepeat: 'no-repeat', // Empêche la répétition de l'icône
                        backgroundPosition: 'center', // Centre l'icône dans le div
                        borderRadius: '50%',
                        backgroundColor: "#010a13",
                        border: '3px solid',
                        boxShadow: '0 0 10px #EDD991',
                        transition: 'transform 0.2s',
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
                >
                    {/* Affichage du nom de la région sous le point */}
                    <span style={{
                        position: 'absolute',
                        bottom: '-25px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: 'white',
                        fontSize: '1em',
                        fontWeight: 'bold',
                        textShadow: '1px 1px 3px black',
                        whiteSpace: 'nowrap'
                    }}>{region.name}</span>
                </div>
            ))}
        </div>

    </>;
}

export default MainPage;