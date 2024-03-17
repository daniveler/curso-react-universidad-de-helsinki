type BmiResult = 'underweight' | 'healthy weight' | 'overweight' | 'obesity'

const calculateBmi = (height: number, weight: number) : BmiResult => {
  const operationResult = weight / height ** 2

  if(operationResult < 18.5) 
    return 'underweight'
  else if (operationResult >= 18.5 && operationResult <= 24.9) 
    return 'healthy weight'
  else if (operationResult > 25 && operationResult <= 29.9) 
    return 'overweight'
  else if (operationResult >= 30) 
    return 'obesity'
  else 
    throw new Error('Error: BMI could not be calculated')
}

interface BmiValues {
  height: number,
  weight: number
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Error: Not enough arguments')
  if (args.length > 4) throw new Error('Error: Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  }
  else {
    throw new Error('Error: Provided values were not numbers')
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBmi(height, weight))
}
catch(error: unknown) {
  if (error instanceof Error) {
    console.log('Error: ' + error.message)
  }
}