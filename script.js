import React, { Suspense, useEffect, useMemo, useRef, useState } from 'https://esm.sh/react@18';
import { createRoot } from 'https://esm.sh/react-dom@18/client';
import { Canvas, useFrame } from 'https://esm.sh/@react-three/fiber@8.17.10?bundle';
import { Environment, Float, OrbitControls } from 'https://esm.sh/@react-three/drei@9.116.6?bundle';
import * as THREE from 'https://esm.sh/three@0.160.0';

const MotionOrb = () => {
  const mesh = useRef();
  const wireframe = useRef();

  useFrame(({ clock }, delta) => {
    if (!mesh.current || !wireframe.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(t * 0.35) * 0.45;
    mesh.current.rotation.y += delta * 0.45;
    wireframe.current.rotation.y -= delta * 0.2;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.9} floatIntensity={2.1}>
      <mesh ref={mesh} scale={1.25} castShadow receiveShadow>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color="#5cf2ff"
          metalness={0.45}
          roughness={0.15}
          emissive="#1f9fff"
          emissiveIntensity={0.35}
          envMapIntensity={1.1}
        />
      </mesh>
      <mesh ref={wireframe} scale={1.65}>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshBasicMaterial color="#5cf2ff" wireframe transparent opacity={0.32} />
      </mesh>
    </Float>
  );
};

const EnergyRing = () => {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x = -Math.PI / 2;
    ref.current.rotation.z += delta * 0.25;
  });

  return (
    <mesh ref={ref} position={[0, -1.25, 0]} scale={2.35} receiveShadow>
      <torusGeometry args={[1.1, 0.02, 32, 200]} />
      <meshStandardMaterial color="#3b86ff" emissive="#1c62ff" emissiveIntensity={0.65} roughness={0.1} />
    </mesh>
  );
};

const ParticleField = () => {
  const ref = useRef();
  const { positions, speeds } = useMemo(() => {
    const count = 650;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      vel[i] = 0.4 + Math.random() * 0.8;
    }
    return { positions: pos, speeds: vel };
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  }, [positions]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const positionAttr = ref.current.geometry.getAttribute('position');
    for (let i = 0; i < positionAttr.count; i += 1) {
      let y = positionAttr.getY(i);
      y += speeds[i] * delta * 0.35;
      if (y > 3) y = -3;
      positionAttr.setY(i, y);
    }
    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry />
      <pointsMaterial
        size={0.03}
        color="#5cf2ff"
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
};

const HeroScene = () => (
  <Canvas camera={{ position: [0, 0, 4.5], fov: 48 }} dpr={[1, 2]} shadows>
    <color attach="background" args={[0x050812]} />
    <ambientLight intensity={0.45} />
    <spotLight
      position={[5, 6, 5]}
      angle={0.6}
      penumbra={0.5}
      intensity={2}
      color={0x69c8ff}
      castShadow
    />
    <pointLight position={[-6, -3, -3]} intensity={0.8} color={0x4a6bff} />
    <Suspense fallback={null}>
      <MotionOrb />
      <EnergyRing />
      <ParticleField />
      <Environment preset="city" />
    </Suspense>
    <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.65} />
  </Canvas>
);

