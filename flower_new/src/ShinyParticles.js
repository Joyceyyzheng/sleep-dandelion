
import * as THREE from "three"
import { useRef, useMemo, useState, useEffect } from "react"
import { useFrame, useThree, extend, useLoader } from "@react-three/fiber"

import { Vector2, DoubleSide } from "three"

import { BufferAttribute } from "three"
import { geometry, random } from "maath"
import { shaderMaterial } from "@react-three/drei"

import { useTexture } from "@react-three/drei"
import { TextureLoader } from "three/src/loaders/TextureLoader"

const yellow = new THREE.Color(0xffff00)
const orange = new THREE.Color(0xffa300)
const blue = new THREE.Color(0x0028a8)
const purple = new THREE.Color(0x5800ac)



export default function ShinyParticles({ startOffset }) {
    const particlesRef = useRef()
    const groupRef = useRef()
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })
    const count = 180

    const velocities = useRef(
        new Array(count).fill(0).map(() => Math.random() * 0.0008 - 0.0001)
    )
    const textureLoader = new THREE.TextureLoader()

    // const sprite = useLoader(TextureLoader, "../textures/disc.png")
    const sprite = textureLoader.load("../textures/disc.png")

    //console.info(sprite)

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

    //const [yOffset, setYOffset] = useState(0)

    // useEffect(() => {
    //   const handleResize = () => {
    //     setWindowSize({
    //       width: window.innerWidth,
    //       height: window.innerHeight,
    //     })
    //   }

    //   window.addEventListener("resize", handleResize)
    //   // Trigger initially to set correct offset
    //   handleResize()
    //   return () => window.removeEventListener("resize", handleResize)
    // }, [])

    //responsiveness
    useEffect(() => {
        if (groupRef.current) {
            let yOffset = 0 // Default offset
            if (windowSize.width > 740) {
                if (windowSize.height > windowSize.width) {
                    yOffset = -2.1
                    console.info("1") // Set yOffset to 0 if the window is taller than it is wide
                } else if (windowSize.height <= 430) {
                    yOffset = 5.2
                    console.info("2")
                } else if (windowSize.height <= 650) {
                    yOffset = 1.0
                    console.info("3")
                }
            } else if (windowSize.width <= 740) {
                if (windowSize.height > windowSize.width) {
                    yOffset = -1.6
                    console.info("4")
                } else {
                    yOffset = 2.9
                    console.info("5")
                }
                // Set yOffset to -1.0 if the window width is less than 768px
            } else {
                // yOffset = windowSize.width * 0.005 // Calculate based on window width otherwise
            }

            //  const yOffset = 1.0
            //mobile 1.0, ipad hori -1.0
            groupRef.current.position.y = yOffset // Adjust the group's y position
        }
    }, [windowSize])

    //mouse interactivity
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (event) => {
            const posX = (event.clientX / window.innerWidth) * 2 - 1
            const posY = (event.clientY / window.innerHeight) * 2 - 1
            setMousePosition({ x: posX, y: posY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    useEffect(() => {
        if (!particlesRef.current) return

        const colors = geometry.attributes.color.array
        const influence = (mousePosition.x + 1) / 2
        // console.info("influ", influence)

        for (let i = 0; i < count; i++) {
            colors[i * 3] = (1 - influence) * 0.5
            colors[i * 3 + 1] = 0
            colors[i * 3 + 2] = influence * 180
        }

        geometry.attributes.color.needsUpdate = true
    }, [mousePosition])

    //scrolling interactivity

    // const [htmlAnimationTriggered, setHtmlAnimationTriggered] = useState(false)
    // const scroll = useScroll()
    // const htmlRef = useRef()
    // const AboutHtmlTriggerPercentage = -0.1
    // useFrame(() => {
    //   if (scroll && htmlRef) {
    //     const handleScroll = () => {
    //       const triggerPoint = scroll.offset * scroll.pages
    //       if (2.9 <= triggerPoint <= 4.9) {
    //         //change the color
    //         const influence = Math.max(
    //           0,
    //           Math.min(1, (triggerPoint - 3.2) / (4.9 - 3.2))
    //         ) // Normalize between 0 and 1
    //         console.info("Scroll influence", influence)
    //         const colors = geometry.attributes.color.array
    //         for (let i = 0; i < count; i++) {
    //           colors[i * 3] = (1 - influence) * 0.5 // Red decreases as triggerPoint increases
    //           colors[i * 3 + 1] = 0 // Green remains constant
    //           colors[i * 3 + 2] = influence * 200 // Blue increases as triggerPoint increases
    //         }
    //         geometry.attributes.color.needsUpdate = true
    //       }
    //       //  console.info(triggerPoint)
    //       if (
    //         triggerPoint > AboutHtmlTriggerPercentage + startOffset &&
    //         !htmlAnimationTriggered
    //       ) {
    //         setHtmlAnimationTriggered(true)
    //       }
    //     }
    //     handleScroll()
    //   }
    // })

    //update all attributes
    useFrame(({ clock }) => {
        if (particlesRef.current) {
            const material = particlesRef.current.material

            //for the shader material:
            // material.uniforms.elapsedTime.value = clock.getElapsedTime()
        }

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

    return (
        // <StaticPage startOffset={startOffset}>
        <group ref={groupRef}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />

            <points geometry={geometry} ref={particlesRef}>
                {/* <bufferGeometry attach="geometry"> */}
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
                    map={sprite}
                    normalized
                    size={0.012}
                    sizeAttenuation
                    // opacity={opacity}
                    side={DoubleSide}
                />
                {/* the shader material: */}
                {/* <pointMaterial size={0.01} vertexColors sizeAttenuation /> */}
            </points>
        </group>
        // </StaticPage>
    )
}