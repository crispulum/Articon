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
                        <button type="submit" className="login-btn">Login</button> 
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


    // return (
    //     <div className='login'>
             
    //         <div className="login-content-container">
    //             <div className="articon-logo">
    //                 <p>Articon</p>
    //             </div>
    //             <form action="" className="login-form">
    //                 <label htmlFor="username" className='login-username-label'>
    //                     Username
    //                 </label>
    //                 <input type="text" className="login-username-input" placeholder='Username'/>
    //                 <label htmlFor="password" className='login-username-label'>
    //                     Password
    //                 </label>
    //                 <input type="text" className="login-password-input" placeholder='Password'/>
    //                 <div className="login-btns-container">
    //                     <button className="signup-btn">Sign-up</button>
    //                     <button className="login-btn">Login</button> 
    //                 </div>
    //             </form> 
    //         </div>
    //         <img 
    //             src={imageLink} 
    //             alt="" 
    //             className='image-container'
    //         />
    //     </div>
    // )
}

export default Login;


/*
    https://d1ee3oaj5b5ueh.cloudfront.net/thumbs/635xAUTO_original_article_2020_11_5fb7c1d000644.jpeg

    https://i.pinimg.com/originals/d7/2f/1d/d72f1d8a1b8fe62aa5e8ddaaa0a47867.jpg

    https://i.pinimg.com/736x/62/29/5c/62295c498f626fa8a32563eff3b75547.jpg

    https://i.icanvas.com/JSR25?d=3&sh=v&s=s&p=1&bg=w&t=1665537995

*/

