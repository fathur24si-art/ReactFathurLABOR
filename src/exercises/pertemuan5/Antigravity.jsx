/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const AntigravityInner = ({
  count = 1000,
}) => {
  const meshRef = useRef()
  const { viewport } = useThree()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const color = useMemo(() => new THREE.Color(), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      // Lebih padat di tengah dengan pow
      const radius = 5 + Math.pow(Math.random(), 2) * 35
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)
      
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      temp.push({
        x,
        y,
        z,
        colorOffset: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.5,
      })
    }
    return temp
  }, [count])

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return

    const { pointer, clock } = state
    const time = clock.getElapsedTime()

    // Parallax effect: seluruh sistem bergerak mengikuti kursor dengan halus
    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, -pointer.y * 0.5, 0.05)
    mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, pointer.x * 0.5, 0.05)

    particles.forEach((p, i) => {
      // Gerakan mengambang natural ke atas-bawah dan keluar-masuk
      const floatY = Math.sin(time * p.speed + p.colorOffset) * 0.5
      
      dummy.position.set(p.x, p.y + floatY, p.z)
      // Orientasi mengarah persis ke pusat (radial burst)
      dummy.lookAt(0, floatY, 0)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      // Warna RGB yang sangat cerah (vibrant) menggunakan meshBasicMaterial
      color.setHSL(((time * 0.05) + p.colorOffset) % 1, 1.0, 0.6)
      mesh.setColorAt(i, color)
    })

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      {/* Box kecil memanjang agar terlihat seperti serpihan garis cahaya */}
      <boxGeometry args={[0.03, 0.03, 0.6]} />
      {/* Basic material tidak bergantung pada cahaya, jadi warnanya akan sangat mencolok dan bersih */}
      <meshBasicMaterial />
    </instancedMesh>
  )
}

export default function Antigravity() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 40], fov: 40 }}
        style={{ background: 'transparent' }}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <AntigravityInner />
      </Canvas>
    </div>
  )
}