import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

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
                onClick={
                    () => {
                        if(signOffLogInValue === 'Sign Out'){
                            const name = 'token'
                            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
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