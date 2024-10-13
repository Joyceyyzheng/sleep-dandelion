import React, { useRef, useState, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { DirectionalLightHelper } from 'three';
import { Vector3, TextureLoader, DoubleSide, BackSide } from 'three';
// import Slider from '@mui/material/Slider';
import { useStore } from './store';

const MovingLight = () => {

    const lightRef = useRef();
    const helperRef = useRef();
    const planetRef = useRef()
    const { scene } = useThree();

    //  const [dayPhase, setDayPhase] = useState(true);
    const textureLoader = new TextureLoader();
    const initialSkyboxTexture = textureLoader.load('skybox/day.png');
    const [skyboxTexture, setSkyboxTexture] = useState(initialSkyboxTexture);
    const dayTimelineRef = useRef()

    //the point light replacing the carved sun 
    const [pointLightPosition, setPointLightPosition] = useState(new Vector3(1.5, 1, 1));

    // const [dayNumber, setDayNumber] = useState(1)
    const setDayNumber = useStore(state => state.setDayNumber);
    const incrementDayNumber = useStore(state => state.incrementDayNumber);
    const dayPhase = useStore(state => state.dayPhase);
    const setDayPhase = useStore(state => state.setDayPhase);


    const DAY_STAGES = {
        EARLY: 'early',
        LATE: 'late'
    };

    useEffect(() => {
        if (lightRef.current) {
            const helper = new DirectionalLightHelper(lightRef.current, 1, 'white');
            scene.add(helper);
            return () => scene.remove(helper);
        }
    }, [scene]);


    useFrame(({ clock }) => {
        const t = clock.getElapsedTime(); //set an initial realworld time and map real world time
        const duration = 10; //⚠️ where to modify the time duration -> seconds
        const time = (Math.sin(t / duration * Math.PI) + 1) / 2;

        dayTimelineRef.current = Math.cos(t / duration * Math.PI)

        const time_cycle = (t % duration) / duration;
        const phase_cycle = Math.sin(time_cycle * Math.PI * 2);

        // const currentDayPhase = Math.cos(t / duration * Math.PI) >= 0;
        const judgingDayPhaseNum = Math.sin(t / duration * Math.PI)
        const newJudgingDayPhase = Math.sin(t / duration * Math.PI) >= 0;

        if (newJudgingDayPhase !== dayPhase) {
            setDayPhase(newJudgingDayPhase);
        }
        //planet moving trace
        const startPosition = new Vector3(5, 4.5, -3);
        const endPosition = new Vector3(-5, 2, -3);

        const x = startPosition.x + (endPosition.x - startPosition.x) * time_cycle; //was *time
        const y = startPosition.y + (endPosition.y - startPosition.y) * time_cycle;
        const z = startPosition.z + (endPosition.z - startPosition.z) * time_cycle;


        if (lightRef.current) {
            lightRef.current.position.set(x, y, z);
            lightRef.current.lookAt(new Vector3(0, -1, 0));
        }

        if (judgingDayPhaseNum >= 0.42 && judgingDayPhaseNum <= 0.7 && time_cycle <= 0.5) {

            setDayStage(DAY_STAGES.EARLY);
            //   console.info("early")
        } else if (judgingDayPhaseNum > 0.7 && judgingDayPhaseNum <= 0.99 && time_cycle <= 0.5) {
            setDayStage(DAY_STAGES.LATE);
            //    console.info("late")
        } else {
            setDayStage(null);
        }
    });



    useEffect(() => {

        if (dayPhase) {
            console.info("Day");

            const daySkyboxTexture = textureLoader.load('skybox/day.png');
            setSkyboxTexture(daySkyboxTexture);
            incrementDayNumber();
        } else {
            console.info("Night");

            const nightSkyboxTexture = textureLoader.load('skybox/night.png');
            setSkyboxTexture(nightSkyboxTexture);
        }
    }, [dayPhase]);


    const [dayStage, setDayStage] = useState(null);

    useEffect(() => {
        console.info(dayStage)
        if (dayStage === DAY_STAGES.EARLY) {
            console.info("early")
        } else if (dayStage === DAY_STAGES.LATE) {
            console.info("late")
        }
    }, [dayStage]);

    //light and helper
    useFrame(() => {
        if (lightRef.current && planetRef.current) {
            // Set the sphere's position to match the light's position
            planetRef.current.position.copy(lightRef.current.position);
        }
        if (helperRef.current) {
            helperRef.current.update();
        }
    })



    useFrame(({ clock }) => {
        const targetPosition = dayStage === DAY_STAGES.EARLY ? new Vector3(1.5, 1, 1) :
            dayStage === DAY_STAGES.LATE ? new Vector3(0.15, 1.5, 1) :
                new Vector3(1.5, 1, 1); // Default or fallback position

        // Lerp (Linear Interpolation) towards the target position
        pointLightPosition.lerp(targetPosition, 0.01); // Adjust the 0.05 value to control the speed of the transition
        setPointLightPosition(pointLightPosition.clone());
    });
    const planet_night = textureLoader.load('moon.jpg');

    return (
        <>
            <directionalLight ref={lightRef} position={[5, -1, 0]} intensity={10} color="white" />
            {dayStage && <pointLight position={[pointLightPosition.x, pointLightPosition.y, pointLightPosition.z]} intensity={100.0} />}

            <mesh ref={planetRef} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]} >
                <sphereGeometry />
                {dayPhase && <meshStandardMaterial color="orange" map={planet_night} side={DoubleSide} />}
                {!dayPhase && <meshStandardMaterial color="gray" map={planet_night} side={DoubleSide} />}
                {/* <meshStandardMaterial color="yellow" side={DoubleSide} /> */}
            </mesh>
            <mesh>
                <boxGeometry args={[100, 100, 100]} />
                <meshBasicMaterial map={skyboxTexture} side={BackSide} />
            </mesh>


        </>

    );
};
export default MovingLight