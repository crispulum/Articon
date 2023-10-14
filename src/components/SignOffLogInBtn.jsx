import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

const SignOffLogInBtn = () => {
    const [signOffLogInValue, setSignOffLogInValue] = useState('Login');
    const [cookieDeleted, setCookieDeleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const hasCookie = document.cookie.includes('token');
        if (hasCookie) {
            setSignOffLogInValue('Sign Out');
        } 
        else {
            setSignOffLogInValue('Login');
        }
    }, []);

    useEffect(() => {
      }, [cookieDeleted]);

    return (
        <>  
            <button 
                className='signOffLogInBtn'
                onClick={ () => {
                    if (signOffLogInValue === 'Sign Out') {
                        Cookies.remove('token'); 
                        Cookies.remove('username'); 
                    }
                        navigate('/login');
                    }
                }
            >
                {signOffLogInValue}
            </button>
        </>
    )
}

export default SignOffLogInBtn;