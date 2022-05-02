import { AppBar, Container, Toolbar, Typography, IconButton, Card } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import ToolCard from "../../components/tool-card/ToolCard";
import { getMyTools, Tool } from "../../services/Tools";
import { logout } from "../../services/Auth";
import { useNavigate } from "react-router-dom";

function Home() {

    const [tools, setTools] = useState<Tool[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getMyTools().then(tls => setTools(tls))
    }, [])

    const exit = async () => {
        await logout();
        navigate("/");
    }

    return <Container maxWidth="sm">
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My Assigned Tools
                </Typography>
                <IconButton aria-label="logout" color="inherit" onClick={exit}>
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
        {tools.map(t => <Card key={t.id}><ToolCard tool={t} /></Card>)}
    </Container>
}

export default Home;