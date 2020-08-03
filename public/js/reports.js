$(document).ready(function() {
    
    //Global Variables
                
    const xButton = document.getElementById('x-btn');
    const yButton = document.getElementById('y-btn');
    const zButton = document.getElementById('z-btn');
               
    //Event Listeners
    xButton.addEventListener('click', generateReportX); 
    yButton.addEventListener('click', generateReportY);
    zButton.addEventListener('click', generateReportZ);
    
    function generateReportX(){
        alert("Generating Report X...")
    }
    function generateReportY(){
        alert("Generating Report Y...")
    }
    function generateReportZ(){
        alert("Generating Report Z...")
    }
    
});//end