import React from 'react'
import { Entry, Diagnosis } from '../types'
import { Card, Icon } from 'semantic-ui-react'

interface Props {
  entry: Entry
  diagnosis: Diagnosis[]
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

const EntryDetail: React.FC<Props> = ({ entry, diagnosis }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <Card fluid={true}>
          <Card.Content>
            <Card.Header>
              <p>
                {' '}
                <Icon name="hospital" />
              </p>
              <p> Date: {entry.date} </p>
            </Card.Header>
            <Card.Description>
              <p> Description: {entry.description} </p>
              {entry.diagnosisCodes && (
                <ul>
                  {entry.diagnosisCodes.map((code: string) => (
                    <li key={code}>
                      {code} ({diagnosis ? diagnosis.find((d) => d.code === code)?.name : 'not found'})
                    </li>
                  ))}
                </ul>
              )}
            </Card.Description>
            <Card.Description>
              {entry.discharge && (
                <div>
                  Discharged on {entry.discharge.date} for {entry.discharge.criteria}
                </div>
              )}
            </Card.Description>
          </Card.Content>
        </Card>
      )
    case 'OccupationalHealthcare':
      return (
        <Card fluid={true}>
          <Card.Content>
            <Card.Header>
              <p>
                {' '}
                <Icon name="hospital" />
              </p>
              <p> Date: {entry.date} </p>
              <p> Employer name: {entry.employerName} </p>
            </Card.Header>
            <Card.Description>
              <p> Description: {entry.description} </p>
              {entry.diagnosisCodes && (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>
                      {code} ({diagnosis ? diagnosis.find((d) => d.code === code)?.name : 'not found'})
                    </li>
                  ))}
                </ul>
              )}
            </Card.Description>
            <Card.Description>
              {entry.sickLeave && (
                <div>
                  Sick leave duration: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
                </div>
              )}
            </Card.Description>
          </Card.Content>
        </Card>
      )
    case 'HealthCheck':
      return (
        <Card fluid={true}>
          <Card.Content>
            <Card.Header>
              <p>
                {' '}
                <Icon name="hospital" />
              </p>
              <p> Date: {entry.date} </p>
            </Card.Header>
            <Card.Description>
              <p> Description: {entry.description} </p>
              {entry.diagnosisCodes && (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>
                      {code} ({diagnosis ? diagnosis.find((d) => d.code === code)?.name : 'not found'})
                    </li>
                  ))}
                </ul>
              )}
            </Card.Description>
          </Card.Content>
        </Card>
      )
    default:
      return assertNever(entry)
  }
}

export default EntryDetail
