import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../style/SignIn.css";

const SignIn = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // Handle form submission
    const handleSignIn = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.warn("Please fill in both fields!");
            return;
        }
        else {
            toast.info("Sign in is not functional. This is a frontend application only!");
            navigate('/');
        }
    };

    return (
        <section className="sign-in">
            <form onSubmit={handleSignIn}>
                <h2> Sign In </h2>
                <input type="text" name="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit" className="si-btn"> Sign In </button> 
                <hr />
                <Link to='/' className="si-btn"> Go Home </Link>
            </form>
        </section>
    );

}

export default SignIn;


