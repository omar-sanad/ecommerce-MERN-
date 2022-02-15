import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styles from "../style/form-style.module.css";
import Layout from './../core/Layout'

import { isAuthenticated } from './../auth/helpers'

function AdminDashboard() {

    const { user: { name, email, role } } = isAuthenticated()


    const adminInfo = () => {

        return (

            <div className="card">
                <div className="card-body">
                <h2 className="card-header">User Information</h2>
                <form className='px-4'>
                    
                    <div class="form-group mt-5">
                        <label htmlFor="name">Name</label>
                        <input type="text" className={`form-control ${styles.inp}`} placeholder="Enter Name" id="name" value={name} readOnly/>
                    </div>
                    <div class="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className={`form-control ${styles.inp}`} placeholder="Enter Name" id="email" value={email} readOnly/>
                    </div>
                    <div class="form-group">
                        <label htmlFor="name">Role</label>
                        <input type="text" className={`form-control ${styles.inp}`} placeholder="Enter Name" id="name" value={role ? 'Admin' : 'User'} readOnly/>
                    </div>
                </form>
                </div>
            </div>
        )
    }


    const adminLinks = () => {

        return (
            <div className="card">
                <div className="card-body">
                    <h2 className="card-header">User Links</h2>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <Link className={`nav-link ${styles.links}`} to="/category/create">Create category</Link>
                        </li>
                        <li className="list-group-item">
                            <Link className={`nav-link ${styles.links}`} to="/product/create">Create product</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            <Layout
                title="Dashboard"
                description={`Welcome, ${ name }`}
                className="container"
            >

                <div className="row">
                    <div className="col-md-4">
                        {adminLinks()}
                    </div>
                    <div className="col-md-8">
                        {adminInfo()}
                    </div>
                </div>

            </Layout>
        </Fragment>
    )
}

export default AdminDashboard
