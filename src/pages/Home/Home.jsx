import React from 'react';
import Banner from './Banner';
import Divider from './Divider';
import HowItWorks from './HowItWorks';
import TestimonialsSection from './TestimonialsSection';
import QuickSteps from './QuickSteps';
import BloodDonationFeatures from './BloodDonationFeatures';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <QuickSteps></QuickSteps>
            <Divider></Divider>
            <HowItWorks></HowItWorks>
            <BloodDonationFeatures></BloodDonationFeatures>
            <TestimonialsSection></TestimonialsSection>
        </div>
    );
};

export default Home;