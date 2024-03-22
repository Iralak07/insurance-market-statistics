import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav class="navbar">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <Link to="/">Home</Link>
                    <Link to="/upload">Upload</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;