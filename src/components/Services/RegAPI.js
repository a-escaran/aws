    async function submitRegistrationForm(formValues) {
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to submit registration form');
        }
    }

    export default submitRegistrationForm;
