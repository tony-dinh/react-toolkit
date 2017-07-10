import React, {PropTypes} from 'react'
import {Router, Route, Switch} from 'react-router'
import {createBrowserHistory} from 'history'

// Containers
import Sandbox from './containers/sandbox'

const history = createBrowserHistory()

const AppRouter = ({store}) => (
    <Router history={history}>
        <Switch>
            <Route path="/" component={Sandbox} />
        </Switch>
    </Router>
)

AppRouter.propTypes = {
    store: PropTypes.object
}

export default AppRouter