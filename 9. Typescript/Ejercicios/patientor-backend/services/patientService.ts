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

const addNewPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  }

  patientsData.push(newPatient)
  return newPatient
}

export default {
  getPatientsNoSsl,
  addNewPatient
}