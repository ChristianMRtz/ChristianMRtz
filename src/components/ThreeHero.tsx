// @ts-nocheck
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const colors = ["#38bdf8", "#818cf8", "#0ea5e9"];

type MoveAxis = "x" | "y" | "z";

type Move = {
    axis: MoveAxis;
    layer: -1 | 0 | 1; // cuál capa gira
    dir: 1 | -1;       // +90° o -90°
    duration: number;  // segundos
};

const cubeSize = 1;
const gap = 0.08;
const offset = cubeSize + gap;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const RubiksCube: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const cubeRefs = useRef<THREE.Mesh[]>([]);
    const isDraggingRef = useRef(false);
    const previousMouseRef = useRef({ x: 0, y: 0 });
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const rotationVelocityRef = useRef({ x: 0, y: 0 });
    const userRotationRef = useRef({ x: 0, y: 0 });

    // Listener del mouse para drag y posición
    React.useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            isDraggingRef.current = true;
            previousMouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Actualizar posición normalizada del mouse
            mousePositionRef.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1
            };

            // Si está arrastrando, calcular delta
            if (isDraggingRef.current) {
                const deltaX = e.clientX - previousMouseRef.current.x;
                const deltaY = e.clientY - previousMouseRef.current.y;

                rotationVelocityRef.current.y = deltaX * 0.01;
                rotationVelocityRef.current.x = -deltaY * 0.01;

                userRotationRef.current.y += deltaX * 0.005;
                userRotationRef.current.x += -deltaY * 0.005;

                previousMouseRef.current = { x: e.clientX, y: e.clientY };
            }
        };

        const handleMouseUp = () => {
            isDraggingRef.current = false;
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Coordenadas lógicas iniciales (-1,0,1)
    const initialGrid = useMemo(
        () => {
            const temp: { x: -1 | 0 | 1; y: -1 | 0 | 1; z: -1 | 0 | 1 }[] = [];
            for (let x = -1 as -1 | 0 | 1; x <= 1; x = (x + 1) as -1 | 0 | 1) {
                for (let y = -1 as -1 | 0 | 1; y <= 1; y = (y + 1) as -1 | 0 | 1) {
                    for (let z = -1 as -1 | 0 | 1; z <= 1; z = (z + 1) as -1 | 0 | 1) {
                        temp.push({ x, y, z });
                    }
                }
            }
            return temp;
        },
        []
    );

    // Estado mutable de las coordenadas lógicas
    const gridPositionsRef = useRef(
        initialGrid.map((g) => ({ ...g }))
    );

    const movesRef = useRef<Move[]>([
        { axis: "y", layer: 1, dir: 1, duration: 0.6 },   // U
        { axis: "x", layer: 1, dir: 1, duration: 0.6 },   // R
        { axis: "z", layer: 1, dir: 1, duration: 0.6 },   // F
        { axis: "y", layer: -1, dir: -1, duration: 0.6 }, // D'
        { axis: "x", layer: -1, dir: -1, duration: 0.6 }, // L'
        { axis: "z", layer: -1, dir: -1, duration: 0.6 }, // B'
    ]);

    const currentMoveIndexRef = useRef(0);
    const moveElapsedRef = useRef(0);

    const axisMap: Record<MoveAxis, THREE.Vector3> = {
        x: new THREE.Vector3(1, 0, 0),
        y: new THREE.Vector3(0, 1, 0),
        z: new THREE.Vector3(0, 0, 1),
    };

    useFrame((state, delta) => {
        // Rotación controlada por drag, posición del mouse o auto-rotación
        if (groupRef.current) {
            if (isDraggingRef.current) {
                // Durante el drag, aplicar rotación manual directamente
                groupRef.current.rotation.x = userRotationRef.current.x;
                groupRef.current.rotation.y = userRotationRef.current.y;
            } else {
                // Cuando no hay drag, combinar auto-rotación con seguimiento del mouse
                const targetRotationY = mousePositionRef.current.x * 0.3;
                const targetRotationX = mousePositionRef.current.y * 0.2;

                // Interpolación suave hacia la rotación objetivo del mouse
                userRotationRef.current.y += (targetRotationY - (userRotationRef.current.y % (Math.PI * 2))) * 0.05;
                userRotationRef.current.x += (targetRotationX - userRotationRef.current.x) * 0.05;

                // Auto-rotación lenta adicional
                userRotationRef.current.y += 0.002;

                // Amortiguación de velocidad del drag
                rotationVelocityRef.current.x *= 0.95;
                rotationVelocityRef.current.y *= 0.95;

                // Aplicar rotación
                groupRef.current.rotation.x = userRotationRef.current.x;
                groupRef.current.rotation.y = userRotationRef.current.y;
            }
        }

        const moves = movesRef.current;
        if (!moves.length) return;

        let move = moves[currentMoveIndexRef.current];
        if (!move) {
            currentMoveIndexRef.current = 0;
            moveElapsedRef.current = 0;
            move = moves[0];
        }

        moveElapsedRef.current += delta;
        const tRaw = moveElapsedRef.current / move.duration;
        const t = Math.min(Math.max(tRaw, 0), 1);
        const eased = easeOutCubic(t);

        const targetAngle = move.dir * (Math.PI / 2); // 90°
        const angle = targetAngle * eased;

        const axis = axisMap[move.axis];

        // Para cada cubito, calculamos posición y rotación
        gridPositionsRef.current.forEach((gp, idx) => {
            const mesh = cubeRefs.current[idx];
            if (!mesh) return;

            const isOnLayer =
                (move.axis === "x" && gp.x === move.layer) ||
                (move.axis === "y" && gp.y === move.layer) ||
                (move.axis === "z" && gp.z === move.layer);

            // Posición base (sin giro actual)
            const basePos = new THREE.Vector3(
                gp.x * offset,
                gp.y * offset,
                gp.z * offset
            );

            if (isOnLayer) {
                // Rotamos alrededor del centro del cubo (0,0,0) sobre el eje correspondiente
                const rotatedPos = basePos.clone().applyAxisAngle(axis, angle);
                mesh.position.copy(rotatedPos);

                // Orientación: giramos el cubito según el mismo eje
                const q = new THREE.Quaternion().setFromAxisAngle(axis, angle);
                mesh.quaternion.copy(q);
            } else {
                // Cubitos que no están en la cara que se mueve
                mesh.position.copy(basePos);
                mesh.quaternion.identity();
            }
        });

        // Cuando termina el giro, fijamos la nueva grilla y pasamos al siguiente movimiento
        if (t >= 1) {
            gridPositionsRef.current = gridPositionsRef.current.map((gp) => {
                const isOnLayer =
                    (move.axis === "x" && gp.x === move.layer) ||
                    (move.axis === "y" && gp.y === move.layer) ||
                    (move.axis === "z" && gp.z === move.layer);

                if (!isOnLayer) return gp;

                const { x, y, z } = gp;

                if (move.axis === "y") {
                    // Rotación en plano XZ
                    if (move.dir === 1) {
                        // (x, z) -> (z, -x)
                        return { x: z as -1 | 0 | 1, y, z: (-x as -1 | 0 | 1) };
                    } else {
                        // (x, z) -> (-z, x)
                        return { x: (-z as -1 | 0 | 1), y, z: x as -1 | 0 | 1 };
                    }
                }

                if (move.axis === "x") {
                    // Rotación en plano YZ
                    if (move.dir === 1) {
                        // (y, z) -> (-z, y)
                        return { x, y: (-z as -1 | 0 | 1), z: y as -1 | 0 | 1 };
                    } else {
                        // (y, z) -> (z, -y)
                        return { x, y: z as -1 | 0 | 1, z: (-y as -1 | 0 | 1) };
                    }
                }

                if (move.axis === "z") {
                    // Rotación en plano XY
                    if (move.dir === 1) {
                        // (x, y) -> (-y, x)
                        return { x: (-y as -1 | 0 | 1), y: x as -1 | 0 | 1, z };
                    } else {
                        // (x, y) -> (y, -x)
                        return { x: y as -1 | 0 | 1, y: (-x as -1 | 0 | 1), z };
                    }
                }

                return gp;
            });

            // Snap de posiciones y orientación
            gridPositionsRef.current.forEach((gp, idx) => {
                const mesh = cubeRefs.current[idx];
                if (!mesh) return;
                mesh.position.set(gp.x * offset, gp.y * offset, gp.z * offset);
                mesh.quaternion.identity();
            });

            currentMoveIndexRef.current =
                (currentMoveIndexRef.current + 1) % moves.length;
            moveElapsedRef.current = 0;
        }
    });

    const materials = useMemo(
        () =>
            colors.map(
                (c) =>
                    new THREE.MeshStandardMaterial({
                        color: c,
                        emissive: c,
                        emissiveIntensity: 0.3,
                        metalness: 0.5,
                        roughness: 0.2,
                    })
            ),
        []
    );

    return (
        <group ref={groupRef} scale={0.85}>
            {initialGrid.map((gp, i) => (
                <mesh
                    key={i}
                    ref={(el) => {
                        if (el) cubeRefs.current[i] = el;
                    }}
                    position={[gp.x * offset, gp.y * offset, gp.z * offset]}
                    material={materials[i % materials.length]}
                >
                    <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
                </mesh>
            ))}
        </group>
    );
};

const ThreeHero: React.FC = () => {
    return (
        <div className="three-hero-container">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <pointLight position={[-5, -5, -5]} intensity={0.8} color="#818cf8" />
                <spotLight
                    position={[0, 5, 0]}
                    intensity={0.8}
                    angle={0.3}
                    penumbra={1}
                    color="#38bdf8"
                />
                <RubiksCube />
            </Canvas>
        </div>
    );
};

export default ThreeHero;
