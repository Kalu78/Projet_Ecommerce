import React, {useState, useEffect} from 'react';

const Index = () => {

    const [cart, setCart] = useState();



    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    console.log(cart);

    return (
        <div className='page_cart'>
            <div className=''>
            {cart && cart.map((cart) => (
                <p>
                {cart.name}
                </p>
            ))}
            </div>
        </div>
    );
}

export default Index;
