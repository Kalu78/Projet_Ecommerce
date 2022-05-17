import React, {useState, useEffect} from 'react';

const Index = () => {

    const [cart, setCart] = useState();



    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    console.log(cart);

    return (
        <div>
            {cart && cart.map((cart) => (
                cart.name;
            )})
        </div>
    );
}

export default Index;
