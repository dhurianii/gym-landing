import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { supabase } from './supabase'
// ── RESPONSIVE STYLES ──────────────────────────
const isMobile = window.innerWidth <= 768

// ── ANIMATION VARIANTS ──────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } }
}

// ── SCROLL ANIMATION WRAPPER ─────────────────────
function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

// ── COUNT UP ANIMATION ───────────────────────────
function CountUp({ end, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])

  return <span ref={ref}>{count}{suffix}</span>
}

// ── NAV ─────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 48px',
        background: scrolled
          ? 'rgba(10,10,10,0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.06)'
          : 'none',
        transition: 'all 0.4s ease',
        zIndex: 100,
      }}>
      <div style={{
        fontWeight: 900,
        fontSize: '18px',
        letterSpacing: '4px',
        color: '#C9A84C',
        textTransform: 'uppercase'
      }}>
        FORGE
      </div>
      <div style={{
        display: window.innerWidth <= 768 ? 'none' : 'flex',
        gap: '40px',
        alignItems: 'center'
      }}>
        {['Programs', 'Pricing'].map(item => (
          <a key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              fontSize: '13px',
              letterSpacing: '1px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
          >
            {item}
          </a>
        ))}
        <a
          href="#tally-open=VLbl7j&tally-emoji-text=👋&tally-emoji-animation=wave"
          style={{
            color: '#0A0A0A',
            background: '#C9A84C',
            padding: '10px 22px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '0.5px',
            textDecoration: 'none',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={e => e.target.style.opacity = '0.85'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >
          Begin →
        </a>
      </div>
    </motion.nav>
  )
}

// ── HERO ─────────────────────────────────────────
function Hero() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0 24px',
      position: 'relative',
      overflow: 'hidden',
      background: '#0A0A0A',
    }}>

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.35,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        <source src="https://res.cloudinary.com/dyd1tkiph/video/upload/v1779623768/gym-bg_jlycoe.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(10,10,10,0.65)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      {/* Gold line */}
      <div style={{
        position: 'absolute',
        top: '61.8%',
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)',
        zIndex: 2
      }} />

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ maxWidth: '800px', position: 'relative', zIndex: 3 }}
      >
        {/* Label */}
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: '11px',
            letterSpacing: '4px',
            color: '#C9A84C',
            textTransform: 'uppercase',
            marginBottom: '32px',
            fontWeight: '500'
          }}>
          Mumbai's Premier Training Facility
        </motion.p>

        {/* H1 */}
        <motion.h1
          variants={fadeUp}
          style={{
            fontSize: 'clamp(56px, 8vw, 96px)',
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: '-2px',
            color: '#FFFFFF',
            marginBottom: '8px',
          }}>
          Built
        </motion.h1>
        <motion.h1
          variants={fadeUp}
          style={{
            fontSize: 'clamp(56px, 8vw, 96px)',
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: '-2px',
            color: '#C9A84C',
            marginBottom: '40px',
          }}>
          Different.
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: '17px',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.3px',
            marginBottom: '56px',
            lineHeight: 1.7,
            maxWidth: '440px',
            margin: '0 auto 56px'
          }}>
          Where serious people get serious results.
          No noise. No gimmicks. Just work.
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp}>
          <a
            href="#tally-open=VLbl7j&tally-emoji-text=👋&tally-emoji-animation=wave"
            style={{
              display: 'inline-block',
              background: '#C9A84C',
              color: '#0A0A0A',
              padding: '18px 48px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '800',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.target.style.background = '#D4B86A'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.target.style.background = '#C9A84C'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            Begin Your Transformation
          </a>
          <p style={{
            marginTop: '16px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '1px'
          }}>
            First session complimentary. No commitment.
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 3
        }}>
        <p style={{
          fontSize: '10px',
          letterSpacing: '3px',
          color: 'rgba(255,255,255,0.2)',
          textTransform: 'uppercase'
        }}>Scroll</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)'
          }}
        />
      </motion.div>
    </div>
  )
}
// ── PROOF ────────────────────────────────────────
function Proof() {
  const stats = [
    { number: 500, suffix: '+', label: 'Members' },
    { number: 10, suffix: '+', label: 'Expert Trainers' },
    { number: 5, suffix: '★', label: 'Google Rating' },
    { number: 3, suffix: 'yrs', label: 'Proven Results' },
  ]

  return (
    <div style={{
      padding: window.innerWidth <= 768 ? '60px 20px' : '100px 48px',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: window.innerWidth <= 768
          ? 'repeat(2, 1fr)'
          : 'repeat(4, 1fr)',
        gap: '1px',
      }}>
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.1}>
            <div style={{
              textAlign: 'center',
              padding: '0 24px',
              borderRight: i < 3
                ? '1px solid rgba(255,255,255,0.06)'
                : 'none'
            }}>
              <div style={{
                fontSize: '56px',
                fontWeight: 900,
                color: '#C9A84C',
                letterSpacing: '-1px',
                lineHeight: 1
              }}>
                <CountUp end={stat.number} suffix={stat.suffix} />
              </div>
              <div style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginTop: '12px'
              }}>
                {stat.label}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}

