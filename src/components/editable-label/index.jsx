import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'
import debounce from 'lodash/debounce'
import Transition from 'react-transition-group/Transition';

import './_base.scss'
import Button from '../button'

const noop = () => {}

/**
 * ```jsx
 * import EditableLabel from '@tonydinh/react-toolkit/dist/components/editable-label'
 * ```
 */

class EditableLabel extends React.PureComponent {
    constructor(props) {
        super(props)

        this.onValueChange = this.onValueChange.bind(this)
        this.onFocus = debounce(this.toggleEditing.bind(this, true), 100)
        this.onBlur = debounce(this.toggleEditing.bind(this, false), 100)
        this.onMouseEnter = debounce(this.onHover.bind(this, true), 100)
        this.onMouseLeave = debounce(this.onHover.bind(this, false), 100)

        this.state = {
            editing: false,
            hovering: false,
            value: ''
        }
    }

    onHover(hovering) {
        this.setState({
            hovering
        })
    }

    onValueChange(e) {
        const value = e.currentTarget.value

        if (this.props.value != null) {
            this.props.onValueChange(value)
            return
        }

        this.setState({
            value
        })
    }

    toggleEditing(editing) {
        const newState = {
            editing
        }

        if (editing) {
            this._input.focus()
        } else {
            const value = this.props.value != null
                ? this.props.value
                : this.state.value
            this.state.startValue !== value && this.props.onValueSet(value)
            newState.startValue = value
        }

        this.setState(newState)
    }

    render() {
        const {
            className,
            editing: propEditing,
            inputType,
            placeholder,
            style,
            value: propValue
        } = this.props

        const {
            hovering,
            editing: stateEditing,
            value: stateValue
        } = this.state

        const editing = propEditing != null
            ? propEditing
            : stateEditing

        const value = propValue != null
            ? propValue
            : stateValue

        const classes = classNames('td-editable-label', className, {
            'td--editable-label-active': editing
        })
        const iconClasses = classNames('td-editable-label__icon', {
            'td--icon-fade-in': !editing && hovering,
            'td--icon-fade-out': !(!editing && hovering)
        })
        const labelClasses = 'td-editable-label__label'
        return (
            <div className={classes}
                onMouseLeave={this.onMouseLeave}
                onMouseEnter={this.onMouseEnter}
                style={style}
            >
                <Transition
                    in={!editing && hovering}
                    timeout={250}
                    unmountOnExit={true}
                >
                    <Button className={iconClasses}
                        onClick={this.onFocus}
                        iconName="edit"
                    />
                </Transition>

                <input
                    className={labelClasses}
                    placeholder={placeholder}
                    type={inputType}
                    value={value}
                    onChange={this.onValueChange}
                    onBlur={this.onBlur}
                    ref={(el) => { this._input = el }}
                />
            </div>

        )
    }
}

EditableLabel.propTypes = {
    /**
     *  Adds a user-defined class to the root element.
     */
    className: PropTypes.string,

    /**
     * Specifies the type of input the label is expecting.
     */
    inputType: PropTypes.oneOf([
        'number',
        'text'
    ]),

    /**
     * Defines placeholder text to be displayed.
     */
    placeholder: PropTypes.string,

    /**
     * Sets the value of the label.
     */
     value: PropTypes.string,

    /**
     * User-defined function which triggers when the value is updating
     */
    onValueChange: PropTypes.func,

    /**
     * User-defined function which triggers when a new value is set.
     */
    onValueSet: PropTypes.func
}

EditableLabel.defaultProps = {
    inputType: 'text',
    onValueChange: noop,
    onValueSet: noop
}

export default EditableLabel