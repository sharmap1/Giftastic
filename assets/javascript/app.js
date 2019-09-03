// Initial array of animals
   var animalsArray = ["Cat", "Dog", "Fox", "Lion"];
   function renderButtons() {
     // Deleting the animal buttons prior to adding new animal buttons
     $("#buttons-view").empty();
     // Looping through the array of animals
     for (var i = 0; i < animalsArray.length; i++) {
       // Then dynamicaly generating buttons for each animal in the array.
       var newButton = $("<button>");
       // Adding a class
       newButton.addClass("gif");     
       // Adding a data-attribute with a value of the animal at index i
       newButton.attr("data-animal", animalsArray[i]);
       newButton.attr("value",animalsArray[i]); 
       newButton.text(animalsArray[i]);
       newButton.val(animalsArray[i]);
       // Adding the button to the HTML
       $("#buttons-view").append(newButton); 
     }
   }
   // This function handles events where one button is clicked
  //  $("#add-animal").on("click", function() {

  //    // This line will grab the text from the input box
  //    var animal = $("#animal-input").eq(0).val().trim();
  //    // The movie from the textbox is then added to our array
  //    animalsArray.push(animal);
  //    // calling renderButtons which handles the processing of our animal array
  //    renderButtons();
  //    return false;
  //  });
   // Calling the renderButtons function to display the intial buttons
   renderButtons();
   
   // Event listener for all button elements
   $("button").on("click", function() {
     // In this case, the "this" keyword refers to the button that was clicked
     var animal = $(this).attr("data-animal");
     // Constructing a URL to search Giphy for the animal
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
       animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
     // Performing our AJAX GET request
     $.ajax({
       url: queryURL,
       method: "GET"
     })
       // After the data comes back from the API
       .then(function(response) {
         // Storing an array of results in the results variable
         var results = response.data;
         // Looping over every result item
         for (var i = 0; i < results.length; i++) {
           console.log(results[i]);
           // Only taking action if the photo has an appropriate rating
           if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
             // Creating a div for the gif
             var gifDiv = $("<div>");
             // Storing the result item's rating
             var rating = results[i].rating;
             // Creating a paragraph tag with the result item's rating
             var p = $("<p>").text("Rating: " + rating);
             // Creating an image tag
             var animalImage = $("<img>");
             // Giving the image tag an src attribute of a proprty pulled off the
             animalImage.attr("src", results[i].images.fixed_height_still.url);
             animalImage.addClass("gifImg");
             animalImage.attr("data-other",results[i].images.fixed_height.url );
             // Appending the paragraph and personImage we created to the "gifDiv" div we created
             gifDiv.append(p);
             gifDiv.append(animalImage);
             // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
             $("#gifs-appear-here").prepend(gifDiv);
           }
         }
       });
   });

   $('#add-Animal').on('click',function(){
    var newAnimal = $('input').eq(0).val();
    animalArray.push(newAnimal);
    renderButtons();
    return false;
  })


   $(document).on("click",".gifImg", function() {
     var src = $(this).attr("src");
     var other = $(this).attr("data-other");
     $(this).attr("src",other);
     $(this).attr("data-other",src);

});
