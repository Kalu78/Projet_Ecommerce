import React, {useState, useEffect} from 'react';

const Index = () => {

    const [cart, setCart] = useState();

    const cartArray = [];

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);


    return (
        <div>
            
        </div>
    );
}

export default Index;
