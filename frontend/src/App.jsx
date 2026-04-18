import Navbar from './components/ui/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Resume from './components/sections/Resume'
import Contact from './components/sections/Contact'
import Footer from './components/ui/Footer'
import ShardTransition from './components/ui/ShardTransition'

// Thin gold/neutral divider line
const Divider = ({ gold }) => (
  <div
    aria-hidden="true"
    style={{
      width: '100%', height: '1px',
      background: gold
        ? 'linear-gradient(90deg, transparent, rgba(201,162,39,0.16), transparent)'
        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
    }}
  />
)

export default function App() {
  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100svh' }}>
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <ShardTransition id="shard-1" />
        <About />
        <Divider />
        <Skills />
        <ShardTransition id="shard-2" />
        <Projects />
        <Divider gold />
        <Resume />
        <ShardTransition id="shard-3" />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
