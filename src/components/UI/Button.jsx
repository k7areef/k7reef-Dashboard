/**
 * @typedef {Object} CustomButtonProps
 * @property {string} [to]
 * @property {string} [href]
 * @property {string} [type]
 * @property {string} [className]
 * @property {React.ReactNode} children
 * @property {'primary' | 'secondary' | 'dangerGhost' | 'danger'} [variant]
 * @property {React.ButtonHTMLAttributes<HTMLButtonElement> | import("react-router-dom").LinkProps} [props]
 */

import { Link } from "react-router-dom";

/**
 * @param {ButtonProps & React.HTMLAttributes<HTMLElement>} props
 * @typedef {CustomButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & import("react-router-dom").LinkProps} ButtonProps
 */

function Button({ variant = "primary", to, href, type, className, children, ...props }) {

    const variants = {
        primary: "bg-primary text-white sm:hover:bg-primary/80",
        secondary: "bg-accent-soft text-primary sm:hover:bg-primary/80 sm:hover:text-white",
        danger: "bg-danger text-white sm:hover:bg-danger/80"
    }

    const classNames = `px-4 py-2 sm:py-3 rounded-md font-semibold transition duration-300 ease-in-out ${variants[variant]}${className ? ` ${className}` : ""}`;

    if (href) {
        return (
            <a
                {...props}
                href={href}
                className={classNames}
            >
                {children}
            </a>
        )
    }

    if (to) {
        return (
            <Link
                to={to}
                {...props}
                className={classNames}
            >
                {children}
            </Link>
        )
    }

    return (
        <button
            {...props}
            className={classNames}
            type={type || "button"}
        >
            {children}
        </button>
    )
}

export default Button;