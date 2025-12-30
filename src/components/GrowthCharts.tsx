import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Download } from 'lucide-react';
import { mockGrowthData, mockPatients } from '../mockData';
import { format } from 'date-fns';

export default function GrowthCharts() {
    const patient = mockPatients[0]; // Emma Nagy
    const growthData = mockGrowthData.filter(g => g.patientId === patient.id);

    const chartData = growthData.map(measurement => ({
        date: format(new Date(measurement.date), 'MMM'),
        'Weight (kg)': measurement.weight,
        'Height (cm)': measurement.height,
        'Head Circ. (cm)': measurement.headCircumference,
    }));

    const latestMeasurement = growthData[growthData.length - 1];

    return (
        <div className="fade-in">
            {/* Patient Selector */}
            <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                            {patient.firstName} {patient.lastName}
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                            Date of Birth: {format(new Date(patient.dateOfBirth), 'MMMM dd, yyyy')}
                        </p>
                    </div>
                    <button className="btn btn-primary">
                        <Download size={20} />
                        Export Chart
                    </button>
                </div>
            </div>

            {/* Latest Measurements */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
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
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Current Weight</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{latestMeasurement.weight} kg</div>
                        </div>
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--gray-600)' }}>
                        Percentile: <span style={{ fontWeight: 600, color: 'var(--success)' }}>{latestMeasurement.percentiles.weight}%</span>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
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
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Current Height</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{latestMeasurement.height} cm</div>
                        </div>
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--gray-600)' }}>
                        Percentile: <span style={{ fontWeight: 600, color: 'var(--success)' }}>{latestMeasurement.percentiles.height}%</span>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius)',
                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                        }}>
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Head Circumference</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{latestMeasurement.headCircumference} cm</div>
                        </div>
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--gray-600)' }}>
                        Last measured: {format(new Date(latestMeasurement.date), 'MMM dd')}
                    </div>
                </div>
            </div>

            {/* Growth Charts */}
            <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <div className="card-header">
                    <div>
                        <h3 className="card-title">Weight and Height Trends</h3>
                        <p className="card-subtitle">Based on WHO standards</p>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="date"
                            stroke="#6b7280"
                            style={{ fontSize: '0.875rem' }}
                        />
                        <YAxis
                            stroke="#6b7280"
                            style={{ fontSize: '0.875rem' }}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            }}
                        />
                        <Legend
                            wrapperStyle={{ fontSize: '0.875rem' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Weight (kg)"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Height (cm)"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ fill: '#10b981', r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="card">
                <div className="card-header">
                    <div>
                        <h3 className="card-title">Head Circumference Trend</h3>
                        <p className="card-subtitle">Ages 0-3 years</p>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="date"
                            stroke="#6b7280"
                            style={{ fontSize: '0.875rem' }}
                        />
                        <YAxis
                            stroke="#6b7280"
                            style={{ fontSize: '0.875rem' }}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            }}
                        />
                        <Legend
                            wrapperStyle={{ fontSize: '0.875rem' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Head Circ. (cm)"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            dot={{ fill: '#8b5cf6', r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Measurement History Table */}
            <div className="card" style={{ marginTop: 'var(--spacing-xl)' }}>
                <div className="card-header">
                    <div>
                        <h3 className="card-title">Measurement History</h3>
                        <p className="card-subtitle">All recorded measurements</p>
                    </div>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Weight (kg)</th>
                                <th>Height (cm)</th>
                                <th>Head Circ. (cm)</th>
                                <th>Weight %ile</th>
                                <th>Height %ile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {growthData.slice().reverse().map(measurement => (
                                <tr key={measurement.id}>
                                    <td style={{ fontWeight: 600 }}>
                                        {format(new Date(measurement.date), 'MMM dd, yyyy')}
                                    </td>
                                    <td>{measurement.weight}</td>
                                    <td>{measurement.height}</td>
                                    <td>{measurement.headCircumference || '-'}</td>
                                    <td>
                                        <span className="badge badge-success">{measurement.percentiles.weight}%</span>
                                    </td>
                                    <td>
                                        <span className="badge badge-success">{measurement.percentiles.height}%</span>
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
