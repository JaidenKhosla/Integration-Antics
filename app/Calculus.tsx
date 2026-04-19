import { getContext } from "@/app/page";
import { Center, TrackballControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useContext, useRef, useState } from "react";
import { Mesh, Vector2 } from "three";

type VolumeProps = {
    points: Vector2[],
    scaleFactor: number
}

export function Volume({ points, scaleFactor } : VolumeProps){
    // camera.zoom = 0.01

    const meshRef = useRef<Mesh|null>(null);

    const context = useContext(getContext());

    const segments = 50;

    const [ useInterior ] = useState<number>(0xffffff * Math.random());
    const [ useExterior ] = useState<number>(0xffffff * Math.random());


    return (
    <Center>
        <TrackballControls rotateSpeed={5} zoomSpeed={3}/>
        <group ref={meshRef} scale={1/scaleFactor} position={[0,0,5]}>
            
                <mesh>
                    <latheGeometry args={[points , segments, 0, 2 * Math.PI]}/>
                    <meshPhongMaterial shininess={60} specular={0xffffff} color={useInterior} side={0}/>
                </mesh> 
                <mesh>
                    <latheGeometry args={[points , segments, 0, 2 * Math.PI]}/>
                    <meshPhongMaterial shininess={60} specular={0xffffff} color={useExterior} side={1}/>
                </mesh>

        </group>
    </Center>
    );
    
}

export default function Model()
{
    const context = useContext(getContext());
    
    return <Canvas>
        <hemisphereLight intensity={0.5}/>
        <directionalLight position={[3,4,3]} castShadow intensity={1.2}/>
        <directionalLight position={[-3,-4,-3]} castShadow intensity={1.2}/>
        {context?.useRes[0] && context.useRes[0].length > 0 && <Volume scaleFactor={1} points={context?.useRes[0]!}/>}
    </Canvas>
}