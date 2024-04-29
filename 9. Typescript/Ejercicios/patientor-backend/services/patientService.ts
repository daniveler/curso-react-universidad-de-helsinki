import patientsData from '../data/patients'
import { NewPatient, Patient, PatientNoSsn } from '../data/types'
import { v4 as uuidv4 } from 'uuid'

const getPatientsNoSsl = (): PatientNoSsn[] => {
  const patients: PatientNoSsn[] = patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => (
    {
      id, name, dateOfBirth, gender, occupation
    }
  ))

  return patients
}

const getPatientById = (id: string): Patient | undefined => {
  const patient = patientsData.find(p => p.id === id )

  return patient
}

const addNewPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    entries: [],
    ...patient
  }

  patientsData.push(newPatient)
  return newPatient
}

export default {
  getPatientsNoSsl,
  getPatientById,
  addNewPatient
}