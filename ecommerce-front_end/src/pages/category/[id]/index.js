import React, {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import productService from '../../../services/product.service';
import ProductCard from '../../../components/ProductCard';
import { faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';


export async function getServerSideProps(context){


    const { id } = context.query;


      const data = await productService.getProductsByCategory(id);
      return {
        props: {
          data
        },
      };
}   

const Index = ( {data} ) => {


    const [products, setProducts] = useState();

    useEffect(() => {
      setProducts(data.data);
    });



    const viewedProduct = (e) => {
      const productViewedArray = [];


       //Si j'ai déjà un ou des produits dans mon localstorage
      if (localStorage.getItem("product_viewed")) {
        const localStorageProductViewed = JSON.parse(localStorage.getItem("product_viewed"));
        localStorageProductViewed.forEach((product) => {
          productViewedArray.push(product);
        });

        const indexOfExistingProduct = productViewedArray.findIndex((el) => el.id === e.id);

        if (indexOfExistingProduct !== -1) {
          
        }
        else {
          productViewedArray.push(e);
        }
        localStorage.setItem("product_viewed", JSON.stringify(productViewedArray));
      }

      else{
        productViewedArray.push(e);
        localStorage.setItem("product_viewed", JSON.stringify(productViewedArray));
      }
    }



    return (
  
        <div className='container'>
            <div className='category_title'>
              <h1></h1>
            </div>
            <div className='product_grid'>

              {products &&
                products.map((product) => (
                  <div onClick={() => viewedProduct(product)}>
                    <ProductCard product={product} key={product.id} />
                  </div>
                ))}
            </div>



      </div>
    );
}

export default Index;
