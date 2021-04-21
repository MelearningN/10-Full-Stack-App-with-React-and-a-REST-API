import React from 'react';

// default Form component used in several pages
const Form=(props) => {
    const {
        cancel,
        submit,
        submitButtonText,
        data,
        serverErrors
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
            {
            serverErrors.length>0 ? <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul> {
                    serverErrors.map(error => <li key={error}>{error}</li>)
                } </ul>
            </div> : null
        }
            <form onSubmit={handleSubmit}>
                <div>
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