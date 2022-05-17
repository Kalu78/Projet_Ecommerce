import React, {useState, useEffect} from 'react';

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
        <div className='page_cart'>
            <h1 className='cart_title'>Mon panier</h1>
            <div className='cart_left'>
                <div className='cart_resume'>
                    {/* <p>Total ({renderTotalQty()} produit) <span style="font-weight: bold">{renderTotalAmount()}€</span></p> */}
                    <p>Les articles dans votre panier ne sont pas réservés — commandez-les dès maintenant.</p>
                </div>
                {cart && cart.map((cart) => (
                    <div className='cart_card'>
                        <div className='cart_card_img'>
                            
                        </div>
                    {cart.name}
                    </div>
                ))}
            </div>
            <div className='right_content'>

            </div>
        </div>
    );
}

export default Index;
