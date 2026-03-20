/**
 * @typedef {Object} SectionHeaderProps
 * @prop {string} title
 * @prop {string} description
 * @prop {string} [className]
 * @prop {React.ReactNode} children
 */

/**
 * @param {SectionHeaderProps} props
 */

function SectionHeader({ title, description, className, children }) {
    return (
        <div className={`section-header flex md:items-center justify-between max-md:flex-col gap-5 lg:gap-10 mb-5 lg:mb-10${className ? ` ${className}` : ""}`}>
            <div className="text-wrapper w-full">
                <h2 className="font-semibold text-lg md:text-xl lg:text-2xl 2xl:text-3xl mb-1">{title}</h2>
                <p className="text-muted-text">{description}</p>
            </div>
            <div className="children-wrapper shrink-0">
                {children}
            </div>
        </div>
    )
}

export default SectionHeader;