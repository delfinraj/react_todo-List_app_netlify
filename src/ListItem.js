import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

const ListItem = ({item,handleCheck,removeItem}) => {

  return (
    
    <li className='item' >
    <input 
    type="checkbox"
    onChange={()=>handleCheck(item.id)}
    checked={item.checked}

    />
    <label 
    style={(item.checked)?{textDecoration:'line-through'}:null}
    >
      {item.item}
    </label>
    <FaTrashAlt 
    onClick={()=>removeItem(item.id)}
    role="button"
    tabIndex="0"
    />
  </li>

  )
}

export default ListItem