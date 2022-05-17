import React, {useState, useEffect} from 'react';
import ButtonCart from '../../components/Button/ButtonCart';
import productService from '../../services/product.service';

const Index = () => {

    const [cart, setCart] = useState();

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    console.log(cart);

    // const renderTotalQty = () => {
    //     return cart.reduce((total, product) => total + product.quantity,0)
    // }

    
    // const renderTotalAmount = () => {
    //     return cart.reduce((total, product) => total + (product.quantity * product.price),0)
    // }

    return (
        <div className='cart_page'>
            <h1 className='cart_title'>Mon panier</h1>
            <div className='cart_content'>
                <div className='cart_left'>
                    <div className='cart_resume'>
                        {/* <p>Total ({renderTotalQty()} produit) <span style="font-weight: bold">{renderTotalAmount()}€</span></p> */}
                        <p>Les articles dans votre panier ne sont pas réservés — commandez-les dès maintenant.</p>
                    </div>
                    {cart && cart.map((cart) => (
                        <div className='cart_card'>
                            <div className='cart_card_img'>
                                <img src={cart.image}/>
                            </div>
                            <div className='cart_card_content'>
                                <div className='cart_card_content_description'>
                                    <p>{cart.name}</p>
                                    <p>{cart.price}€</p>
                                </div>
                                <p>Taille: {cart.size}</p>
                            </div>
                        
                        </div>
                    ))}
                </div>
                <div className='cart_right'>
                    <div className='cart_buttons'>
                        <ButtonCart title="commander"></ButtonCart>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
