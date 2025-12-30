import { Users, Calendar, Syringe, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { dashboardStats, mockAppointments, mockNotifications, mockPatients } from '../mockData';
import { format } from 'date-fns';

export default function Dashboard() {
    const upcomingAppointments = mockAppointments
        .filter(apt => apt.status === 'scheduled' && new Date(apt.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5);

    const recentNotifications = mockNotifications
        .filter(n => !n.isRead)
        .slice(0, 3);

    return (
        <div className="fade-in">
            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon blue">
                        <Users size={28} />
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Total Patients</div>
                        <div className="stat-value">{dashboardStats.totalPatients}</div>
                        <div className="stat-change positive">↑ 2 new this week</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green">
                        <Calendar size={28} />
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Upcoming Appointments</div>
                        <div className="stat-value">{dashboardStats.upcomingAppointments}</div>
                        <div className="stat-change">Next 7 days</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orange">
                        <Syringe size={28} />
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Pending Vaccinations</div>
                        <div className="stat-value">{dashboardStats.pendingVaccinations}</div>
                        <div className="stat-change">5 patients</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon purple">
                        <Activity size={28} />
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Recent Checkups</div>
                        <div className="stat-value">{dashboardStats.recentCheckups}</div>
                        <div className="stat-change">Last 7 days</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
                {/* Upcoming Appointments */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title">Upcoming Appointments</h3>
                            <p className="card-subtitle">Next 7 days</p>
                        </div>
                        <button className="btn btn-primary btn-sm">
                            <Calendar size={16} />
                            New Appointment
                        </button>
                    </div>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Patient</th>
                                    <th>Type</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcomingAppointments.map(apt => {
                                    const patient = mockPatients.find(p => p.id === apt.patientId);
                                    return (
                                        <tr key={apt.id}>
                                            <td style={{ fontWeight: 600 }}>
                                                {patient?.firstName} {patient?.lastName}
                                            </td>
                                            <td>
                                                {apt.type === 'well-child' && 'Well-Child'}
                                                {apt.type === 'vaccination' && 'Vaccination'}
                                                {apt.type === 'screening' && 'Screening'}
                                                {apt.type === 'sick-visit' && 'Sick Visit'}
                                            </td>
                                            <td>
                                                {format(new Date(apt.date), 'MMM dd, yyyy')}
                                            </td>
                                            <td>{apt.time}</td>
                                            <td>
                                                <span className="badge badge-info">Scheduled</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Notifications */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title">Notifications</h3>
                            <p className="card-subtitle">Unread messages</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        {recentNotifications.map(notif => (
                            <div
                                key={notif.id}
                                style={{
                                    padding: 'var(--spacing-md)',
                                    borderRadius: 'var(--radius)',
                                    background: notif.priority === 'high' ? '#fef2f2' :
                                        notif.priority === 'medium' ? '#fef3c7' : '#f0f9ff',
                                    border: `1px solid ${notif.priority === 'high' ? '#fecaca' :
                                        notif.priority === 'medium' ? '#fde68a' : '#bfdbfe'}`,
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-base)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-sm)' }}>
                                    <AlertCircle
                                        size={20}
                                        color={notif.priority === 'high' ? '#dc2626' :
                                            notif.priority === 'medium' ? '#d97706' : '#2563eb'}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                            {notif.title}
                                        </div>
                                        <div style={{ fontSize: '0.8125rem', color: 'var(--gray-600)' }}>
                                            {notif.message}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                                            {format(new Date(notif.date), 'MMM dd, HH:mm')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className="btn btn-secondary"
                        style={{ width: '100%', marginTop: 'var(--spacing-md)' }}
                    >
                        View All
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="card">
                <div className="card-header">
                    <div>
                        <h3 className="card-title">Quick Overview</h3>
                        <p className="card-subtitle">Monthly statistics</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-xl)' }}>
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
                            12
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginTop: 'var(--spacing-xs)' }}>
                            Vaccinations Given
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: 'var(--spacing-xs)' }}>
                            <TrendingUp size={14} style={{ display: 'inline', marginRight: '4px' }} />
                            +20% from last month
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-green)' }}>
                            8
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginTop: 'var(--spacing-xs)' }}>
                            Screenings Completed
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: 'var(--spacing-xs)' }}>
                            <TrendingUp size={14} style={{ display: 'inline', marginRight: '4px' }} />
                            +12% from last month
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-purple)' }}>
                            15
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginTop: 'var(--spacing-xs)' }}>
                            Growth Measurements
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: 'var(--spacing-xs)' }}>
                            <TrendingUp size={14} style={{ display: 'inline', marginRight: '4px' }} />
                            +8% from last month
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-orange)' }}>
                            98%
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginTop: 'var(--spacing-xs)' }}>
                            Appointment Show Rate
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: 'var(--spacing-xs)' }}>
                            <TrendingUp size={14} style={{ display: 'inline', marginRight: '4px' }} />
                            +3% from last month
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
