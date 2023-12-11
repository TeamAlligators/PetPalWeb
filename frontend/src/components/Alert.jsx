import styles from "./Alert.module.css"

/**
 * A generic input modal component
 * @module GenericAlert
 */
/** @prop {boolean} [show] : whether to show alert*/
/** @prop {boolean} [success] : whether the task was successful or not*/
/** @prop {String} [message] : message to display on modal*/
/** @prop {function} [onClose] */


const Alert = (props) => {
    if (!props.show) {
        return null;
    }

    return (
        <div className={styles.alert}>
            {props.success ? (
                <div className={styles.success}>
                    <h4 className={styles.text}>{props.message}</h4>
                    <button onClick={props.onClose}> Close </button>
                </div>
            ) : (
                <div className={styles.failure}>
                    <h4 className={styles.text}>{props.message}</h4>
                    <button onClick={props.onClose}> Close </button>
                </div>
            )}
        </div>
    );
};

export default Alert;