import { Typography } from "@mui/material";
import { Panel } from "react-resizable-panels";

/*

Nothing here yet

*/

export default function ObjectHierarchyPanel() {
    return (
        <Panel defaultSize={80} style={{overflowY: "auto"}}>
            <Typography variant="h5">Object Hierarchy Panel</Typography>
        </Panel>
        
    )
}