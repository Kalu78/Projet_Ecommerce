import React, {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import Input from "../../../components/Input";
import productService from '../../../services/product.service';
import userService from '../../../services/user.service';
import ButtonCart from '../../../components/Button/ButtonCart';
import Slider from '../../../components/Slider';
import Link from 'next/link';


export async function getServerSideProps(context){
    const { id } = await context.query;
    const data = await productService.getProductById(id);
    const review = await productService.getProductComments(id)
      return {
        props: {
            id,
            data,
            review,
        },
      };
}   

const Index = ( { data, review, id } ) => {

    useEffect(() => {
        setProduct(data.data);
        setAttributes(data.data.attributes.attributes);
        setComments(review.data);

        productService.getProductsBySubcategory(data.data.attributes.subcategory.data.id)
        .then((data) => {
            setSimilarProduct(data.data);
        })
        .catch((err) => console.log(err));
    
    });

    const router = useRouter();

    const [product, setProduct] = useState();
    const [attributes, setAttributes] = useState();
    const [productSelected, setProductSelected] = useState();
    const [productViewed, setProductViewed] = useState();

    const [productSimilar, setSimilarProduct] = useState();

    const [comments, setComments] = useState();

    const [isError, setIsError] = useState();
    const [isModal, setIsModal] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const [clickedItem, setClickedItem] = useState(null);


    const [cart, setCart] = useState();


    const [errorComment, setErrorComment] = useState(false);



    const getProductBySize = (attribute) => {
        setIsSelected(!isSelected)
        setProductSelected(attribute);
    }

    const handleCSS = (e) => {
        e.preventDefault();
        let selectedTag = e ? parseInt(e.target.id, 10) : null;
        setClickedItem(selectedTag);
    };

    //PANIER 

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    const renderTotalAmount = () => {
        return cart.reduce((total, product) => total + (product.quantity * product.price),0)
    }

    const renderTotalQty = () => {
        return cart.reduce((total, product) => total + product.quantity,0)
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

            setCart(cartArray);
    
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
            setCart(cartArray);
            localStorage.setItem("cart", JSON.stringify(cartArray));
        }
    }
    


    useEffect(() => {
        setProductViewed(JSON.parse(localStorage.getItem("product_viewed")) || []);
    }, []);

    const [comment, setComment] = useState();

    const [user, setUser] = useState([]);


    useEffect(() => {

        userService.getMe(localStorage.getItem('token'))
        .then(data=> {
            setUser(data);
        })
        .catch(err=>console.log(err))

    }, [user, setUser]);




    const submitComment = (e) => {
        e.preventDefault();
        if(localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            return fetch(`https://adidas-back-end.herokuapp.com/api/comments`, {
                method: "POST",
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data:{
                    content: comment.content,
                    user: user.id,
                    product: id,
                }})
            })  
            .then(() => { 
                router.push(`/product/${product.id}`);
            })
            .catch(err => console.log(err));
        } else{
            setErrorComment(true);
        }  
    }

    

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
                                <Link href={`/cart`}>
                                    <ButtonCart title="Voir mon panier"/>
                                </Link>
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
                            <p>Commentaires</p>
                            <p>Produits similaires</p>
                            <p>Pour vous</p>
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

                        <div className='product_bottom_comments'>
                            <h2>Commentaires</h2>
                            <div>
                                {comments != 0 ? (
                                    <div>
                                    {comments &&
                                        comments.map((comment) => (
                                            <div className='product_bottom_comments_content'>
                                                <p>{comment && comment.attributes.user.data.attributes.firstname} {comment && comment.attributes.user.data.attributes.name} - {comment.attributes.createdAt.substring(0, 10)}</p> 
                                                <p>Commentaire : {comment.attributes.content}</p>  
                                            </div>
                                    ))}
                                    </div>
                                ) : (
                                    <p>Pas encore de commentaire</p>
                                )}
                            </div>
                            <h3>Ajouter un commentaire</h3>
                            <form className="form" onSubmit={(e)=> submitComment(e)}>
                                <Input
                                    name="content"
                                    id="content"
                                    type="text"
                                    classes="form__input"
                                    required={true}
                                    placeholder="Commentaire"
                                    handleChange={ (e) => setComment({content:e.target.value})}
                                />
                                {errorComment ? (
                                    <p className='product_comment_error'>Vous devez être connecté pour pouvoir écrire un commentaire</p>
                                    ) : (
                                        ""
                                )}
                                <ButtonCart title="Commenter"/>
                            </form>
                        </div>

                        <div className='product_bottom_similar'>
                            <Slider title='Produits de la même catégorie' products={productSimilar}/>
                        </div>

                        <div className='product_bottom_recommended'>
                            <Slider title='Toujours intéressé ?' products={productViewed}/>
                        </div>
                        
                    </div>
                </div>
            </div>





            <div className='sidebar'>
                <div className='sidebar_content'>
                    <div className='sidebar_history'>
                        <Link href={`/category/${product && product.attributes.category.data.id}`}>
                            <p>
                            {product && product.attributes.category.data.attributes.name}
                            </p>
                        </Link> 
                        <span>
                        • 
                        </span>
                        <Link href={`/category/${product && product.attributes.subcategory.data.id}`}>
                            <p>
                            {product && product.attributes.subcategory.data.attributes.name}
                            </p>
                        </Link> 
                    </div>
                    <div className='product_description'>
                        <h1 className='product_name'>{product && product.attributes.name}</h1>
                        <p className='product_price'>{product && product.attributes.price} €</p>
                    </div>
                    <div className='product_attributes'>
                        <p>Tailles disponibles</p>
                        <div className='product_taille'>
                            {attributes &&
                                attributes.data.map((attribute, index) => (
                                    <div
                                    onClick={() => getProductBySize(attribute.attributes.size)}
                                    >
                                        <button key={index}
                                        id={index}
                                        className={index === clickedItem ? "is-checked" : null}
                                        onClick={handleCSS}>{attribute.attributes.size}</button>
                                    </div>
                            ))}
                        </div>
                        {isError ? (
                            <p className='product_size_error'> Veuillez sélectionner une taille </p>
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
