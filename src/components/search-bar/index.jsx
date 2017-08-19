import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Transition from 'react-transition-group/Transition'

import Icon from '../icon'

import './_base.scss'

const noop = () => {}

/**
 * ```jsx
 * import SearchBar from '@tonydinh/react-toolkit/dist/components/search-bar'
 * ```
 * A SearchBar widget that is meant to be used inline.
 */
class SearchBar extends React.PureComponent {
    constructor(props) {
        super(props)

        this.clear = this.clear.bind(this)
        this.blur = this.blur.bind(this)
        this.click = this.click.bind(this)
        this.focus = this.focus.bind(this)
        this.change = this.change.bind(this)

        this.state = {
            height: 0,
            focus: false,
            value: typeof props.value === 'undefined' ? '' : props.value
        }
    }

    componentDidMount() {
        if (!this._input) {
            return
        }

        const height = this._input.getBoundingClientRect().height
        this.setState({
            height
        })
    }

    getValue() {
        return typeof this.props.value === 'undefined'
            ? this.state.value
            : this.props.value
    }

    setValue(value) {
        if (typeof this.props.value !== 'undefined') {
            this.props.onChange(value)
            return
        }
        this.setState({
            value
        })
    }

    clear() {
        this.setValue('')
    }

    blur(e) {
        this.setState({
            focus: false
        })
        this.props.onBlur()
    }

    change(e) {
        e.stopPropagation()
        this.setValue(e.currentTarget.value)
    }

    click() {
        !this.state.focus && this.focus()
    }

    focus() {
        this.setState({
            focus: true
        })
        this.props.onFocus()
    }

    render() {
        const {
            focus,
            height,
            wrapperHeight
        } = this.state

        const {
            animationDuration,
            className,
            disabled,
            inputClassName,
            name,
            placeholder,
            tabIndex
        } = this.props

        const value = this.getValue()
        const classes = classNames('td-search-bar', className, {
            'td-search-bar--focus': focus,
            'td-search-bar--blur': !focus,
            'td-search-bar--disabled': disabled
        })
        const inputClasses = classNames('td-search-bar__input', inputClassName)

        const iconClasses = 'td-search-bar__icon'
        const inputWrapperClasses = 'td-search-bar__input-wrapper'
        const inputAccessoryWrapperClasses = 'td-search-bar__input-accessories'
        const inputLabelClasses = classNames('td-search-bar__input-label', {
            'td-search-bar__empty': value.length === 0,
        })

        const clearButtonClasses = classNames('td-search-bar__button', {
            'td-search-bar__button--fade-in': value.length !== 0,
            'td-search-bar__button--fade-out': value.length === 0
        })

        const iconStyle = {
            height: `${height}px`,
            width: `${height}px`
        }

        const buttonStyle = {
            height: `${height}px`,
            width: `${height}px`,
            animationDuration: `${animationDuration}ms`
        }

        const labelStyle = {
            height: `${height}px`,
        }

        return (
            <div className={classes} aria-disabled={disabled}>
                {/* Search Icon */}
                <Icon className={iconClasses} name="search" style={iconStyle} />

                <div className={inputWrapperClasses} ref={el => this._inputWrapper = el}>
                    {/* Placeholder Label */}
                    <div className={inputAccessoryWrapperClasses}>
                        <label className={inputLabelClasses} style={labelStyle} htmlFor={name}>
                            {placeholder}
                        </label>
                    </div>

                    {/* Input Field */}
                    <input className={inputClasses}
                        name={name}
                        tabIndex={tabIndex}
                        type="text"
                        value={value}
                        onBlur={this.blur}
                        onChange={this.change}
                        onClick={this.click}
                        onFocus={this.focus}
                        ref={el => this._input = el}
                    />

                     <Transition
                        in={value.length !== 0}
                        timeout={animationDuration}
                        unmountOnExit={true}
                        mountOnEnter={true}
                    >
                        <button className={clearButtonClasses}
                            aria-label="clear input"
                            style={buttonStyle}
                            onClick={this.clear}
                        >
                            <Icon className={iconClasses}
                                name="close"
                            />
                        </button>
                    </Transition>
                </div>
            </div>
        )
    }
}

SearchBar.propTypes = {
    /**
     * Specifies the length of the fade in/out animation of the clear button.
     */
    animationDuration: PropTypes.number,

    /**
     *  Adds a user-defined class to the root element.
     */
    className: PropTypes.string,

    /**
     *  Sets the disable state of the input.
     */
    disabled: PropTypes.bool,

    /**
     * Specifies the text for the placeholder label which is visible when the input is empty.
     */
    placeholder: PropTypes.string,

    /**
     * Specifies a name for the input field.
     */
    name: PropTypes.string,

    /**
     * Specifies the tab index of the input
     */
    tabIndex: PropTypes.number,

    /**
     * User-defined function which triggers when the search input loses focus.
     */
    onBlur: PropTypes.func,

    /**
     * User-defined function which triggers when the search input updates its values.
     */
    onChange: PropTypes.func,

    /**
     * User-defined function which triggers when the search input focuses.
     */
    onFocus: PropTypes.func
}

SearchBar.defaultProps = {
    animationDuration: 250,
    disabled: false,
    placeholder: 'Search',
    name: 'search',
    tabIndex: 0,
    onBlur: noop,
    onChange: noop,
    onFocus: noop
}

export default SearchBar