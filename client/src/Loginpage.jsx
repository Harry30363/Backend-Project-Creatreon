import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css';
import axios from 'axios';

const Loginpage = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/login', { username, password });

            if (response.data.success) {
                setIsLoggedIn(true);
                navigate('/dashboard');
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while logging in.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Loginpage;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Loginpage.css';
// import axios from 'axios'

// const Loginpage = ({ setIsLoggedIn }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
    
//     const handleSubmit = (e)=>{
//         e.preventDefault()
//         axios.post('http://localhost:8080/register',{username, email, password})
//         .then(result => console.log(result))
//         .catch(err=> console.log(err))
//     }

//     const handleLogin = () => {
//         // Mock authentication logic
//         if (username === 'user' && password === 'password') {
//             setIsLoggedIn(true);
//             navigate('/dashboard');
//         } else {
//             setError('Invalid username or password');
//         }
//     };

//     return (
//         <div className="login-container">
//             <div className="login-box">
//                 <h1>Login</h1>
//                 <form onSubmit={handleSubmit}></form>
//                 {error && <p className="error">{error}</p>}
//                 <input 
//                     type="text" 
//                     placeholder="Username" 
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="login-input"
//                 />
//                 <input 
//                     type="password" 
//                     placeholder="Password" 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="login-input"
//                 />
//                 <button onClick={handleLogin} className="login-button">Login</button>
//             </div>
//         </div>
//     );
// };

// export default Loginpage;
