let admin = false;

let aanestykset = [
    { nimi: "Paras väri", vaihtoehdot: [{ nimi: "Punainen", aania: 0 }, { nimi: "Sininen", aania: 0 }] }
]

document.addEventListener("DOMContentLoaded", () => {
  const selaaBtn = document.getElementById("selaa");
  if (selaaBtn) {
    selaaBtn.addEventListener("click", function() {
      localStorage.setItem("admin", "false");
    });
  }
  const kirjauduBtn = document.getElementById("kirjaudu");
  if (kirjauduBtn) {
    kirjauduBtn.addEventListener("click", function(event) {
      event.preventDefault();
      document.getElementById("etusivu2").style.display = "none";
      document.getElementById("kirjautuminen").style.display = "block";
    });
  }

  const kirjauduForm = document.getElementById("kirjauduForm");
  if (kirjauduForm) {
    kirjauduForm.addEventListener("submit", function(event) {
      event.preventDefault();
      
      const pw = document.getElementById("pw").value;
      if (pw === "admin") {
        localStorage.setItem("admin", "true");
        window.location.href = "äänestykset.html";
      } else {
        alert("Väärä salasana!");
      }
    });
  }


  const aanestykset = document.getElementById("äänestyksetDiv"); 
  if (aanestykset) {
    const onAdmin = localStorage.getItem("admin") === "true";
    if (onAdmin) {
      document.getElementById("hNappi").style.display = "block";
    }
  }
});

const aanestysLaatikko = document.getElementById("aanestysMonitor");


function luoAanestysDiv(aanestys) {
  const div = document.createElement("div");
  div.className = "aanestysDiv";

  const otsikko = document.createElement("h3");
  otsikko.textContent = aanestys.nimi;
  div.appendChild(otsikko);

  aanestys.vaihtoehdot.forEach((v, i) => {
    const nappi = document.createElement("button");
    nappi.className = "vaihtoehtoBtn";
    nappi.textContent = `${v.nimi} (${v.aania})`;
    nappi.addEventListener("click", () => {
      v.aania += 1;
      nappi.textContent = `${v.nimi} (${v.aania})`;
    });
    div.appendChild(nappi);
  });

  aanestysLaatikko.appendChild(div);
}

aanestykset.forEach(aanestys => luoAanestysDiv(aanestys));