import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Syringe,
  TrendingUp,
  Calendar,
  FileText,
  Bell,
  Heart,
  ChevronRight
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Patients from './components/Patients';
import Vaccinations from './components/Vaccinations';
import GrowthCharts from './components/GrowthCharts';
import { currentUser, mockNotifications } from './mockData';
import './index.css';

type Page = 'dashboard' | 'patients' | 'vaccinations' | 'growth' | 'appointments' | 'records';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <Patients />;
      case 'vaccinations':
        return <Vaccinations />;
      case 'growth':
        return <GrowthCharts />;
      case 'appointments':
        return (
          <div className="card">
            <h2>Időpontok</h2>
            <p style={{ color: 'var(--gray-500)' }}>Ez az oldal fejlesztés alatt áll...</p>
          </div>
        );
      case 'records':
        return (
          <div className="card">
            <h2>Orvosi dokumentumok</h2>
            <p style={{ color: 'var(--gray-500)' }}>Ez az oldal fejlesztés alatt áll...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Overview';
      case 'patients': return 'Patients';
      case 'vaccinations': return 'Vaccinations';
      case 'growth': return 'Growth Charts';
      case 'appointments': return 'Appointments';
      case 'records': return 'Medical Records';
      default: return 'Overview';
    }
  };

  const getPageSubtitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Welcome to the Child Healthcare System';
      case 'patients': return 'Patient management and registration';
      case 'vaccinations': return 'Vaccination schedule and records';
      case 'growth': return 'Growth data and charts';
      case 'appointments': return 'Appointment scheduling and calendar';
      case 'records': return 'Medical documents and notes';
      default: return '';
    }
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <Heart size={24} />
            </div>
            <span>ChildCare</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Main Menu</div>
            <a
              className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentPage('dashboard')}
            >
              <LayoutDashboard className="nav-item-icon" />
              <span>Overview</span>
            </a>
            <a
              className={`nav-item ${currentPage === 'patients' ? 'active' : ''}`}
              onClick={() => setCurrentPage('patients')}
            >
              <Users className="nav-item-icon" />
              <span>Patients</span>
            </a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Health Data</div>
            <a
              className={`nav-item ${currentPage === 'vaccinations' ? 'active' : ''}`}
              onClick={() => setCurrentPage('vaccinations')}
            >
              <Syringe className="nav-item-icon" />
              <span>Vaccinations</span>
            </a>
            <a
              className={`nav-item ${currentPage === 'growth' ? 'active' : ''}`}
              onClick={() => setCurrentPage('growth')}
            >
              <TrendingUp className="nav-item-icon" />
              <span>Growth</span>
            </a>
            <a
              className={`nav-item ${currentPage === 'appointments' ? 'active' : ''}`}
              onClick={() => setCurrentPage('appointments')}
            >
              <Calendar className="nav-item-icon" />
              <span>Appointments</span>
            </a>
            <a
              className={`nav-item ${currentPage === 'records' ? 'active' : ''}`}
              onClick={() => setCurrentPage('records')}
            >
              <FileText className="nav-item-icon" />
              <span>Documents</span>
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-left">
            <h1>{getPageTitle()}</h1>
            <p>{getPageSubtitle()}</p>
          </div>
          <div className="top-bar-right">
            <div
              className="notification-bell"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </div>
            <div className="user-profile">
              <div className="user-avatar">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="user-info">
                <div className="user-name">{currentUser.name}</div>
                <div className="user-role">
                  {currentUser.role === 'provider' ? 'Healthcare Provider' :
                    currentUser.role === 'parent' ? 'Parent' : 'Administrator'}
                </div>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--gray-400)' }} />
            </div>
          </div>
        </div>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div style={{
            position: 'fixed',
            top: '80px',
            right: 'var(--spacing-2xl)',
            width: '400px',
            maxHeight: '500px',
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xl)',
            zIndex: 1000,
            overflow: 'hidden',
          }}>
            <div style={{
              padding: 'var(--spacing-lg)',
              borderBottom: '1px solid var(--gray-200)',
              fontWeight: 600,
            }}>
              Notifications
            </div>
            <div style={{
              maxHeight: '400px',
              overflowY: 'auto',
              padding: 'var(--spacing-md)',
            }}>
              {mockNotifications.map(notif => (
                <div
                  key={notif.id}
                  style={{
                    padding: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-sm)',
                    borderRadius: 'var(--radius)',
                    background: notif.isRead ? 'white' : 'var(--gray-50)',
                    border: '1px solid var(--gray-200)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                    {notif.title}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--gray-600)' }}>
                    {notif.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="page-content">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
