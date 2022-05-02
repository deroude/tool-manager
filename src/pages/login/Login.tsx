import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/Auth";
import "./Login.scss";

function Login() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const navigate = useNavigate();

    const signIn = async () => {
        try {
            const user = await login(email, password);
            if (!!user) {
                navigate('/home');
            } else {
                setError(true);
            }
        } catch (err) {
            console.log(err);
            setError(true);
        }
    }

    return <Card className="login-card">
        <CardHeader title="Login" />
        <CardContent>
            <Box component="form">
                <TextField className="login-field"
                    required
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField className="login-field"
                    required
                    type="password"
                    label="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {error && <Typography component="p" color="red">Login failed</Typography>}
            </Box>
        </CardContent>
        <CardActions>
            <Button onClick={signIn}>Sign In</Button>
        </CardActions>
    </Card>
}

export default Login;