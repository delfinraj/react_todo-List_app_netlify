import React from 'react'
import ListItem from './ListItem';


const Content = ({items,handleCheck,removeItem}) => {
    


  return (
    <>
      <ul>
       { items.map(item=>(
        <ListItem
        item={item} 
        key={item.id}
        handleCheck={handleCheck}
        removeItem={removeItem}
        />
       ))}
      </ul>
    </>
  )
}

export default Content