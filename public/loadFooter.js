document.addEventListener("DOMContentLoaded", () => {
  

  // Load Footer
  fetch("footer.html")
    .then(response => response.text())
    .then(data => {
      document.querySelector("#footer-container").innerHTML = data;
    });
});