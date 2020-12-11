import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

    // Add your own authentication on the below line.
    const isLoggedIn =localStorage.getItem("isActive")

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login' }} />
                )
            }
        />
    )
}

export default PrivateRoute;