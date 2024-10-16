import { React, useRef, useEffect, useState, useMemo, Suspense } from "react"
import * as THREE from "three"
import { useThree, useFrame, useLoader } from "@react-three/fiber"
import { useGLTF, useAnimations, useTexture } from "@react-three/drei"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Model() {
    const flowerRef = useRef()
    const test_model = useLoader(GLTFLoader, '/models/dandelion_test.glb')
    const { actions } = useAnimations(test_model.animations, test_model.scene);
    const { nodes, animations } = useGLTF("/models/dandelion_test.glb")
    // const { actions } = useAnimations(animations, flowerRef)
    const mixer = useRef(new THREE.AnimationMixer(null));
    const [hovered, setHovered] = useState(false);
    const [animationPlayed, setAnimationPlayed] = useState(false);
    const [groupOne, setGroupOne] = useState([0, 2]);


    // const mixer = new THREE.AnimationMixer(test_model.scene);
    useEffect(() => {
        ; // Attach the scene to the mixer
        mixer.current = new THREE.AnimationMixer(test_model.scene);
        console.log("mixer", mixer.current)
    }, [test_model]);

    useEffect(() => {
        if (hovered && !animationPlayed && animations.length > 0) {
            const clip = animations[0]; // Assume you want to play the first animation
            const action = mixer.current.clipAction(clip);
            console.log("action", action)
            action.setLoop(THREE.LoopOnce);
            action.clampWhenFinished = true;
            action.play();
            setAnimationPlayed(true); // Ensures animation is played only once
        }
    }, [hovered, animations, animationPlayed]);

    // useEffect(() => {

    //     console.log(flowerRef.current);
    //     console.log("mixer", mixer)
    //     console.info("nodes", nodes, "animations", animations[0])
    //     console.info("actions", actions)

    //     // if (animations.length === 0) return;

    //     if (animations.length) {
    //         animations.forEach(clip => {
    //             // console.log("animations CLIPS", clip)
    //             //  const action = mixer.clipAction(clip)
    //             // console.info("action", action)
    //             // action.play();
    //             console.log("action is played")
    //         });
    //         return () => {
    //             if (mixer) {
    //                 //  mixer.stopAllAction();
    //             }
    //         }
    //     }
    // }, [test_model, animations, mixer.current]);

    useFrame((state, delta) => {
        //  mixer?.update(delta)
    })
    useFrame((state, delta) => {
        if (mixer.current) {
            mixer.current.update(delta); // Update the mixer on each frame
        }
    });


    return (
        <group ref={flowerRef} dispose={null}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <primitive object={test_model.scene} position={[0, -1, 0]} scale={[0.1, 0.1, 0.1]} />
            {/* <skinnedMesh
                castShadow
                receiveShadow
            // geometry={nodes.Plane.geometry}
            // skeleton={nodes.Plane.skeleton}
            >
                 <Suspense fallback={null}>
                    <meshBasicMaterial
                        // ref={planeMaterialRef}
                        attach="material"
                        side={THREE.DoubleSide}
                    // map={playing ? PlaneVideoTexture : PlanePosterTexture}
                    />
                </Suspense>
            </skinnedMesh> */}

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