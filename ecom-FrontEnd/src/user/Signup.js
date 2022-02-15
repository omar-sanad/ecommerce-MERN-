import React, { useState } from 'react'
import Layout from './../core/Layout'
import styles from "../style/form-style.module.css";
import toastr from 'toastr';
import "toastr/build/toastr.css";

import { API_URL } from './../config'


const Signup = (props) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })


    const handleChange = e => {

        setUser({...user, [e.target.id]: e.target.value})

    }

    
    const submitSignup = e => {

        e.preventDefault();

        fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
            }
            else {
                toastr.success('User is created SuccessFully', 'New Accout', {
                    positionClass: "toast-bottom-left",
                })

                props.history.push('/signin')
            }

            

        })
        .catch(err =>  toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
                }))
    }

    const form = () => (
        <form onSubmit={submitSignup} className={`p-5 mt-3 ${styles.formStyle}`}> 
            <div className='text-center'>
                <label className={styles.title}>Create a new account</label>
            </div>
            <div className="form-group mt-5">
                <label htmlFor="name" className="text-muted">name</label>
                <input onChange={handleChange} type="text" className={`form-control`} id="name" required />
            </div>

            <div className="form-group mt-5">
                <label htmlFor="email" className="text-muted">email</label>
                <input onChange={handleChange} type="email" className="form-control" id="email" required />
            </div>


            <div className="form-group mt-5">
                <label htmlFor="password" className="text-muted">password</label>
                <input onChange={handleChange} type="password" className="form-control" id="password" required/>
            </div>

            <button className={`btn btn-lg btn-block mt-5 ${styles.bgButton}`}>Sign Up</button>

        </form>
    )

    return (
        <div>
        <Layout 
            title="Sign up" 
            description="Sign up Node React Ecommerce App" 
            className="container"
        >
        
        <div className="row">
            <div className="col-md-6 mx-auto">

                { form() } 
            </div>
        </div> 

        </Layout>
    </div>
    )
}

export default Signup
