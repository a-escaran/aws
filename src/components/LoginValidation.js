function Validation(values){
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid email format";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 6) { 
        errors.password = "Password must be at least 6 characters long";
    } else if (values.password.length > 30) { 
        errors.password = "Password must not be more than 30 characters long";
    }
    
    if (Object.keys(errors).length === 0) {
        return { success: "No errors found" };
    }

    return errors;
}

export default Validation;
