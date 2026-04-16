import Antigravity from './Antigravity'
import CircularText from './CircularText'
import GooeyNav from './GooeyNav'
import AppPertemuan3 from './pertemuan 3/AppPertemuan3'
import AppPertemuan4 from './pertemuan4/AppPertemuan4'
import Portfolio from './pertemuan5/portfolio'
import { Navigate, Route, Routes } from 'react-router-dom'

const items = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
]

function HomePage() {
  return (
    <div className="flex min-h-screen w-full max-w-full flex-col bg-black text-white">
      <header
        className="relative flex w-full shrink-0 items-center justify-center"
        style={{ height: '600px' }}
      >
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </header>

      <main className="flex w-full max-w-full flex-1 flex-col items-center gap-10 px-4 py-10">
        <CircularText
          text="REACT*BITS*COMPONENTS*"
          onHover="speedUp"
          spinDuration={20}
          className="custom-class"
        />

        <div
          className="w-full max-w-full shrink-0"
          style={{ width: '100%', height: '400px', position: 'relative' }}
        >
          <Antigravity
            count={300}
            magnetRadius={6}
            ringRadius={7}
            waveSpeed={0.4}
            waveAmplitude={1}
            particleSize={1.5}
            lerpSpeed={0.05}
            color="#5227FF"
            autoAnimate
            particleVariance={1}
            rotationSpeed={0}
            depthFactor={1}
            pulseSpeed={3}
            particleShape="capsule"
            fieldStrength={10}
          />
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pertemuan-3" element={<AppPertemuan3 />} />
      <Route path="/pertemuan-4" element={<AppPertemuan4 />} />
      <Route path="/pertemuan-5" element={<Portfolio />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
