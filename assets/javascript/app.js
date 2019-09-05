// Initial array of animals
var animalsArray = ["Cat", "Dog", "Fox", "Lion"];

function renderButtons() {
  // Deleting the animal buttons prior to adding new animal buttons
  $("#buttons-view").empty();
  // Looping through the array of animals
  for (var i = 0; i < animalsArray.length; i++) {
    // Then dynamicaly generating buttons for each animal in the array.
    var a = $("<button>");
    // Adding a class
    a.addClass("gif");     
    // Adding a data-attribute with a value of the animal at index i
    a.attr("data-animal", animalsArray[i]);
    a.attr("value",animalsArray[i]); 
    a.text(animalsArray[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a); 
  }

  $(".gif").click(function() {
    onclick(this)
  });
}

renderButtons();

// Event listener for all button elements
function onclick(button){
  event.preventDefault();
  var animal = $(button).attr("data-animal");
  console.log(animal);
  // Constructing a URL to search Giphy for the animal
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
       animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    // Storing an array of results in the results variable
    var results = response.data;
    // Looping over every result item
    for (var i = 0; i < results.length; i++) {
      // Creating a div for the gif
      var gifDiv = $("<div>");
      // Storing the result item's rating
      var rating = results[i].rating;
      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + rating);
      // Creating an image tag
      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.addClass("gifImg");
      animalImage.attr("data-other",results[i].images.fixed_height.url );
      // Appending the paragraph and personImage we created to the "gifDiv" div we created
      gifDiv.append(p);
      gifDiv.append(animalImage);
      // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
      $("#gifs-appear-here").prepend(gifDiv);
    }
  });
}

$('#add-animal').click(function(){
  event.preventDefault();
  var newAnimal = $('input').eq(0).val();
  animalsArray.push(newAnimal);
  renderButtons();
})

$(document).on("click",".gifImg", function() {
  var src = $(this).attr("src");
  var other = $(this).attr("data-other");
  $(this).attr("src",other);
  $(this).attr("data-other",src);
});
