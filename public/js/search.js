
$(document).ready(function(){
    //global variables
    var albumsArray = []; //the array is now populated from the database using populateAlbumArray();
    var customerCart = [];
    var albumIDsString = "";
    
    //API call using Ajax to populate albums array from database. Uses app.get("/api/populateAlbumsArray") route in App.js
    populateAlbumArray();
    function populateAlbumArray(){
        $.ajax({
            method: "GET",
            url: "/api/populateAlbumsArray",
            type: "JSON",
            async: false,
            
            success: function(data, status){

                data.forEach(function(elem, i){
                  albumObject = {albumID: elem.albumID, title: elem.title, artist: elem.artist, coverImage: elem.coverImage, price: elem.price};
                  albumsArray[i] = albumObject;
                });
            }
        });//ajax
    }//populateAlbumArray()
    
    //API call to set customer cart in database once add to cart button is clicked
    function setCart(albumIDs, customerID){
      $.ajax({
          method: "GET",
          url: "/api/setCart",
          data: {
              "albumIDs": albumIDs,
              "customerID": customerID
          },
          
          success: function(data, status) {
              console.log("Data from setCart" + data + "Status" + status);
          }
      });//ajax
    }//setCart()
    
    //function to find albums by name or artist and display them to user
    $("#albumSearch").on("change", function(){ 
        let searchValue = $("#albumSearch").val().toLowerCase();
        showSearchResults(searchValue);
    });
    
    $("#priceSearch").on("change", function() { 
         let priceValue = $("#priceSearch").val();
         showSearchResults(priceValue)
    });
       
      //shows search results based on search by title/genre/artist or price 
      function showSearchResults(searchParam) {
      $("#searchResult").html("");
    
      let itemFound = false; 
      let albumIDNum = 0;
    
       //search albums and display results
       for (let i = 0; i < albumsArray.length; i++)
       {
         let titleBoolean = albumsArray[i].title.toLowerCase().includes(searchParam);
         let artistBoolean = albumsArray[i].artist.toLowerCase().includes(searchParam);
         
         if ( titleBoolean || artistBoolean || (albumsArray[i].price <= searchParam) ) {
             $("#searchResult").append(`${albumsArray[i].coverImage} <br />`);
             $("#searchResult").append(`<strong> Artist: </strong> ${albumsArray[i].artist} <strong> Album: </strong> <i> ${albumsArray[i].title} </i> <strong> <br /> Price: </strong> $${albumsArray[i].price} <br /> <br />`);
             $("#searchResult").append(`<button value=${albumsArray[i].albumID} class="btn btn-outline-secondary"> Add to Cart </button> <br />`);
             albumIDNum = albumsArray[i].albumID;
             console.log("Album IDS:" + albumsArray[i].albumID);
             itemFound = true;
          }
       }//close for
       
       if (!itemFound) {
          $("#searchResult").html("<p> No results found ... </p>");
       }
    }//close showSearchResults()
        
    //function to add item to cart when Add button is clicked
    $("#searchResult").on("click", ".btn-outline-secondary", function(){
        
       let value = $(this).val();
       albumIDsString += value;
       albumIDsString += " ";
       
       setCart(albumIDsString, 0);
       console.log(albumIDsString);
    });
    
});//document ready