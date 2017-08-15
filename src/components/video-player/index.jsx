import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'
import Transition from 'react-transition-group/Transition'

import './_base.scss'

/**
 * Video Player
 */
class VideoPlayer extends React.PureComponent {
    constructor(props) {
        super(props)

        this.onClick = this.onClick.bind(this)

        this.state = {
            collapsed: false
        }
    }

    onClick(e) {
        if (e.target !== e.currentTarget) {
            return
        }

        e.stopPropagation()
        this.props.onDismiss && this.props.onDismiss()
    }

    render() {
        const {
            animationDuration,
            className,
            collasped,
            showing,
            src,
            onDismiss
        } = this.props

        const classes = classNames('td-video-player', className, {
            'td-video-player--collapsed': collasped,
            'td-video-player--fade-in': showing,
            'td-video-player--fade-out': !showing
        })

        const videoClasses = 'td-video-player__video'

        const style = {
            animationDuration: `${animationDuration}ms`,
            cursor: onDismiss ? 'pointer' : 'initial'
        }

        return (
            <Transition
                in={showing}
                timeout={animationDuration}
                mountOnEnter={true}
                unmountOnExit={true}
            >
                <div className={classes} style={style} onClick={this.onClick}>
                    <video className={videoClasses} autoPlay controls src={src}></video>
                </div>
            </Transition>
        )
    }
}

VideoPlayer.propTypes = {
    /**
     * Specifies the duration (milliseconds) of the fade-in/out animation.
     */
    animationDuration: PropTypes.number,

    /**
     *  Adds a user-defined class to the root element.
     */
    className: PropTypes.string,

    /**
     *  Specifies the video source of the video player.
     */
    src: PropTypes.string,

    /**
     *  Specifies whether or not the video player is showing.
     */
    showing: PropTypes.bool,

    /**
     *  User-defined function for dismissing video player.
     */
    onDismiss: PropTypes.func
}

VideoPlayer.defaultProps = {
    animationDuration: 250,
    showing: false
}

export default VideoPlayer