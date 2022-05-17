import React, {useState, useEffect} from 'react';

const Index = () => {

    const [cart, setCart] = useState();

    const cartTest = localStorage.getItem('cart');

    console.log(cartTest);

    return (
        <div>
            
        </div>
    );
}

export default Index;
