import React, {useState, useEffect} from 'react';
import Logo from '../public/Logo.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import categoryService from '../services/category.service';
import Link from 'next/link';



const Header = () => {



    const [categories, setCategories] = useState();

    const [subcategories, setSubcategories] = useState();

    const [isVisible, setIsVisible] = useState();

    const getSubcategories = (e) => {
        setIsVisible(true);
        categoryService.getSubcategoriesName(e)
        .then((data) => {
            setSubcategories(data.data);
        })
        .catch(err=>console.log(err))
    }

    useEffect(() => {
        categoryService.getCategories()
        .then((data) => {
            setCategories(data.data);
        })
        .catch(err=>console.log(err))
    },[]);



    return (
        <>
        {isVisible ? ( 
            <div className='overlay' onClick={() => setIsVisible(false)}></div>
            ) : (
                ''
        )}
        <div className='navbar'>
            <div className='navbar_left'>
                <Link href={`/`}>
                    <img src={Logo.src} width="150px" height="100px" alt="Adios"/>
                </Link>
            </div>
            <div className='navbar_menu'>
                {categories &&
                    categories.map((category, index) => (   
                        <div className='navbar_menu_category'>
                            <h3 category={category} key={index} className={index} onClick={(e) => getSubcategories(category.attributes.name)}>
                                {category.attributes.name} 
                            </h3>
                        
                            {isVisible ? ( 
                            <>
                            <div className='navbar_menu_dropdown'>
                                {category.attributes.subcategories.data.map((subcategory) => ( 
                                    <Link href={`/category/${subcategory.id}`}>
                                        <p subcategory={subcategory} key={subcategory.id} onClick={() => setIsVisible(false)}>{subcategory.attributes.name}</p> 
                                    </Link>
                                ))}
                            </div>
                            </>
                            ) : (
                                ''
                            )}
                        </div>
                        

                    ))}    
            </div>
            <div className='navbar_right'>
                <div className='container_search'>
                    <div className='search_bar'>
                        <div className='search_icon'><FontAwesomeIcon icon={faSearch} /></div>
                        <form>
                        <input type='text' placeholder="Rechercher"></input>
                        </form>
                    </div>
                </div> 
                <div className='account'>
                    <Link href={`/login`}>
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                </div>
                <div className='cart'>
                    <Link href={`/cart`}>
                        <FontAwesomeIcon icon={faCartShopping} size="lg"/>
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}

export default Header;
