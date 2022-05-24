import React, {useState, useEffect} from 'react';
import categoryService from '../services/category.service';
import Banner from '../components/Banner'
import Slider from '../components/Slider'
import Link from 'next/link';

export default function Home() {

  const [productViewed, setProductViewed] = useState();

  const [categories, setCategories] = useState();

  useEffect(() => {
    setProductViewed(JSON.parse(localStorage.getItem("product_viewed")) || []);

    categoryService.getCategories()
    .then((data) => {
      setCategories(data.data);
      console.log(data.data);
    })
  }, []);

  return (
    <div>
      <Banner 
      image="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_1920,w_1920/frFR/Images/originals-ss22-parley-launch-hp-mh-large-1-group-d_tcm196-854466.jpg"
      title="LES ICÔNES D'AUJOURD'HUI, REPENSÉES POUR DEMAIN"
      paragraphe="Voici notre nouvelle collection d'icônes, conçues en partie à base de Parley Ocean Plastic."
      ></Banner>
      <div className='homepage container'>
      <div className='homepage_categories'>
        <h1 className='homepage_categories_title'>POUR QUI FAIS-TU TES ACHATS ?</h1>
        <div className='homepage_categories_content'>
        {categories &&
          categories.map((category) => (
            <Link href={`/category/${category.id}`}>
              <div className='homepage_categories_card'>
                <div>
                  <div className='layer'></div>
                  <img className='homepage_categories_card_image' src={category.attributes.image.data.attributes.url}></img>
                </div>
                <p className='homepage_categories_card_name'>{category.attributes.name}</p>
              </div>
            </Link>
        ))}
        </div>
      </div>
      
      <Slider title='Toujours intéressé ?' products={productViewed}/>
      </div>
      
    </div>
  )
}
