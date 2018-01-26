import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import debounce from 'lodash/debounce'
import Transition from 'react-transition-group/Transition'

import './_base.scss'

const noop = () => {}

class Modal extends React.Component {
    constructor(props) {
        super(props)

        this.hide = this.hide.bind(this)
        this.resize = debounce(this.resize, 100)
        this.onModalDidMount = this.onModalDidMount.bind(this)
        this.onModalWillUnmount = this.onModalWillUnmount.bind(this)

        this.state = {
            contentContainerStyle: null
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    onModalDidMount() {
        window.addEventListener('resize', this.resize)
        this.resize()
    }

    onModalWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    hide(e) {
        if (e.target !== e.currentTarget) {
            return
        }

        this.props.onDismiss()
    }

    resize() {
        const cardHeight = this._card.clientHeight

        const headerContainerHeight = this._headerContainer
            ? this._headerContainer.clientHeight
            : 0

        const contentContainerHeight = cardHeight - headerContainerHeight

        this.setState({
            contentContainerStyle: {
                height: contentContainerHeight
            }
        })
    }

    render() {
        const {
            contentContainerStyle
        } = this.state

        const {
            animationDuration,
            children,
            className,
            headerClassName,
            headerText,
            modalClassName,
            showing,
            onDismiss
        } = this.props

        const classes = classNames('td-modal', className, {
            'td-modal--fade-in': showing,
            'td-modal--fade-out': !showing
        })
        const modalClasses = classNames('td-modal__modal', modalClassName)
        const headerContainerClasses = 'td-modal__header-container'
        const headerClasses = classNames('td-modal__header', headerClassName)
        const contentContainerClasses = 'td-modal__content-container'

        const style = {
            animationDuration: `${animationDuration}ms`,
            cursor: onDismiss ? 'pointer' : 'default'
        }

        return (
            <Transition
                in={showing}
                timeout={animationDuration}
                onEntering={this.onModalDidMount}
                onExit={this.onModalWillUnmount}
                mountOnEnter={true}
                unmountOnExit={true}
            >
                <div className={classes} style={style} onClick={this.hide}>
                    <div className={modalClasses}
                        ref={(el) => { this._card = el }}
                    >
                        {!!headerText &&
                            <div className={headerContainerClasses}
                                ref={(el) => { this._headerContainer = el }}
                            >
                                <h2 className={headerClasses}>
                                    {headerText}
                                </h2>
                            </div>
                        }

                        <div className={contentContainerClasses}
                            style={contentContainerStyle}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </Transition>
        )
    }
}

Modal.propTypes = {
    animationDuration: PropTypes.number,
    children: PropTypes.element,
    className: PropTypes.string,
    headerClassName: PropTypes.string,
    headerText: PropTypes.string,
    modalClassName: PropTypes.string,
    showing: PropTypes.bool,
    onDismiss: PropTypes.func
}

Modal.defaultProps = {
    animationDuration: 250,
    showing: false,
    onDismiss: noop
}

export default Modal
