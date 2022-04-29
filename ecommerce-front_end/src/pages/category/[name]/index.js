import React, {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import productService from '../../../services/product.service';
import ProductCard from '../../../components/ProductCard';

const Index = () => {



    const router = useRouter();
    const [products, setProducts] = useState();
    

  
    useEffect(() => {
        
      if(!router.isReady) return;
      const name = router.query.name;
        productService.getProductsByCategory(name)
        .then((data) => {
          console.log(data.data);
          setProducts(data.data);
          console.log(product.attributes.image);
        })
        .catch((err) => console.log(err));      
    }, [router.isReady]);

    return (
        <div>
        {products &&
            products.map((product) => (
              <>
            <ProductCard product={product} key={product.id} />
             </>
            ))}
       
        </div>
    );
}

export default Index;
