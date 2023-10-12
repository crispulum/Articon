import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';


const Signup = () => {
    const imageLink = "https://www.artnews.com/wp-content/uploads/2017/05/cold-mountain-3.jpg"
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        reEnteredPassword: ""
    });
    
    const onClickSignup = (event) => {
        event.preventDefault();
        if(formData.password !== formData.reEnteredPassword){
            console.log('Password and Re-Entered password does not match');
            return;
        }
        console.log(formData.username)

        const url = "/api/users/";
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": formData.username,
                "password": formData.password
            })
        })
        // .then(response => response.json())
        .then(data => {
            console.log('User created!');
            console.log(data);
            navigate('/login');
        })
    }

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    
    return (
        <div className='signup'>
            <div className="login-signup-content-container">
            <div className="articon-logo">
                <p>Sign-Up</p>
            </div>
            <form action="" className="signup-form">
                <label htmlFor="" className='signup-username-label'>
                    Username
                </label>
                <input 
                    type="text" 
                    className="signup-username-input" 
                    placeholder='Username'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                />
                <label htmlFor="" className='signup-password-label'>
                    Password
                </label>
                <input 
                    type="text" 
                    className="signup-password-input" 
                    placeholder='Password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                />
                <label htmlFor="" className='signup-reenter-password-label'>
                    Re-Enter Password
                </label>
                <input 
                    type="text" 
                    className="signup-reenter-password-input" 
                    placeholder='Re-Enter Password'
                    name='reEnteredPassword'
                    value={formData.reEnteredPassword}
                    onChange={handleChange}
                />
                <button className="signup-page-btn" onClick={onClickSignup}>Sign-up</button>
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

export default Signup;