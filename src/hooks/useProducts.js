import React,{useContext, useEffect, useState} from 'react'
import { LoaderContext } from '../context/LoaderContext';
import axios from 'axios';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const {loading, setLoading} = useContext(LoaderContext);

    useEffect(() => {
        async function getAllProducts () {
            setLoading(true)
            try {
                const res = await axios.get('https://fakestoreapi.com/products');
                const data = res.data;
                data.map(item => {
                    return item.quantity = 1;
                })
                setProducts(res.data)
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        }
        getAllProducts();
    }, [setLoading])

  return {loading, products}
}

export default useProducts