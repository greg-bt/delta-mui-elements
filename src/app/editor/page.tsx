'use client'
import { Box, Button, Container, Typography } from "@mui/material";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ObjectHierarchyPanel from "@/common/containers/editor/objectHierarchyPanel";
import ObjectCataloguePanel from "@/common/containers/editor/objectCataloguePanel";
import Stage from "@/common/containers/editor/stage";
import { useState } from "react";


/*

This creates the resizeable layout for the editor.
The components in 'common\containers\editor' can be edited to change what appears in the editor.

Most of the existing PD code should be moved into 'common\containers\editor\stage.tsx'

*/

const ResizeHandle = () => {
    return <PanelResizeHandle style={{ flex: "0 0 2px" }} >
        {/* @ts-ignore */}
        <Box sx={{
            height: "100%",
            backgroundColor: "divider",
            transition: "all .2s",
            "&:hover": {
                backgroundColor: "#3483ff99",
            }
        }}></Box>
    </PanelResizeHandle>
}


function media(name : string, url : string, thumbnail : string) {
    return {
        name: name,
        url: url,
        thumbnail: thumbnail,
        type: "TODO"    // TODO
    }
}



export default function Editor() {


    /*
        TEST DATA START
    */
   

    const SHARED_MEDIA_TESTDATA  = [ media("R8 Chair", "./R8Chair.gltf", "./R8Chair.gltf.thumbnail.jpg"),  media("R8 Desk", "./R8Desk.gltf", "./R8Desk.gltf.thumbnail.jpg")  ];
    const PROJECT_MEDIA_TESTDATA = [ media("Project 1", "/obj1", ""), media("Project 2", "/obj2", ""), media("Project 3", "/obj3", "") ];


    /*
        TEST DATA END
    */

    return (
        <main style={{height: "100vh"}}>

            <PanelGroup direction="horizontal">

                <Panel defaultSize={80}>
                    <PanelGroup direction="vertical">

                        <Stage />
                        <ResizeHandle />
                        <ObjectCataloguePanel sharedMedia={SHARED_MEDIA_TESTDATA} projectMedia={PROJECT_MEDIA_TESTDATA}/>

                    </PanelGroup>
                </Panel>

                <ResizeHandle />

                <Panel defaultSize={20}>
                    <PanelGroup direction="vertical">

                        <ObjectHierarchyPanel />
                        <ResizeHandle />
                        <Panel defaultSize={20}><Typography variant="body1">Selected Object Properties</Typography></Panel>
                 
                    </PanelGroup>
                </Panel>
                

            </PanelGroup>

        </main>
    )
}