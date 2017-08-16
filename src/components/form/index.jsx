import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'

const noop = () => {}

class Form extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            formInputs: [],
            data: {},
        }
    }

    update({name, value}) {
        this.setState({
            data: {
                ...data,
                [name]: value
            }
        })
    }

    onSubmit() {
        const {
            onError,
            onSubmit
        } = this.props

        let error
        const invalid = React.Children.toArray().some((child) => {
            error = child.state.error
            return !child.state.valid
        })

        if (invalid) {
            onError(error)
            return
        }

        onSubmit(this.state.data)
    }

    render() {
        const {
            children,
            name,
            className,
        } = this.props

        const classes = classNames('td-form', className)

        const FormFields = React.Children.map(children, (input, index) => {
            const inputProps = {
                ...input.props,
                key: `${name}`,
                onUpdate: this.update,
            }

            return React.cloneElement(input, inputProps)
        })

        return (
            <form>
                {FormFields}
            </form>
        )
    }
}

Form.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    onSubmit: PropTypes.func
}

Form.defaultProps = {
    onSubmit: noop
}

export default Form