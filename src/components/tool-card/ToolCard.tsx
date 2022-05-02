import { Avatar, CardHeader } from "@mui/material";
import ToolIcon from '@mui/icons-material/Handyman';
import { Tool } from "../../services/Tools";

function ToolCard({ tool }: { tool: Tool }) {
    return <CardHeader
        avatar={
            tool.image ? <Avatar src={tool.image}></Avatar> :
                <Avatar><ToolIcon /></Avatar>
        }
        title={`${tool.brand} ${tool.model}`}
        subheader={tool.id}
    />
}

export default ToolCard;