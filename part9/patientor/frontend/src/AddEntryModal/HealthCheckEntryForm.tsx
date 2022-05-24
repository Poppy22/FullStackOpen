import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'

import { TextField, NumberField, DiagnosisSelection } from '../AddPatientModal/FormField'
import { HealthCheckEntry } from '../types'
import { useStateValue } from '../state'

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type HealthcheckEntryFormValues = Omit<HealthCheckEntry, 'id'>

interface Props {
  onSubmit: (values: HealthcheckEntryFormValues) => void
  onCancel: () => void
}

export const AddHealthcheckEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue()

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        type: 'HealthCheck',
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required'
        const errors: { [field: string]: string } = {}
        if (!values.description) {
          errors.description = requiredError
        }
        if (!values.date) {
          errors.dateOfBirth = requiredError
        }
        if (!values.specialist) {
          errors.specialist = requiredError
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError
        }
        if (!values.type) {
          errors.type = requiredError
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError
        }
        return errors
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field label="Description" placeholder="write here..." name="description" component={TextField} />
            <Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />
            <Field label="Specialist" placeholder="doctor" name="specialist" component={TextField} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Field
              label="Healthcheck Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AddHealthcheckEntryForm
