import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import React from 'react';
// this is where the main model sits

export default function Scene() {
    const fbx_dirt = useLoader(FBXLoader, '/mockup_dirt.fbx')
    const fbx_flower = useLoader(FBXLoader, '/mockup_flower.fbx')
    const fbx_tree = useLoader(FBXLoader, '/mockup_tree.fbx')
    return <>
        <group position={[0, -1, 1]} scale={[2, 2, 2]}>
            <primitive object={fbx_dirt} position={[0, 0, 0]} />
            <primitive object={fbx_flower} position={[0, 0, 0]} />
            <primitive object={fbx_tree} position={[0, 0, 0]} />
        </group>
    </>
}

