import React, { useContext} from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../routes/AuthProvider';

const Login = () => {
    const { googleSignIn, setUser,loginUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    let from = location?.state?.from?.pathname || '/';

    //Google LogIn
    const googleHandle = () => {
        googleSignIn()
            .then(res => {
                if(res.user.email){
                    setUser(res.user);
                    console.log(res.user);
                    <Navigate to="/"/>
                }
            })
            .catch(err => console.log(err))
    }

    // login with email and password 
    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);
        loginUser(email, password)
        .then(res => {
                setUser(res.user)
                navigate(from, { replace: true })
                e.target.reset()

        })
        .catch(err => {
            alert(err.message)
        })
    }



    return (
        <div className="hero min-h-[85vh] bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogIn} className="card-body">
                        <p className='text-center text-3xl font-semibold mb-5'>Login Form</p>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" className="input input-bordered" name="email" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" name="password" required/>
                            <label className="label">
                                <p> New to Todo Drag&Drop?
                                    <Link to="/register" className="label-text-alt link link-hover"> Register now</Link>
                                </p>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div className="form-control mt-6">
                            <button onClick={googleHandle} className="btn btn-primary">Sign In with Google</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;