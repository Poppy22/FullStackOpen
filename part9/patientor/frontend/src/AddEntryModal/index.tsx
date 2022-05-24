import { Dialog, DialogTitle, DialogContent, Divider } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import AddHealthcheckEntryForm, { HealthcheckEntryFormValues } from './HealthCheckEntryForm'

interface Props {
  modalOpen: boolean
  onClose: () => void
  onSubmit: (values: HealthcheckEntryFormValues) => void
  error?: string
}

const AddHealthcheckEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new healthcheck entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddHealthcheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
)

export default AddHealthcheckEntryModal
