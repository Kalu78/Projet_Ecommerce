import React, {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import productService from '../../../services/product.service';
import ProductCard from '../../../components/ProductCard';

const Index = () => {



    const router = useRouter();
    const [products, setProducts] = useState();
    

  
    useEffect(() => {
        
      if(!router.isReady) return;
      const id = router.query.id;
        productService.getProductsByCategory(id)
        .then((data) => {
          console.log(data.data);
          setProducts(data.data);
        })
        .catch((err) => console.log(err));      
    }, [router.isReady]);

    return (
      <div className='container'>
          <div className='category_title'>
            <h1></h1>
          </div>
          <div className='product_grid'>
          {products &&
              products.map((product) => (
                <>
              <ProductCard product={product} key={product.id} />
              </>
              ))}
        
          </div>
      </div>
    );
}

export default Index;
