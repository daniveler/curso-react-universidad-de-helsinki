import { useEffect, useState } from "react"
import diariesService from '../services/diaries'

const Diaries = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>()

  useEffect(() => {
    diariesService.getDiaries().then((response) => {
      setDiaries(response)
    })
  }, [])

  return diaries?.map(diarie => {
      return (
        <>
          <h2>{diarie.date}</h2>
          <p>Weather: {diarie.weather}</p>
          <p>Visibility: {diarie.visibility}</p>
          <p>Comment: {diarie.comment}</p>
        </>
      )
    })
}

export default Diaries