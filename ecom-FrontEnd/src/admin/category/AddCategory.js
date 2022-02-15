
import React, { useState } from 'react'
import Layout from './../../core/Layout'

import styles from "../../style/form-style.module.css"; 

import { API_URL } from './../../config'
import { isAuthenticated } from './../../auth/helpers'

import toastr from 'toastr';
import "toastr/build/toastr.css";

function AddCategory() {

    const [name, setName] = useState('')
    const handleChange = (e) => {
        setName(e.target.value)
    }
    const submitCategory = (e) => {
        e.preventDefault();
        const { user, token } = isAuthenticated();
        fetch(`${API_URL}/category/create/${user._id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({name})
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
            }
            else {
                toastr.success(`Category ${name} created`, 'new Category', {
                    positionClass: "toast-bottom-left",
                })
                setName("")
            }
        })
        .catch(err =>  toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
                }))
    }

    return (
        <div>
            <Layout 
                title="Category" 
                description="New category" 
                className="container"
            >
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <form onSubmit={submitCategory} className={`p-5 mt-3 ${styles.formStyle} text-center`}>
                            <div className="form-group">
                                <label htmlFor="" className="text-muted"></label>
                                <input value={name} required autoFocus placeholder="Category Name" onChange={handleChange} type="text" className="form-control py-3"/>
                            </div>
                            <button className={`btn text-center mt-4 py-3 px-4 ${styles.bgButton}`}>Create    New category</button>
                        </form>
                    </div>
                </div>
                
            </Layout>
        </div>
    )
}

export default AddCategory