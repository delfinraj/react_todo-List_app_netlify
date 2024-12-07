import React from 'react'
import { FaLaptop,FaTabletAlt,FaMobileAlt } from 'react-icons/fa'
const Header = ({width}) => {
  return (
    <header>
        <h1>
            To Do List! 
            {width<768?<FaMobileAlt />:width<992? <FaTabletAlt/> :<FaLaptop/>}
        </h1>
        {console.log(width)}
    </header>
  )
}

export default Header