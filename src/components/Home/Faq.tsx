import { Accordion, AccordionDetails, AccordionSummary, Typography, styled } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import "./home.scss";
import Loading from "../Loading/Loading";

// Stili personalizzati per AccordionSummary e AccordionDetails
const CustomAccordion = styled(Accordion)(({ theme }) => ({
    boxShadow: "none", // Rimuove l'ombra di default dall'Accordion
}));

const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    backgroundColor: "#1d1d1b",
    "& .MuiTypography-root": {
        // qua metto tutte le cose riferite al testo
        fontFamily: '"Space Grotesk", sans-serif',
        fontSize: "1.5rem",
        color: "white",
    },
    "& .MuiSvgIcon-root": {
        // qua metto tutte le cose riferite all'icona
        color: "white",
    },
}));

const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    backgroundColor: "#1d1d1b",
    "& .MuiTypography-root": {
        fontFamily: '"Space Grotesk", sans-serif',
        fontSize: "1.05rem",
        fontWeight: "light",
        color: "white",
    },
}));

const Faq = () => {
    return (
        <>
            <section className="faq-home mt-20" id="faq">
                <div className="container">
                    <h2>
                        Dubbi? <span>Faq!</span>
                    </h2>
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-start-1 md:col-start-3 col-end-7 xl:col-end-6">
                            <div className="box-domanda">
                                <CustomAccordion>
                                    <CustomAccordionSummary expandIcon={<ExpandMore />}>
                                        <Typography>
                                            Cosa succede se arrivo vestito in modo non adatto?
                                        </Typography>
                                    </CustomAccordionSummary>
                                    <CustomAccordionDetails>
                                        <Typography>
                                            Nessun problema! La moda è una forma di espressione e
                                            qui vogliamo che tu brilli nel tuo stile unico.
                                            Tuttavia, se indossi il tuo pigiama preferito, potremmo
                                            chiederti almeno di aver aggiunto qualche tocco glamour!
                                        </Typography>
                                    </CustomAccordionDetails>
                                </CustomAccordion>
                                <CustomAccordion>
                                    <CustomAccordionSummary expandIcon={<ExpandMore />}>
                                        <Typography>
                                            Posso portare il mio animale domestico?
                                        </Typography>
                                    </CustomAccordionSummary>
                                    <CustomAccordionDetails>
                                        <Typography>
                                            Ci piacciono gli animali tanto quanto a te, ma per
                                            motivi di sicurezza e rispetto degli altri ospiti,
                                            lascia i tuoi amici pelosi a casa. Non vorremmo che il
                                            tuo cagnolino diventi il re della pista da ballo!
                                        </Typography>
                                    </CustomAccordionDetails>
                                </CustomAccordion>
                                <CustomAccordion>
                                    <CustomAccordionSummary expandIcon={<ExpandMore />}>
                                        <Typography>
                                            Che tipo di cocktail posso trovare al bar?
                                        </Typography>
                                    </CustomAccordionSummary>
                                    <CustomAccordionDetails>
                                        <Typography>
                                            Dal classico Mojito alla nostra creazione speciale
                                            "Disco Fusion", il nostro barman è pronto a deliziarti
                                            con una vasta selezione di cocktail. Scegli quello che
                                            fa per te e preparati a sollevare il bicchiere per una
                                            notte indimenticabile!
                                        </Typography>
                                    </CustomAccordionDetails>
                                </CustomAccordion>
                                <CustomAccordion>
                                    <CustomAccordionSummary expandIcon={<ExpandMore />}>
                                        <Typography>Fino a che ora posso rimanere?</Typography>
                                    </CustomAccordionSummary>
                                    <CustomAccordionDetails>
                                        <Typography>
                                            La festa non finisce finché tu non lo decidi! Siamo qui
                                            fino alle prime luci dell'alba, ma ricorda che le
                                            migliori storie si raccontano degli inaspettati momenti
                                            della notte.
                                        </Typography>
                                    </CustomAccordionDetails>
                                </CustomAccordion>
                                <CustomAccordion>
                                    <CustomAccordionSummary expandIcon={<ExpandMore />}>
                                        <Typography>
                                            Si possono fare foto e video all'interno della
                                            discoteca?
                                        </Typography>
                                    </CustomAccordionSummary>
                                    <CustomAccordionDetails>
                                        <Typography>
                                            Assolutamente sì! Amiamo vedere i momenti più divertenti
                                            dei nostri ospiti. Tuttavia, ricordati di mettere via il
                                            telefono ogni tanto per vivere pienamente l'esperienza.
                                            Non vorremmo che la tua foto migliore sia solo con la
                                            faccia incollata allo schermo!
                                        </Typography>
                                    </CustomAccordionDetails>
                                </CustomAccordion>
                                <CustomAccordion>
                                    <CustomAccordionSummary expandIcon={<ExpandMore />}>
                                        <Typography>Posso prenotare un tavolo?</Typography>
                                    </CustomAccordionSummary>
                                    <CustomAccordionDetails>
                                        <Typography>
                                            Certamente! Ti consigliamo vivamente di prenotare in
                                            anticipo per garantirti un posto nel cuore dell'azione.
                                            I nostri tavoli VIP sono ambiti e ti faranno sentire
                                            come una vera celebrità!
                                        </Typography>
                                    </CustomAccordionDetails>
                                </CustomAccordion>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Faq;
