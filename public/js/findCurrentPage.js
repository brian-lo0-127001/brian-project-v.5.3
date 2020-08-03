function findCurrentPage() {
    const NUM_NAV_LINKS = document.getElementsByClassName("navPage").length;
    
    // Get pathname of current page.
    let pathname = "";
    if (window.location.pathname == "/")
        pathname = "home";
    else
        pathname = window.location.pathname.slice(1);
        
    // Add current class to nav link of current page.
    for (let i = 0; i < NUM_NAV_LINKS; i++) {
        let element = document.getElementsByClassName("navPage")[i];
    
        if (element.id == pathname)
            element.classList.add("current");
    }
}