const Section = ({ id, title, eyebrow, description, children }) => (
  <section id={id}>
    <div className="section-inner">
      <div className="section-header">
        {eyebrow && <span className="badge">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </div>
  </section>
);

const Timeline = ({ items }) => (
  <div className="timeline">
    {items.map((item) => (
      <article className="timeline-item" key={`${item.period}-${item.title}`}>
        <span className="timeline-dot" aria-hidden="true" />
        <span>{item.period}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </article>
    ))}
  </div>
);

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const metrics = [
  { label: 'Hours in technical labs', value: '350+' },
  { label: 'Cross-functional initiatives led', value: '18' },
  { label: 'Process improvement savings delivered', value: '$420K' },
  { label: 'Continuous improvement projects completed', value: '27' },
];

const education = [
  {
    period: '2024 — Present',
    title: 'Mechatronics Engineering Technologies · Austin Peay State University',
    description:
      'Focused on automation, industrial robotics, PLC programming, and data-driven process design while serving as a student ambassador for the engineering technologies cohort.',
  },
  {
    period: '2023',
    title: 'Software Development Immersive · LEARN Academy',
    description:
      'Rapidly prototyped full-stack applications in React and Ruby on Rails, sharpening my ability to translate complex requirements into resilient products.',
  },
  {
    period: '2011',
    title: 'Signal Support Systems Leadership · United States Army',
    description:
      'Led network infrastructure deployments across joint environments, earning recognition for high-availability architectures built under extreme constraints.',
  },
];

const experience = [
  {
    period: '2020 — Present',
    title: 'Maintenance & Continuous Improvement Technician · ISOFlex',
    description:
      'Drive uptime through predictive maintenance programs, root-cause analysis, and operator training while engineering fixtures that cut setup times by 28%.',
  },
  {
    period: '2014 — 2020',
    title: 'Machine Operator · ISOFlex',
    description:
      'Optimized co-extrusion film lines with SPC insights, establishing centerline management and quality dashboards adopted plant-wide.',
  },
  {
    period: '2008 — 2014',
    title: 'Squad Leader & Network Engineer · United States Army',
    description:
      'Directed teams across Iraq and Afghanistan, delivering resilient LAN/WAN communications and mentoring technicians on mission-critical systems.',
  },
];

const focusAreas = [
  {
    title: 'Automation Strategy',
    description:
      'Designing PLC- and sensor-driven systems that bridge operator intuition with digital feedback loops for a safer, leaner floor.',
  },
  {
    title: 'Data-Driven Process Engineering',
    description:
      'Translating historian, MES, and NCM data into actionable recipes that protect throughput and reliability for every shift.',
  },
  {
    title: 'Operational Leadership',
    description:
      'Building confident teams through servant leadership, technical mentorship, and communication frameworks refined in combat and manufacturing.',
  },
];

const projects = [
  {
    title: 'Smart Changeover Playbooks',
    description:
      'Digitized setup standards with IoT validation, reducing ramp time by 32% and unlocking real-time visibility for supervisors.',
  },
  {
    title: 'Predictive Extrusion Analytics',
    description:
      'Combined vibration analytics with process historians to flag drift before non-conformances, extending tool life by two production cycles.',
  },
  {
    title: 'Field Network Overhaul',
    description:
      'Engineered redundant communications for forward operating bases, sustaining 99.97% uptime across austere environments.',
  },
];

const credentials = [
  'Lean Six Sigma Yellow Belt',
  'OSHA 30-Hour General Industry',
  'Fanuc HandlingTool Operations & Programming',
  'IPC/WHMA-A-620 Certified Harness Assembly',
];

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  const sections = useMemo(() => {
    const ids = ['hero', ...navItems.map((item) => item.id)];
    return Array.from(new Set(ids));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        threshold: 0.52,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960 && menuOpen) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    if (window.history?.replaceState) {
      window.history.replaceState(null, '', `#${id}`);
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header>
        <div className="navbar">
          <a className="brand" href="#hero" onClick={(event) => (event.preventDefault(), scrollToSection('hero'))}>
            Scott<span>Tuschl</span>
          </a>
          <button
            type="button"
            className={`menu-toggle${menuOpen ? ' open' : ''}`}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav id="primary-navigation" className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Primary navigation">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={activeId === item.id ? 'active' : ''}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="nav-actions">
              <button type="button" className="nav-cta" onClick={() => scrollToSection('contact')}>
                Let’s collaborate
              </button>
              <a className="nav-cta outline" href="mailto:scott.tuschl@gmail.com">
                Email Scott
              </a>
            </div>
          </nav>
        </div>
      </header>
      <div className={`nav-overlay${menuOpen ? ' visible' : ''}`} aria-hidden={!menuOpen} onClick={() => setMenuOpen(false)} />
      <main>
        <section id="hero" className="hero">
          <div className="hero-background" aria-hidden="true">
            <span className="hero-aurora hero-aurora--one" />
            <span className="hero-aurora hero-aurora--two" />
            <span className="hero-grid" />
          </div>
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="badge">Process Engineer in the Making</div>
              <h1>
                Precision at scale
                <span>powered by mechatronics & leadership.</span>
              </h1>
              <p>
                I am Scott Tuschl, a mechatronics engineering technologies major at Austin Peay building the future of plant
                performance. From combat-tested communications to ISOFlex extrusion lines, I orchestrate people, data, and
                automation to unlock resilient throughput.
              </p>
              <div className="hero-highlights">
                <div className="badge">Mechatronics · Austin Peay</div>
                <div className="badge">Continuous Improvement</div>
                <div className="badge">Lean Manufacturing</div>
              </div>
              <div className="cta-row">
                <a className="btn btn-primary" href="#contact" onClick={(event) => (event.preventDefault(), scrollToSection('contact'))}>
                  Discuss a project
                </a>
                <a className="btn btn-secondary" href="#projects" onClick={(event) => (event.preventDefault(), scrollToSection('projects'))}>
                  Explore achievements
                </a>
              </div>
              <div className="metrics">
                {metrics.map((metric) => (
                  <div key={metric.label} className="metric">
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-canvas" role="presentation">
              <Suspense fallback={null}>
                <HeroScene />
              </Suspense>
              <div className="hero-overlay" />
            </div>
          </div>
        </section>

        <Section
          id="about"
          eyebrow="Profile"
          title="Where engineering mindset meets battlefield precision"
          description="Six years of military-grade communications, a decade on the manufacturing floor, and relentless curiosity fuel my transition into process engineering."
        >
          <div className="grid two">
            <article className="card">
              <h3>Systems thinking</h3>
              <p>
                Whether stabilizing fiber networks overseas or tuning extrusion recipes, I map the entire system—operators,
                assets, and data—before designing the intervention. The result: improvements that hold under pressure.
              </p>
            </article>
            <article className="card">
              <h3>Human-first automation</h3>
              <p>
                I partner with operators to co-create solutions, translating tacit knowledge into digitized standards, dashboards,
                and decision support that empower every shift to execute flawlessly.
              </p>
            </article>
          </div>
        </Section>

        <Section
          id="journey"
          eyebrow="Journey"
          title="Education & experience engineered for impact"
          description="I blend formal mechatronics training with operational leadership to tackle the plant-floor challenges that matter."
        >
          <div className="grid two">
            <div>
              <h3 className="card" style={{ marginBottom: '1.5rem' }}>Education</h3>
              <Timeline items={education} />
            </div>
            <div>
              <h3 className="card" style={{ marginBottom: '1.5rem' }}>Experience</h3>
              <Timeline items={experience} />
            </div>
          </div>
        </Section>

        <Section
          id="expertise"
          eyebrow="Expertise"
          title="Process engineering strengths"
          description="Every initiative I lead ties back to throughput, quality, and safety—measured, iterated, and sustained."
        >
          <div className="grid two">
            {focusAreas.map((area) => (
              <article className="card" key={area.title}>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
            <article className="card">
              <h3>Certifications</h3>
              <div className="list">
                {credentials.map((item) => (
                  <span key={item}>
                    <strong>•</strong> {item}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </Section>

        <Section
          id="projects"
          eyebrow="Impact"
          title="Signature wins across manufacturing & operations"
          description="Selected initiatives that showcase my approach to data, automation, and leadership."
        >
          <div className="grid two">
            {projects.map((project) => (
              <article className="card" key={project.title}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          eyebrow="Collaborate"
          title="Let’s design the next breakthrough"
          description="I’m currently seeking process engineering internships and rotational programs where advanced manufacturing, automation, and people-centric leadership intersect."
        >
          <div className="contact-grid">
            <div className="contact-card">
              <h3>Open to conversations</h3>
              <p>
                Share a challenge, introduce a team, or request my detailed CV. I respond quickly to opportunities that blend
                automation with disciplined execution.
              </p>
              <div className="contact-actions">
                <a href="mailto:scott.tuschl@gmail.com">Email</a>
                <a href="https://www.linkedin.com/in/scott-tuschl/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href="https://github.com/scott198989" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
            <article className="card">
              <h3>Quick snapshot</h3>
              <div className="list">
                <span>
                  <strong>Location:</strong> Clarksville, Tennessee
                </span>
                <span>
                  <strong>Focus:</strong> Process engineering, automation design, CI facilitation
                </span>
                <span>
                  <strong>Currently:</strong> Studying Mechatronics Engineering Technologies at Austin Peay State University
                </span>
                <span>
                  <strong>Goal:</strong> Launch a process engineering career driving resilient, data-backed operations
                </span>
              </div>
            </article>
          </div>
        </Section>
      </main>
      <footer>
        <div className="socials">
          <a href="https://www.linkedin.com/in/scott-tuschl/" aria-label="LinkedIn" target="_blank" rel="noreferrer">
            in
          </a>
          <a href="https://github.com/scott198989" aria-label="GitHub" target="_blank" rel="noreferrer">
            GH
          </a>
          <a href="mailto:scott.tuschl@gmail.com" aria-label="Email">
            ✉
          </a>
        </div>
        <p>© {new Date().getFullYear()} Scott Tuschl. Built with React, Three.js, and a relentless drive for precision.</p>
      </footer>
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
