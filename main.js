let admin = false;

document.addEventListener("DOMContentLoaded", () => {
  // nappi etusivulla (avaa kirjautumisen)
  const kirjauduBtn = document.getElementById("kirjaudu");
  if (kirjauduBtn) {
    kirjauduBtn.addEventListener("click", function(event) {
      event.preventDefault();
      document.getElementById("etusivu2").style.display = "none";
      document.getElementById("kirjautuminen").style.display = "block";
    });
  }

  // kirjautumislomake
  const kirjauduForm = document.getElementById("kirjauduForm");
  if (kirjauduForm) {
    kirjauduForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const pw = document.getElementById("pw").value;
      if (pw === "admin") {
        admin = true;
        window.location.href = "äänestykset.html";
      } else {
        alert("Väärä salasana!");
      }
    });
  }

  // jos haluat jotain logiikkaa äänestykset.html-sivulle
  const aanestykset = document.getElementById("äänestyksetDiv"); 
  if (aanestykset) {
    console.log("Olet äänestyssivulla!");
    if (admin) {
      // esim. näytä admin-painikkeet
    }
  }
});