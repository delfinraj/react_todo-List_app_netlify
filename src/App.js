import Content from "./Content";
import Header from "./Header";
import Floor from "./Floor";
import { useState  ,useEffect} from 'react';
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {


  const API_URL='http://localhost:3500/items';
 
 
 
const [items,setItems]=useState([]);
const [searchItem,setSearchItem]=useState('');

  const [newItem,setNewItem]=useState('');
  const[fetchError,setFetchError]=useState(null)
  const [isLoading,setIsLoading]=useState(true)

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!newItem) return;
    addItemsInList(newItem);
    setNewItem('');
  }
  
  const addItemsInList= async (item)=>{
    const id=item.length?items[items.length-1].id+1:1;
    const addnewitem={id,checked:false,item:item}
    const listItem=[...items,addnewitem]
    setItems(listItem)

    const postObj={
      method:'POST',
      header:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(addnewitem)
    }

    const result= await apiRequest(API_URL,postObj);
    if(result) setFetchError(result)


}

 useEffect(()=>{ 
        const fatchItems=async()=>{
          try{
              const response=await fetch (API_URL);
              if(!response.ok) throw Error("Data not Receved !");
              const listItems=await response.json();
              setItems(listItems);
              setFetchError(null)
          }catch(err){
            setFetchError(err.message)
          }
          finally{
            setIsLoading(false)
          }
        }

        setTimeout(()=>{ 
          (async () => fatchItems())()
        },2000)
  },[])
  
  const handleCheck=async (id) => {
    const newItems=items.map((item)=>
    item.id===id?{...item,checked:!item.checked} : item
    )
    setItems(newItems);

    const singleItem=newItems.filter((item)=> item.id===id);

    const updatesObj={
      method:'PATCH',
      header:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({checked:singleItem[0].checked})
    }
    const reqUrl=`${API_URL}/${id}`
    const result= await apiRequest(reqUrl,updatesObj)
    if(result) setFetchError(result)

  }
  
  const removeItem=async(id)=>{
    const newItems=items.filter((item)=>
      item.id!==id
    )
    setItems(newItems);

    const DeleteObj={
      method:'DELETE'
      }
    
    const reqUrl=`${API_URL}/${id}`
    const result= await apiRequest(reqUrl,DeleteObj)
    if(result) setFetchError(result)


  }

  
  return (
      <div className="route">
        <Header />
        <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        />
        <SearchItem
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        />
        <main>
          {isLoading && <p>Loading Item ... </p>}
          {fetchError && <p> {`Error : ${fetchError}`}

          </p>}
        {!isLoading && !fetchError && <Content
        items={items.filter((item)=>((item.item).toLowerCase()).includes(searchItem.toLowerCase()))} 
        handleCheck={handleCheck}
        removeItem={removeItem}

        />}
        </main>
        <Floor
        length={items.length} />
      </div>
  );
}

export default App;
