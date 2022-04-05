type Rating = 1 | 2 | 3

interface ResultInterface {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: Rating
  ratingDescription: string
  target: number
  average: number
}

function exerciseCalculator(days: number[], target: number): ResultInterface {
  const average = days.reduce((a, b) => a + b, 0) / days.length
  const success = average >= target
  const periodLength = days.length
  const trainingDays = days.filter((x) => x > 0).length
  let rating: Rating = 1
  let ratingDescription = ''

  if (average / target > 1) {
    rating = 3 // best
    ratingDescription = 'Worked out more than planned - great!'
  } else if (average / target > 0.7) {
    rating = 2
    ratingDescription = 'Worked out a little less than planned - keep trying!'
  } else {
    rating = 1
    ratingDescription = 'Worked out significantly less than planned.'
  }

  return { periodLength, trainingDays, success, rating, ratingDescription, target, average }
}

const target = Number(process.argv[2])
const days: number[] = []
process.argv.slice(3).forEach((e) => {
  days.push(Number(e))
})

console.log(exerciseCalculator(days, target))

export default { compute: exerciseCalculator }
