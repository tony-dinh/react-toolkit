import React from 'react'
import ReactList from 'react-list'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './_base.scss'

const noop = () => {}

class List extends React.PureComponent {
    constructor(props) {
        super(props)
        this.renderItem = this.renderItem.bind(this)
    }

    onItemClicked(index, value, label) {
        this.props.onItemClicked(index, value, label)
    }

    renderItem(index, key) {
        const {
            itemClassName,
            items,
            itemTemplate
        } = this.props

        const classes = classNames('td-list__item', itemClassName)
        const item = items[index]

        if (itemTemplate) {
            return (
                <itemTemplate className={classes}
                    key={key}
                    item={item}
                    onClick={this.onItemClicked.bind(this, index, item.value, item.label)}
                />
            )
        }

        return (
            <li className={classes}
                key={key}
                onClick={this.onItemClicked.bind(this, index, item.value, item.label)}
                data-index={index}
                data-value={item.value}
            >
                {item.label}
            </li>
        )
    }

    render() {
        const {
            className,
            items
        } = this.props

        const classes = classNames('td-list', className)
        return (
            <ul className={classes}>
                <ReactList
                    length={items.length}
                    itemRenderer={this.renderItem}
                />
            </ul>
        )
    }
}

List.propTypes = {
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    itemTemplate: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string
    })),
    onItemClicked: PropTypes.func
}

List.defaultProps = {
    items: [],
    onItemClicked: noop
}

export default List
