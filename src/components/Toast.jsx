/* eslint-disable react/prop-types */
const Toast = ({ text }) => {
  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-success">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Toast;
