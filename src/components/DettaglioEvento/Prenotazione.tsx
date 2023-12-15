import { EventDetailType } from "../../repo/events.types";
import "./dettaglio.scss";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { auth, writeDataReservation } from "../../utils/firebase";
import { TextField } from "@mui/material";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

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

type HeroDettaglioProps = {
    eventDetail: EventDetailType;
};

const Prenotazione = (props: HeroDettaglioProps) => {
    const { date, name, id } = props.eventDetail;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userMail, setUserMail] = useState("");
    const [ticketQuantity, setTicketQuantity] = useState(0);

    useEffect(() => {
        if (isAuthenticated) {
            const userMail = auth.currentUser?.email;
            if (userMail) {
                setUserMail(userMail);
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
    }, []);

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

    return (
        <>
            <section className="prenotazione">
                <div className="container">
                    <p>L'evento inizia alle ore {hourStartEventFormatted}</p>
                    {hourSlots.map((hour, i) => {
                        return (
                            <>
                                <div key={i}>
                                    <button
                                        className="btn btn-solid"
                                        onClick={() => {
                                            handleOpen(hour);
                                        }}
                                    >
                                        {hour}
                                    </button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={modalStyle}>
                                            {isAuthenticated ? (
                                                <>
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
                                                                userMail,
                                                                name,
                                                                selectedHour,
                                                                ticketQuantity,
                                                                id
                                                            );
                                                            // chiudo la modale quando faccio il submit
                                                            handleClose();
                                                        }}
                                                    >
                                                        <TextField
                                                            label="Numero biglietti"
                                                            type="number"
                                                            name="ticketQuantity"
                                                            value={ticketQuantity}
                                                            onChange={(e) =>
                                                                setTicketQuantity(
                                                                    parseInt(e.target.value)
                                                                )
                                                            }
                                                            required
                                                            InputProps={{
                                                                inputProps: {
                                                                    max: 5,
                                                                    min: 1,
                                                                },
                                                            }}
                                                        />
                                                        <button type="submit">Conferma</button>
                                                    </form>
                                                </>
                                            ) : (
                                                <>
                                                    <Typography
                                                        sx={titleModalStyle}
                                                        id="modal-modal-title"
                                                        variant="h6"
                                                        component="h2"
                                                    >
                                                        Ops non hai ancora fatto l'accesso!
                                                        <Link to={"/auth"}>
                                                            <button>Accedi!</button>
                                                        </Link>
                                                    </Typography>
                                                </>
                                            )}
                                        </Box>
                                    </Modal>
                                </div>
                            </>
                        );
                    })}
                </div>
            </section>
        </>
    );
};

export default Prenotazione;
