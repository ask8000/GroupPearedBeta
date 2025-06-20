
  fetch("header.html")
    .then(response => response.text())
    .then(data => {
      document.querySelector("#header-container").innerHTML = data;
    });
    

