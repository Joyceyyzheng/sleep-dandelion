import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export default function CamUsage() {
    const { camera } = useThree(); // Destructure camera from the returned object

    // Log the camera position
    console.log(camera.position); // Outputs: THREE.Vector3

    useEffect(() => {
        camera.position.set(0, 1.4, 2.5);
        camera.fov = 60;
        camera.updateProjectionMatrix();
        // camera.lookAt(0, 0, 0); // Ensuring the camera is looking at the center
    }, [camera]);



    return null; // This component does not render anything
}
