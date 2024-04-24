export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

type Gender = 'male' | 'female' | 'other'

export type Patient = {
  id: String,
  name: String,
  dateOfBirth: String,
  ssn: String,
  gender: Gender,
  occupation: String
}

export type PatientNoSsn = Omit<Patient, 'ssn'>
