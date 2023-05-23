import React,{useContext, useEffect, useState} from 'react'
import ProductItem from './ProductItem';
import { LoaderContext } from '../context/LoaderContext';
import useProducts from '../hooks/useProducts';
import useCategories from '../hooks/useCategories';

const ProductsList = () => {
    const {loading} = useContext(LoaderContext);
    const {products} = useProducts();
    const {categories} = useCategories();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchedItems, setSearchedItems] = useState('');

    const sortItemByCategoryHandler = (category) => {
      // console.log(e.target.textContent);
      setSelectedCategory(category);
    }

    useEffect(() => {
    if(selectedCategory === 'all') {
      setFilteredProducts(products);
    }else {
      const filteredProductss = products.filter((product) => product.category === selectedCategory);
      setFilteredProducts(filteredProductss);
    }
    }, [selectedCategory, products]);

    const searchItemsHandler = (e) => {
      // console.log(e.target.value);
      setSearchedItems(e.target.value);
    }

    useEffect(() => {
      const searchedItemss = products.filter(product => product.title.toLowerCase().includes(searchedItems));
      // console.log(searchedItemss)
      setFilteredProducts(searchedItemss);
    }, [searchedItems])


  if(loading) {
    return <div>The page is Loading....</div>
  }

  return (
    <div>
      <div>
        <input type="text" onChange={searchItemsHandler} />
      </div>
      <div>
      <button onClick={() => sortItemByCategoryHandler('all')}>all</button>
      {categories.map((category, idx) => {
        return <div key={idx}>
          <button onClick={() => sortItemByCategoryHandler(category)}>{category}</button>
        </div>
      })}
    </div>
      <div  style={{width: '100%', display: 'flex', flexWrap:'wrap'}}>
          {filteredProducts?.map((product) => {
            return <ProductItem key={product.id} product={product}/>
          })}
      </div>
    </div>
  )
}

export default ProductsList