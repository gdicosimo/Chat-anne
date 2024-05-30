import React from 'react';
import { Link } from 'react-router-dom';
import { add } from '../assets';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <>
        <Helmet>
            <title>Not found :(</title>
            <link rel='icon' type='image/png' href={add} sizes='any'/>
        </Helmet>
        <div className="flex flex-col items-center justify-center min-h-screen bg-color-middleblack">
        <h1 className="text-6xl font-bold text-color-cream mb-4">404</h1>
        <h2 className="text-2xl text-color-cream mb-8">Page Not Found</h2>
        <p className="font-normal text-color-cream">Sorry, but the page you are looking for does not exist.</p>
        <p className="font-normal text-color-cream mb-8">Try logging in again</p>
        <Link to="/">
            <button className="btn-animated px-6 flex py-2 bg-color-cream text-color-middleblack rounded ">
            Go to Home Page
            </button>
        </Link>
        </div>
    </>
  );
}

export default NotFound;
