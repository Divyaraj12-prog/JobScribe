import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <nav>
            <NavLink activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
            <NavLink activeClassName="active" to="/applications">Applications</NavLink>
            <NavLink activeClassName="active" to="/resumes">Resumes</NavLink>
            <NavLink activeClassName="active" to="/profile">Profile</NavLink>
        </nav>

    )
}

export default Nav