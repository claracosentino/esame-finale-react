import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
    return (
        <>
            <footer className="mt-20">
                <div className="container flex justify-center">
                    <p className="p-2">
                        <Link to={"https://www.clara-cosentino.com"}>
                            Made with 🤬 by Clara Cosentino
                        </Link>
                    </p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
