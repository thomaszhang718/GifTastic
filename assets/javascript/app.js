$(document).ready(function(){

    //Array of the pre-existing topics to search from

    var topics = ['memes', 'dank memes', 'jet fuel can\'t melt steel beams', 'pepe', 'dat boi', 'dickbutt', 'dickbutt', 'zodiac killer', 'trump', 'pokemon go', 'ayy lmao', 'shitposting', 'deal with it', 'spongebob', 'caveman spongebob', 'surprised patrick', 'squidward', 'feels', 'party hard', 'drunk', 'banana', 'lolwut', 'doge', 'shibe', 'swiggity swooty', 'dat booty', 'swag', 'haters gonna hate', 'boss', 'queen bey', 'troll', 'reaction images', 'come at me bro', 'fail', 'rickroll', 'nyan cat', 'rustle jimmies'];

    //for loop to go through each item of the topics array and creating a button for that item

    for (i = 0; i < topics.length; i++) {
        var memeButton = $('<button>'); 
        memeButton.addClass('btn btn-info memeButtonClass'); //adding classes for CSS
        memeButton.attr('data-memename', topics[i]); //adding a memeName data attribute which will be the search item

        memeButton.text(topics[i]); 
        $("#memeButtonsDiv").append(memeButton); //appending to our HTML div
    }

    //On click function to add new memes as buttons

    $('#addMeme').on('click', function() {

        //taking the text from the input and adding it as a variable

        var newTerm = $("#meme-input").val().trim();

        //using JQuery to create a new button, add the class, add the data-memeName, add the text, and then append to correct div. same process as above
        var addMemeButton = $('<button>');
        addMemeButton.addClass('btn btn-info memeButtonClass');
        addMemeButton.attr('data-memename', newTerm);
        addMemeButton.text(newTerm);
        $("#memeButtonsDiv").append(addMemeButton);

        // This line allows us to take advantage of the HTML "submit" property. This way we can hit enter on the keyboard and it registers the search (in addition to clicks).
        return false;
    });

    //on click function for all buttons that are clicked. Call API and display GIFs and ratings

    $('body').on('click', 'button', function() {
            
            $('#memesAppearDiv').empty(); //Empty any GIFs from previous searches

            var memeName = $(this).data('memename'); //Taking the data-memename of the button clicked and storing as variable memeName

            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + memeName + "&api_key=dc6zaTOxFJmzC&limit=10"; //adding memeName to queryURL

            //AJAX call to the Giphy API to search memeName  with limit of 10 responses

            $.ajax({
                    url: queryURL,
                    method: 'GET'
                })

                .done(function(response) {
                    console.log(response);

                    var results = response.data;

                        //for loop that goes through all the response to create the images and ratings

                        for (var i = 0; i < results.length; i++) {
                            var memeDiv = $('<div>'); //JQuery to create new div
                            var p = $('<p>'); //JQuery to create new p tag

                            if (results[i].rating == "") { //if-else statement to display "none" if no rating provided
                                p.text('Rating: none');
                            } else {
                                p.text('Rating: ' + results[i].rating);
                            }

                            //JQuery to create new img, set as still image, and add in the data-still, data-animate, data-state attributes

                            var memeImage = $('<img>');
                            memeImage.attr('src', results[i].images.original_still.url);
                            memeImage.attr('data-still', results[i].images.original_still.url);
                            memeImage.attr('data-animate', results[i].images.original.url);
                            memeImage.attr('data-state', 'still');

                            //append the rating and the img to the div created above, then append div to the HTML div set up

                            memeDiv.append(p);
                            memeDiv.append(memeImage);
                            memeDiv.addClass("memeDivClass");
                            $('#memesAppearDiv').append(memeDiv);
                        }
                });
    });

    //on click function for all img tags, switches data-state of img clicked and changes img src from still to animated GIF and vice versa

    $('body').on('click', 'img', function(){
        var state = $(this).attr('data-state');

        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});
