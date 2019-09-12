$(document).on("click", ".gif", function () {
  //  $(".img").on("click", function() {
  console.log("this was clicked");
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});





var animals = ["Magic", "flourishes", "Magicain",];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

  // var animal = $(this).attr("data-name");
  var animaldata = $(this).attr("data-name");

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animaldata + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var divAddress = ["column1-a", "column1-b", "column1-c", "column2-a", "column2-b", "column2-c","column3-a", "column3-b", "column3-c", "column4-a", "column4-b", "column4-c",];
    // After data comes back from the request
    for (a = 0; a < divAddress.length; a++) {
          $("#" + divAddress[a]).empty();
  }
          console.log(queryURL);

  console.log(response);
  // storing the data from the AJAX request in the results variable
  var results = response.data;
  $("#animals-view").empty();
  // Looping through each result item
  for (var i = 0; i < results.length; i++) {
    var ab = $("<button>");
    // Adding a class of movie-btn to our button
    ab.addClass("copy-btn");
    // Adding a data-attribute
   ab.attr("data-value", results[i].images.fixed_height.url)
    // Providing the initial button text
    ab.text("copy");
    // Adding the button to the buttons-view div
   

    // Creating and storing a div tag
    var animalDiv = $("<div>");
    //div for the gifs to go inside
    animalDiv.addClass("gifDiv");
    // pulling rating of gif
    var gifRating = $("<p>").text("Rating: " + results[i].rating);
    animalDiv.append(gifRating);
    $(gifRating).append(ab);
    // Creating and storing an image tag
    var animalImage = $("<img>");
    // Setting the src attribute of the image to a property pulled off the result item
    // animalImage.attr("src", results[i].images.fixed_height.url);
    // animalImage.attr("data-state","still");
    animalImage.addClass("gif");
    // animalImage.attr("data-animate",results[i].images.fixed_height.url);
    // animalImage.attr("data-still",results[i].images.fixed_height.url+"_s");
   
    animalImage.attr("src", results[i].images.fixed_height_still.url); // still image stored into src of image
    animalImage.attr("data-still", results[i].images.fixed_height_still.url); // still image
    animalImage.attr("data-animate", results[i].images.fixed_height.url); // animated image
    animalImage.attr("data-state", "still")


    // <img src="https" data-still="https" data-animate="https:" data-state="still" class="gif">


    // Appending the paragraph and image tag to the animalDiv

    animalDiv.append(animalImage);

    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
    $("#" + divAddress[i]).prepend(animalDiv);


  }
 

  
});

      }


// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  // $("#animals-view").empty(); 
  // Looping through the array of movies
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("animal-btn");
    // Adding a data-attribute
    a.attr("data-name", animals[i]);
    // Providing the initial button text
    a.text(animals[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-animal").on("click", function (event) {
  // $("#animals-view").empty();
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding movie from the textbox to our array
  animals.push(animal);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();


// function copyToClipboard(text) {
//   window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
// }
function copyToClipboard() {
    // var $temp = $("<input>");
    // $("body").append($temp);
    // $temp.val($().text()).select();
    document.execCommand("copy");
   
    console.log(this)
    console.log("1")
};
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
   
    return;
  }
  navigator.clipboard.writeText(text).then(
    function() {
      console.log("Async: Copying to clipboard was successful!");
    },
    function(err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}
$(document).on("click", ".copy-btn", function(){

 
  
  //  $(".img").on("click", function() {
    console.log(this);
  console.log("this was clicked");
  var bts=($(this).data('value'));
  
  // function copyToClipboard(bts);
  console.log(bts);
  // function copyTextToClipboard(bt);
  // console.log(data-value);
  // copyText.select();
  // copyText.setSelectionRange(0, 99999)
  // element=bts
  copyTextToClipboard(bts);
  alert("Copied the text: " + bts);
  

  
  
});


// function copyToClipboard(element) {
//   var $temp = $("<input>");
//   $("body").append($temp);
//   $temp.val($(element).text()).select();
//   document.execCommand("copy");
//   $temp.remove();
// }
// function myFunction() {
//   var copyText = document.getElementById("myInput");
//   copyText.select();
//   copyText.setSelectionRange(0, 99999)
//   document.execCommand("copy");
//   alert("Copied the text: " + copyText.value);
// }


