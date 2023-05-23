import React,{useContext, useEffect, useState} from 'react'
import { LoaderContext } from '../context/LoaderContext';
import axios from 'axios';

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const {loading, setLoading} = useContext(LoaderContext);

    useEffect(() => {
        async function getAllProducts () {
            setLoading(true)
            try {
                const res = await axios.get('https://fakestoreapi.com/products/categories');
                setCategories(await res.data)
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        }
        getAllProducts();
    }, [setLoading])

  return {loading, categories}
}

export default useCategories