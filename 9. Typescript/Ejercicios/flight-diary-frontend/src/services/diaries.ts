import axios from "axios"
import { DiaryEntry, NewDiaryEntry } from "../types"
import { toast } from "react-toastify"

const baseUrl = 'http://localhost:3000'

const getDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(`${baseUrl}/api/diaries`)

  return response.data
}

const createDiary = async (newDiary: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry[]>(`${baseUrl}/api/diaries`, newDiary)

    return response.data
  }
  catch(e) {
    if (axios.isAxiosError(e)) {
      toast.error(e.response?.data)
      // console.log(e.response?.data)
    }
    else {
      console.log(`Error: ${e}`)
    }
  }
  
}

export default {
  getDiaries,
  createDiary
}