import React from 'react';
import Banner from './Banner';
import Divider from './Divider';
import HowItWorks from './HowItWorks';
import TestimonialsSection from './TestimonialsSection';
import QuickSteps from './QuickSteps';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <QuickSteps></QuickSteps>
            <Divider></Divider>
            <HowItWorks></HowItWorks>
            <TestimonialsSection></TestimonialsSection>
        </div>
    );
};

export default Home;