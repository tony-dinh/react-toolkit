import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'

class FormField extends React.PureComponent {

    constructor(props){
        super(props)

        this.update = this.update.bind(this)
        this.touch = this.touch.bind(this)
        this.state = {
            error: '',
            dirty: false,
            touched: false,
            valid: !props.required
        }
    }

    update(value) {
        this.props.onUpdate({[this.props.name]: value })
    }

    touch() {
        this.setState({touched: true})
    }

    render() {

        const {
            component: Component
        } = this.props

        const {
            error
        } = this.state
        
        const componentError = touched && error ? {message: error} : null
        
        return (
            <Component 
                error={componentError} 
                onUpdate={this.update}
                onFocus={this.touch}
            />
        )
    }
}

FormField.PropTypes = {
    component: PropTypes.func.isRequired,
    onUpdate: PropTypes.func,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
}

FormField.defaultProps = {
    required: false
}

export default FormField