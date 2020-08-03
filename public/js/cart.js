$(document).ready(function(){
    
    //global variables
    var itemsPrice = 0.00;
    var tax = 0;
    var shipping = 0;
    var total = 0;
    
    var cartIDs = [];
    var albumsArray = [];
    var customerCart = [];
    
    //API call to get cart albumIDs added in search.ejs
    getCart();
    function getCart(){
        $.ajax({
            method: "GET",
            url: "/api/getCart",
            async: false,
            
            success: function(data, status){
                let string = JSON.stringify(data);
                let newString = string.replace('[{"albumIDs":"', "").replace(' "}]', "").split(' ');
                console.log(newString);
                
                //fill cart with albumIDs
                for (let i = 0; i < newString.length; i++){
                    cartIDs.push(Number(newString[i]));
                    console.log(cartIDs[i]);
                }
            }//success
        });//ajax
    }//getCart()
    
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
    
    //populate customerCart based on album IDs added to cart in index.ejs and stored in localStorage
    populateCart();
    function populateCart(){
      for (let i = 0; i < cartIDs.length; i++) customerCart.push(albumsArray[cartIDs[i]-1]);
    };//populateCart

    //update cart
    updateCart();
    function updateCart() {
        
        // Clear contents of cart.
        $("#cartList").html("");
        
        customerCart.forEach(function(element, i){
            $("#cartList").append(`${element.coverImage} <br /> Artist: ${element.artist} Title: ${element.title} Price: $${element.price} <br />`);   
            $("#cartList").append(`<button value=${i} type="button" class="btn btn-warning remove"> Remove Item </button> <br /> <br />`);
        });
        // Update total of all displayed elements.
        calculateTotals();
    } //update cart
    
    //function to calculate and display cart price totals
    function calculateTotals(){
        
        itemsPrice = 0.00;
        tax = 0;
        shipping = 0;
        total = 0;
    
        //iterate through customer cart and add price of each element in cart
        customerCart.forEach(function(element){    
            itemsPrice = itemsPrice += element.price;
        });
            
        tax = Math.round((itemsPrice * 0.06), 2);
        shipping = Math.round((itemsPrice * 0.00), 2);
        total = Math.round((itemsPrice + tax + shipping), 2);
        
        $("#itemsTotal").html(`Items: $${itemsPrice}`);
        $("#taxTotal").html(`Tax: $${tax}`);
        $("#shippingTotal").html(`Tax: $${shipping}`);
        $("#orderTotal").html(`Total Price: $${total}`);
    }//calculate totals
    
    //add function to remove items from cart
    $("#cartList").on("click",".remove", function() {
        itemID = $(this).val();
        
        delete customerCart[itemID];
        console.log( $(this).val() );
        
        // Update cart with new display and totals.
        updateCart();
    });//remove items from cart
    
    $("#placeOrder").on("click", function(event){
        let albumIDs = "";
        let albumTitles ="";
        cartEmpty = true;
        
        customerCart.forEach(function(elem){
           if (elem != null) cartEmpty = false; 
        });
        
        if (cartEmpty) {
            $('#cartError').html('<p class="text-danger"> There are no items in your cart. </p>');
            event.preventDefault();
        }
        
        else {
        //build strings of albumIDs and albumTitles
        customerCart.forEach(function(elem) {
            
            albumIDs += elem.albumID + ",";
            albumTitles += elem.title + ",";
            $('#cartError').html('<p class="text-success"> Order Placed! (Will redirect to Thank-You Page) </p>');
        });
        
        submitOrder(albumIDs, albumTitles, total);
        }
    });
    
     //api call to /api/submitOrder when Submit Order button is clicked
    function submitOrder(albumIDs, albumTitles, orderTotal){
       $.ajax({
           method: "GET",
           url: "/api/submitOrder",
           data: {
               "albumIDs": albumIDs,
               "albumTitles": albumTitles,
               "orderTotal": orderTotal
           },
           
           success: function(data, status){
               console.log("Submit order returned: " + data);
           }
       });//ajax
    }
    
});//document ready
    