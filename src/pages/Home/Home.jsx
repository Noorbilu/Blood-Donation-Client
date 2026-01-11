import React from 'react';
import Banner from './Banner';
import QuickSteps from './QuickSteps';
import ContactUs from './ContactUs';
import Divider from './Divider';
import HowItWorks from './HowItWorks';
import BloodDonationFeatures from './BloodDonationFeatures';
import TestimonialsSection from './TestimonialsSection';

import CTA from './CTA';
import Impact from './Impact';
import News from './News';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            
            <HowItWorks></HowItWorks>
            <QuickSteps></QuickSteps>

            <Impact></Impact>
            <Divider></Divider>
            <BloodDonationFeatures></BloodDonationFeatures>
            <TestimonialsSection></TestimonialsSection>

            <CTA></CTA>

            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;