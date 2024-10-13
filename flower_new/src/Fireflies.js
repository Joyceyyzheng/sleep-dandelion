import React, { useMemo } from "react";
import { Points, Point } from "@react-three/drei";


export default function Fireflies() {
    let count = 50
    const positions = new Float32Array(count * 3);
    return (
        <Points
            limit={1000} // Optional: max amount of items (for calculating buffer size)
            range={10} // Optional: draw-range
        >
            <pointsMaterial vertexColors />

            <Point position={[5, 1, 1]} color="black" />
            <Point position={[10, 2, 3]} color="black" />

        </Points>

    )

};
