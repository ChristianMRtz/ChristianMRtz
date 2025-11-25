import { extend } from '@react-three/fiber'
import * as THREE from 'three'

// Extender los elementos de Three.js para que puedan usarse como JSX
extend(THREE)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any
      mesh: any
      sphereGeometry: any
      boxGeometry: any
      torusGeometry: any
      meshStandardMaterial: any
      ambientLight: any
      directionalLight: any
      pointLight: any
    }
  }
}

export {}
