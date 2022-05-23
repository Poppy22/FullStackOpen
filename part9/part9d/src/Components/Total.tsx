import React from 'react'
import { CoursePart } from '../types'

interface Props {
  courseParts: CoursePart[]
}

const Total: React.FC<Props> = ({ courseParts }) => (
  <p>Number of exercises: {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
)

export default Total
