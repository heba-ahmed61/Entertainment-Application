import React from 'react'
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = ()=>{

    return(
        <div className="header text-center text-white">
            
            <h2  onClick={()=> window.scroll(0,0)}><Link exact to ="/">Movies &amp; Tv Series</Link></h2>
        </div>
    )
}

export default Header;