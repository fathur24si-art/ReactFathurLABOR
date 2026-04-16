/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const AntigravityInner = ({
  count = 180,
  magnetRadius = 8,
  ringRadius = 6,
  particleSize = 1.2,
  lerpSpeed = 0.06,
  color = '#8b5cf6',
}) => {
  const meshRef = useRef()
  const { viewport } = useThree()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const temp = []
    const width = viewport.width || 100
    const height = viewport.height || 100

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * width
      const y = (Math.random() - 0.5) * height
      const z = (Math.random() - 0.5) * 20

      temp.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        cx: x,
        cy: y,
        cz: z,
        t: Math.random() * 100,
      })
    }
    return temp
  }, [count, viewport.width, viewport.height])

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return

    const { viewport: v, pointer: m, clock } = state

    const targetX = m.x * v.width
    const targetY = m.y * v.height
    const time = clock.getElapsedTime()

    particles.forEach((p, i) => {
      const dx = p.cx - targetX
      const dy = p.cy - targetY
      const dist = Math.sqrt(dx * dx + dy * dy)

      let tx = p.baseX + Math.sin(time + p.t) * 0.5
      let ty = p.baseY + Math.cos(time + p.t) * 0.5
      let tz = p.baseZ

      if (dist < magnetRadius) {
        const angle = Math.atan2(dy, dx)
        tx = targetX + ringRadius * Math.cos(angle)
        ty = targetY + ringRadius * Math.sin(angle)
      }

      p.cx += (tx - p.cx) * lerpSpeed
      p.cy += (ty - p.cy) * lerpSpeed
      p.cz += (tz - p.cz) * lerpSpeed

      dummy.position.set(p.cx, p.cy, p.cz)
      dummy.scale.set(particleSize, particleSize, particleSize)
      dummy.updateMatrix()

      mesh.setMatrixAt(i, dummy.matrix)
    })

    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.12, 10, 10]} />
      <meshBasicMaterial color={color} />
    </instancedMesh>
  )
}

export default function Antigravity() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
      }}
    >
      <Canvas
  camera={{ position: [0, 0, 50], fov: 35 }}
  style={{ background: '#ffffff' }}
  onPointerMove={() => {}}
>
        <AntigravityInner />
      </Canvas>
    </div>
  )
}