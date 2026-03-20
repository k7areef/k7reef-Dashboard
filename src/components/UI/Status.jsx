/**
 * @typedef {Object} StatusProps
 * @prop {string} [className]
 */

import { useFormikContext } from "formik";

/**
 * @param {StatusProps} props
 */

function Status({ className }) {

    const { setFieldValue, values } = useFormikContext();

    return (
        <div className={`status${className ? ` ${className}` : ""}`}>
            <p className="text-muted-text font-medium mb-2">Status <span className="text-primary text-sm">( status will be <span className="font-bold">{values.status}</span> )</span></p>
            <div className="radios flex sm:items-center gap-3 flex-wrap max-sm:flex-col">
                {
                    Array.from(["Active", "Inprogress", "Incoming", "Archived"]).map((status, index) => (
                        <label key={index}>
                            <input
                                type="radio"
                                name="status"
                                className="peer hidden"
                                onChange={() => setFieldValue("status", status)}
                                checked={status === values.status}
                            />
                            <div className="custom-radio text-lg bg-dark-bg py-2 px-4 rounded-md flex items-center gap-2 max-sm:justify-between cursor-pointer peer-checked:[&>span]:opacity-100 peer-checked:[&>div]:*:scale-100">
                                <span className="opacity-80 transition duration-200 will-change-auto">{status}</span>
                                <div className="circle-wrapper w-4 h-4 rounded-full border-2 border-primary p-0.5">
                                    <div className="circle w-full h-full rounded-full bg-primary transition duration-200 will-change-auto scale-0"></div>
                                </div>
                            </div>
                        </label>
                    ))
                }
            </div>
        </div>
    )
}

export default Status;