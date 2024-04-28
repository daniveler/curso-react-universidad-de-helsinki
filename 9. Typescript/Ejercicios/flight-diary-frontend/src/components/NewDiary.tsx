import { useState } from "react"
import { Weather, Visibility, DiariesProps, DiaryEntry } from "../types.d"
import diariesService from "../services/diaries"

const NewDiary = (props: DiariesProps) => {
  const [date, setDate] = useState<string>('')
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [comment, setComment] = useState<string>('')

  const handleCreateDiary = async(e: React.SyntheticEvent) => {
    e.preventDefault()

    const newDiary = {
      date, weather, visibility, comment
    }

    const response: DiaryEntry[] | undefined = await diariesService.createDiary(newDiary)

    if(response) {
      props.setDiaries(props.diaries?.concat(response))
    }
  }

  return <>
      <h1>Add new entry</h1>
      <form onSubmit={handleCreateDiary}>
        <div>
          <label>Date</label>
          <input id="dateInput" onChange={(e) => setDate(e.target.value)}></input>
        </div>
        <div>
          <label>Weather</label>
          <select id="weatherSelector" onChange={(e) => { setWeather(e.target.value as Weather)}}>
            <option value='sunny'>Sunny</option>
            <option value='rainy'>Rainy</option>
            <option value='cloudy'>Cloudy</option>
            <option value='stormy'>Stormy</option>
          </select>
        </div>
        <div>
          <label>Visibility</label>
          <select id="visibilitySelector" onChange={(e) => { setVisibility(e.target.value as Visibility)}}>
            <option value='great'>Great</option>
            <option value='good'>Good</option>
            <option value='ok'>Ok</option>
            <option value='poor'>Poor</option>
          </select>
        </div>
        <div>
          <label>Comment</label>
          <input id="commentInput" onChange={(e) => setComment(e.target.value)}></input>
        </div>
        <div>
          <button id='createDiaryButton'>Create New Diary</button>
        </div>
      </form>
      
    </>
}

export default NewDiary