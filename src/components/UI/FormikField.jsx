/**
 * @typedef {Object} FormikFieldProps
 * @prop {Object} field
 * @prop {string} label
 * @prop {string} typeField
 * @prop {function} setFieldValue
 * @prop {string} parentClassName
 * @prop {string} icon
 * @prop {Array} options
 */

/**
 * @param {FormikFieldProps} props
 */

import { faAngleDown, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage } from "formik";
import React from "react";

const iconsmap = {
    location: faLocationDot
}

function FormikField({ setFieldValue, label, typeField, icon, parentClassName, options, ...props }) {

    const [open, setOpen] = React.useState(false);
    const [currentOption, setCurrentOption] = React.useState({
        value: null,
        label: "Select"
    });
    const ref = React.useRef(null);
    const sharedStyles = `w-full p-3 bg-dark-bg border border-accent-soft caret-primary rounded-md transition duration-300 ease-in-out read-only:border-transparent not-read-only:focus:border-primary`;

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [open]);

    return (
        <div className={`formik-field${parentClassName ? " " + parentClassName : ""} relative`}>
            {
                icon && iconsmap[icon] &&
                <FontAwesomeIcon icon={iconsmap[icon]} className="absolute right-3 bottom-4.5" />
            }
            {label && <label htmlFor={props.id} className="w-fit block mb-2 text-muted-text font-medium">{label}</label>}
            {
                typeField === "input" ? (
                    <input
                        {...props}
                        className={sharedStyles}
                    />
                ) : typeField === "textarea" ? (
                    <textarea
                        {...props}
                        className={`${sharedStyles} resize-none h-40`}
                    >
                    </textarea>
                ) : typeField === "select" ? (
                    <div className="select relative" ref={ref}>
                        <select {...props} className="hidden"></select>
                        <button
                            type="button"
                            onClick={() => setOpen(prev => !prev)}
                            className={`${open ? "bg-grey-15 " : ""}flex items-center justify-between tranition duration-300 ease-in-out w-full p-3 rounded-md bg-grey-10 border border-grey-15`}
                        >
                            <p className="current-value text-grey-40!">{currentOption.label}</p>
                            <FontAwesomeIcon icon={faAngleDown} className={`transition duration-300 ease-in-out${open ? " rotate-180" : ""}`} />
                        </button>
                        <div className={`select-options absolute z-10 w-full bg-grey-10 border border-grey-15 mt-2 transition duration-300 ease-in-out rounded-md p-1.5 space-y-2 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                            {
                                options.map((option, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => {
                                            setCurrentOption(option);
                                            setFieldValue(props.name, option.value);
                                            setOpen(false);
                                        }}
                                        className={`block p-3 rounded-sm w-full text-grey-40 ${currentOption.value === option.value ? "text-white bg-grey-20" : "hover:text-white bg-grey-15"} transition duration-300 ease-in-out`}
                                    >
                                        {option.label}
                                    </button>
                                ))
                            }
                        </div>
                    </div >
                ) : typeField === "radio_group" ? (
                    <>
                        <select {...props} className="hidden"></select>
                    </>
                ) : null
            }
            {/* Error Message */}
            {
                typeField !== "radio_group" && (
                    <ErrorMessage name={props.name} component="p" className="text-red-500! mt-2" />
                )
            }
        </div >
    )
}

export default FormikField;