import React, {useState, useEffect} from 'react';
import Logo from '../public/Logo.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import categoryService from '../services/category.service';
import Link from 'next/link';



const Header = (props) => {



    const [categories, setCategories] = useState();

    const [subcategories, setSubcategories] = useState();

    const [isVisible, setIsVisible] = useState();

    const getSubcategories = (e) => {
        setIsVisible(true);
        categoryService.getSubcategoriesName(e)
        .then((data) => {
            setSubcategories(data.data);
            console.log(data.data);
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
        <div className='navbar'>
            <div className='navbar_left'>
                <img src={Logo.src} width="150px" height="100px" alt="Adios"/>
            </div>
            <div className='navbar_menu'>
                <ul>
                {categories &&
                    categories.map((category) => (   
                    
                        <a onClick={(e) => getSubcategories(category.attributes.name)}>
                            <li category={category} key={category.id}>
                                {category.attributes.name}     
                            </li>
                        </a>
              
                    ))}
                    {isVisible ? ( 
                        <>
                        <div className='overlay' onClick={() => setIsVisible(false)}></div>
                        <div className='dropdown_menu'>
                            {subcategories &&
                                subcategories.map((subcategory) => (   
                                    <Link href={`/category/${subcategory.id}`}>
                                    <p subcategory={subcategory} key={subcategory.id} onClick={() => setIsVisible(false)}>{subcategory.attributes.name} </p>
                                    </Link>
                            ))}
                        </div>
                        </>
                    ) : (
                        ""
                    )}
                
                </ul>
             
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
                <FontAwesomeIcon icon={faUser} />
                </div>
                <div className='cart'>
                <FontAwesomeIcon icon={faCartShopping} size="lg"/>
                </div>
            </div>
        </div>
    );
}

export default Header;
