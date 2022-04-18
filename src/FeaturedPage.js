import React from 'react';
 
const FeaturedPage = () => {
    // get featured titles
    // Shawshank redemption
    // The godfather
    var movies = ["The Shawshank Redemption", "The Godfather"];
    for(var i=0; i<2;i++)
    {
        getMovieDetails(movies[i]);
    }

    /*
    / Fetch movie data
    */
    function getMovieDetails(title)
    {
        fetch('http://www.omdbapi.com/?t='+title+'&plot=full&apiKey=6c3a2d45')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appenDataMovieDetails(data);
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    /*
    / go through data and add it to the correct divs
    / and paragraphs
    */
    function appenDataMovieDetails(data)
    {
        // create elements
        var mainContainer = document.getElementById("myData");
        var movieBlock = document.createElement("div");
        var posterDiv = document.createElement("div");
        var infoDiv = document.createElement("div");

        // add classnames
        movieBlock.className = "movieBlock movieBlockAnimation";
        posterDiv.className = "posterDiv";
        infoDiv.className = "movieInfo";

        // add poster
        posterDiv.innerHTML += ' <img src='+data.Poster+'>';
        movieBlock.appendChild(posterDiv);

        // create array for movie details
        var moviedetails =
        [
            ["Title", data.Title], 
            ["Year", data.Year], 
            ["<h3>Plot<h3>", data.Plot],
            ["Awards", data.Awards]
        ]

        // add movie details to info div
        for(var i=0; i < moviedetails.length; i++)
        {
            // create elements
            var parTitle = document.createElement("h2");
            var par = document.createElement("p");
            var smallText = document.createElement("small");
            var spanFirst = document.createElement("span");
            var spanSecond = document.createElement("span");
            var btnMore = document.createElement("button");

            // add classnames
            smallText.className = "small";
            spanFirst.className = "dots";
            spanSecond.className = "moreText";
            btnMore.className = "btnMore";

            // add button function
            btnMore.onclick = readMoreFunction;
            btnMore.textContent = "Read more";

            if(moviedetails[i][0] === "Title")
            {
                parTitle.innerHTML = moviedetails[i][1];
            }
            else if(moviedetails[i][0] === "Year")
            {
                smallText.innerHTML = "(" + moviedetails[i][1] + ")";
                par.appendChild(smallText);
            }
            else if(moviedetails[i][0] === "<h3>Plot<h3>")
            {
                var plot = document.createElement("div");
                plot.className = "plot";

                // Add title 
                plot.innerHTML += moviedetails[i][0];

                // get the first 200 words
                var firstHalf = moviedetails[i][1].substring(0, 200);
                // get the rest
                var secondHalf = moviedetails[i][1].substring(200, moviedetails[i][1].length);
                
                // fill the span elements
                spanFirst.innerHTML = "...";
                spanSecond.innerHTML = secondHalf;
                
                plot.innerHTML += firstHalf;

                plot.appendChild(spanFirst);
                plot.appendChild(spanSecond);
                plot.appendChild(btnMore);
                infoDiv.appendChild(plot);
            }
            else
            {
                // set information
                par.innerHTML += moviedetails[i][1];
            }

            // add information to the infoDiv
            infoDiv.appendChild(parTitle);
            infoDiv.appendChild(par);
        }

        // add to movie block
        movieBlock.appendChild(infoDiv);
        mainContainer.appendChild(movieBlock);
    }

    function readMoreFunction() {
        // Get parentNode
        var parent = this.parentNode;
        // Get elements
        var dots = parent.getElementsByClassName("dots")[0];
        var moreText = parent.getElementsByClassName("moreText")[0];
        var btnText = parent.getElementsByClassName("btnMore")[0];

        // Show more text
        if (dots.style.display === "none")
        {
          dots.style.display = "inline";
          btnText.innerHTML = "Read more"; 
          moreText.style.display = "none";
        }
        else // show less text
        {
          dots.style.display = "none";
          btnText.innerHTML = "Read less"; 
          moreText.style.display = "inline";
        }
      }
    
    return ( 
        <div className="featured-page fadeInAnimation">
            <div id="myData"></div>
        </div>
     );
}
 
export default FeaturedPage;