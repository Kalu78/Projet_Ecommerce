import React from 'react';


const OrderResume = (props) => {

    return (
        <div className='resume_order'>
            <div className='resume_content'>
                <h3>Récapitulatif de la commande</h3>
                <div className='resume_product'>
                    <p>{props.totalQuantity} Produits</p>
                    <p>{props.totalAmount} €</p>
                </div>
                <div className='resume_carrier'>
                    <p>Livraison</p>
                    <p>Gratuit</p>
                </div>
                <div className='resume_total'>
                    <p>Total</p>
                    <p>{props.totalAmount} €</p>
                </div>
            </div>
        </div>
    )
}

export default OrderResume;
