$(document).ready(function() {

   // Global variables
   // Test data
   var albumsArray = [{ albumID: 0, title: "Abbey Road", artist: "The Beatles", coverImage: '<img src="/img/abbeyroad.jpg" alt="Abbey Road - Beatles">', price: 25.00 },
      { albumID: 1, title: "Let There Be Cello", artist: "2 Cellos", coverImage: '<img src="/img/2cellos1.jpg" alt="Let There Be Cello - 2 Cellos">', price: 25.00 },
      { albumID: 2, title: "Rubber Soul", artist: "The Beatles", coverImage: '<img src="/img/rubbersoul.jpg" alt="Rubber Soul - Beatles">', price: 25.00 },
      { albumID: 3, title: "Extraterrestrial Live", artist: "Blue Öyster Cult", coverImage: '<img src="/img/etilive.jpg" alt="Extraterrestrial Live - Blue Öyster Cult">', price: 25.00 },
      { albumID: 4, title: "Fire of Unknown Origin", artist: "Blue Öyster Cult", coverImage: '<img src="/img/fireofunknownorigin.jpg" alt="Fire of Unknown Origin - Blue Öyster Cult">', price: 25.00 },
      { albumID: 5, title: "Dead Man's Party", artist: "Oingo Boingo", coverImage: '<img src="/img/deadmansparty.jpg" alt="Dead Man\'s Party - Oingo Boingo">', price: 25.00 },
      { albumID: 6, title: "Only a Lad", artist: "Oingo Boingo", coverImage: '<img src="/img/onlyalad.jpg" alt="Only a Lad - Oingo Boingo">', price: 25.00 },
      { albumID: 7, title: "Master of Puppets", artist: "Metallica", coverImage: '<img src="/img/masterofpuppets.jpg" alt="Master of Puppets - Metallica">', price: 25.00 },
      { albumID: 8, title: "Dark Side of the Moon", artist: "Pink Floyd", coverImage: '<img src="/img/darksideofthemoon.jpg" alt="Dark Side of the Moon - Pink Floyd">', price: 25.00 },
      { albumID: 9, title: "Kind of Blue", artist: "Miles Davis", coverImage: '<img src="/img/kindofblue.jpg" alt="Kind of Blue - Miles Davis">', price: 25.00 },
      { albumID: 10, title: "Come Fly with Me", artist: "Frank Sinatra", coverImage: '<img src="/img/comeflywithme.jpg" alt="Come Fly with Me - Frank Sinatra">', price: 25.00 },
      { albumID: 11, title: "Queen of Soul", artist: "Etta James", coverImage: '<img src="/img/queenofsoul.jpg" alt="Queen of Soul - Etta James">', price: 25.00 },
      { albumID: 12, title: "Blues on Top of Blues", artist: "BB King", coverImage: '<img src="/img/bluesontopofblues.jpg" alt="Blues on Top of Blues - BB King">', price: 25.00 },
      { albumID: 13, title: "The Emancipation of Mimi", artist: "Mariah Carey", coverImage: '<img src="/img/Mariah_Carey_The_Emancipation_of_Mimi.jpg" alt="The Emancipation of Mimi - Mariah Carey">', price: 25.00 },
      { albumID: 14, title: "Merry Christmas", artist: "Mariah Carey", coverImage: '<img src="/img/Merry_Christmas_Mariah_Carey.jpg" alt="Merry Christmas - Mariah Carey">', price: 25.00 },
      { albumID: 15, title: "Trilogy", artist: "The Weeknd", coverImage: '<img src="/img/The_Weeknd_Trilogy.jpg" alt="Trilogy -The Weeknd">', price: 25.00 },
      { albumID: 16, title: "21", artist: "Adele", coverImage: '<img src="/img/Adele_21.jpg" alt="21 - Adele">', price: 25.00 },
      { albumID: 17, title: "Unorthodox Jukebox", artist: "Bruno Mars", coverImage: '<img src="/img/BrunoMarsUJAlbumCover.jpg" alt="Unorthodox Jukebox - Bruno Mars">', price: 25.00 },
      { albumID: 18, title: "I Used to Know Her", artist: "H.E.R.", coverImage: '<img src="/img/I_Used_To_Know_Her.jpg" alt="I Used to Know Her - H.E.R.">', price: 25.00 },
      { albumID: 19, title: "Don't Smile at Me", artist: "Billie Eilish", coverImage: '<img src="/img/Billie_Eilish_Dont_Smile_at_Me.jpg" alt="Dont Smile at Me - Billie Eilish">', price: 25.00 }
   ];

   // Event listeners.

   // Add function
   $("#add-form").on("submit", function() {

      $("#validationFdbk").html(""); //resets validation feedback
      if (!isAddFormValid()) {
         return;
      }
      //Test form submit
      console.log("Add Form Complete");
   });

   // Find Album to update
   $("#find-form").on("submit", function() {
      $("#validationFdbk").html(""); //resets validation feedback
      if (!isFindFormValid()) {
         return;
      }
      //Test form submit
      console.log("Find Album Complete");
   });

   // Update function
   $("#update-form").on("submit", function() {
      $("#validationFdbk").html(""); //resets validation feedback
      if (!isUpdateFormValid()) {
         return;
      }
      //Test form submit
      console.log("Update Album form complete");
   });

   // Delete function
   $("#del-form").on("submit", function() {
      $("#validationFdbk").html(""); //resets validation feedback
      if (!isDeleteFormValid()) {
         return;
      }
      deleteAlbum();
   });

   $("#updateSearch").on("change", function() {

      // searchAlbum from search.js...
      let searchValue = $("#updateSearch").val().toLowerCase();
      let itemFound = false;
      let albumIDNum = 0;
      for (let i = 0; i < albumsArray.length; i++) {
         titleBoolean = albumsArray[i].title.toLowerCase().includes(searchValue);
         artistBoolean = albumsArray[i].artist.toLowerCase().includes(searchValue);

         if (titleBoolean || artistBoolean) {
            $("#updateResult").html(`${albumsArray[i].coverImage} <br />`);
            $("#updateResult").append(`<strong> Artist: </strong> ${albumsArray[i].artist} <strong> Album: </strong> <i> ${albumsArray[i].title} </i> <strong> <br /> Price: </strong> $${albumsArray[i].price} <br /> <br />`);
            // omitted, not needed-> $("#updateResult").append(`<button  id="addToCart" value=${albumsArray[i].albumID} class="btn btn-outline-secondary"> Add to Cart </button>`);
            albumIDNum = albumsArray[i].albumID;
            console.log(albumIDNum);
            console.log("Test");
            itemFound = true;
         }
      } //close for

      if (!itemFound) {
         $("#updateResult").html("<p> No results found ... </p>");
      }
   }); //close album search 

   // ...end Listener Section

   // start Functions Section
   function addAlbum() {
      var addition = document.getElementById('add-album').value;
      // add
      console.log("Added albumID:" + addition.value);
      addition.value = " ";
   }

   function updateAlbum() {
      var update = document.getElementById('update-album').value;
      // update
      console.log("Updated albumID:" + update.value);
      update.value = " ";
   }

   function updateAlbumsArray(action, title, artist, coverImage, price, genre, tag1, tag2) {
      $.ajax({
         method: "get",
         url: "/api/updateAlbumsArray",
         data: {
            "action": action,
            "title": title,
            "artist": artist,
            "coverImage": coverImage,
            "price": price,
            "genre": genre,
            "tag1": tag1,
            "tag2": tag2
         },
         success: function(data, status) {}
      }); //ajax
   } //updateAlbum


   function deleteAlbum() {
      var deletion = document.getElementById('delete-album').value;
      albumsArray.splice(deletion.value, 1); // remove the album ID number from array
      console.log("Deleted albumID:" + deletion.value);
      deletion.value = " ";
   }

   // Form Validation Section

   function isAddFormValid() { // Validate Add Form
      let isValid = true;
      if ($("#add-title").val() == "") {
         isValid = false;
         $("#validationFdbk").html("Fill out all the form fields");
      }
      if ($("#add-artist").val() == "") {
         isValid = false;
         $("#validationFdbk").html("Fill out all the form fields");
      }
      if ($("#add-coverImage").val() == "") {
         isValid = false;
         $("#validationFdbk").html("Fill out all the form fields");
      }
      if ($("#add-genre").val() == "") {
         isValid = false;
         $("#validationFdbk").html("Fill out all the form fields");
      }
      if ($("#add-price").val() == "") {
         isValid = false;
         $("#validationFdbk").html("Fill out all the form fields");
      }
   }

   function isUpdateFormValid() { // Validate Update Form
      let isValid = true;
      if ($("#update-title").val() == "") {
         isValid = false;
         $("#validationFdbk").html("Fill out all the form fields");
      }
      if ($("#update-artist").val() == "") {
         isValid = false;
         $("#validationFdbk").html("Fill out all the form fields");
      }
      if ($("#update-coverImage").val() == "") {
         isValid = false;
         $("#validationFdbk").html("Fill out all the form fields");
      }
      if ($("#update-genre").val() == "") {
         isValid = false;
         $("#validationFdbk").html("Fill out all the form fields");
      }
      if ($("#update-price").val() == "") {
         isValid = false;
         $("#validationFdbk").html("Fill out all the form fields");
      }
      return isValid;
   }
   //
   function isDeleteFormValid() { // Validate Delete Form
      let isValid = true;
      if ($("#delete-album").val() == "") {
         isValid = false;
         $("#validationFdbk").html("Fill out the ID field");
      }
      return isValid;
   }
   // ...end Form Validation section
   // ...end Functions section
}); //end
