import { useState, useEffect } from 'react'
import { supabase } from './supabase'

function Dashboard() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  async function fetchLeads() {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setLeads(data)
    }
    setLoading(false)
  }

  const goalColors = {
    'weight-loss': '#ff6b6b',
    'muscle-gain': '#4ade80',
    'fitness': '#60a5fa',
    'strength': '#D4AF37',
  }

  return (
    <div style={{
      background: '#080608',
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: 'Segoe UI, sans-serif',
      color: '#fff'
    }}>

      {/* Header */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <p style={{
            fontSize: '12px',
            color: '#D4AF37',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            FitZone Gym
          </p>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #fff, #D4AF37)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Leads Dashboard
          </h1>
        </div>
        <div style={{
          background: 'rgba(212,175,55,0.1)',
          border: '1px solid rgba(212,175,55,0.3)',
          borderRadius: '12px',
          padding: '16px 24px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#D4AF37'
          }}>
            {leads.length}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#666',
            marginTop: '4px'
          }}>
            Total Leads
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{
          textAlign: 'center',
          color: '#555',
          marginTop: '80px'
        }}>
          Loading leads...
        </div>
      )}

      {/* Empty state */}
      {!loading && leads.length === 0 && (
        <div style={{
          textAlign: 'center',
          color: '#555',
          marginTop: '80px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
          <p>Abhi koi lead nahi hai</p>
        </div>
      )}

      {/* Leads Table */}
      {!loading && leads.length > 0 && (
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(212,175,55,0.12)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 2fr 2fr 3fr',
            padding: '16px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(255,255,255,0.02)'
          }}>
            {['Name', 'Phone', 'Goal', 'Date'].map(h => (
              <div key={h} style={{
                fontSize: '11px',
                color: '#444',
                textTransform: 'uppercase',
                letterSpacing: '1.5px'
              }}>
                {h}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {leads.map((lead, index) => (
            <div key={lead.id} style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 2fr 3fr',
              padding: '20px 24px',
              borderBottom: index < leads.length - 1
                ? '1px solid rgba(255,255,255,0.04)'
                : 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                fontWeight: '600',
                color: '#fff'
              }}>
                {lead.name}
              </div>
              <div style={{ color: '#888' }}>
                {lead.phone}
              </div>
              <div>
                <span style={{
                  background: `${goalColors[lead.goal]}18`,
                  border: `1px solid ${goalColors[lead.goal]}44`,
                  color: goalColors[lead.goal],
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}>
                  {lead.goal?.replace('-', ' ')}
                </span>
              </div>
              <div style={{
                color: '#555',
                fontSize: '13px'
              }}>
                {new Date(lead.created_at).toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard