/**
 * @typedef {Object} SectionWrapperProps
 * @prop {"edit" | "add"} type
 * @prop {boolean} isLoading
 * @prop {String} title
 * @prop {Array} fields
 * @prop {Object} initialValues
 * @prop {Object} validationSchema
 * @prop {{ handleSubmit: function, handleDelete: function, handleCancel: function }} handlers
 * @prop {{ submit: string, delete: string, cancel: string, cancel: string }} buttonTexts
 * @prop {React.ReactNode} children
 */

import Button from "@components/UI/Button";
import FormikField from "@components/UI/FormikField";
import LoadingSpinner from "@components/UI/LoadingSpinner";
import { Formik } from "formik";

/**
 * @param {SectionWrapperProps} propWrappers
 */

function SectionWrapper({ type = "edit", isLoading = false, title, fields = [], initialValues, validationSchema, handlers, buttonTexts, children }) {
    return (
        <section
            onClick={e => e.stopPropagation()}
            className="section-wrapper bg-card-bg text-white p-5 lg:p-10 rounded-lg border-2 border-accent-soft space-y-5" id="sectionWrapper"
        >
            {
                isLoading ? (
                    <>Loading...</>
                ) : (
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => handlers?.handleSubmit(values, actions)}
                    >
                        {({
                            handleChange,
                            handleSubmit,
                            resetForm,
                            isSubmitting,
                            values,
                            dirty
                        }) => (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Header */}
                                <div className="header">
                                    <h2 className="font-semibold text-lg md:text-xl lg:text-2xl 2xl:text-3xl">{title}</h2>
                                </div>
                                {/* Separator */}
                                <hr className="border-t-accent-soft" />
                                {/* Fields */}
                                <div className="fields-wrapper grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Children */}
                                    {children}
                                    {/* Fields */}
                                    {
                                        fields.map((field, index) => {
                                            return (<FormikField
                                                {...{
                                                    ...field,
                                                    onChange: handleChange,
                                                    value: values[field.name]
                                                }}
                                                key={index}
                                            />)
                                        })
                                    }
                                </div>
                                {/* Separator */}
                                <hr className="border-t-accent-soft" />
                                {/* Footer */}
                                <div className="footer flex md:items-center gap-5 flex-wrap max-md:flex-col-reverse">
                                    {/* Delete */}
                                    {
                                        type === "edit" && (
                                            <Button
                                                title="Delete"
                                                aria-label="Delete"
                                                variant="danger"
                                                onClick={handlers?.handleDelete}
                                                className="max-md:flex-1"
                                            >
                                                {
                                                    buttonTexts?.delete || "Delete"
                                                }
                                            </Button>
                                        )
                                    }
                                    {/* Cancel */}
                                    {
                                        type === "add" && (
                                            <Button
                                                title="Cancel"
                                                aria-label="Cancel"
                                                variant="secondary"
                                                onClick={handlers?.handleCancel}
                                                className="max-md:flex-1"
                                            >
                                                {
                                                    buttonTexts?.cancel || "Cancel"
                                                }
                                            </Button>
                                        )
                                    }
                                    {/* Discard */}
                                    <Button
                                        onClick={resetForm}
                                        variant="secondary"
                                        title="Discard Changes"
                                        aria-label="Discard Changes"
                                        disabled={!dirty || isSubmitting}
                                        className="md:ms-auto max-md:flex-1 disabled:opacity-70 disabled:pointer-events-none"
                                    >
                                        {
                                            buttonTexts?.discard || "Discard"
                                        }
                                    </Button>
                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        disabled={!dirty || isSubmitting}
                                        className="max-sm:w-full disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center"
                                    >
                                        <div className={`loading-spinner grid transition-all ${isSubmitting ? "grid-rows-[1fr] grid-cols-[1fr] me-2" : "grid-rows-[0fr] grid-cols-[0fr]"}`}>
                                            <div className={`icon-wrapper overflow-hidden transition-opacity ${isSubmitting ? "opacity-100 delay-100" : "opacity-0"}`}>
                                                <LoadingSpinner />
                                            </div>
                                        </div>
                                        <span>
                                            {
                                                buttonTexts?.submit || "Submit"
                                            }
                                        </span>
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                )
            }
        </section>
    )
}

export default SectionWrapper;