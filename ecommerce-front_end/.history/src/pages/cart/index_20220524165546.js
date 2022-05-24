import React, {useEffect, useState} from 'react';
import ButtonCart from '../../components/Button/ButtonCart';
import { useRouter } from "next/router";
import Link from 'next/link';
import CartItem from '../../components/CartItem';
import OrderResume from '../../components/OrderResume';

const Index = () => {

    const router = useRouter();

    const [error, setError] = useState();

    const [cart, setCart] = useState();

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")));
    }, []);

    const totalAmount = cart && cart.reduce((total, product) => total + (product.quantity * product.price),0);

    const totalQuantity = cart && cart.reduce((total, product) => total + product.quantity,0)

    const deleteItem = (e) =>{
        const filteredCart = cart.filter((item) => item.size != e.size || item.id != e.id);
        localStorage.setItem("cart", JSON.stringify(filteredCart));
        setCart(filteredCart);
    }

    const goToDelivery = () => {
        if(localStorage.getItem('token')){
            router.push('/delivery');
        }
        else{
            setError(true);
        }
        
    }

    console.log(cart);

    return (
        <div className='cart_page container'>
            {(cart != 0) ? (
                <div>
                    <h1 className='cart_title'>Mon panier</h1>
                    <div className='cart_content'>
                        <div className='cart_left'>
                            <div className='cart_resume'>
                                <p>Total ({totalQuantity} produits) <strong>{totalAmount}€</strong></p>
                                <p>Les articles dans votre panier ne sont pas réservés — commandez-les dès maintenant.</p>
                            </div>
                            {cart && cart.map((cartItem) => (
                                <CartItem cartItem={cartItem} onClick={() => deleteItem(cartItem)}/>
                            ))}
                        </div>
                        <div className='cart_right'>
                            <div className='cart_buttons'>
                                {error ? (
                                    <p className='login_error'>Vous devez être connecter pour passer une commande.</p>
                                    ) : (
                                    ''
                                )}
                                <div onClick={() => goToDelivery()}>
                                    <ButtonCart className='cart_buttons_order' title="commander"></ButtonCart>
                                </div>
                            </div>
                            <OrderResume totalQuantity={totalQuantity} totalAmount={totalAmount}/>
                        </div>
                    </div>
                </div>
            ) : (       
                <div>
                    <h1 className='cart_title'>Votre panier est vide</h1>
                    <p>Dès que tu auras ajouté un article au panier, il apparaîtra ici. C'est parti ?</p>
                    <Link href={`/`}>
                        <ButtonCart title="C'est parti"/>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Index;
