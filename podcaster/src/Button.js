import {useState} from 'react'

export default function Button(props){
    
    const [count,setCount ] = useState(1);
   
    function increment(){
      
        setCount(count + 1);
    
    }

   return(
    <>
    <span>{count}</span>
    <button onClick={increment}>{props.children}</button>
    </>
   )
}