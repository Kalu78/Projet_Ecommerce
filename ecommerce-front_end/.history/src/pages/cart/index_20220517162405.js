import React, {useState, useEffect} from 'react';

const Index = () => {

    const [cart, setCart] = useState();

    const cartArray = [];

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    const localStorageCart = JSON.parse(localStorage.getItem("cart"));

    localStorageCart.forEach((product) => {
        cartArray.push(product);
    });

    console.log(cartArray);

    return (
        <div>
            
        </div>
    );
}

export default Index;
