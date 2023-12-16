import { useState } from "react";
import { auth } from "../../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordRegex = /^(?=.*[A-Z])[a-zA-Z0-9]{8,}$/g;

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                window.location.href = "/";
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="sign-in-container">
            <form onSubmit={handleSignUp} className="flex flex-wrap justify-center">
                <h1 className="mb-5">Crea un account</h1>
                <TextField
                    type="email"
                    placeholder="Inserisci l'email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 p-3"
                    margin="dense"
                    required
                    helperText={
                        emailRegex.test(email) == false && email.length > 0
                            ? "Inserisci una mail valida"
                            : ""
                    }
                    error={emailRegex.test(email) == false && email.length > 0}
                    sx={{
                        "& .MuiFormHelperText-root": {
                            color: "white",
                        },
                        "& .MuiInputBase-input": {
                            color: "white",
                        },
                    }}
                />
                <TextField
                    type={showPassword ? "text" : "password"}
                    placeholder="Inserisci la password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-5 p-3"
                    margin="dense"
                    required
                    helperText={
                        passwordRegex.test(password) == false && password.length > 0
                            ? "Almeno 8 caratteri e una lettera maiuscola"
                            : ""
                    }
                    error={passwordRegex.test(password) == false && password.length > 0}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        "& .MuiFormHelperText-root": {
                            color: "white",
                        },
                        "& .MuiInputBase-input": {
                            color: "white",
                        },
                    }}
                />
                <button type="submit" className="btn mb-5">
                    Crea
                </button>
            </form>
        </div>
    );
};

export default SignUp;
