
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
// import PerformanceStats from './PerformanceStats';
import CamUsage from './CamUsage';

function App() {


  const modelActive = useStore(state => state.modelActive);
  const flowerActive = useStore(state => state.flowerActive);

  // let stats = new Stats()

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

  // if (modelActive == true) {
  //   console.info("modelactive=true")
  // }
  return (
    <div className="App">

      <div id="canvas-container">

        <StaticUI />

        <Canvas >
          <ambientLight intensity={4.0} />
          <pointLight position={[-0.5, -2, 1]} intensity={1} />
          <MovingLight />
          {flowerActive && <pointLight position={[-1, 0, 1]} intensity={30} />}

          <mesh>
            {/* <Flower /> */}
            {/* <boxGeometry /> */}
            <Scene />

            {/* original sphere and plane for test */}
            {/* <Ground /> */}

            <meshStandardMaterial />
          </mesh>
          <OrbitControls />
          <CamUsage />
          {/* <PerformanceStats /> */}
        </Canvas>

      </div>
    </div>
  );
}

export default App;

