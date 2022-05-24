import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import { apiBaseUrl } from '../constants'
import { addPatient, useStateValue } from '../state'
import { PatientEntry, Entry } from '../types'
import EntryDetail from './EntryDetails'

const PatientInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>() as { id: string }
  const [{ patients, diagnosis }, dispatch] = useStateValue()

  useEffect(() => {
    if (patients[id]?.ssn) return

    const getPatientInfo = async () => {
      try {
        const { data } = await axios.get<PatientEntry>(`${apiBaseUrl}/patients/${id}`)
        dispatch(addPatient(data))
      } catch (e) {
        console.error(e)
      }
    }

    void getPatientInfo()
  }, [dispatch])

  return patients && patients[id] ? (
    <>
      <h1>
        {patients[id].name} ({patients[id].gender})
      </h1>
      <p>date of birth: {patients[id].dateOfBirth}</p>
      <p>occupation: {patients[id].occupation}</p>
      <h2>Entries</h2>
      {patients[id].entries.length === 0 ? (
        <p> No entried added yet.</p>
      ) : (
        patients[id].entries.map((e: Entry) => <EntryDetail key={e.id} entry={e} diagnosis={diagnosis} />)
      )}
    </>
  ) : (
    <>Loading...</>
  )
}

export default PatientInfo
