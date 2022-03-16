import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return notification.content && <div style={style}>{notification.content}</div>
}

const mapStateToProps = (state) => ({
  notification: state.notification,
})

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
