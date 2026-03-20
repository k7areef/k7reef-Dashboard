/**
 * @typedef {Object} BadgeProps
 * @property {string} text
 * @property {'success' | 'warning' | 'dark'} variant
 * @property {string} [className]
 */

/**
 * @param {BadgeProps} props
 */

function Badge({ text, variant, className }) {

    const variants = {
        success: "bg-success-soft text-success border-success/20 selection:bg-success! selection:text-dark-bg!",
        warning: "bg-warning-soft text-warning border-warning/20 selection:bg-warning! selection:text-dark-bg!",
        dark: "bg-dark-bg text-muted-text border-muted-text selection:bg-muted-text! selection:text-dark-bg!",
    };

    return (
        <div className={`badge py-1 px-2 rounded-full text-sm border font-medium italic ${variants[variant]}${className ? ` ${className}` : ""}`}>
            <span>{text}</span>
        </div>
    )
}

export default Badge;