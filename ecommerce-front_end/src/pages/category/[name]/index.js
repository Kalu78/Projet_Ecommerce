import React, {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import productService from '../../../services/product.service';

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
        })
        .catch((err) => console.log(err));      
    }, [router.isReady]);

    return (
        <div>
        {products &&
            products.map((product) => (
             <h1 product={product} key={product.id}>{product.attributes.name}</h1>
            ))}
       
        </div>
    );
}

export default Index;
