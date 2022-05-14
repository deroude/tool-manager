import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    IconButton,
    Table,
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper,
    FormControl,
    Input,
    InputAdornment,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { ChangeEvent, useEffect, useState } from "react";
import { getAllTools, Tool } from "../../services/Tools";
import { logout } from "../../services/Auth";
import { useNavigate } from "react-router-dom";

function Inventory() {

    const [tools, setTools] = useState<Tool[]>([]);
    const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllTools().then(tls => {
            setTools(tls);
            setFilteredTools(tls);
        })
    }, [])

    const exit = async () => {
        await logout();
        navigate("/");
    }

    const search = (ev: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = ev.target.value;
        if (!searchTerm) {
            setFilteredTools(tools);
        }
        setFilteredTools(tools.filter(t =>
            t.assignedAreaName?.includes(searchTerm) ||
            t.assignedUserName?.includes(searchTerm) ||
            t.brand?.includes(searchTerm) ||
            t.model?.includes(searchTerm) ||
            t.type?.includes(searchTerm)))
    }

    return <Container maxWidth="sm">
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Tool Inventory
                </Typography>
                <IconButton aria-label="logout" color="inherit" onClick={exit}>
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
        <FormControl variant="outlined">
            <Input
                onChange={search}
                id="search-input"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
        </FormControl>
        <TableContainer component={Paper}>
            <Table size="small" aria-label="tool table">
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Assigned User</TableCell>
                        <TableCell>Assigned Work Area</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredTools.map((tool) => (
                        <TableRow
                            key={tool.id}
                        >
                            <TableCell>{tool.type || 'N/A'}</TableCell>
                            <TableCell>{tool.brand || 'N/A'}</TableCell>
                            <TableCell>{tool.model || 'N/A'}</TableCell>
                            <TableCell>{tool.assignedUserName || 'N/A'}</TableCell>
                            <TableCell>{tool.assignedAreaName || 'N/A'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
}

export default Inventory;