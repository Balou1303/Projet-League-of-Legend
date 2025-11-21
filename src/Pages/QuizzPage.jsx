import { useEffect, useState } from "react";
import quizzService from "../Services/quizzService";
import { Button, Container, } from "react-bootstrap";

const QuizzPage = () => {

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null)

    const fetchQuestions = async () => {
        try {
            const response = await quizzService.getQuestions()
            setQuestions(response.data);

        } catch (error) {
            console.error("erreur lors du chargement du quizz", error);
        }
    }

    const answerClick = (selectedOption) => {
        if (selectedAnswer !== null) {
            return;
        }
        // permet d'enregitrer la réponse cliquée
        setSelectedAnswer(selectedOption);

        const currentOption = questions[currentQuestion];

        if (selectedOption === currentOption.answer) {
            setScore(prevScore => prevScore + 1);
        }
        setTimeout(() => {
            setCurrentQuestion(prevQIndex => prevQIndex + 1); 
            setSelectedAnswer(null); 
        }, 2000); 
    };

    useEffect(() => {
        fetchQuestions()
    }, []);

    if (questions.length === 0) {
        return <Container>Chargement....</Container>
    }

    if (currentQuestion >= questions.length) {
        return (
            <Container className="text-center pt-5" style={{ color: '#EDD991' }}>
                <h1 className="mb-4">Quiz Terminé !</h1>
                <p style={{ fontSize: '1.5rem' }}>
                    Votre Score Final : {score} / {questions.length}
                </p>
                <Button variant="warning" onClick={() => window.location.reload()}>
                    Recommencer
                </Button>
            </Container>
        );
    }
    const questionActive = questions[currentQuestion]

    return <>
        <Container className="text-center pt-5" style={{ color: '#EDD991' }}>
            <h2>{questionActive.question}</h2>

            <Container className="pt-5">
                <div>{questionActive.options.map((options, index) => {

                    let buttonColor = "outline-warning";
                    let buttonDisabled = false;

                    if (selectedAnswer !== null) {
                        buttonDisabled = true;

                        if (options === questionActive.answer) {
                            buttonColor = "success";
                        } else if (options === selectedAnswer) {
                            buttonColor = "danger";
                        } else {
                            buttonColor = "outline-secondary";
                        }
                    }
                    return (
                        <div key={index} className="pt-3">
                            <Button
                                variant={buttonColor}
                                disabled={buttonDisabled}
                                className="w-50"
                                onClick={() => answerClick(options)}
                                style={{ borderRadius: '25px' }}>
                                {options}
                            </Button>
                        </div>
                    )

                })}
                </div>
            </Container>
            <h4 className="pt-5">questions {currentQuestion + 1} /{questions.length}</h4>
        </Container>

    </>

}

export default QuizzPage;