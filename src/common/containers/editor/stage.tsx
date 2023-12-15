import { Box } from "@mui/material";
import { Panel } from "react-resizable-panels";
import { DragEvent, useState } from 'react';
import { Canvas, extend, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, TransformControls, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import React from "react";

/*

Most of this code should be replaced with the PD editor code.

The key parts to note are allowDrag() and mediaDropped(), while allow and then handle media being drag and dropped from the OCP

*/

type incomingMedia = {
    type: string
    url: string
}

export default function Stage() {

    const [models, setModels] = useState( [] );

    // Allow media to be dragged from catalogue
    function allowDrag(event: DragEvent<HTMLDivElement>) { event.preventDefault()}

    // Receive dropped media
    function mediaDropped(event: DragEvent<HTMLDivElement>) {
        const media : incomingMedia = JSON.parse(event.dataTransfer.getData('text'));

        // @ts-ignore
        setModels( [...models, media.url] );

        // TODO: Raytrace mouse position
    }

    // TEST CODE (adds model to scene)
    function TESTMODEL({ url } : any) {
        
        if (url == "") return <></>;
        const gltf : any = useLoader(GLTFLoader, url);

        return (
            <TransformControls>
              <primitive object={gltf.scene} />
              </TransformControls>
          );
    }


    return <Panel defaultSize={70} >


        <Canvas onDragOver={allowDrag} onDrop={mediaDropped} camera={{ position: [-2, 1, 7], fov: 90 }} shadows>

            <gridHelper args={[100, 100]} />

            <OrbitControls makeDefault />


                { models.map( model => { return <TESTMODEL key={model} url={model} /> }) }

            <directionalLight
                position={[50,180,50]}
                color={0xFFFAd8}
                intensity={4.5}
                castShadow
                shadow-bias={-0.0001}
            />

            <Environment background files={"./kloofendal_48d_partly_cloudy_puresky_2k.hdr"} />

                
        </Canvas>


        
    </Panel>
}