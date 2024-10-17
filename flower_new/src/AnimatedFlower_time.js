import { React, useRef, useEffect, useState, Suspense } from "react"
import * as THREE from "three"
import { useThree, useFrame, useLoader } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import useStore from "./store"

//this script is for step-by-step triggering of animations
function Model() {
    const flowerRef = useRef()
    const test_model = useLoader(GLTFLoader, '/models/dandelion_keyframetest_02.glb')
    const { nodes, animations } = useGLTF("/models/dandelion_keyframetest_02.glb")
    //console.info(animations.length)
    const { actions } = useAnimations(test_model.animations, test_model.scene);
    const mixer = useRef(new THREE.AnimationMixer(null));
    const [animationPlayed, setAnimationPlayed] = useState(false);
    // const [groupOne, setGroupOne] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
    //0-21,22-43,44-65,66-87,88-109,110-131,132-153,154-175,176-197,198-219

    const desiredDuration = 141; // total duration in seconds for all animations
    const actualDuration = animations.reduce((acc, anim) => acc + anim.duration, 0); // sum of all animation durations
    console.info("actualDuration", actualDuration)
    const playbackSpeed = desiredDuration / actualDuration;
    const dayNumber = useStore(state => state.dayNumber);

    // const mixer = new THREE.AnimationMixer(test_model.scene);
    useEffect(() => {
        mixer.current = new THREE.AnimationMixer(test_model.scene);
        console.log("mixer", mixer.current)
    }, [test_model]);


    useEffect(() => {
        if (animations.length > 0) {
            // mixer.current.stopAllAction();
            animations.forEach(clip => {
                const action = mixer.current.clipAction(clip);
                action.setLoop(THREE.LoopRepeat);

                // action.setLoop(THREE.LoopOnce);
                //  action.clampWhenFinished = true;
                // console.info(animations)
                action.setDuration(desiredDuration);
                // action.setEffectiveTimeScale(playbackSpeed);
                action.play();

            });
            return () => {
                if (mixer.current) {
                    mixer.current.stopAllAction();
                }
            }
        }
    }, [animations, test_model, playbackSpeed]);

    useFrame((state, delta) => {
        mixer.current.update(delta);
    });

    return (
        <group ref={flowerRef} dispose={null}

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

export default function AnimatedFlowerTime() {
    return (
        <>
            <Model />
        </>
    )
}

