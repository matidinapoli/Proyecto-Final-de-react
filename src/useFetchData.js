import {useState, useEffect} from 'react';

const useFetchData = (url) =>{

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

   useEffect(()=>{
   const fetchData = async () =>{
    setIsLoading(true);
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('No se pudieron obtener los datos');
        }
        const result = await response.json();
        setData(result);
    }   catch(err){
        setError(err.message);
    }   finally {
        setIsLoading(false)
    }
   }
   fetchData ();
   }, [url])
    
  
  return{
     data,
     isLoading,
     error,
  }  
}
export default useFetchData;