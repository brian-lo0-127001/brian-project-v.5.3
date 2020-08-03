$(document).ready(function() {
    
    // Clear any prior error messages.
    
    
    // Event listeners.
    
    // Displaying city from API after typing ZIP.
    $("#signup-zip").on("change", function() {
        console.log("Change registered.");
        $.ajax({
            method: "GET",
            url: "https://cst336.herokuapp.com/projects/api/cityInfoAPI.php",
            dataType: "json",
            data: {"zip" : $("#signup-zip").val() },
            success: function(result, status){
                console.log(result.city);
                
                if(!result) {
                    $("#signup-zip-error").html("ZIP does not exist");
                    $("#city").html("");
                }
                else {
                    $("#signup-zip-error").html("");
                    $("#signup-city").attr("value", (result.city));
                }
            },
        });
    }); 
    
    // Form submit action.
    $("#signup-form").on("submit", function() {
           
        // Check that values are valid. 
        if ($("#signup-name").val() == "") {
            event.preventDefault();
        }
        else if(!isNewUser()) {
            event.preventDefault();
        }
        else if(!isValidPassword()) {
            event.preventDefault();
        }
        else if(!passwordsMatch()) {
            event.preventDefault();
        }
        else {
            // Submit data.
        }
    });
});

// Determine that the username entered is not already in use.
function isNewUser() {
    
    // Make sure username is not empty.
    return true;
}

// Makes sure the password is valid. 
// (Ex: at least 6 chars, must have num/both upper- and lower-case).
function isValidPassword() {
    
    return true;
}

// Makes sure that the password and reentered password match.
function passwordsMatch() {
    
    return true;
}