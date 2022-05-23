import React, {useState, useEffect} from 'react';
import productService from '../../../services/product.service';
import categoryService from '../../../services/category.service';
import ProductCard from '../../../components/ProductCard';
import { useRouter } from "next/router";
import attributesService from '../../../services/attributes.service';


export async function getServerSideProps(context){
    const { id } = context.query;
      const data = await productService.getProductsByCategory(id);
      const categories = await categoryService.getSubcategoriesById(id);
      return {
        props: {
          categories,
          data
        },
      };
}   


const Index = ( {data, categories} ) => {

    const router = useRouter();

    const [products, setProducts] = useState();

    const [category, setCategory] = useState();

    const [filterSize, setFilterSize] = useState(null);

    const [test, setTest] = useState();

    const [isFilter, setIsFilter] = useState(false);

    const [attributes, setAttributes] = useState();


    if(!router.isReady) return;
    const id = router.query.id;

    useEffect(() => {
      setFilterSize(JSON.parse(localStorage.getItem("filter")))
      setCategory(categories.data);
      setProducts(data.data);
      attributesService.getAttributes()
      .then((data) => {
        setAttributes(data.data);
        console.log(attributes);
        })
        .catch((err) => console.log(err));      
    }, [data, categories]);

    
    const filterByPriceDesc = () => {
      productService.getProductByPriceDesc(id)
      .then((data) => {
          setProducts(data.data);
      })
      .catch((err) => console.log(err));  
    }

    const filterByPriceAsc = () => {
      productService.getProductByPriceAsc(id)
      .then((data) => {
          setProducts(data.data);
      })
      .catch((err) => console.log(err));  
    }

    const filterByDateAsc = () => {
      productService.getProductByPriceAsc(id)
      .then((data) => {
          setProducts(data.data);
      })
      .catch((err) => console.log(err));  
    }

    const filterBySize = (e) => {
      // if(filterSize == null){
      //   setFilterSize(e);
      // }
      // else {
      //   setFilterSize(`${filterSize}&${e}`);
      // }
      // if(filterSize && filterSize.includes(e)){
      //   console.log(true);

      // }else {
      //   setFilterSize(e);
      //   console.log(e);
      // }

      const filterArray = [];
      if (localStorage.getItem("filter")) {

        const localStorageFilter = JSON.parse(localStorage.getItem("filter"));
          localStorageFilter.forEach((product) => {
          filterArray.push(product);
        });

        setFilterSize(filterArray);
        const indexOfExistingProduct = filterArray.findIndex((el) => el.id === e.id);

        if (indexOfExistingProduct !== -1) {
          filterArray.splice(indexOfExistingProduct, 1);
        }
        else{
          filterArray.push(e);
        }

        localStorage.setItem("filter", JSON.stringify(filterArray));
      }

      else{
        filterArray.push(e);
        setFilterSize(filterArray);
        localStorage.setItem("filter", JSON.stringify(filterArray));
      }

      let test = '';
      
      {filterSize &&
        filterSize.map((size) => (
          test += `${size && size.attributes.size}&`
      ))}

      console.log(test);

      productService.getProductBySize(test, id)
      .then((data) => {
          setProducts(data.data);
      })
      .catch((err) => console.log(err));  
    }



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
              <h1>{category && category.attributes.name} pour {category && category.attributes.category.data.attributes.name}</h1>
            </div>
            <div className='category_subtitle'>
              <p>{category && category.attributes.description}</p>
              <button onClick={() => setIsFilter(true)}>Filtrer & trier</button>
            </div>
            <div className='product_grid'>

              {products &&
                products.map((product) => (
                  <div onClick={() => viewedProduct(product)}>
                    <ProductCard product={product} key={product.id} />
                  </div>
                ))}
            </div>
            {isFilter ? (
              <div>
                  <div className='overlay' onClick={() => {setIsFilter(false)}}></div>
                  <div className='filter_container'>
                    <div className='filter_title'>
                      <h3>Filtrer & Trier</h3>
                    </div>
                    <div className='filter_types'>
                      <p>Trier par</p>
                      <p onClick={() => filterByPriceAsc()}>
                        Prix (croissant)
                      </p>
                      <p onClick={() => filterByPriceDesc()}>
                        Prix (decroissant)
                      </p>
                      <p onClick={() => filterByDateAsc()}>
                        Nouveauté en premier
                      </p>
                      <ul>
                        {attributes &&
                          attributes.map((attribute) => (

                                  <li onClick={() => filterBySize(attribute)}>{attribute.attributes.size}</li>
  
                        ))}
                      </ul>
                      <p>
                                {test}
                      </p>
                    </div>
                  </div>
                
              </div>
              ) : (
                
              ''
              )}



      </div>
    );
}

export default Index;
