enum RatingDescriptions {
  'FAIL' = 'You did not trained enough',
  'SUCCESS' = 'Not bad, but you can do it better',
  'EXCELLENT' = 'Good job! This is the way!'
}

interface Result {
  periodLength: number,
  trainingDays: number,
  average: number,
  target: number,
  success: boolean,
  rating: number, 
  ratingDescription: RatingDescriptions
} 

const calculateExercise = (daysList: number[], target: number) : Result => {
  const periodLength: number = daysList.length
  let trainingDays: number = 0
  let totalTrainingHours: number = 0

  let success: boolean = true
  
  daysList.forEach(day => {
    if(day > 0) {
      trainingDays++
      totalTrainingHours += day
    }
  })

  let average: number = totalTrainingHours / periodLength
  let rating: number
  let ratingDescription: RatingDescriptions

  if(average > target) {
    rating = 3
    ratingDescription = RatingDescriptions.EXCELLENT
  }
  else if (average === target) {
    rating = 2
    ratingDescription = RatingDescriptions.SUCCESS
  }
  else {
    success = false
    rating = 1
    ratingDescription = RatingDescriptions.FAIL
  }

  return {
    periodLength,
    trainingDays,
    success, 
    rating,
    ratingDescription,
    target,
    average
  }
}

module.exports = calculateExercise