import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import { apiBaseUrl } from '../constants'
import { addPatient, useStateValue } from '../state'
import { PatientEntry, Entry } from '../types'
import EntryDetail from './EntryDetails'
import { Button } from '@material-ui/core'
import AddHealthcheckEntryModal from '../AddEntryModal'
import { HealthcheckEntryFormValues } from '../AddEntryModal/HealthCheckEntryForm'

const PatientInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>() as { id: string }
  const [{ patients, diagnosis }, dispatch] = useStateValue()

  const [modalOpen, setModalOpen] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>()

  const openModal = (): void => setModalOpen(true)

  const closeModal = (): void => {
    setModalOpen(false)
    setError(undefined)
  }

  const submitNewEntry = async (values: HealthcheckEntryFormValues) => {
    try {
      const { data: newPatient } = await axios.post<PatientEntry>(`${apiBaseUrl}/patients/${id}/entries`, values)
      dispatch({ type: 'ADD_PATIENT', payload: newPatient })
      closeModal()
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error')
        setError(String(e?.response?.data?.error) || 'Unrecognized axios error')
      } else {
        console.error('Unknown error', e)
        setError('Unknown error')
      }
    }
  }

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
      <AddHealthcheckEntryModal modalOpen={modalOpen} onSubmit={submitNewEntry} error={error} onClose={closeModal} />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </>
  ) : (
    <>Loading...</>
  )
}

export default PatientInfo
