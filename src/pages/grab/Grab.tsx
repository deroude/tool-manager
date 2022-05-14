import {
    AppBar,
    Button,
    Card,
    CardActions,
    Container,
    Toolbar,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ToolCard from "../../components/tool-card/ToolCard";
import { getAllWorkAreas, getTool, grabTool, Tool, WorkArea } from "../../services/Tools";

function Grab() {

    const navigate = useNavigate();
    const params = useParams();
    const [tool, setTool] = useState<Tool | undefined>()
    const [workAreas, setWorkAreas] = useState<WorkArea[]>([])
    const [assignedAreaId, setAssignedAreaId] = useState<string>('')
    useEffect(() => {
        if (!!params.toolId) {
            getTool(params.toolId!).then(t => {
                setTool(t);
            }).catch((err) => {
                console.error(err);
                // navigate("/home");
            });
            getAllWorkAreas().then(w => {
                setWorkAreas(w);
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [navigate, params.toolId])

    const grab = () => {
        if (!tool?.id) {
            navigate("/home");
        }
        if (!assignedAreaId) {
            return;
        }
        const assignedArea = workAreas.find(w => w.id === assignedAreaId);
        grabTool(tool!.id, assignedArea!).then(() => navigate("/home"));
    }

    return <Container maxWidth="sm">
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Confirm Tool Assignment
                </Typography>
            </Toolbar>
        </AppBar>
        {!!tool && workAreas.length > 0 && <Card>
            <ToolCard tool={tool} />
            <FormControl fullWidth>
                <InputLabel id="work-area-select-label">Work Area</InputLabel>
                <Select
                    labelId="work-area-select-label"
                    id="work-area-select-select"
                    label="Work Area"
                    value={assignedAreaId}
                    onChange={(event) => setAssignedAreaId(event.target.value)}
                >
                    {workAreas.map(w => <MenuItem key={w.id} value={w.id}>{w.name || w.id}</MenuItem>)}
                </Select>
            </FormControl>
            <CardActions>
                <Button onClick={grab}>Confirm</Button>
                <Button onClick={() => navigate("/home")}>Cancel</Button>
            </CardActions>
        </Card>
        }
    </Container>
}

export default Grab;