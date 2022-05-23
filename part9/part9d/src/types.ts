export interface CoursePartBasic {
  name: string
  exerciseCount: number
  type: string
}

export interface CoursePartWithDescription extends CoursePartBasic {
  description: string
}

export interface CourseNormalPart extends CoursePartWithDescription {
  type: 'normal'
}
interface CourseProjectPart extends CoursePartBasic {
  type: 'groupProject'
  groupProjectCount: number
}

export interface CourseSubmissionPart extends CoursePartWithDescription {
  type: 'submission'
  exerciseSubmissionLink: string
}

export interface CourseSpecialPart extends CoursePartWithDescription {
  requirements: string[]
  type: 'special'
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart
