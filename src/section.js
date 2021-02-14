import React from 'react';



const Section = ({children, headingLevel=2, headingText}) =>{
 const H = `h${headingLevel}`;

    return <section>
    <H>{headingText}</H>
     {children}
    </section>
}


export default Section
