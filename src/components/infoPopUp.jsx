import React from 'react';
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";


const Infopopup = ({workoutMode, setWorkoutMode, user}) => {
    const handleWorkoutModeChange = async (modo) => {
        if (!user) return;
        setWorkoutMode(modo);

        try {
            await setDoc(doc(db, "users", user.id), { WorkoutMode: modo} , { merge: true });
            console.log("Modo de treino atualizado para ", modo); 
        } catch (error) {
            console.error("Erro ao atualizar o modo de treino: ", error);
            alert("Erro ao atualizar o modo de treino");
        }
    }


    return (
        <div style={infoConteiner}>
            <div style={textInfoConteiner}>
                <img src="/info.png" alt="Info" style={infoLogo} 
                    onClick={() => alert("A escolha do modo de treino só pode ser feita no começo da semana com aviso prévio no grupo!")}
                />
                <div style={textInfo}>
                    Modo de treino selecionado:
                </div>
               
            </div>
            <div>
                <button 
                    style={workoutMode === 3 ? selectedButtonStyle : buttonStyle} 
                        onClick={() => handleWorkoutModeChange(3)}
                >
                    3x
                </button>

                <button 
                    style={workoutMode === 4 ? selectedButtonStyle : buttonStyle} 
                        onClick={() => handleWorkoutModeChange(4)}
                >
                    4x
                </button>
            </div>
        </div>
    );
}

const infoConteiner = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto",
    width: "90vw",
}
const textInfoConteiner = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "0px 0px 10px 0px",
}
const textInfo = {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "lighter",
    margin: "0px 0px 0px 10px",
}
const infoLogo = {
    width: "30px", 
    height: "30px",
    marginLeft: "10px",
}

const buttonStyle = {
    backgroundColor: "rgb(240, 3, 3)", /* Green */
    border: "none",
    color: "white",
    padding: "16px",
    textAlign: "center",
    fontSize: "14px",
    margin: "4px 10px",
    cursor: "pointer",
    borderRadius: "16px",
}
const selectedButtonStyle = {
    ...buttonStyle,
    backgroundColor: "rgba(240, 3, 3, 0.5)",
}

export default Infopopup;
