import PropTypes from 'prop-types'

const FormSubmit = ({render, submit}) => {
    return render({submit})
}

FormSubmit.propTypes = {
    render: PropTypes.func.isRequired,
    submit: PropTypes.func
}

export default FormSubmit
