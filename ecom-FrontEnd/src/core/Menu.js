import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from './../auth/helpers'
import cartIcon from '../img/cart.png';

import styles from "../style/nav-style.module.css";

import { useSelector } from 'react-redux'

import toastr from 'toastr';
import "toastr/build/toastr.css";

import {API_URL} from './../config'

const isActive = (history, path1, path2) => {

    if(history.location.pathname === path1 || history.location.pathname === path2) {
        return { color: '#F05454' }
    }
    else{
        return { color: '#F5F5F5' }
    }

}


const Menu = (props) => {

    let countItem = useSelector(state => state.cart.count)

    const signout = () => {

        fetch(`${API_URL}/signout`)
            .then(() => {

            toastr.info('User SignOut', 'Next Time', {
                positionClass: "toast-bottom-left",
            })

            localStorage.removeItem('jwt_info')

            props.history.push('/signin')

        })
        .catch()

    }


    return (
        <div>
            <nav className={`navbar fixed-top navbar-expand-lg navbar-dark color-nav py-3 ${styles.navcolor}`}>
            <Link style={{color: '#F5F5F5', fontSize: '25px',fontWeight:"bold"}} className="navbar-brand" to="/">O & A</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                
                
                <Fragment> 
                    <li className="nav-item active">
                        <Link style={isActive(props.history, '/')} className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>

                    <li className="nav-item active">
                        <Link style={isActive(props.history, '/shop')} className="nav-link" to="/shop">Shop </Link>
                    </li>
                    
                    <li className="nav-item active">
                        <Link 
                            style={isActive(props.history, "/admin/dashboard", "/dashboard")}
                            className="nav-link" 
                            to={`${isAuthenticated() && isAuthenticated().user.role === 1 ? '/admin' : ''}/dashboard`}
                            >
                                dashboard
                        </Link>
                    </li>
                    
                </Fragment> 
                
                </ul>
                <ul className="navbar-nav ml-auto">

                { !isAuthenticated() && (
                    
                        <Fragment>
                            
                            <li className="nav-item">
                                <Link style={isActive(props.history, '/signin')} className="nav-link" to="/signin">Sign in</Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link style={isActive(props.history, '/signup')} className="nav-link" to="/signup">Sign up</Link>
                            </li>
                        </Fragment>
                ) }

                            <li className="nav-item">
                                <Link style={isActive(props.history, '/cart')} className="nav-link" to="/cart">
                                        <img src={cartIcon} alt='Cart' style={{height: '25px'}}/> <span className="badge badge-warning"> { countItem }</span>
                                </Link>
                            </li>
                    { isAuthenticated() && (
                        <Fragment>
                            
                            <li className="nav-item">
                                <span className="nav-link" style={{ cursor: 'pointer' }} onClick={signout}>SignOut</span>
                            </li>
                        </Fragment>
                    ) }
                </ul>
                
            </div>
            </nav>

        </div>
    )
}

export default withRouter(Menu) 
