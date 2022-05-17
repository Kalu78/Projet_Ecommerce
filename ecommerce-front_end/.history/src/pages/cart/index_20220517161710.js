import React from 'react';

const Index = () => {

    const [cart, setCart] = useState();

    useEffect(() => {
        
        setCart(localStorage.getItem('cart'))

        return () => {
            cleanup
        };
    }, []);

    return (
        <div>
            
        </div>
    );
}

export default Index;
