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
    console.info("nodes", nodes, "animations", animations[0])
    console.info("actions", actions)

    const mixer = new THREE.AnimationMixer(test_model.scene);

    useEffect(() => {
        console.log(flowerRef.current);

        console.log("mixer", mixer)

        // if (animations.length === 0) return;

        if (animations.length) {
            animations.forEach(clip => {
                // console.log("animations CLIPS", clip)
                const action = mixer.clipAction(clip)
                // console.info("action", action)
                action.play();
                console.log("action is played")
            });
            return () => {
                if (mixer) {
                    mixer.stopAllAction();
                }
            }
        }
    }, [test_model, animations]);

    useFrame((state, delta) => {
        mixer?.update(delta)
    })

    const [hovered, setHovered] = useState(false);

    return (
        <group ref={flowerRef} dispose={null}
            onPointerOver={(e) => setHovered(true)}
            onPointerOut={(e) => setHovered(false)}>
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