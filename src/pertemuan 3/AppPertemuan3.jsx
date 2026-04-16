import FormMakananTujuan from './FormMakananTujuan'
import Antigravity from '../Antigravity'
import CircularText from '../CircularText'
import { motion } from 'motion/react'
import './styles/pertemuan3.css'

function AppPertemuan3() {
  return (
    <div className="pertemuan3-page relative w-full text-white">
      <div className="pertemuan3-bg-antigravity">
        <Antigravity
          count={240}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.2}
          lerpSpeed={0.05}
          color="#60A5FA"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      <div className="pertemuan3-overlay" />

      <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-8">
        <motion.section
          className="pertemuan3-hero rounded-3xl p-6 md:p-8"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="pertemuan3-hero-content">
            <div className="pertemuan3-circular-wrap">
              <CircularText text="REACT*BITS*PERTEMUAN*3*" onHover="speedUp" spinDuration={20} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Form Pemesanan Makanan
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
                Rencanakan Pesanan Makanan Secara Tepat dan Profesional
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
                Lengkapi data pemesanan menggunakan 3 input dan 2 dropdown untuk menyesuaikan menu
                dengan tujuan makan. Setiap field divalidasi agar data akurat, jelas, dan siap diproses.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.15 }}
        >
          <FormMakananTujuan />
        </motion.section>
      </main>
    </div>
  )
}

export default AppPertemuan3
