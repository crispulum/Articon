import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const imageLink = "https://www.artnews.com/wp-content/uploads/2017/05/cold-mountain-3.jpg"
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    }); 
    
    const loginOnClick = (e) => {
        e.preventDefault();
        const url = "/api/users/login"
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "username": String(formData.username),
                "password": String(formData.password)
            }),
            headers: {
                'Content-Type': "application/json"
            }
        })
        .then(data => {
            console.log(data);
            navigate('/');
        })
    }
    const signupOnClick = (e) => {
        e.preventDefault();
        navigate("/signup")
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    return (
        <div className='login'>
            <div className="login-signup-content-container">
                <div className="articon-logo">
                    <p>Login</p>
                </div>
                <form action="" className="login-form">
                    <label htmlFor="username" className='login-username-label'>
                        Username
                    </label>
                    <input 
                        type="text" 
                        className="login-username-input" 
                        placeholder='Username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <label htmlFor="password" className='login-password-label'>
                        Password
                    </label>
                    <input 
                        type="text" 
                        className="login-password-input" 
                        placeholder='Password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <div className="login-btns-container">
                        <button type="submit" className="signup-btn" onClick={signupOnClick}>Sign-up</button>
                        <button type="submit" className="login-btn" onClick={loginOnClick}>Login</button> 
                    </div>
                </form> 
            </div>
            <img 
                src={imageLink} 
                alt="" 
                className='image-container'
            />
        </div>
    )

}

export default Login;


