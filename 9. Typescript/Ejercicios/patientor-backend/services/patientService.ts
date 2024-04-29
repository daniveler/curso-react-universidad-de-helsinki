import patientsData from '../data/patients'
import { NewPatient, Patient } from '../data/types'
import { v4 as uuidv4 } from 'uuid'

const getPatients = (): Patient[] => {

  return patientsData
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
  getPatients,
  getPatientById,
  addNewPatient
}