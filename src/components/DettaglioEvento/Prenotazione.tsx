import { EventDetailType } from "../../repo/events.types";
import "./dettaglio.scss";
import "../global.scss";
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
    width: "80%",
    height: "50%",
    bgcolor: "#ce4bc5",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const titleModalStyle = {
    color: "white",
    marginBottom: "50px",
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

    const hourSlots = [];
    for (let i = 0; i < 6; i++) {
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
                    <p className="cta">Scegli a che ora arrivare e prenota!</p>
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 mt-5">
                        {hourSlots.map((hour, i) => {
                            return (
                                <>
                                    <button
                                        className="btn btn-solid"
                                        onClick={() => {
                                            handleOpen(hour);
                                        }}
                                        key={i}
                                    >
                                        {hour}
                                    </button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                        slotProps={{
                                            backdrop: {
                                                sx: {
                                                    backgroundColor: "rgba(0, 0, 0, 0.25)",
                                                },
                                            },
                                        }}
                                    >
                                        <Box sx={modalStyle}>
                                            {isAuthenticated ? (
                                                <>
                                                    <div className="grid -cols-1">
                                                        <Typography
                                                            sx={titleModalStyle}
                                                            id="modal-modal-title"
                                                            variant="h5"
                                                        >
                                                            Quanti biglietti vuoi prenotare?
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
                                                                className="w-full"
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="w-1/2 sm:w-1/3 p-3 mt-5 text-sm sm:text-base text-white bg-slate-950 "
                                                            >
                                                                Conferma
                                                            </button>
                                                        </form>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <Typography
                                                        sx={titleModalStyle}
                                                        id="modal-modal-title"
                                                        variant="h6"
                                                        component="h2"
                                                    >
                                                        <div className="grid grid-cols-1">
                                                            <div className="">
                                                                Ops non hai ancora fatto l'accesso!
                                                            </div>
                                                            <Link to={"/auth"} className="">
                                                                <button className="w-1/2 sm:w-1/3 p-3 mt-5 text-sm sm:text-base text-white bg-slate-950">
                                                                    Accedi!
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </Typography>
                                                </>
                                            )}
                                        </Box>
                                    </Modal>
                                </>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Prenotazione;
