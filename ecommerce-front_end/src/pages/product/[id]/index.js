import React, {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import productService from '../../../services/product.service';
import Button from '../../../components/Button';

const Index = () => {



    const router = useRouter();
    const [product, setProduct] = useState();
    

  
    useEffect(() => {
        
      if(!router.isReady) return;
      const id = router.query.id;
        productService.getProductById(id)
        .then((data) => {
          setProduct(data.data);
        })
        .catch((err) => console.log(err));      
    }, [router.isReady]);

    return (
      <div className='main_content'>
        <div className='product_content'>
            <div className='image_slider'>
                <img src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/55093d6138154dc48066adf6006436b6_9366/T-shirt_Trefoil_Leaves_Blanc_HC2140_01_laydown.jpg"></img>
            </div>
            <div>
                <div className='product_nav'>
                    <p>Description</p>
                    <p>Détails</p>
                    <p>Avis</p>
                </div>
                <div className='product_description'>
                <p>{product && product.attributes.description}</p>
                </div>
            </div>
        </div>

        <div className='sidebar'>
            <div className='sidebar_content'>
                <div className='product_description'>
                    <h1>{product && product.attributes.name}</h1>
                    <p>{product && product.attributes.price} €</p>
                </div>
                <div className='product_buy'>
                    <Button class='' title='Ajouter au panier'/>
                </div>
                <div className='reassurance'>
                    <p>Livraison gratuite pour les membres de l'adiClub</p>
                    <p>Livraison express gratuite dans votre magasin adidas</p>
                    <p>Retours et échanges gratuits sous 60* jours</p>
                </div>
            </div>
        </div>
         
      </div>
    );
}

export default Index;
