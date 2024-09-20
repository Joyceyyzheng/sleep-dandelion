import React, { useRef, useState, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { DirectionalLightHelper } from 'three';
import { Vector3 } from 'three';
import { DoubleSide } from "three";

// import Slider from '@mui/material/Slider';

const MovingLight = () => {
    const lightRef = useRef();
    // console.info(lightRef.current.position)
    const helperRef = useRef();
    // const [duration, setDuration] = useState(30);
    const planetRef = useRef()
    const { scene } = useThree(); // Use useThree hook correctly at the top level


    useEffect(() => {
        if (lightRef.current) {
            const helper = new DirectionalLightHelper(lightRef.current, 1, 'white');
            scene.add(helper);
            return () => scene.remove(helper);
        }
    }, [scene]);


    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        const duration = 10; //⚠️ where to modify the time duration -> seconds
        const time = (Math.sin(t / duration * Math.PI) + 1) / 2;
        // console.info(time)

        const startPosition = new Vector3(5, 5, -3);
        const endPosition = new Vector3(-5, 2, -3);


        const x = startPosition.x + (endPosition.x - startPosition.x) * time;
        const y = startPosition.y + (endPosition.y - startPosition.y) * time;
        const z = startPosition.z + (endPosition.z - startPosition.z) * time;


        if (lightRef.current) {
            lightRef.current.position.set(x, y, z);
            lightRef.current.lookAt(new Vector3(0, -1, 0));
        }
    });

    useFrame(() => {
        if (lightRef.current && planetRef.current) {
            // Set the sphere's position to match the light's position
            planetRef.current.position.copy(lightRef.current.position);
        }
    })


    //helper
    useFrame(() => {
        if (helperRef.current) {
            helperRef.current.update();
        }

    });

    return (
        <>
            <directionalLight ref={lightRef} position={[5, -1, 0]} intensity={10} color="white" />

            <mesh ref={planetRef} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]} >
                <sphereGeometry />
                <meshStandardMaterial color="yellow" side={DoubleSide} />
            </mesh>
            {/* <div style={{ position: 'absolute', top: 20, left: 20, width: '30%' }}>
                <Slider
                    min={10}
                    max={100}
                    value={duration}
                    onChange={handleSliderChange}
                    aria-labelledby="duration-slider"
                />
            </div> */}
        </>

    );
};
export default MovingLight