import { AppBar, Button, Card, CardActions, Container, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ToolCard from "../../components/tool-card/ToolCard";
import { getTool, grabTool, Tool } from "../../services/Tools";

function Grab() {

    const navigate = useNavigate();
    const params = useParams();
    const [tool, setTool] = useState<Tool | undefined>()

    useEffect(() => {
        if (!!params.toolId) {
            getTool(params.toolId!).then(t => {
                setTool(t);
                console.log(t);
            }).catch((err) => {
                console.error(err);
                // navigate("/home");
            });
        }
    }, [navigate, params.toolId])

    const grab = () => {
        if (!tool?.id) {
            navigate("/home");
        }
        grabTool(tool!.id).then(() => navigate("/home"));
    }

    return <Container maxWidth="sm">
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Confirm Tool Assignment
                </Typography>
            </Toolbar>
        </AppBar>
        {!!tool && <Card>
            <ToolCard tool={tool} />
            <CardActions>
                <Button onClick={grab}>Confirm</Button>
                <Button onClick={() => navigate("/home")}>Cancel</Button>
            </CardActions>
        </Card>
        }
    </Container>
}

export default Grab;