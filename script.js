// Dynamically adjusting the dimensions of certain elements
const search_bar_height = document.getElementById("movie_name").offsetHeight;
document.getElementById("search_icon").style.height = search_bar_height + "px";

//Getting details
async function getDetails()
{
    // Generating the URL
    const movie_name = document.getElementById("movie_name").value;
    const url = "https://www.omdbapi.com/?apikey=a5aa17e6&t="+movie_name;

    // Declaring the variables for elements
    const loading = document.getElementsByClassName("loading")[0];
    const result = document.getElementsByClassName("result")[0];
    const movie_title = document.getElementsByClassName("movie_title")[0];
    const movie_poster = document.getElementById("movie_poster");
    const year_of_release = document.getElementsByClassName("year_of_release")[0];
    const imdb_rating = document.getElementsByClassName("imdb_rating")[0];

    // Showing the loading indicator
    loading.style.display = "flex";
    result.style.display = "none";

    // Clearing previous response
    movie_title.textContent = "";
    movie_poster.setAttribute("src","");
    year_of_release.textContent = "";
    imdb_rating.textContent = "";

    try
    {
        // Fetching the JSON data
        const data = await fetch(url);
        const movie_details = await data.json();

        if(movie_details["Error"])
        {
            alert(movie_details["Error"]);
            loading.style.display = "none";
            return;
        }

        // Putting all the required data in the elements, while hiding the loading indicator and displaying the result
        loading.style.display = "none";
        
        movie_title.textContent = movie_details["Title"];
        movie_poster.setAttribute("src",movie_details["Poster"]);
        year_of_release.textContent = String(movie_details["Released"]).slice(7);
        imdb_rating.textContent = movie_details["imdbRating"];

        result.style.display = "flex";
    }
    catch (error)
    {
        alert(error);
    }
}

// Adding click listener to the search button
document.getElementById("search_icon").addEventListener("click", getDetails);