import React, {useEffect, useState} from 'react';
import ButtonCart from '../../components/Button/ButtonCart';
import Input from '../../components/input';
import CartItem from '../../components/CartItem';
import orderService from '../../services/order.service';

const Index = () => {

    const [cart, setCart] = useState();

    const [order, setOrder] = useState();

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")));

    }, []);


    const products_details_json = cart && cart.map((cartItem) => (`${cartItem.name} - Taille : ${cartItem.size} - Qty : ${cartItem.quantity}`));

    const products_details = JSON.stringify(products_details_json);
    

    const products_total = cart && cart.reduce((total, product) => total + (product.quantity * product.price),0);

    console.log(products_total);

    const products_ids = cart && cart.map((cartItem) => (cartItem.id));



    const submitOrder = (e) => {
        // return fetch(`https://adidas-back-end.herokuapp.com/api/orders`, {
        //     method: "POST",
        //     mode: 'cors',
        //     headers: {
        //         "Content-Type":"Application/json"
        //     },
        //     body: JSON.stringify({data:{
        //         total: 50,
        //         address: `Test $<br> test`,
        //         products: products_ids,
        //         users_permissions_user: 1
        //     }
              
        //     }),
        // })
        e.preventDefault();
        setOrder({...order, products: products_ids});
        setOrder({...order, products_details: products_details});
        
        orderService.confirm_order(order);
    }

    return (
        <div className='delivery_page container'>
            <h1 className='delivery_title'>Information de livraison</h1>
            <div className='delivery_content'>
                <form className="form" onSubmit={(e) => submitOrder(e)}>
                    <div className='delivery_names'>
                        <Input
                        name="nom"
                        id="nom"
                        type="text"
                        classes="form__input"
                        required={true}
                        placeholder="Nom"
                        handleChange={ (e) => setOrder({...order, name:e.target.value})}
                            />
                            <Input
                        name="firstname"
                        id="firstname"
                        type="text"
                        classes="form__input"
                        required={true}
                        placeholder="Prénom"
                        handleChange={ (e) => setOrder({...order, firstname:e.target.value})}
                            />
                    </div>
                    <div className='delivery_address'>
                        <Input
                        name="address"
                        id="address"
                        type="text"
                        classes="form__input"
                        required={true}
                        placeholder="Adresse"
                        handleChange={ (e) => setOrder({...order, address:e.target.value})}
                        />
                    </div>
                    <div className='delivery_city'>
                        <Input
                        name="postal_code"
                        id="postal_code"
                        type="number"
                        classes="form__input"
                        required={true}
                        placeholder="Code postal"
                        handleChange={ (e) => setOrder({...order, postal_code:e.target.value})}
                        />
                    
                        <Input
                        name="city"
                        id="city"
                        type="text"
                        classes="form__input"
                        required={true}
                        placeholder="Ville"
                        handleChange={ (e) => setOrder({...order, city:e.target.value})}
                        />
                    </div>
                    <ButtonCart title="Valider la commande"/>
                </form>
                <div className='delivery_resume'>
                <h3>Détails de la commande</h3>
                {cart && cart.map((cartItem) => (
                    <CartItem cartItem={cartItem} onClick={() => deleteItem(cartItem)}/>
                ))}
                </div>
            </div>
        </div>
    );
}

export default Index;
