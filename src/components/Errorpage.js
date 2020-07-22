import React from 'react';
import Errorimage from '../images/error.jpg';

const Errorpage = () => {
    
    return (
        <section className="error-page">
            <figure>
                <img src={Errorimage} alt="error-image"/>
            </figure>
        </section>
    )
}

export default Errorpage;