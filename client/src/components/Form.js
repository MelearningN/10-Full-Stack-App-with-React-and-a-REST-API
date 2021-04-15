import React from 'react';

export default(props) => {
    const {
        cancel,
        submit,
        submitButtonText,
        elements,
        name,
        errors
    } = props;

    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    function handleCancel(event) {
        event.preventDefault();
        cancel();
    }

    return (
        <React.Fragment> {
            errors.length > 0 ? <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul> {
                    errors.map(error => <li key={error}>{error=='confirmPassword' ? 'password does not match':`Please provide a value for "${error}"`}</li>)
                } </ul>
            </div> : null
        }
            <form onSubmit={handleSubmit}>
                <div className={
                    name == ('signup' || 'signin') ? 'user-form' : "main--flex"
                }>
                    {
                    elements()
                } </div>
                <button className="button" type="submit">
                    {submitButtonText}</button>
                <button className="button button-secondary"
                    onClick={handleCancel}>Cancel</button>
            </form>
        </React.Fragment>

    );
}
