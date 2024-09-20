import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import React from 'react';
// this is where the main model sits

export default function Scene() {
    const fbx = useLoader(FBXLoader, '/cat.fbx')
    return <primitive object={fbx} position={[0, -1, 0]} />
}

