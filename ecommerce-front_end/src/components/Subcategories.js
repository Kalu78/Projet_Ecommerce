import React, {useState, useEffect} from 'react';



const Subcategories = (props) => {


    return (
        <>
        {props.IsActive ? (
            <div className='subcategories'>
                <div className='subcategory_name'>{props.attribute.name}</div>
            </div>
        ):(
            ""
        )}
        </>
    );
}

export default Subcategories;
