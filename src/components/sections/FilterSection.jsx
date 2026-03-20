/**
 * @typedef {Object} FilterSectionProps
 * @prop {React.ReactNode} children
 * @prop {string} [className]
 */

/**
 * @param {FilterSectionProps} props
 */

function FilterSection({ className, children }) {
    return (
        <section
            id="filterSection"
            className={`filter-section mb-5 bg-card-bg p-5 rounded-lg border-2 border-accent-soft italic${className ? ` ${className}` : ""}`}
        >
            {children}
        </section>
    )
}

export default FilterSection;