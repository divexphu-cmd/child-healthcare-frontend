import { Syringe, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { mockVaccinations, vaccinationSchedule, mockPatients } from '../mockData';
import { format, addMonths } from 'date-fns';

export default function Vaccinations() {
    const patient = mockPatients[0]; // Emma Nagy
    const patientVaccinations = mockVaccinations.filter(v => v.patientId === patient.id);

    const patientAgeInMonths = Math.floor(
        (new Date().getTime() - new Date(patient.dateOfBirth).getTime()) / (1000 * 60 * 60 * 24 * 30.44)
    );

    const getVaccinationStatus = (scheduleItem: typeof vaccinationSchedule[0]) => {
        const administered = patientVaccinations.find(v =>
            v.vaccineName === scheduleItem.vaccineName
        );

        if (administered) {
            return { status: 'completed', data: administered };
        } else if (patientAgeInMonths >= scheduleItem.ageInMonths) {
            return { status: 'overdue', data: null };
        } else {
            const dueDate = addMonths(new Date(patient.dateOfBirth), scheduleItem.ageInMonths);
            return { status: 'upcoming', data: null, dueDate };
        }
    };

    return (
        <div className="fade-in">
            {/* Patient Info */}
            <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                            {patient.firstName} {patient.lastName}
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                            Age: {Math.floor(patientAgeInMonths / 12)} years {patientAgeInMonths % 12} months
                        </p>
                    </div>
                    <button className="btn btn-primary">
                        <Syringe size={20} />
                        Record Vaccination
                    </button>
                </div>
            </div>

            {/* Vaccination Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius)',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                        }}>
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Administered</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{patientVaccinations.length}</div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius)',
                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                        }}>
                            <Clock size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Overdue</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>
                                {vaccinationSchedule.filter(s => {
                                    const status = getVaccinationStatus(s);
                                    return status.status === 'overdue';
                                }).length}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius)',
                            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                        }}>
                            <Syringe size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Mandatory</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>
                                {vaccinationSchedule.filter(s => s.isMandatory).length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vaccination Schedule Timeline */}
            <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <div className="card-header">
                    <div>
                        <h3 className="card-title">Vaccination Schedule</h3>
                        <p className="card-subtitle">According to recommended protocol</p>
                    </div>
                </div>

                <div style={{ position: 'relative' }}>
                    {/* Timeline Line */}
                    <div style={{
                        position: 'absolute',
                        left: '24px',
                        top: '0',
                        bottom: '0',
                        width: '2px',
                        background: 'var(--gray-200)',
                    }} />

                    {/* Timeline Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                        {vaccinationSchedule.map((scheduleItem) => {
                            const { status, data, dueDate } = getVaccinationStatus(scheduleItem);

                            return (
                                <div
                                    key={scheduleItem.id}
                                    style={{
                                        display: 'flex',
                                        gap: 'var(--spacing-lg)',
                                        position: 'relative',
                                    }}
                                >
                                    {/* Timeline Dot */}
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        background: status === 'completed'
                                            ? 'linear-gradient(135deg, #10b981, #059669)'
                                            : status === 'overdue'
                                                ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                                : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        flexShrink: 0,
                                        zIndex: 1,
                                    }}>
                                        {status === 'completed' ? (
                                            <CheckCircle2 size={24} />
                                        ) : status === 'overdue' ? (
                                            <AlertCircle size={24} />
                                        ) : (
                                            <Clock size={24} />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div style={{
                                        flex: 1,
                                        padding: 'var(--spacing-md)',
                                        background: status === 'completed' ? '#f0fdf4' : status === 'overdue' ? '#fef2f2' : 'white',
                                        border: `1px solid ${status === 'completed' ? '#bbf7d0' : status === 'overdue' ? '#fecaca' : 'var(--gray-200)'}`,
                                        borderRadius: 'var(--radius-md)',
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-sm)' }}>
                                            <div>
                                                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                                                    {scheduleItem.vaccineName}
                                                </h4>
                                                <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                                                    {scheduleItem.description}
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                                                {scheduleItem.isMandatory && (
                                                    <span className="badge badge-error">Mandatory</span>
                                                )}
                                                {status === 'completed' && (
                                                    <span className="badge badge-success">Completed</span>
                                                )}
                                                {status === 'overdue' && (
                                                    <span className="badge badge-error">Overdue</span>
                                                )}
                                                {status === 'upcoming' && (
                                                    <span className="badge badge-info">Scheduled</span>
                                                )}
                                            </div>
                                        </div>

                                        <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>
                                            {status === 'completed' && data ? (
                                                <>
                                                    Administered: {format(new Date(data.dateAdministered), 'MMMM dd, yyyy')} •
                                                    Batch: {data.batchNumber} •
                                                    Provider: {data.provider}
                                                </>
                                            ) : status === 'overdue' ? (
                                                <>
                                                    Was due at: {scheduleItem.ageInMonths} months of age
                                                </>
                                            ) : dueDate ? (
                                                <>
                                                    Due: {format(dueDate, 'MMMM dd, yyyy')} (at {scheduleItem.ageInMonths} months)
                                                </>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Vaccination History Table */}
            <div className="card">
                <div className="card-header">
                    <div>
                        <h3 className="card-title">Vaccination History</h3>
                        <p className="card-subtitle">Detailed records</p>
                    </div>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Vaccine Name</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Batch Number</th>
                                <th>Provider</th>
                                <th>Dose</th>
                                <th>Next Due</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientVaccinations.map(vaccination => (
                                <tr key={vaccination.id}>
                                    <td style={{ fontWeight: 600 }}>{vaccination.vaccineName}</td>
                                    <td>{vaccination.vaccineType}</td>
                                    <td>{format(new Date(vaccination.dateAdministered), 'MMM dd, yyyy')}</td>
                                    <td><code style={{ fontSize: '0.8125rem' }}>{vaccination.batchNumber}</code></td>
                                    <td>{vaccination.provider}</td>
                                    <td>
                                        {vaccination.doseNumber && vaccination.totalDoses ? (
                                            <span className="badge badge-info">
                                                {vaccination.doseNumber}/{vaccination.totalDoses}
                                            </span>
                                        ) : '-'}
                                    </td>
                                    <td>
                                        {vaccination.nextDueDate ? (
                                            format(new Date(vaccination.nextDueDate), 'MMM dd, yyyy')
                                        ) : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
