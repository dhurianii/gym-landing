import { useState } from 'react'
import { supabase } from './supabase'
// ── COMPONENT 1: Navbar ──────────────────────────
function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      background: 'rgba(0,0,0,0.9)',
      padding: '18px 48px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #222',
      zIndex: 100
    }}>
      <div style={{
        fontWeight: '800',
        fontSize: '20px',
        color: '#D4AF37'
      }}>
        💪 FitZone Gym
      </div>
      <div style={{ display: 'flex', gap: '32px' }}>
        {['About', 'Plans', 'Contact'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`}
            style={{
              color: '#888',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}

// ── COMPONENT 2: Hero ────────────────────────────
function Hero({ onJoinClick }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '100px 20px 60px',
      background: 'radial-gradient(ellipse at top, #1a0a00 0%, #000 60%)'
    }}>
      <div style={{
        background: 'rgba(212,175,55,0.1)',
        border: '1px solid rgba(212,175,55,0.3)',
        borderRadius: '20px',
        padding: '6px 16px',
        color: '#D4AF37',
        fontSize: '13px',
        marginBottom: '24px'
      }}>
        🏆 Mumbai's #1 Transformation Gym
      </div>

      <h1 style={{
        fontSize: '64px',
        fontWeight: '900',
        lineHeight: 1.05,
        marginBottom: '20px',
        background: 'linear-gradient(135deg, #fff 0%, #D4AF37 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Transform Your<br />Body. Transform<br />Your Life.
      </h1>

      <p style={{
        color: '#888',
        fontSize: '18px',
        maxWidth: '500px',
        marginBottom: '40px',
        lineHeight: 1.7
      }}>
        Join 500+ members who achieved their dream
        physique at FitZone. Expert trainers,
        modern equipment, real results.
      </p>

      <button
        onClick={onJoinClick}
        style={{
          background: 'linear-gradient(135deg, #D4AF37, #F5D77E)',
          color: '#000',
          padding: '16px 40px',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '700',
          cursor: 'pointer'
        }}>
        Start Free Trial →
      </button>

      <div style={{
        display: 'flex',
        gap: '48px',
        marginTop: '64px'
      }}>
        {[
          { number: '500+', label: 'Members' },
          { number: '10+', label: 'Trainers' },
          { number: '5★', label: 'Rating' },
          { number: '3yrs', label: 'Experience' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '28px',
              fontWeight: '800',
              color: '#D4AF37'
            }}>
              {stat.number}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#666',
              marginTop: '4px'
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── COMPONENT 3: Plans ───────────────────────────
function Plans() {
  const plans = [
    {
      name: 'Basic',
      price: '₹999',
      features: ['Gym Access', 'Locker', '1 Assessment'],
      gold: false
    },
    {
      name: 'Pro',
      price: '₹1,799',
      features: ['Everything in Basic', 'Personal Trainer', 'Diet Plan', 'Progress Tracking'],
      gold: true
    },
    {
      name: 'Elite',
      price: '₹2,999',
      features: ['Everything in Pro', 'Unlimited Classes', 'Supplements', 'Priority Support'],
      gold: false
    },
  ]

  return (
    <div id="plans" style={{
      padding: '100px 20px',
      maxWidth: '900px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <p style={{
        color: '#D4AF37',
        fontSize: '12px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        marginBottom: '12px'
      }}>
        Pricing
      </p>
      <h2 style={{
        fontSize: '40px',
        fontWeight: '800',
        marginBottom: '48px',
        color: '#fff'
      }}>
        Choose Your Plan
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px'
      }}>
        {plans.map(plan => (
          <div key={plan.name} style={{
            background: plan.gold
              ? 'linear-gradient(135deg, #1a1200, #2a1e00)'
              : '#111',
            border: plan.gold
              ? '1px solid rgba(212,175,55,0.5)'
              : '1px solid #222',
            borderRadius: '16px',
            padding: '32px 24px',
            position: 'relative'
          }}>
            {plan.gold && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#D4AF37',
                color: '#000',
                padding: '4px 16px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '700'
              }}>
                MOST POPULAR
              </div>
            )}
            <h3 style={{
              fontSize: '18px',
              color: plan.gold ? '#D4AF37' : '#fff',
              marginBottom: '8px'
            }}>
              {plan.name}
            </h3>
            <div style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#fff',
              marginBottom: '24px'
            }}>
              {plan.price}
              <span style={{
                fontSize: '14px',
                color: '#666',
                fontWeight: '400'
              }}>/mo</span>
            </div>
            {plan.features.map(f => (
              <div key={f} style={{
                color: '#888',
                fontSize: '13px',
                padding: '8px 0',
                borderBottom: '1px solid #1a1a1a',
                textAlign: 'left'
              }}>
                ✓ {f}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── COMPONENT 4: Lead Form ───────────────────────
function LeadForm({ onClose }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [goal, setGoal] = useState('')
  const [submitted, setSubmitted] = useState(false)

async function handleSubmit() {
    // Name validation
    if (!name || name.trim().length < 2) {
      alert('Naam kam se kam 2 characters ka hona chahiye!')
      return
    }

    // Phone validation
    if (!phone) {
      alert('Phone number bharo!')
      return
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert('Valid Indian phone number daalo! (10 digits, 6-9 se shuru)')
      return
    }

    // Goal validation
    if (!goal) {
      alert('Goal select karo!')
      return
    }

    // Save to Supabase
    const { error } = await supabase
      .from('leads')
      .insert([{ name, phone, goal }])

    if (error) {
      alert('Kuch problem hui! Try again.')
      console.error(error)
      return
    }

    setSubmitted(true)
  }

  

  if (submitted) {
    return (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ color: '#D4AF37', marginBottom: '12px' }}>
            Welcome, {name}!
          </h2>
          <p style={{ color: '#888', marginBottom: '32px' }}>
            Humara trainer 24 ghante mein call karega.
          </p>
          <button onClick={onClose} style={btnStyle}>
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{
          color: '#D4AF37',
          marginBottom: '8px',
          fontSize: '24px'
        }}>
          Start Free Trial 💪
        </h2>
        <p style={{
          color: '#666',
          fontSize: '13px',
          marginBottom: '32px'
        }}>
          Apni details bharo — trainer call karega
        </p>

        <input
          placeholder="Tumhara naam"
          value={name}
          onChange={e => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Phone number"
          value={phone}
          maxLength={10}
          onChange={e => {
            const val = e.target.value
            if (/^\d*$/.test(val)) setPhone(val)
          }}
          style={inputStyle}
        />
        <select
          value={goal}
          onChange={e => setGoal(e.target.value)}
          style={inputStyle}
        >
          <option value="">Goal select karo</option>
          <option value="weight-loss">Weight Loss</option>
          <option value="muscle-gain">Muscle Gain</option>
          <option value="fitness">General Fitness</option>
          <option value="strength">Strength Training</option>
        </select>

        <button onClick={handleSubmit} style={btnStyle}>
          Submit →
        </button>
        <button
          onClick={onClose}
          style={{
            ...btnStyle,
            background: 'transparent',
            color: '#666',
            border: '1px solid #333',
            marginTop: '8px'
          }}>
          Cancel
        </button>
      </div>
    </div>
  )
}

// Styles for modal
const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.85)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 200
}

const modalStyle = {
  background: '#111',
  border: '1px solid #333',
  borderRadius: '16px',
  padding: '40px',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column'
}

const inputStyle = {
  background: '#1a1a1a',
  border: '1px solid #333',
  borderRadius: '8px',
  padding: '12px 16px',
  color: '#fff',
  fontSize: '14px',
  marginBottom: '12px',
  outline: 'none',
  width: '100%'
}

const btnStyle = {
  background: 'linear-gradient(135deg, #D4AF37, #F5D77E)',
  color: '#000',
  padding: '14px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: '700',
  cursor: 'pointer',
  width: '100%'
}

// ── MAIN APP ─────────────────────────────────────
function App() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div style={{
      background: '#000',
      minHeight: '100vh',
      color: '#fff'
    }}>
      <Navbar />
      <Hero onJoinClick={() => setShowForm(true)} />
      <Plans />

      {showForm && (
        <LeadForm onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}

export default App