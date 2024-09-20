
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

function App() {


  const modelActive = useStore(state => state.modelActive);
  const flowerActive = useStore(state => state.flowerActive);

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

        <Canvas>
          {/* <ambientLight intensity={1.0} /> */}
          <MovingLight />
          {flowerActive && <pointLight position={[-1, 0, 1]} intensity={30} />}

          <mesh>

            {/* <boxGeometry /> */}
            <Scene />
            {/* <Flower /> */}

            <Ground />

            <meshStandardMaterial />
          </mesh>
          <OrbitControls />
        </Canvas>

      </div>
    </div>
  );
}

export default App;

