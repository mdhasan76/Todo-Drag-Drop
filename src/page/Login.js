import React, { useContext } from 'react';
import { AuthContext } from '../routes/AuthProvider';

const Login = () => {
    const {googleSignIn} = useContext(AuthContext)

    const googleHandle = () =>{
        
    }

    return (
        <div className="hero min-h-[85vh] bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <p className='text-center text-3xl font-semibold mb-5'>Login Form</p>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="/" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div className="form-control mt-6">
                            <button onClick={googleHandle} className="btn btn-primary">Sign In with Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;