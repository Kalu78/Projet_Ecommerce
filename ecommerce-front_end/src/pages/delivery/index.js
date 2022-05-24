import React, {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import ButtonCart from '../../components/Button/ButtonCart';
import Input from '../../components/Input';
import CartItem from '../../components/CartItem';
import Link from 'next/link';
import userService from '../../services/user.service';

const Index = () => {

    const router = useRouter();

    const [cart, setCart] = useState();

    const [order, setOrder] = useState();

    const [isModal, setIsModal] = useState();

    const [user, setUser] = useState();

    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState();
    const [city, setCity] = useState('');

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")));

        userService.getMe(localStorage.getItem('token'))
        .then(data=> {
            setUser(data);
        })
        .catch(err=>console.log(err))
        
        

        if(localStorage.getItem("cart") === null){
            router.push('/cart');
        }
    }, []);


    const products_details_json = cart && cart.map((cartItem) => (`${cartItem.name} - Taille : ${cartItem.size} - Qty : ${cartItem.quantity}`));

    const products_details = JSON.stringify(products_details_json);

    const products_total = cart && cart.reduce((total, product) => total + (product.quantity * product.price),0);

    const products_ids = cart && cart.map((cartItem) => (cartItem.id))


    const submitOrder = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        return fetch(`https://adidas-back-end.herokuapp.com/api/orders`, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type":"Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({data:{
                products_details: products_details,
                products: products_ids,
                total: products_total,
                products: products_ids,
                user: user.id,
                name: name.name,
                firstname: firstname.firstname,
                address: address.address,
                postal_code: postalCode.postal_code,
                city: city.city,
            }})
        })
        .then(
            setIsModal(true),
        )
        // e.preventDefault();
        // console.log(name);
        // console.log(order);
        // orderService.confirm_order(order);
    }

    return (
        
        <div className='delivery_page container'>

        {isModal ? (
            <div>
                <div className='overlay'></div>
                <div className='modal_add_to_cart'>
                    <div className='modal_container'>
                        <h2 className='modal_title'>Commande effectué !</h2>
                        <div className='modal_content'>
                            <h3>Merci pour votre commande.</h3>
                            <div className='modal_content_resume'>
                                <p>Détails de la commande</p>
                                {cart && cart.map((cartItem) => (
                                    <CartItem cartItem={cartItem} onClick={() => deleteItem(cartItem)}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Link href={`/`}>
                        <ButtonCart title="Retour à la page d'accueil"/>
                    </Link>
                </div>
            </div>
            ) : (
              
            ''
            )}

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
                        handleChange={ (e) => setName({name:e.target.value})}
                            />
                            <Input
                        name="firstname"
                        id="firstname"
                        type="text"
                        classes="form__input"
                        required={true}
                        placeholder='Prénom'
                        handleChange={ (e) => setFirstname({firstname:e.target.value})}
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
                        handleChange={ (e) => setAddress({address:e.target.value})}
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
                        handleChange={ (e) => setPostalCode({postal_code:e.target.value})}
                        />
                    
                        <Input
                        name="city"
                        id="city"
                        type="text"
                        classes="form__input"
                        required={true}
                        placeholder="Ville"
                        handleChange={ (e) => setCity({city:e.target.value})}
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
