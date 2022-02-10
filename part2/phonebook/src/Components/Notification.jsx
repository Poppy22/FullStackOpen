const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return message ? (
    <div
      className={`notification ${
        type == "success" ? "notification-success" : "notification-error"
      }`}
    >
      {message}
    </div>
  ) : (
    <> </>
  );
};

export default Notification;
