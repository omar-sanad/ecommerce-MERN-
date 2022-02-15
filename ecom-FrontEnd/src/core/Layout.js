import React from 'react'

const Layout = ({ title, description, className, children }) => {
    return (
        <div>
            {/* <div className="jumbotron mt-5">
                <h1 className="display-4">{title}</h1>
                <p className="lead">{description}</p>
            </div> */}
            <div className={`mt-5 pt-5 ${className}`}>
                {children}
            </div>
        </div>
    )
}

export default Layout
