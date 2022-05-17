import React from 'react';

const Index = () => {

    const [cart, setCart] = useState();

    setCart(localStorage.getItem('cart'));

    console.log(cart);

    return (
        <div>
            
        </div>
    );
}

export default Index;
