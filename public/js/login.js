$(document).ready(function() {
    
    // Clear any prior error messages.
    
    
    // Event listeners.
    
    // Form submit action.
    $("#login-form").on("submit", function() {
     
        // Check that values are valid. 
        if(!isValidUser()) {
            event.preventDefault();
        }
        else if(!isUserPassword()) {
            event.preventDefault();
        }
        else {
            // Proceed
        }
    });
    
    $("#btn-signup").on("click", function() {
     
        window.location.pathname = "/signup";
    });
});

// Determine if the username already exists.
function isValidUser() {
    
    // Make sure username is not empty.
    return true;
}

// Makes sure the password matches the user.
function isUserPassword() {
    
    // Make sure password is not empty.
    return true;
}