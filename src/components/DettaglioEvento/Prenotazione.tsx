import { EventDetailType } from "../../repo/events.types";
import "./dettaglio.scss";
import dayjs from "dayjs";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { databaseFirebase, writeDataReservation } from "../../utils/firebase";
import { Button, TextField } from "@mui/material";

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

type HeroDettaglioProps = {
    eventDetail: EventDetailType;
};

const Prenotazione = (props: HeroDettaglioProps) => {
    const { date, name } = props.eventDetail;

    const hourStartEventFormatted = dayjs(date).format("HH:mm");

    const hourSlots = [];
    for (let i = 0; i < 7; i++) {
        // prendo la data di inizio evento e ci aggiungo 15*nCiclo minuti
        const hourIncremented = dayjs(date).add(15 * i, "minute");
        // formatto in HH:mm
        const hourIncrementedFormatted = hourIncremented.format("HH:mm");
        // pusho l'ora formattata nell'array hourSlots
        hourSlots.push(hourIncrementedFormatted);
    }

    // INIZIO COSE RIGUARDANTI MODALE
    const [open, setOpen] = useState(false);
    const [selectedHour, setSelectedHour] = useState(date);
    const handleOpen = (hour: string) => {
        setOpen(true);
        setSelectedHour(hour);
    };
    const handleClose = () => setOpen(false);
    const resetInput = () => {
        setInputName("");
        setInputCognome("");
        setInputEmail("");
    };

    // INIZIO COSE RIGUARDANTI INPUT
    const [inputName, setInputName] = useState<string>("");
    const [inputCognome, setInputCognome] = useState<string>("");
    const [inputEmail, setInputEmail] = useState<string>("");

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    return (
        <>
            <section className="prenotazione">
                <div className="container">
                    <p>L'evento inizia alle ore {hourStartEventFormatted}</p>
                    {hourSlots.map((hour, i) => {
                        return (
                            <>
                                <button className="btn btn-solid" onClick={() => handleOpen(hour)}>
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
                                                    selectedHour,
                                                    databaseFirebase
                                                );
                                                // chiudo la modale quando faccio il submit
                                                handleClose();
                                                // ripulisco i campi della modale (cosi se la riapro è vuota)
                                                resetInput();
                                            }}
                                        >
                                            <label>
                                                <TextField
                                                    label="nome"
                                                    type="text"
                                                    name="nome"
                                                    value={inputName}
                                                    onChange={(e) => setInputName(e.target.value)}
                                                    required
                                                    inputProps={{ minLength: 3 }}
                                                    helperText={
                                                        inputName.length < 3 && inputName.length > 0
                                                            ? "Inserisci un nome valido"
                                                            : ""
                                                    }
                                                    error={
                                                        inputName.length < 3 && inputName.length > 0
                                                    }
                                                />
                                                <TextField
                                                    label="cognome"
                                                    type="text"
                                                    name="cognome"
                                                    value={inputCognome}
                                                    onChange={(e) =>
                                                        setInputCognome(e.target.value)
                                                    }
                                                    required
                                                    inputProps={{ minLength: 3 }}
                                                    helperText={
                                                        inputCognome.length < 3 &&
                                                        inputCognome.length > 0
                                                            ? "Inserisci un cognome valido"
                                                            : ""
                                                    }
                                                    error={
                                                        inputCognome.length < 3 &&
                                                        inputCognome.length > 0
                                                    }
                                                />
                                                <TextField
                                                    label="email"
                                                    type="text"
                                                    name="email"
                                                    value={inputEmail}
                                                    onChange={(e) => setInputEmail(e.target.value)}
                                                    required
                                                    helperText={
                                                        emailRegex.test(inputEmail) == false &&
                                                        inputEmail.length > 0
                                                            ? "Inserisci una mail valida"
                                                            : ""
                                                    }
                                                    error={
                                                        emailRegex.test(inputEmail) == false &&
                                                        inputEmail.length > 0
                                                    }
                                                />
                                            </label>
                                            <Button variant="contained">
                                                <input type="submit" value="Submit" />
                                            </Button>
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
