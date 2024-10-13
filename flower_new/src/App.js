
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
import { PerspectiveCamera } from '@react-three/drei'
import Fireflies from './Fireflies';
import ShinyParticles from './ShinyParticles';

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

        <Canvas onCreated={(state) => { console.log(state) }} gl={{ antialias: false }} dpr={[1, 2]}>
          <ambientLight intensity={3.0} />
          <pointLight position={[-0.5, -2, 1]} intensity={1} />
          <MovingLight />
          {/* {flowerActive && <pointLight position={[-1, 0, 1]} intensity={30} />} */}
          <Fireflies />
          {/* <ShinyParticles /> */}
          <mesh>

            {/* <Scene /> */}

            {/* original sphere and plane for test */}
            {/* <Ground /> */}

            <meshStandardMaterial />
          </mesh>

          <OrbitControls />
          <CamUsage />
          {/* <PerspectiveCamera
            makeDefault
            fov={50}
            position={[0, 1.3, 2.5]}
            rotation={[3, 10, Math.PI / 2]}
          /> */}
          {/* <PerformanceStats /> */}
        </Canvas>

      </div>
    </div >
  );
}

export default App;

