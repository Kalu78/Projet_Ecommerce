import React, {useState, useEffect} from 'react';

const Index = () => {

    const [cart, setCart] = useState();


    const cartArray = [];

    const localStorageCart = JSON.parse(localStorage.getItem("cart"));

    localStorageCart.forEach((product) => {
        cartArray.push(product);
    });

    console.log(cartTest);

    return (
        <div>
            
        </div>
    );
}

export default Index;
