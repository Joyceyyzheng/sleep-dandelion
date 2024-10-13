import React, { useMemo, useRef } from "react";
import { Points, Point } from "@react-three/drei";
import { useFrame, useThree, extend, useLoader } from "@react-three/fiber"

import * as THREE from 'three';

export default function Fireflies() {
    const count = 50; // Number of fireflies
    const velocities = useRef(
        new Array(count).fill(0).map(() => Math.random() * 0.0008 - 0.0001)
    )
    const geometry = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        const sizes = new Float32Array(count)
        const timeOffsets = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 10
            // positions[i * 3 + 1] = Math.pow(Math.random(), 2) * 1000
            positions[i * 3 + 1] = Math.random(-0.5) * 700
            positions[i * 3 + 2] = (Math.random() - 0.3) * 5

            // colors - yellow-orange-red
            // let r = 0.8 + Math.random() * 0.2
            // let g = 0.5 + Math.random() * 0.5
            // let b = 0

            // colors - blue-purple
            const r = Math.random() * 0.5
            const g = 0
            const b = 1 - 0.5 * Math.random() + 0.5

            colors[i * 3] = r * 30
            colors[i * 3 + 1] = g
            colors[i * 3 + 2] = b * 100

            sizes[i] = 10.0

            timeOffsets[i] = Math.random() * 2 * Math.PI
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(positions, 3)
        )
        geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))
        geometry.setAttribute(
            "timeOffset",
            new THREE.BufferAttribute(timeOffsets, 1)
        )

        // return { positions, color, sizes }
        return geometry
    }, [])


    useFrame(({ clock }) => {

        const elapsedTime = clock.getElapsedTime()

        const positions = geometry.attributes.position.array
        const sizes = geometry.attributes.size.array
        const colors = geometry.attributes.color.array

        for (let i = 0; i < count; i++) {
            positions[i * 3] += Math.sin(elapsedTime + i) * velocities.current[i]

            positions[i * 3 + 1] =
                Math.sin(elapsedTime * 0.06 + i * 0.5) * 0.5 + velocities.current[i]
            positions[i * 3 + 2] +=
                Math.cos(elapsedTime + i) * velocities.current[i] * 0.1

            sizes[i] = 0.02 + 0.03 * Math.sin(0.1 * i + elapsedTime)

            colors[i * 3 + 1] = 0.5 + 0.5 * Math.sin(elapsedTime + i * 0.1)
        }
        geometry.attributes.position.needsUpdate = true
        geometry.attributes.size.needsUpdate = true
        geometry.attributes.color.needsUpdate = true
    })


    // Generate random positions
    const positions = useMemo(() => {
        const pos = new Array(count).fill().map(() => {
            return [
                Math.random() * 3 - 1, // x position
                Math.random() * 3 - 1, // y position
                Math.random() * 3 - 1  // z position
            ];
        });
        return pos;
    }, [count]);

    return (
        <>
            {/* <Points
                limit={1000} // Max amount of items for buffer size calculation
                range={20}  // Draw range
            >
                <pointsMaterial vertexColors size={5} sizeAttenuation={false} />

                {positions.map((pos, index) => (
                    <Point
                        key={index}
                        position={pos}
                        color="white" // You can also randomize or set specific colors if needed
                    />
                ))}
            </Points> */}
            <points geometry={geometry}>
                <bufferAttribute
                    attach={"geometry-color"}
                    array={geometry.color}
                    count={count}
                    itemSize={3}
                // normalized
                />
                {/* </bufferGeometry> */}
                <pointsMaterial
                    // color={color}
                    vertexColors
                    transparent
                    alphaTest={0.5}
                    // map={sprite}
                    normalized
                    size={0.012}
                    sizeAttenuation
                // opacity={opacity}
                // side={DoubleSide}
                />
            </points>
        </>
    );
};
