import {Link} from "react-router-dom";
import React from 'react';

const Navbar = () => {

    document.addEventListener("DOMContentLoaded", function(){
        //dom is fully loaded, but maybe waiting on images & css files

        // get the url and split it at the "/"
        var substring = window.location.href.split('/');
        /* if there is nothing after the slash
        / Then it is the homepage
        */ 
        if(substring[3] === "")
        {
            highlightFeature(); 
        }
        else
        {
            highlightSearch(); 
        }
    });

    function highlightFeature(){
        var featureButton = document.getElementById("featuredButton");
        var searchButton = document.getElementById("searchButton");

        featureButton.style.borderBottom = "2px white solid";
        searchButton.style.borderBottom = "none";
    }

    function highlightSearch(){
        var searchButton = document.getElementById("searchButton");
        var featureButton = document.getElementById("featuredButton");

        searchButton.style.borderBottom = "2px white solid";
        featureButton.style.borderBottom = "none";
    }

    return ( 
        <nav className="navbar">
            <h1>Movie App</h1>
            <div className="links" >
                <Link className="link" id="featuredButton" to="/" onClick={highlightFeature}>Featured Movies</Link>
                <Link className="link" id="searchButton" to="search" onClick={highlightSearch}>Search Movies</Link>
            </div>


        </nav>
     );
}
export default Navbar;