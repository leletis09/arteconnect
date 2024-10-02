function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName(".dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const image = document.getElementById('#obras-img');
    const altText = document.getElementById('#alt-text');
  
    image.addEventListener('mouseenter', function () {
      altText.style.display = 'block';
    });
  
    image.addEventListener('mouseleave', function () {
      altText.style.display = 'none';
    });
  });