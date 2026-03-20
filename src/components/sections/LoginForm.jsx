import React from "react";
import { faDatabase, faEnvelope, faExclamation, faEye, faEyeSlash, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validateLogin } from "@utils/helpers";
import { supabase } from "@utils/supabaseClient";

function LoginForm() {

    // States:
    const [isLoading, setIsLoading] = React.useState(false);
    const [isShowPassword, setIsShowPassword] = React.useState(false);
    const [data, setData] = React.useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = React.useState({
        email: "",
        password: ""
    });
    const [authError, setAuthError] = React.useState(null);

    // Handlers:
    const handleChange = React.useCallback((e) => { // Handle Change
        const value = e.target.value;
        const name = e.target.name;
        setErrors(prev => ({ ...prev, [name]: "" }));
        setData({
            ...data,
            [name]: value
        });
    }, [data]);
    const handleShowPassword = React.useCallback(() => { // Toggle Show Password
        setIsShowPassword(prev => !prev);
    }, []);
    const handleSubmit = React.useCallback(async (e) => { // Sign In
        e.preventDefault();
        // Reset Auth Error
        setAuthError(null);

        // Validate
        if (!validateLogin(data, setErrors)) return;

        // Start Loading
        setIsLoading(true);

        // Sign In
        try {
            const response = await supabase.auth.signInWithPassword(data);
            if (response.error) {
                setAuthError(response.error.message);
                console.log(response.error);
                return;
            }
        } catch (err) {
            console.log(err);
        } finally { // Stop Loading
            setIsLoading(false);
        }
    }, [data]);

    return (
        <div className="login-form w-full md:max-w-120 bg-card-bg rounded-lg border-2 border-accent-soft">
            {/* Auth Error */}
            <div className={`auth-error bg-card-bg rounded-lg rounded-b-none transition-all will-change-auto grid border-b-2 ${authError ? "grid-rows-[1fr] px-5 py-3 border-b-accent-soft" : "grid-rows-[0fr] border-b-transparent"}`}>
                <div className={`auth-error-wrapper overflow-hidden flex items-center font-medium text-danger transition-opacity will-change-auto duration-200 ease-out ${authError ? "delay-100 opacity-100" : "opacity-0"}`}>
                    <div className="text-error text-danger">
                        <FontAwesomeIcon icon={faExclamation} />
                        <span>{authError}</span>
                    </div>
                    <button
                        type="button"
                        title="Close"
                        aria-label="Close"
                        onClick={() => setAuthError(null)}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-danger/30 sm:hover:bg-danger sm:hover:text-white transition duration-200 ease-out ms-auto"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                        <span className="sr-only">Close</span>
                    </button>
                </div>
            </div>
            {/* Form */}
            <form className="login-form space-y-3 bg-grey p-5 rounded-lg" onSubmit={handleSubmit}>
                {/* Header */}
                <div className="header text-center">
                    <div className="icon w-14 h-14 rounded-xl flex items-center justify-center bg-primary mx-auto mb-3">
                        <FontAwesomeIcon icon={faDatabase} size="2x" />
                    </div>
                    <h3 className="text-2xl mb-1 font-semibold">DataStore Admin</h3>
                    <p className="text-muted-text">Enter your credentials to access the dashboard</p>
                </div>
                {/* Email */}
                <div className="input-wrapper relative">
                    <label htmlFor="email">Email</label>
                    {/* Input */}
                    <div className="input relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="on"
                            onChange={handleChange}
                            placeholder="Enter your email"
                            onFocus={() => setErrors(prev => ({ ...prev, email: "" }))}
                            className="mt-2 w-full border-2 border-primary/70 p-3 rounded-md transition duration-200 ease-out focus:border-primary"
                        />
                        {/* Icon */}
                        <div className="input-icon absolute right-3 bottom-3 text-xl pointer-events-none">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                    </div>
                    {/* Error */}
                    {
                        errors.email && <p className="text-red-500 mt-2 text-sm!">{errors.email}</p>
                    }
                </div>
                {/* Password */}
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    {/* Input */}
                    <div className="input relative">
                        <input
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            type={isShowPassword ? "text" : "password"}
                            onFocus={() => setErrors(prev => ({ ...prev, password: "" }))}
                            className="mt-2 w-full border-2 border-primary/70 p-3 rounded-md transition duration-200 ease-out focus:border-primary"
                        />
                        {/* Icon */}
                        <button
                            type="button"
                            title="Show Password"
                            aria-label="Show Password"
                            onClick={handleShowPassword}
                            className={`input-icon absolute right-3 bottom-3 text-xl${isShowPassword ? " text-primary" : ""}`}
                        >
                            <FontAwesomeIcon icon={isShowPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {/* Error */}
                    {
                        errors.password && <p className="text-red-500 mt-2 text-sm!">{errors.password}</p>
                    }
                </div>
                {/* Submit */}
                <button
                    title="Login"
                    type="submit"
                    aria-label="Login"
                    disabled={isLoading}
                    className="w-full bg-primary py-2 px-4 rounded-md"
                >
                    {isLoading ? (
                        <>
                            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                            <span className="sr-only">{isLoading ? "Loading..." : "Login"}</span>
                        </>
                    ) : (
                        "Login"
                    )}
                </button>
                {/* Footer */}
                <div className="footer border-t-2 border-t-accent-soft py-3">
                    <p className="text-muted-text">@ {new Date().getFullYear()} DataStore Admin Panel. All systems operational.</p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;