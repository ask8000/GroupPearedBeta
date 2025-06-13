document.addEventListener("DOMContentLoaded", () => {
  fetch("header[ZOE].html")
    .then(response => response.text())
    .then(data => {
      document.querySelector("#header-container").innerHTML = data;
    });
    
});
