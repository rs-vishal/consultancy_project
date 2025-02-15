import React, { useState } from 'react';

const Admin = () => {
    const [username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', Password);
        if(username === 'admin' && Password === 'admin'){
            alert('Login Successful');
        }
        else{
            alert('Login Failed');
        }
    }
    

    return (
       <>
       <div>
        
       </div>
       </>
    );
};

export default Admin;
