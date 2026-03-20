export const validateLogin = (data, setErrors) => {
    let newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email) {
        newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
        newErrors.email = "Invalid email format";
    }

    if (!data.password) {
        newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};