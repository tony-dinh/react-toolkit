import React  from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class AccordionItemContent extends React.PureComponent {
    constructor(props) {
        super(props)

        this.getContentHeight = this.getContentHeight.bind(this)
    }

    getContentHeight() {
        return this._content.children.length ? this._content.children[0].offsetHeight : 0
    }

    render() {
        const {
            children,
            style
        } = this.props

        const classes = classNames('td-accordion__item-content')

        return (
            <div className={classes}
                style={style}
                ref={(el) => { this._content = el }}
            >
                {children}
            </div>
        )
    }
}

AccordionItemContent.propTypes = {
    children: PropTypes.element,

    /**
     * Defines styles to be applied to root element.
     */
    style: PropTypes.object
}

export default AccordionItemContent
