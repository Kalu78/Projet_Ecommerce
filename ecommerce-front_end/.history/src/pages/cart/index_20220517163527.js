import React, {useState, useEffect} from 'react';

const Index = () => {

    const [cart, setCart] = useState();



    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    console.log(cart);

    const renderTotalQty = () => {
        return cart.reduce((total, product) => total + product.quantity,0)
    }

    return (
        <div className='page_cart'>
            <h1 className='cart_title'>Mon panier</h1>
            <div className='cart_left'>
                <div className='cart_resume'>
                    <p>Total {renderTotalQty()}</p>
                </div>
            {cart && cart.map((cart) => (
                <p>
                {cart.name}
                </p>
            ))}
            </div>
            <div className='right_content'>

            </div>
        </div>
    );
}

export default Index;
