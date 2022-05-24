import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { Button, Divider, Header, Container } from 'semantic-ui-react'

import { apiBaseUrl } from './constants'
import { useStateValue, setPatientList, setDiagnosisList } from './state'
import { PatientEntry, Diagnosis } from './types'

import PatientListPage from './PatientListPage'
import PatientInfo from './PatientInfo'

const App = () => {
  const [, dispatch] = useStateValue()
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`)

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<PatientEntry[]>(`${apiBaseUrl}/patients`)
        dispatch(setPatientList(patientListFromApi))
      } catch (e) {
        console.error(e)
      }
    }
    const fetchDiagnosisList = async () => {
      try {
        const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`)
        dispatch(setDiagnosisList(data))
      } catch (e) {
        console.error(e)
      }
    }

    void fetchPatientList()
    void fetchDiagnosisList()
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/patients/:id" element={<PatientInfo />} />
            <Route path="/" element={<PatientListPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  )
}

export default App
