
import './App.css';
import React from 'react';
import { DoubleSide } from "three";


export default function Ground() {


    return (
        <>

            <mesh position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[5, 10, 8]} >
                <planeGeometry />

                <meshStandardMaterial color="green" side={DoubleSide} />
            </mesh>

            <mesh position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]} >
                <sphereGeometry />
                <meshStandardMaterial color="green" side={DoubleSide} />
            </mesh>

            {/* <mesh position={[5, 5, -3]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]} >
                <sphereGeometry />
                <meshStandardMaterial color="red" side={DoubleSide} />
            </mesh>

            <mesh position={[-5, 2, -3]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]} >
                <sphereGeometry />
                <meshStandardMaterial color="black" side={DoubleSide} />
            </mesh> */}
        </>



    );
}


