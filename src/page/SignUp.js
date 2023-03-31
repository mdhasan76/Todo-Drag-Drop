import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../routes/AuthProvider';

const SignUp = () => {
    const {createNewUser, setUser, updateUserName, user} = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(user);
    // create new user 
    const newUserSignUp = (e) =>{
        e.preventDefault();
        const name = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(name,email, password);
        createNewUser(email, password)
        .then(res => {
            updateUserName(name)
            .then(()=> {
                // setUser(res.user)
                navigate("/", { replace: true })
                e.target.reset()
            })
            .catch(err => console.log(err))

        })
        .catch(err => {
            alert(err.message)
        })
    }

    return (
        <div className="hero min-h-[85vh] bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={newUserSignUp} className="card-body">
                        <p className='text-center text-3xl font-semibold mb-5'>Register Form</p>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" name="fullName" placeholder="Full Name" className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required/>
                            <label className="label">
                                <p>
                                Already have accout ? 
                        <Link to="/login" className="label-text-alt link link-hover"> Login</Link>
                                </p>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;