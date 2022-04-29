import Link from "next/link";
import Button from "../components/Button";

const Productcard = (props) => {
  

    return (
        <div className="product__card">
              <div className="product__img">
                <img src={`https://adidas-back-end.herokuapp.com/${props.product.attributes.image.data[0].attributes.url}`} alt={props.product.attributes.title} />
              </div>
              <div className="product__data">
                <h2>{props.product.attributes.title}</h2>
                <p>{props.product.attributes.price} € </p>
                <p>
                  <Link href={`/shop/${props.product.id}`}>
                  {/* <Link href={'/shop/' + props.product.id} */}
                    <a>
                      Voir le produit
                    </a>
                  </Link>
                  <Button title="ajouter au panier" function={()=> addTocart(props.product) } type="button" classes="btn btn__color-black"/>
                </p>
              </div>
            </div>
    );
}

export default Productcard;
