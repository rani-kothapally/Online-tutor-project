import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div>
            <ul>
                <Link to='/'><li>login</li></Link>
                <Link to='/'><li>Signup</li></Link>
                <Link to='/'><li>Dashboard</li></Link>
            </ul>
        </div>
    )
}