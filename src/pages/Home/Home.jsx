import React from 'react';
import Banner from './Banner';
import Divider from './Divider';
import HowItWorks from './HowItWorks';
import TestimonialsSection from './TestimonialsSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Divider></Divider>
            <HowItWorks></HowItWorks>
            <TestimonialsSection></TestimonialsSection>
        </div>
    );
};

export default Home;