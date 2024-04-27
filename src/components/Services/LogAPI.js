async function submitLoginForm(formValues) {
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to submit login form');
    }
}

export default submitLoginForm;