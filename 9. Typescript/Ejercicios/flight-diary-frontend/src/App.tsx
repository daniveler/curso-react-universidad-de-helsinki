import { useState } from 'react'
import Diaries from './components/Diaries'
import NewDiary from './components/NewDiary'
import { DiaryEntry } from './types'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>()

  return (
    <>
      <h1>Diary Flights</h1>
      <NewDiary diaries={diaries} setDiaries={setDiaries}/>
      <Diaries diaries={diaries} setDiaries={setDiaries}/> 
    </>
  )
}

export default App
