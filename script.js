function toggleDisplay(className) {
    // Get all "sections
    const sections = document.querySelectorAll("section")

    // iterate through those sections and display= "none"
    sections.forEach((section) => {
        section.style.display = "none"
    });
    //display the target section
    document.querySelector(`.${className}`).style.display = "block"
}

function changeTheme() {
    const styleSheetLink = document.querySelector('link[rel="stylesheet"]');
    const toggleButton = document.getElementById('themeChangeButton');
    const logo = document.querySelector('.logo'); // Select the logo image

    if (styleSheetLink.href.includes('styles')) {
      console.log("Welcome to the dark side")
      styleSheetLink.href = 'style2.css';
      toggleButton.innerHTML = " Flag Mode ";
      icons[0].style.display = 'none';
      icons[1].style.display = 'block';
      logo.src = 'rugby.png';
    } else {
      console.log("Welcome to the light side")
      styleSheetLink.href = 'styles.css';
      toggleButton.innerHTML = "Rugby Mode";
      icons[1].style.display = 'none';
    icons[0].style.display = 'block';
    logo.src = 'fijiflag.png'
    }
    
  }