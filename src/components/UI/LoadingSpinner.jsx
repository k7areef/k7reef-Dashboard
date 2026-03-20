/**
 * @typedef {Object} LoadingSpinnerProps
 * @prop {string} [className]
 */

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @param {LoadingSpinnerProps} props
 */

function LoadingSpinner({ className }) {
    return (
        <FontAwesomeIcon icon={faSpinner} className={`animate-spin${className ? ` ${className}` : ""}`} />
    )
}

export default LoadingSpinner;