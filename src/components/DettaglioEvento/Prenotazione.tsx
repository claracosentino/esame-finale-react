import { EventDetailType } from "../../repo/events.types";
import "./dettaglio.scss";
import dayjs from "dayjs";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { databaseFirebase, writeDataReservation } from "../../utils/firebase";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const titleModalStyle = {
    color: "black",
};

const bodyModalStyle = {
    color: "black",
    marginTop: "2rem",
};
>>>>>>> ft/gestionePrenotazione

type HeroDettaglioProps = {
    eventDetail: EventDetailType;
};

const Prenotazione = (props: HeroDettaglioProps) => {

    // INIZIO COSE RIGUARDANTI DATA
    const { date, name } = props.eventDetail;
    // ora di inzio evento formattata in HH:MM
    const hourStartEventFormatted = dayjs(date).format("HH:mm");
    // array dove vado a inserire (tramite ciclo for) tutti gli slot di 15 min
    const hourSlots = [];
    for (let i = 1; i < 7; i++) {
        // prendo la data di inizio evento e ci aggiungo 15*nCiclo minuti
        const hourIncremented = dayjs(date).add(15 * i, "minute");
        // formatto in HH:mm
        const hourIncrementedFormatted = hourIncremented.format("HH:mm");
        // pusho l'ora formattata nell'array hourSlots
        hourSlots.push(hourIncrementedFormatted);
    }

    // INIZIO COSE RIGUARDANTI MODALE
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // INIZIO COSE RIGUARDANTI INPUT
    const [inputName, setInputName] = useState<string>("");
    const [inputCognome, setInputCognome] = useState<string>("");
    const [inputEmail, setInputEmail] = useState<string>("");

    return (
        <>
            <section className="prenotazione">
                <div className="container">
                    <p>L'evento inizia alle ore {hourStartEventFormatted}</p>
                    {hourSlots.map((hour, i) => {
                        return (
                            <>
                                <button className="btn btn-solid" onClick={handleOpen}>
                                    {hour}
                                </button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={modalStyle}>
                                        <Typography
                                            sx={titleModalStyle}
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                        >
                                            Dacci tutti i tuoi dati per confermare
                                        </Typography>
                                        <form
                                            id="modal-modal-description"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                writeDataReservation(
                                                    inputName,
                                                    inputCognome,
                                                    inputEmail,
                                                    name,
                                                    "21:00",
                                                    databaseFirebase
                                                );
                                            }}
                                        >
                                            <label>
                                                Nome:
                                                <input
                                                    type="text"
                                                    name="nome"
                                                    value={inputName}
                                                    onChange={(e) => setInputName(e.target.value)}
                                                />
                                                Cognome:
                                                <input
                                                    type="text"
                                                    name="cognome"
                                                    value={inputCognome}
                                                    onChange={(e) =>
                                                        setInputCognome(e.target.value)
                                                    }
                                                />
                                                Email:
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={inputEmail}
                                                    onChange={(e) => setInputEmail(e.target.value)}
                                                />
                                            </label>
                                            <input
                                                type="submit"
                                                value="Submit"
                                                /* onClick={() =>
                                                    writeDataReservation(
                                                        inputName,
                                                        inputCognome,
                                                        inputEmail,
                                                        name,
                                                        "21:00",
                                                        databaseFirebase,
                                                        "1"
                                                    )
                                                } */
                                            />
                                        </form>
                                    </Box>
                                </Modal>
                            </>
                        );
                    })}
                </div>
            </section>
        </>
    );
};

export default Prenotazione;
