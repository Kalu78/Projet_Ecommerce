import React from "react";
import Link from 'next/link';

const CartItem = (props) => {
  return (
    <div>
        <div className='cart_card'>
            <div className='cart_card_img'>
                <Link href={`product/${props.cartItem.id}`}>
                    <img src={props.cartItem.image}/>
                </Link>
            </div>
            <div className='cart_card_content'>
                <div className='cart_card_content_description'>
                    <p>{props.cartItem.name}</p>
                    <p>{props.cartItem.price}€</p>
                    <p onClick={props.onClick} class="delete_item">delete</p>
                </div>
                <p>Taille: {props.cartItem.size}</p>
                <p>Quantité: {props.cartItem.quantity}</p>
            </div>
        </div>
    </div>
  );
};

export default CartItem;