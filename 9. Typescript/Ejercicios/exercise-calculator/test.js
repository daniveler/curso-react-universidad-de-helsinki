const exerciseCalculator = require('./exerciseCalculator') 

const failResult = { 
  periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 1,
  ratingDescription: 'You did not trained enough',
  target: 2,
  average: 1.9285714285714286
}

const successResult = { 
  periodLength: 7,
  trainingDays: 7,
  success: true,
  rating: 2,
  ratingDescription: 'Not bad, but you can do it better',
  target: 2,
  average: 2
}

const excellentResult = { 
  periodLength: 7,
  trainingDays: 7,
  success: true,
  rating: 3,
  ratingDescription: 'Good job! This is the way!',
  target: 2,
  average: 5
}



describe('Exercise Calculator', () => {
  it('when result is fail', () => {
    const result = exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2)

    expect(result).toEqual(failResult)
  })

  it('when result is success', () => {
    const result = exerciseCalculator([2, 2, 2, 2, 2, 2, 2], 2)

    expect(result).toEqual(successResult)
  })

  it('when result is excellent', () => {
    const result = exerciseCalculator([5, 5, 5, 5, 5, 5, 5], 2)

    expect(result).toEqual(excellentResult)
  })

  
})