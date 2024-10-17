
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
import AnimatedFlower from './AnimatedFlower';


function App() {
  const modelActive = useStore(state => state.modelActive);
  const flowerActive = useStore(state => state.flowerActive);
  const dayPhase = useStore(state => state.dayPhase);

  useEffect(() => {

    if (modelActive === true) {
      // console.info("modelActive=true");
    }
  }, [modelActive]);

  useEffect(() => {

    if (flowerActive === true) {
      //  console.info("flowerActive=true");
    }
  }, [flowerActive]);

  return (
    <div className="App">

      <div id="canvas-container">

        <StaticUI />

        <Canvas onCreated={(state) => {/* console.log(state)*/ }} gl={{ antialias: false }} >
          <ambientLight intensity={3.0} />
          <pointLight position={[-0.5, -2, 1]} intensity={1} />
          <MovingLight />
          {/* <Ground /> */}
          {!dayPhase && <Fireflies />}
          <AnimatedFlower />
          <mesh>
            <Scene />
            {/* <meshStandardMaterial /> */}
          </mesh>

          <OrbitControls />
          <CamUsage />


        </Canvas>

      </div>
    </div >
  );
}

export default App;

