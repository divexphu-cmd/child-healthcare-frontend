export interface Patient {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    mothersMaidenName: string;
    gender: 'male' | 'female' | 'other';
    nationalId: string;
    birthWeight: number; // grams
    birthLength: number; // cm
    birthHeadCircumference: number; // cm
    gestationalAge: number; // weeks
    photoUrl?: string;
}

export interface Vaccination {
    id: string;
    patientId: string;
    vaccineName: string;
    vaccineType: string;
    dateAdministered: string;
    batchNumber: string;
    provider: string;
    isMandatory: boolean;
    doseNumber?: number;
    totalDoses?: number;
    nextDueDate?: string;
}

export interface VaccinationSchedule {
    id: string;
    vaccineName: string;
    ageInMonths: number;
    isMandatory: boolean;
    description: string;
}

export interface GrowthMeasurement {
    id: string;
    patientId: string;
    date: string;
    weight: number; // kg
    height: number; // cm
    headCircumference?: number; // cm
    bmi?: number;
    percentiles: {
        weight: number;
        height: number;
        bmi?: number;
    };
}

export interface Appointment {
    id: string;
    patientId: string;
    providerId: string;
    providerName: string;
    type: 'well-child' | 'sick-visit' | 'vaccination' | 'screening';
    date: string;
    time: string;
    status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
    notes?: string;
}

export interface MedicalRecord {
    id: string;
    patientId: string;
    date: string;
    type: 'visit-note' | 'document';
    title: string;
    description?: string;
    provider?: string;
    diagnosis?: string;
    treatment?: string;
    fileUrl?: string;
}

export interface Notification {
    id: string;
    type: 'appointment' | 'vaccination' | 'screening' | 'alert';
    title: string;
    message: string;
    date: string;
    isRead: boolean;
    priority: 'low' | 'medium' | 'high';
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'parent' | 'provider' | 'admin';
    photoUrl?: string;
}

export interface DashboardStats {
    totalPatients: number;
    upcomingAppointments: number;
    pendingVaccinations: number;
    recentCheckups: number;
}
