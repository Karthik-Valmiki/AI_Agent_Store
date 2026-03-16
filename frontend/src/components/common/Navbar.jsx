import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import Button from './Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo} className="hover-scale">
          <svg style={styles.logoIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="gradient-text">AI Agent Store</span>
        </Link>
        <div style={styles.links}>
          {user ? (
            <>
              <Link to="/marketplace" style={styles.link} className="transition-all">Marketplace</Link>
              {user.role === 'developer' && (
                <Link to="/dashboard" style={styles.link} className="transition-all">Dashboard</Link>
              )}
              <div style={styles.userChip}>
                <div style={styles.avatar}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div style={styles.userText}>
                  <span style={styles.username}>{user.username}</span>
                  <span style={styles.role}>{user.role}</span>
                </div>
              </div>
              <Button variant="ghost" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/" style={styles.link} className="transition-all">Home</Link>
              <Link to="/login"><Button>Sign In</Button></Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { 
    fontSize: '24px', 
    fontWeight: '800', 
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s ease'
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    color: 'var(--primary)'
  },
  links: { display: 'flex', gap: '28px', alignItems: 'center' },
  link: { 
    color: 'var(--dark)', 
    textDecoration: 'none', 
    fontWeight: '600',
    fontSize: '15px',
    position: 'relative',
    padding: '8px 0'
  },
  userChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '6px 14px 6px 6px',
    borderRadius: '40px',
    background: 'rgba(99, 102, 241, 0.07)',
    border: '1px solid rgba(99, 102, 241, 0.15)',
    animation: 'fadeIn 0.4s ease',
    transition: 'box-shadow 0.2s ease'
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    color: 'white',
    fontSize: '13px',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  userText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px'
  },
  username: { 
    color: 'var(--dark)', 
    fontSize: '13px', 
    fontWeight: '700',
    lineHeight: '1.2'
  },
  role: {
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--primary)',
    textTransform: 'capitalize',
    letterSpacing: '0.3px'
  }
};
