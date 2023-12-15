import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Avatar, Box, Button, Container, Grid, Stack, Tab, Tabs, Tooltip, styled } from "@mui/material";
import { ChangeEvent, useRef, useState, DragEvent } from "react";
import { Panel } from "react-resizable-panels";
import { ViewInArRounded, FileUploadOutlined} from '@mui/icons-material';

/*

This creates the contents for the Object Catalogue Panel including:
    - Shared/Project Media Tabs
    - Draggable Media Icons
    - Media Upload Button

Line 89 is where file uploading should be handled

*/

export type MediaItemProps = {
    name: string        // Name of Media
    type: string        // Media Type
    url: string         // S3 URL to Media 
    thumbnail: string   // URL of Thumbnail
}

// Shaded box with hover animation to display items in catalogue
function CatalogueItem ( {children, media, drag, ...props} : any) {

    const { thumbnail, name, url, type } = media;

    // Data that will be given to the stage when a catalogue item is dropped
    function setDragData(event: DragEvent<HTMLDivElement>) {
        event.dataTransfer.setData('text', JSON.stringify({ type: type, url: url}))
    }
    
    return <Grid draggable={drag} onDragStart={setDragData}>
            <Tooltip title={name}>
            {/* @ts-ignore */}
            <Box sx={{
                width: 80,
                height: 80,
                margin: 1,

                backgroundImage: `url(${thumbnail})`,
                backgroundPosition: "center",
                backgroundSize: "cover",

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                borderRadius: "8px",
                boxShadow: 1,

                transition: "all .15s",
                "&:hover": {
                    width: 86,
                    height: 86,
                    margin: 0.6,
                }
                
            }}>

                {( thumbnail == "" && !children ? <ViewInArRounded sx={{color: "rgba(0, 0, 0, 0.4)"}} fontSize="large"/> : <></> )}
                {children}
            </Box>
        </Tooltip>
    </Grid>
}

// Shared media grid
const SharedMedia = ( {children} : any ) => {
    return <Grid container>
        {children}
    </Grid>
}

// Project media grid (includes upload button)
const ProjectMedia = ( {children} : any ) => {

    const inputRef = useRef<HTMLInputElement>(null);

    // Handle File Upload
    const fileUpload = ( event : ChangeEvent<HTMLInputElement> ) => {
        if (event.target.files == null) return;
        const file = event.target.files[0];

        /*
        
        Do something with the uploaded file here.

        */
    }

    return <Grid container>
        {children}

        {/* Media upload button */}
        <CatalogueItem media={{name: "Upload File"}} >
            <input onChange={fileUpload} ref={inputRef} style={{display: "none"}} type="file"></input>
            <FileUploadOutlined onClick={() => {inputRef.current?.click()}} sx={{color: "rgba(0, 0, 0, 0.4)", padding: "24px"}} fontSize="large"/>
        </CatalogueItem>

    </Grid>
}

// OCP
export default function ObjectCataloguePanel( { sharedMedia, projectMedia } : any ) {

    const [tab, setTab] = useState('1')

    // Swap the tab being displayed
    const swapTab = (event: React.SyntheticEvent, newTab: string) => setTab(newTab)

    return <Panel defaultSize={30} style={{overflowY: "auto"}}>
        {/* @ts-ignore */}
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab}>

                {/* Tab Selector */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={swapTab} >
                        <Tab label="Shared Media"  value="1" />
                        <Tab label="Project Media" value="2" />
                    </TabList>
                </Box>

                {/* Shared Media */}
                <TabPanel value="1">
                    <SharedMedia>
                        {sharedMedia.map( (media : MediaItemProps) => <CatalogueItem key={media.url} media={media} drag/> )}
                    </SharedMedia>
                </TabPanel>

                {/* Project Media */}
                <TabPanel value="2">
                    <ProjectMedia>
                        {projectMedia.map( (media : MediaItemProps) => <CatalogueItem key={media.url} media={media} drag/> )}
                    </ProjectMedia>
                </TabPanel>

            </TabContext>
        </Box>
    </Panel>
}