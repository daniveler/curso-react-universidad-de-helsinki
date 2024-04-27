import { useEffect } from "react"
import diariesService from '../services/diaries'
import { DiariesProps } from "../types"

const Diaries = (props: DiariesProps) => {
  useEffect(() => {
    diariesService.getDiaries().then((response) => {
      props.setDiaries(response)
    })
  }, [])

  return props.diaries?.map(diarie => {
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