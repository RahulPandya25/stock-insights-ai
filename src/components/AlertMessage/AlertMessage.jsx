import { useDispatch, useSelector } from "react-redux";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiAlertCircle,
  FiXCircle,
} from "react-icons/fi";
import { getAlertMessages, removeMessage } from "../../store/slices/alertSlice";
import styles from "./AlertMessage.module.scss";

const iconMap = {
  info: <FiInfo />,
  success: <FiCheckCircle />,
  warning: <FiAlertTriangle />,
  error: <FiAlertCircle />,
};

const Message = ({ message, type, index }) => {
  const dispatch = useDispatch();

  const wrapperClasses = [styles.wrapper, styles[type.toLowerCase()]].join(" ");
  const icon = iconMap[type.toLowerCase()];

  return (
    <div className={wrapperClasses}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.message}>{message}</span>
      <span
        className={styles.close}
        onClick={() => dispatch(removeMessage(index))}
      >
        <FiXCircle />
      </span>
    </div>
  );
};

export const AlertMessage = () => {
  const alertMessages = useSelector(getAlertMessages);

  return (
    <div className={styles.container}>
      {alertMessages.map((alertMessage, index) => (
        <Message
          key={index}
          message={alertMessage.message}
          type={alertMessage.type}
          index={index}
        />
      ))}
    </div>
  );
};
