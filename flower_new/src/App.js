
import React from 'react';
import './App.css';

import { Canvas } from '@react-three/fiber'
import Scene from './Scene';
// import { AmbientLight } from 'three';
import { OrbitControls } from '@react-three/drei'
import StaticUI from './StaticUI';
import { useStore } from './store';
import { useEffect } from 'react';
import Ground from './Ground';
// import Flower from './Flower';
import MovingLight from './MovingLight';
import CamUsage from './CamUsage';
import { PerspectiveCamera } from '@react-three/drei'
import Fireflies from './Fireflies';
import ShinyParticles from './ShinyParticles';

function App() {
  const modelActive = useStore(state => state.modelActive);
  const flowerActive = useStore(state => state.flowerActive);
  const dayPhase = useStore(state => state.dayPhase);

  useEffect(() => {

    if (modelActive === true) {
      console.info("modelActive=true");
    }
  }, [modelActive]);

  useEffect(() => {

    if (flowerActive === true) {
      console.info("flowerActive=true");
    }
  }, [flowerActive]);

  //day night phase cycle
  // const useDayNightCycle = () => {
  //   const setDayPhase = useStore(state => state.setDayPhase);

  //   useEffect(() => {
  //     const updateDayPhase = () => {
  //       const hour = new Date().getHours();
  //       const newPhase = (hour >= 6 && hour < 18) ? 'day' : 'night';
  //       setDayPhase(newPhase);
  //       console.info(newPhase)
  //     };

  //     updateDayPhase();  // Update on mount
  //     const intervalId = setInterval(updateDayPhase, 3600000); // Check every hour

  //     return () => clearInterval(intervalId); // Cleanup on unmount
  //   }, [setDayPhase]);
  // }
  // useDayNightCycle();
  return (
    <div className="App">

      <div id="canvas-container">

        <StaticUI />

        <Canvas onCreated={(state) => { console.log(state) }} gl={{ antialias: false }} >
          <ambientLight intensity={3.0} />
          <pointLight position={[-0.5, -2, 1]} intensity={1} />
          <MovingLight />
          {/* {flowerActive && <pointLight position={[-1, 0, 1]} intensity={30} />} */}
          {!dayPhase && <Fireflies />}
          {/* <Fireflies /> */}

          <mesh>
            <Scene />
            {/* <meshStandardMaterial /> */}
          </mesh>

          <OrbitControls />
          <CamUsage />
          {/* <PerspectiveCamera
            makeDefault
            fov={50}
            position={[0, 1.3, 2.5]}
            rotation={[3, 10, Math.PI / 2]}
          /> */}

        </Canvas>

      </div>
    </div >
  );
}

export default App;

