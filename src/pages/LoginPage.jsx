import LoginForm from "@components/sections/LoginForm";

function LoginPage() {

    const sharedStyles = "spotlight-left absolute z-0 pointer-events-none w-100 h-100 rounded-full bg-primary blur-2xl opacity-15";

    return (
        <div className="login-page relative overflow-hidden">
            {/* Spotlight Left */}
            <div className={`${sharedStyles} -left-50 -top-50`}></div>
            {/* Container */}
            <div className="container h-screen flex items-center justify-center relative z-1">
                <LoginForm />
            </div>
            {/* Spotlight Right */}
            <div className={`${sharedStyles} -right-50 -bottom-50`}></div>
        </div>
    )
}

export default LoginPage;