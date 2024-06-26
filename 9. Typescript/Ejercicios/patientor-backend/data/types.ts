export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type Patient = {
  id: String,
  name: String,
  dateOfBirth: String,
  ssn: String,
  gender: Gender,
  occupation: String,
  entries: Entry[]
}

export interface Entry {

}

export type PatientNoSsn = Omit<Patient, 'ssn' | 'entries'>
export type NewPatient = Omit<Patient, 'id' | 'entries'>
