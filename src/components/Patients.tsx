import { useState } from 'react';
import { UserPlus, Search, Calendar, Syringe, TrendingUp } from 'lucide-react';
import { mockPatients } from '../mockData';
import { format } from 'date-fns';

export default function Patients() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const filteredPatients = mockPatients.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.nationalId.includes(searchTerm)
    );

    const calculateAge = (dateOfBirth: string) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        const months = (today.getFullYear() - birthDate.getFullYear()) * 12 +
            (today.getMonth() - birthDate.getMonth());

        if (months < 12) {
            return `${months} months`;
        } else {
            const years = Math.floor(months / 12);
            const remainingMonths = months % 12;
            return remainingMonths > 0 ? `${years}y ${remainingMonths}m` : `${years} years`;
        }
    };

    return (
        <div className="fade-in">
            {/* Header */}
            <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search
                            size={20}
                            style={{
                                position: 'absolute',
                                left: 'var(--spacing-md)',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--gray-400)'
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search by name or national ID..."
                            className="form-input"
                            style={{ paddingLeft: '2.5rem' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAddModal(true)}
                    >
                        <UserPlus size={20} />
                        New Patient Registration
                    </button>
                </div>
            </div>

            {/* Patients Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--spacing-lg)' }}>
                {filteredPatients.map(patient => (
                    <div
                        key={patient.id}
                        className="card"
                        style={{ cursor: 'pointer', transition: 'all var(--transition-base)' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'var(--shadow)';
                        }}
                    >
                        {/* Patient Header */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: patient.gender === 'female'
                                    ? 'linear-gradient(135deg, #ec4899, #f472b6)'
                                    : 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                flexShrink: 0,
                            }}>
                                {patient.firstName[0]}{patient.lastName[0]}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                                    {patient.firstName} {patient.middleName && patient.middleName + ' '}{patient.lastName}
                                </h3>
                                <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                                    {calculateAge(patient.dateOfBirth)} • {patient.gender === 'female' ? 'Female' : 'Male'}
                                </div>
                                <div style={{ fontSize: '0.8125rem', color: 'var(--gray-400)', marginTop: '0.25rem' }}>
                                    ID: {patient.nationalId}
                                </div>
                            </div>
                        </div>

                        {/* Patient Info Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 'var(--spacing-md)',
                            padding: 'var(--spacing-md)',
                            background: 'var(--gray-50)',
                            borderRadius: 'var(--radius)',
                            marginBottom: 'var(--spacing-md)',
                        }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>
                                    Date of Birth
                                </div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                                    {format(new Date(patient.dateOfBirth), 'MMM dd, yyyy')}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>
                                    Birth Weight
                                </div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                                    {patient.birthWeight}g
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>
                                    Birth Length
                                </div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                                    {patient.birthLength} cm
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>
                                    Gestational Age
                                </div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                                    {patient.gestationalAge} weeks
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                                <Calendar size={16} />
                                Appointment
                            </button>
                            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                                <Syringe size={16} />
                                Vaccines
                            </button>
                            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                                <TrendingUp size={16} />
                                Growth
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Patient Modal */}
            {showAddModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    padding: 'var(--spacing-xl)',
                }}
                    onClick={() => setShowAddModal(false)}
                >
                    <div
                        className="card"
                        style={{
                            maxWidth: '600px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>New Patient Registration</h2>

                        <div className="form-group">
                            <label className="form-label">Last Name *</label>
                            <input type="text" className="form-input" placeholder="e.g. Smith" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">First Name *</label>
                            <input type="text" className="form-input" placeholder="e.g. Emma" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Middle Name</label>
                            <input type="text" className="form-input" placeholder="Optional" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Date of Birth *</label>
                            <input type="date" className="form-input" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Gender *</label>
                            <select className="form-select">
                                <option value="">Select...</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">National ID *</label>
                            <input type="text" className="form-input" placeholder="123456789" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Mother's Maiden Name *</label>
                            <input type="text" className="form-input" placeholder="e.g. Johnson" />
                        </div>

                        <h3 style={{ marginTop: 'var(--spacing-xl)', marginBottom: 'var(--spacing-lg)', fontSize: '1.125rem' }}>
                            Birth Information
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                            <div className="form-group">
                                <label className="form-label">Birth Weight (g) *</label>
                                <input type="number" className="form-input" placeholder="3200" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Birth Length (cm) *</label>
                                <input type="number" className="form-input" placeholder="49" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Head Circumference (cm) *</label>
                                <input type="number" className="form-input" placeholder="34" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Gestational Age (weeks) *</label>
                                <input type="number" className="form-input" placeholder="39" />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xl)' }}>
                            <button
                                className="btn btn-secondary"
                                style={{ flex: 1 }}
                                onClick={() => setShowAddModal(false)}
                            >
                                Cancel
                            </button>
                            <button className="btn btn-primary" style={{ flex: 1 }}>
                                <UserPlus size={20} />
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