// ── PHILOSOPHY ───────────────────────────────────
function Philosophy() {
  return (
    <div style={{
      padding: window.innerWidth <= 768
  ? '80px 20px'
  : '120px 48px',
      maxWidth: '900px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: window.innerWidth <= 768
        ? '1fr'
        : '1fr 1fr',
      gap: window.innerWidth <= 768 ? '40px' : '80px',
      alignItems: 'center'
    }}>
      <ScrollReveal>
        <div style={{
          borderLeft: '2px solid #C9A84C',
          paddingLeft: '32px'
        }}>
          <p style={{
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 800,
            lineHeight: 1.2,
            color: '#FFFFFF',
            letterSpacing: '-0.5px'
          }}>
            "We don't sell memberships.<br />
            We build people."
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.8
          }}>
            Most gyms sell you access to equipment.
            We give you access to a system — one built
            around the science of real transformation.
          </p>
          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.8
          }}>
            Every trainer. Every program. Every decision
            we make is in service of one thing — your
            permanent change.
          </p>
        </div>
      </ScrollReveal>
    </div>
  )
}

// ── PROGRAMS ─────────────────────────────────────
function Programs() {
  const programs = [
    {
      label: '01',
      name: 'Strength',
      desc: 'For those who build. Progressive overload, compound movements, and the discipline to show up.',
      tag: 'Barbell · Powerlifting · Mass'
    },
    {
      label: '02',
      name: 'Performance',
      desc: 'For athletes who compete. Sport-specific conditioning, speed work, and peak output.',
      tag: 'Conditioning · Speed · Power'
    },
    {
      label: '03',
      name: 'Transformation',
      desc: 'For those ready to change everything. Fat loss, body recomposition, and lasting habits.',
      tag: 'Fat Loss · Recomp · Habits'
    },
  ]

  return (
    <div id="programs" style={{
      padding: window.innerWidth <= 768
  ? '80px 20px'
  : '120px 48px',
      borderTop: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <ScrollReveal>
          <p style={{
            fontSize: '11px',
            letterSpacing: '4px',
            color: '#C9A84C',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            Programs
          </p>
          <h2 style={{
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-1px',
            marginBottom: '64px'
          }}>
            Choose your path.
          </h2>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 768
            ? '1fr'
            : 'repeat(3, 1fr)',
          gap: '1px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          {programs.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ background: 'rgba(201,168,76,0.04)' }}
                style={{
                  padding: '48px 36px',
                  background: '#0F0F0F',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  borderTop: '2px solid transparent',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onHoverStart={e => {
                  e.target.style.borderTopColor = '#C9A84C'
                }}
              >
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '2px',
                  marginBottom: '24px'
                }}>
                  {p.label}
                </div>
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '16px',
                  letterSpacing: '-0.5px'
                }}>
                  {p.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.7,
                  marginBottom: '32px'
                }}>
                  {p.desc}
                </p>
                <p style={{
                  fontSize: '11px',
                  color: '#C9A84C',
                  letterSpacing: '1px'
                }}>
                  {p.tag}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── PRICING ──────────────────────────────────────
function Pricing() {
  const plans = [
    {
      name: 'Foundation',
      price: '999',
      features: ['Full gym access', 'Locker room', 'Initial assessment'],
      popular: false
    },
    {
      name: 'Performance',
      price: '1,799',
      features: ['Everything in Foundation', 'Personal trainer', 'Custom diet plan', 'Progress tracking'],
      popular: true
    },
    {
      name: 'Elite',
      price: '2,999',
      features: ['Everything in Performance', 'Unlimited classes', 'Recovery sessions', 'Priority support'],
      popular: false
    },
  ]

  return (
    <div id="pricing" style={{
      padding: window.innerWidth <= 768
  ? '80px 20px'
  : '120px 48px',
      borderTop: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <ScrollReveal>
          <p style={{
            fontSize: '11px',
            letterSpacing: '4px',
            color: '#C9A84C',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            Pricing
          </p>
          <h2 style={{
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-1px',
            marginBottom: '64px'
          }}>
            Simple. Honest. Premium.
          </h2>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 768
            ? '1fr'
            : 'repeat(3, 1fr)',
          gap: '16px'
        }}>
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1}>
              <div style={{
                padding: '40px 32px',
                background: plan.popular
                  ? 'rgba(201,168,76,0.06)'
                  : '#0F0F0F',
                border: plan.popular
                  ? '1px solid rgba(201,168,76,0.3)'
                  : '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                position: 'relative'
              }}>
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#C9A84C',
                    color: '#0A0A0A',
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '2px',
                    padding: '4px 16px',
                    borderRadius: '20px',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap'
                  }}>
                    Most Chosen
                  </div>
                )}
                <p style={{
                  fontSize: '13px',
                  color: plan.popular
                    ? '#C9A84C'
                    : 'rgba(255,255,255,0.4)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '24px'
                }}>
                  {plan.name}
                </p>
                <div style={{
                  fontSize: '48px',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '-1px',
                  marginBottom: '4px'
                }}>
                  ₹{plan.price}
                </div>
                <p style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.2)',
                  marginBottom: '32px',
                  letterSpacing: '1px'
                }}>
                  per month
                </p>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '40px'
                }}>
                  {plan.features.map(f => (
                    <div key={f} style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start'
                    }}>
                      <span style={{
                        color: '#C9A84C',
                        fontSize: '14px',
                        marginTop: '1px'
                      }}>—</span>
                      <span style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.5)',
                        lineHeight: 1.5
                      }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href="#tally-open=VLbl7j&tally-emoji-text=👋&tally-emoji-animation=wave"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '14px',
                    background: plan.popular ? '#C9A84C' : 'transparent',
                    color: plan.popular ? '#0A0A0A' : 'rgba(255,255,255,0.5)',
                    border: plan.popular
                      ? 'none'
                      : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  Get Started
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
// ── TESTIMONIALS ─────────────────────────────────
function Testimonials() {
  const testimonials = [
    {
      quote: 'I lost 18kg in 4 months. I have tried everything else. This is the only place that actually worked.',
      name: 'Rahul M.',
      detail: 'Mumbai · Weight Loss'
    },
    {
      quote: 'The trainers here think differently. No generic plans. Everything is built around you.',
      name: 'Priya S.',
      detail: 'Mumbai · Strength Training'
    },
    {
      quote: 'I have been a member for 2 years. The results speak for themselves. Worth every rupee.',
      name: 'Arjun K.',
      detail: 'Mumbai · Performance'
    },
  ]

  return (
    <div style={{
      padding: window.innerWidth <= 768
  ? '80px 20px'
  : '120px 48px',
      borderTop: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <ScrollReveal>
          <p style={{
            fontSize: '11px',
            letterSpacing: '4px',
            color: '#C9A84C',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            Results
          </p>
          <h2 style={{
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-1px',
            marginBottom: '64px'
          }}>
            Real people.<br />Real change.
          </h2>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 768
            ? '1fr'
            : 'repeat(3, 1fr)',
          gap: '1px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div style={{
                padding: '48px 36px',
                background: '#0F0F0F',
              }}>
                <div style={{
                  fontSize: '32px',
                  color: '#C9A84C',
                  marginBottom: '24px',
                  lineHeight: 1,
                  fontFamily: 'Georgia, serif'
                }}>
                  "
                </div>
                <p style={{
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.7,
                  marginBottom: '32px',
                  fontStyle: 'italic'
                }}>
                  {t.quote}
                </p>
                <div>
                  <p style={{
                    fontSize: '13px',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    marginBottom: '4px'
                  }}>
                    {t.name}
                  </p>
                  <p style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.25)',
                    letterSpacing: '1px'
                  }}>
                    {t.detail}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── FINAL CTA ────────────────────────────────────
function FinalCTA() {
  return (
    <div style={{
      padding: window.innerWidth <= 768
  ? '80px 20px'
  : '120px 48px',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      textAlign: 'center',
      background: '#0F0F0F'
    }}>
      <ScrollReveal>
        <p style={{
          fontSize: '11px',
          letterSpacing: '4px',
          color: '#C9A84C',
          textTransform: 'uppercase',
          marginBottom: '24px'
        }}>
          Begin
        </p>
        <h2 style={{
          fontSize: 'clamp(40px, 5vw, 72px)',
          fontWeight: 900,
          color: '#FFFFFF',
          letterSpacing: '-1px',
          marginBottom: '24px',
          lineHeight: 1.05
        }}>
          Ready to be<br />different?
        </h2>
        <p style={{
          fontSize: '16px',
          color: 'rgba(255,255,255,0.3)',
          marginBottom: '48px'
        }}>
          First session is on us.
        </p>
        <a
          href="#tally-open=VLbl7j&tally-emoji-text=👋&tally-emoji-animation=wave"
          style={{
            display: 'inline-block',
            background: '#C9A84C',
            color: '#0A0A0A',
            padding: '20px 56px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Claim Your Free Session →
        </a>
      </ScrollReveal>
    </div>
  )
}

// ── FOOTER ───────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: '40px 48px',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{
        fontWeight: 900,
        fontSize: '16px',
        letterSpacing: '4px',
        color: '#C9A84C'
      }}>
        FORGE
      </div>
      <p style={{
        fontSize: '12px',
        color: 'rgba(255,255,255,0.15)',
        letterSpacing: '1px'
      }}>
        Mumbai, India · Built Different
      </p>
      <a
        href="/dashboard"
        style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.2)',
          textDecoration: 'none',
          letterSpacing: '1px'
        }}>
        Admin →
      </a>
    </footer>
  )
}

// ── MAIN APP ─────────────────────────────────────
function App() {
  return (
    <div style={{
      background: '#0A0A0A',
      minHeight: '100vh',
      color: '#FFFFFF',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      overflowX: 'hidden'
    }}>
      <Nav />
      <Hero />
      <Proof />
      <Philosophy />
      <Programs />
      <Pricing />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  )
}

export default App