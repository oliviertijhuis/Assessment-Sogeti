import React, { useState } from "react";

const SearchPage = () => {
    // Create variables for name and description
    const [name, setName] = useState(" ");
    const [description, setDecription] = useState("full");

    const handleInput = event => {
      setName(event.target.value);  };
    
    const logValue = () => {
        // reset div by emptying the div
        document.getElementById("results").innerHTML = "";
        searchMovies(name);
    };
      
    const handleDescription = (event) => {
      setDecription(event.target.value)
    }

    /*
    / Fetch movie data
    */
    function searchMovies(title)
    {
        fetch('http://www.omdbapi.com/?s='+title+'&apiKey=6c3a2d45')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendDataMovies(data);
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    function appendDataMovies(data)
    {
        var arrayOfMovies = objectToArray(data);

        for (var i = 0; i < 5; i++) {
            getMovieDetails(arrayOfMovies[0][i].Title)
        }
    }

    function getMovieDetails(title)
    {
        fetch('http://www.omdbapi.com/?t='+title+'&plot='+description+'&apiKey=6c3a2d45')
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
        
        // create variables
        var mainContainer = document.getElementById("results");

        var movieBlock = document.createElement("div");
        var posterDiv = document.createElement("div");
        var movieInfo = document.createElement("div");

        // add classnames
        movieBlock.className = "movieBlock fadeInAnimation";
        posterDiv.className = "posterDiv";
        movieInfo.className = "movieInfo";

        // add poster
        posterDiv.innerHTML += ' <img src='+data.Poster+'>';
        movieBlock.appendChild(posterDiv);

        // create array for movie details
        var moviedetails =
        [
            ["<b>Title:</b> ", data.Title], 
            ["<b>Released: </b>", data.Released], 
            ["<b>Type: </b>", data.Type], 
            ["<b>imdb Rating: </b>", data.imdbRating],
            ["<b>Genre: </b>", data.Genre],
            ["<b>Director: </b>", data.Director],
            ["<b>Actors: </b>", data.Actors],
            ["<b>Plot: </b><br>", data.Plot],
            ["<b>Awards: </b>", data.Awards]
        ]

        // add movie details to info div
        for(var i=0; i < moviedetails.length; i++)
        {
            var par = document.createElement("p");
            var ul = document.createElement("ul");

            
            // Add title 
            if (moviedetails[i][0] !== "<b>Plot: </b><br>")
            {
                par.innerHTML += moviedetails[i][0];
            }
            
            
            /* 
            / If moviedetails are about actors
            / Then loop through actors and add it to an
            / unorderd list
            */ 
            if(moviedetails[i][0] === "<b>Actors: </b>")
            {
                var li = document.createElement("li");
                var actorName = "";
                moviedetails[i][1] += ",";
                
                for(var j = 0; j < moviedetails[i][1].length; j++)
                {
                    if(moviedetails[i][1][j] !== ',')
                    {
                        actorName += moviedetails[i][1][j];
                    }
                    else
                    {
                        li.innerHTML = actorName;
                        actorName = "";
                        ul.appendChild(li);
                        li = document.createElement("li");
                    }
                }
            }
            else if(moviedetails[i][0] === "<b>Plot: </b><br>"  && description === "full")
            {
                var spanFirst = document.createElement("span");
                var spanSecond = document.createElement("span");
                var btnMore = document.createElement("button");
                var plot = document.createElement("div");

                spanFirst.className = "dots";
                spanSecond.className = "moreText";
                btnMore.className = "btnMore";
                plot.className = "plot";

                btnMore.onclick = readMoreFunction;
                btnMore.textContent = "Read more";

                // get the first 200 words
                var firstHalf = moviedetails[i][1].substring(0, 200);
                // get the rest
                var secondHalf = moviedetails[i][1].substring(200, moviedetails[i][1].length);
                
                // fill the span elements
                spanFirst.innerHTML = "...";
                spanSecond.innerHTML = secondHalf;
                
                // add title
                plot.innerHTML += moviedetails[i][0];
                plot.innerHTML += firstHalf;

                plot.appendChild(spanFirst);
                plot.appendChild(spanSecond);
                plot.appendChild(btnMore);
                movieInfo.appendChild(plot);
            }
            else if (moviedetails[i][0] === "<b>Plot: </b><br>"  && description !== "full")
            {
                plot = document.createElement("div");
                
                plot.className = "plot";
                // add title
                plot.innerHTML += moviedetails[i][0];

                plot.innerHTML += moviedetails[i][1];
                movieInfo.appendChild(plot);
            }
            else
            {
                // add movie info
                par.innerHTML += moviedetails[i][1];
            }

            // add information to the infoDiv
            movieInfo.appendChild(par);

            if(moviedetails[i][0] === "<b>Actors: </b>"){
                movieInfo.appendChild(ul);
            }
        }

        // add to movie block
        movieBlock.appendChild(movieInfo);
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

    /*
    / Adds all objects from the json
    / and adds it to an array
    / For easier access to the data
    / returns array of objects
    */
    const objectToArray = obj => {
        const keys = Object.keys(obj);
        const res = [];
        for(let i = 0; i < keys.length; i++){
           res.push(obj[keys[i]]);
        };
        return res;
     };

    return (
        <div className="searchbar fadeInAnimation">

            <input onChange={handleInput} placeholder="Enter movie title" />

            <select className="searchbar-part" value={description} onChange={handleDescription}>
                <option value="full">Description full</option>
                <option value="short">Description short</option>
            </select>

            <button className="searchbar-part" id="searchBtn" onClick={logValue}>Search</button>
          
            <div id="results"></div>
        </div>
        
    );
}
 
export default SearchPage;