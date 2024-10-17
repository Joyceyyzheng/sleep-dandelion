import { React, useRef, useEffect, useState, useMemo, Suspense } from "react"
import * as THREE from "three"
import { useThree, useFrame, useLoader } from "@react-three/fiber"
import { useGLTF, useAnimations, useTexture } from "@react-three/drei"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import useStore from "./store"

function Model() {
    const flowerRef = useRef()
    const test_model = useLoader(GLTFLoader, '/models/dandelion_test.glb')

    const { actions } = useAnimations(test_model.animations, test_model.scene);
    const { nodes, animations } = useGLTF("/models/dandelion_test.glb")
    // const { actions } = useAnimations(animations, flowerRef)
    const mixer = useRef(new THREE.AnimationMixer(null));
    const [hovered, setHovered] = useState(false);
    const [animationPlayed, setAnimationPlayed] = useState(false);
    const [groupOne, setGroupOne] = useState([0, 1]);
    const [groupTwo, setGroupTwo] = useState([2]);
    const dayNumber = useStore(state => state.dayNumber);
    console.info(nodes)


    // const mixer = new THREE.AnimationMixer(test_model.scene);
    useEffect(() => {
        mixer.current = new THREE.AnimationMixer(test_model.scene);
        console.log("mixer", mixer.current)
    }, [test_model]);

    useEffect(() => {
        if (!animationPlayed && animations.length > 0) {
            if (dayNumber === 1) {
                groupOne.forEach(index => {
                    if (animations[index]) {
                        const action = mixer.current.clipAction(animations[index]);
                        action.setLoop(THREE.LoopOnce);
                        action.clampWhenFinished = true;
                        action.play();
                    }
                });
                setAnimationPlayed(true); // Ensures animations are played only once
            }
        }
    }, [animations, animationPlayed, groupOne, dayNumber]);

    useEffect(() => {
        if (animations.length > 0) {

            if (dayNumber === 2) {
                groupTwo.forEach(index => {
                    if (animations[index]) {
                        const action = mixer.current.clipAction(animations[index]);
                        action.setLoop(THREE.LoopOnce);
                        action.clampWhenFinished = true;
                        action.play();
                        // console.log("day2 is played")
                    }
                });
                setAnimationPlayed(true); // Ensures animations are played only once
            }
        }
    }, [animations, animationPlayed, groupTwo, dayNumber]);


    useFrame((state, delta) => {
        if (mixer.current) {
            mixer.current.update(delta); // Update the mixer on each frame
        }
    });


    return (
        <group ref={flowerRef} dispose={null}
        // onPointerOver={() => setHovered(true)}
        // onPointerOut={() => setHovered(false)}
        >
            <primitive object={test_model.scene} position={[0, -1, 0]} scale={[0.1, 0.1, 0.1]}>
                <meshStandardMaterial
                    // ref={planeMaterialRef}
                    //⚠️ updating material type
                    attach="material"
                    side={THREE.DoubleSide}
                />
            </primitive>
        </group>
    )
}

export default function AnimatedFlower() {
    return (
        <>
            <Model />
        </>
    )
}


useGLTF.preload("/models/Airplane19.glb")