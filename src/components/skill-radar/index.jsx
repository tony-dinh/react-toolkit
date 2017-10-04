import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import debounce from 'lodash/debounce'

import './_base.scss'

class SkillRadar extends React.Component {
    constructor(props) {
        super(props)

        this.center = {x: 91.697, y: 96.4232}
        this.verticies = [
            {
                max: {x: 91.697, y: .4632},
                min: this.center
            },
            {
                max: {x: .441, y: 66.7652},
                min: this.center
            },
            {
                max: {x: 35.298, y: 174.0432},
                min: this.center
            },
            {
                max: {x: 148.096, y: 174.0432},
                min: this.center
            },
            {
                max: {x: 182.953, y: 66.7652},
                min: this.center
            }
        ]

        this.addCoordinates = this.addCoordinates.bind(this)
        this.subtractCoordinates = this.subtractCoordinates.bind(this)
    }

    addCoordinates(p1, p2) {
        return {x: p1.x + p2.x, y: p1.y + p2.y}
    }

    subtractCoordinates(p1, p2) {
        return {x: p1.x - p2.x, y: p1.y - p2.y}
    }

    coordinateAlongLine(start, end, percentage) {
        const difference = this.subtractCoordinates(end, start)
        return this.addCoordinates(start, {x: difference.x * percentage, y: difference.y * percentage})
    }

    render() {
        const {
            className,
            color,
            skills,
            textClassName
        } = this.props

        if (skills.length !== 5) {
            throw new Error(`${this.constructor.name} expects a skill prop with 5 items`)
        }

        const classes = classNames('td-skill-radar', className)
        const textClasses = classNames('td-skill-radar__text', textClassName)

        const scoreToPoints = skills.map(({rating}, index) => {
            const {min, max} = this.verticies[index]
            const coordinate = this.coordinateAlongLine(min, max, rating / 100)
            return `${coordinate.x} ${coordinate.y}`
        })

        const polygon = scoreToPoints.join(' ')
        const style = {
            color: color
        }

        // 184 175
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={classes} viewBox="-108 -37.5 400 250" ref={el => this._svg = el} style={style}>
                <g fill="none" fillRule="evenodd" stroke="#CCC">
                    <polygon strokeWidth=".75" points="91.697 .4632 .441 66.7652 35.298 174.0432 148.096 174.0432 182.953 66.7652"/>
                    <polygon strokeWidth=".5" points="91.697 19.6552 18.6922 72.6968 46.5778 158.5192 136.8162 158.5192 164.7018 72.6968"/>
                    <polygon strokeWidth=".5" points="91.697 38.8472 36.9434 78.6284 57.8576 142.9952 125.5364 142.9952 146.4506 78.6284"/>
                    <polygon strokeWidth=".5" points="91.697 58.0392 55.1946 84.56 69.1374 127.4712 114.2566 127.4712 128.1994 84.56"/>
                    <polygon strokeWidth=".5" points="91.697 77.2312 73.4458 90.4916 80.4172 111.9472 102.9768 111.9472 109.9482 90.4916"/>

                    {/* Diagonals */}
                    <polygon strokeWidth=".5" points="91.697 .4632 91.697 96.4232"/>
                    <polygon strokeWidth=".5" points=".441 66.7652 91.697 96.4232"/>
                    <polygon strokeWidth=".5" points="35.298 174.0432 91.697 96.4232"/>
                    <polygon strokeWidth=".5" points="148.096 174.0432 91.697 96.4232"/>
                    <polygon strokeWidth=".5" points="182.953 66.7652 91.697 96.4232"/>

                    {/* Labels */}
                    <text className={textClasses} fill="#515151">
                        <tspan x={this.verticies[0].max.x} y={this.verticies[0].max.y - 15} textAnchor="middle">{skills[0].label}</tspan>
                        <tspan x={this.verticies[1].max.x - 15} y={this.verticies[1].max.y} textAnchor="end">{skills[1].label}</tspan>
                        <tspan x={this.verticies[2].max.x} y={this.verticies[2].max.y + 25} textAnchor="end">{skills[2].label}</tspan>
                        <tspan x={this.verticies[3].max.x} y={this.verticies[3].max.y + 25} textAnchor="start">{skills[3].label}</tspan>
                        <tspan x={this.verticies[4].max.x + 15} y={this.verticies[4].max.y} textAnchor="start">{skills[4].label}</tspan>
                    </text>

                    {/* Fill Polygon */}
                    <polygon fill="currentColor" points={polygon} />
                </g>
            </svg>
        )
    }
}

SkillRadar.propTypes = {
    classNames: PropTypes.string,
    color: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired
    })).isRequired
}

SkillRadar.defaultProps = {
    color: 'rgba(150, 199, 206, .6)'
}

export default SkillRadar
