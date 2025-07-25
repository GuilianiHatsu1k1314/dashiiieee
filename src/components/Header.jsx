import React from 'react';
import '../assets/styles/landing-page.css';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    
    return (
        <header>
            <h1>📦 Dashiiieee</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/landing">Home</Link>
                    </li>
                    <li>
                        <Button onClick={() => navigate('/login')}>
                            <p>Login</p>
                        </Button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;