const computeBMI = (height: number, weight: number): string => {
  const bmi = weight / (height * height)
  let result = 'Obese'

  if (bmi < 25) {
    result = 'Normal'
  } else if (bmi < 30) {
    result = 'Overweight'
  }

  return `${result} (${height}, ${weight})`
}

const h = Number(process.argv[2]) / 10 // convert to cm
const w = Number(process.argv[3])

console.log(computeBMI(h, w))

export default { computeBMI }
