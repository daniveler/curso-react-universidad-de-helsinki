import axios from "axios"

const baseUrl = 'http://localhost:3000'

const getDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(`${baseUrl}/api/diaries`)

  return response.data
}

const createDiary = async (newDiary: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry[]>(`${baseUrl}/api/diaries`, newDiary)

  return response.data
}

export default {
  getDiaries,
  createDiary
}