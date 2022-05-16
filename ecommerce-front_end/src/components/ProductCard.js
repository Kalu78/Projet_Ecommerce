import Link from "next/link";

const Productcard = (props) => {
  

    return (
        <Link href={`/product/${props.product.id}`}>
            <div className="product_card">
                <div className="product_img">
                    <img src={`${props.product.attributes.image.data[0].attributes.url}`} alt={props.product.attributes.title} />
                    <p>{props.product.attributes.price} €</p>
                </div>
                <div className="product_data">
                    <p>{props.product.attributes.name}</p>
                </div>
            </div>
        </Link>
    );
}

export default Productcard;
