import React from 'react';

// default Form component used in several pages
const Form=(props) => {
    const {
        cancel,
        submit,
        submitButtonText,
        data,
        name,
        errors,
        serverError
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
        <React.Fragment> 
            {serverError.length>0 && <div className="validation--errors">{serverError }</div>}
            {
            errors.length > 0 ? <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul> {
                    errors.map(error => <li key={error}>{error==='confirmPassword' ? 'password does not match':`Please provide a value for "${error}"`}</li>)
                } </ul>
            </div> : null
        }
            <form onSubmit={handleSubmit}>
                <div className={
                    name === ('signup' || 'signin') ? 'user-form' : "main--flex"
                }>
                    {
                    data()
                } </div>
                <button className="button" type="submit">
                    {submitButtonText}</button>
                <button className="button button-secondary"
                    onClick={handleCancel}>Cancel</button>
            </form>
        </React.Fragment>

    );
}

export default Form