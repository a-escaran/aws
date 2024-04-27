function Validation(values) {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

    if (!values.username) {
        errors.username = "Username is required";
    } else if (!usernameRegex.test(values.username)) {
        errors.username = "Invalid username format";
    }

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid email format";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    } else if (values.password.length > 12) {
        errors.password = "Password must not be more than 12 characters long";
    }
    
    return errors;
}

export default Validation;
