import React, {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import productService from '../../../services/product.service';
import ButtonCart from '../../../components/Button/ButtonCart';
import Slider from '../../../components/Slider';

const Index = () => {



    const router = useRouter();

    const [product, setProduct] = useState();
    const [attributes, setAttributes] = useState();
    const [productSelected, setProductSelected] = useState();
    const [productViewed, setProductViewed] = useState();


    const [isError, setIsError] = useState();
    const [isModal, setIsModal] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const getProductBySize = (e) => {
        setIsSelected(!isSelected)
        setProductSelected(e);
    }

    const addToCart = (e) => {

        let productToInsert = {
            id: e.id,
            name: e.attributes.name,
            image: e.attributes.image.data[0].attributes.url,
            price: e.attributes.price,
            size: productSelected, 
            quantity: 1
        };

        const cartArray = [];

        //Si aucune taille selectionnée
        if(productSelected == null){
            setIsError(true);
        }

        //Si j'ai déjà un ou des produits dans mon localstorage
        else if (localStorage.getItem("cart")) {
            setIsError(false);
            setIsModal(true);
            const localStorageCart = JSON.parse(localStorage.getItem("cart"));
            localStorageCart.forEach((product) => {
            cartArray.push(product);
            });
    
            const indexOfExistingProduct = cartArray.findIndex((el) => el.id === e.id && el.size === productSelected);

            if (indexOfExistingProduct !== -1) {
              cartArray[indexOfExistingProduct].quantity += 1;
            }
            else {
              cartArray.push(productToInsert);
            }
            localStorage.setItem("cart", JSON.stringify(cartArray));
        }

        //Si localstorage vide
        else{
            setIsError(false);
            setIsModal(true);
            cartArray.push(productToInsert);
            localStorage.setItem("cart", JSON.stringify(cartArray));
        }
    }

    //PANIER 

    const [cart, setCart] = useState();

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    const renderTotalAmount = () => {
        return cart.reduce((total, product) => total + (product.quantity * product.price),0)
    }

    const renderTotalQty = () => {
        return cart.reduce((total, product) => total + product.quantity,0)
    }
    
    useEffect(() => {

        setProductViewed(JSON.parse(localStorage.getItem("product_viewed")) || [])
        
        if(!router.isReady) return;
        const id = router.query.id;
        productService.getProductById(id)
        .then((data) => {
        setProduct(data.data);
        setAttributes(data.data.attributes.attributes);
        })
        .catch((err) => console.log(err));      
    }, [router.isReady]);

    return (
        <div className='main_content'>

        {isModal ? (
            <div>
                <div className='overlay' onClick={() => {setIsModal(false)}}></div>
                <div className='modal_add_to_cart'>
                    <div className='modal_container'>
                        <h2 className='modal_title'>Article ajouté avec succès au panier !</h2>
                        <div className='modal_content'>
                            <div className='modal_content_left'>
                                <div className='modal_img'>
                                    <img src={product && product.attributes.image.data[0].attributes.url} alt={product && product.attributes.title}/>
                                </div>
                                <div className='modal_description'>
                                    <p className='product_name'>{product && product.attributes.name}</p>
                                    <p className='product_price'>{product && product.attributes.price} €</p>
                                </div>
                            </div>
                            <div className='modal_content_right'>
                                <h4>Mon panier</h4>
                                <p>{renderTotalQty()} articles</p>
                                <p>Coût total : {renderTotalAmount()} €</p>
                                <ButtonCart title="Voir mon panier"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
              
            ''
            )}

            <div className='product_content'>
                <div className='image_slider'>
                    <img src={product && product.attributes.image.data[0].attributes.url} alt={product && product.attributes.title}/>
                </div>
                <div className='product_bottom'>
                    <div className='nav_container'>
                        <div className='nav_content'>
                            <p>Description</p>
                            <p>Détails</p>
                            <p>Avis</p>
                        </div>
                    </div>
                    <div className='product_bottom_content'>
                        <div className='product_bottom_content_description'>
                            <div className='product_bottom_content_description_text'>
                                <h2>{product && product.attributes.description_title}</h2>
                                <h4>{product && product.attributes.description_subtitle}</h4>
                                <p>{product && product.attributes.description_text}</p>
                            </div>
                            <div className='product_bottom_content_description_img'>
                                <img src={product && product.attributes.image.data[0].attributes.url} alt={product && product.attributes.title}/>
                            </div>
                        </div>
                        <div className='product_bottom_recommended'>
                            <Slider product='test' products={productViewed}/>
                        </div>
                    </div>
                </div>
            </div>





            <div className='sidebar'>
                <div className='sidebar_content'>
                    <div className='product_description'>
                        <h1 className='product_name'>{product && product.attributes.name}</h1>
                        <p className='product_price'>{product && product.attributes.price} €</p>
                    </div>
                    <div className='product_attributes'>
                        <p>Tailles disponibles</p>
                        <ul className='product_taille'>
                            {attributes &&
                                attributes.data.map((attribute) => (
                                    <li onClick={(e) => getProductBySize(attribute.attributes.size)}
                                        className={isSelected ? ( `test` ) : ("")}>
                                        {attribute.attributes.size}
                                    </li>
                            ))}
                        </ul>
                        {isError ? (
                            <p className='product_error'> Veuillez sélectionner une taille </p>
                            ) : (
                                ""
                        )}
                    </div>
                    <ButtonCart title="Ajouter au panier" onClick={(e) => addToCart(product)}/>
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
