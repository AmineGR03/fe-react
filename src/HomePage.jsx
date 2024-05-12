import React from 'react';

import Footer from './Footer';
import MenuSection from './MenuSection';
import ReviewSection from './ReviewSection';
import ContactSection from './ContactSection';
import Header from './Header';
import Dishes from './DishesSections';



const HomePage = () => {
    return (<>
        <Header />
        <section id="dishes"><Dishes /></section>
        <section id="menu"><MenuSection /></section>
        <section id="reviews"><ReviewSection /></section>
        <section id="contact"><ContactSection /></section>
        <section id="footer"><Footer /></section>
    </>)
}
export default HomePage