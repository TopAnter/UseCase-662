let admin = false;

let aanestykset = [
    
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
  otsikko.style.display = "inline";
  div.appendChild(otsikko);


  const poista = document.createElement("button");
  poista.textContent = "Poista";
  poista.className = "poistaNappi";

  const onAdmin = localStorage.getItem("admin") === "true";
  poista.style.display = onAdmin ? "inline" : "none";

  // event listener kaikilel napeille
  poista.addEventListener("click", function(event) {
    event.preventDefault();

    const otsikko = div.querySelector("h3").textContent;
    aanestykset = aanestykset.filter(a => a.nimi !== otsikko);

    div.remove();
    if(aanestykset.length === 0){
      const eiAanestyksia = document.createElement("h3");
      eiAanestyksia.textContent = "ei vielä äänestyksiä";
      eiAanestyksia.style.color = "white";
      eiAanestyksia.id = "eiAanestyksia";
      document.getElementById("aanestysMonitor").appendChild(eiAanestyksia);
    }
  });

  div.appendChild(poista);

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

if(aanestykset.length > 0){
  aanestykset.forEach(aanestys => luoAanestysDiv(aanestys));
}else{
  const eiAanestyksia = document.createElement("h3");
  eiAanestyksia.textContent = "ei vielä äänestyksiä";
  eiAanestyksia.style.color = "white";
  eiAanestyksia.id = "eiAanestyksia";
  document.getElementById("aanestysMonitor").appendChild(eiAanestyksia);
}
const hallitseNappi = document.getElementById("hNappi");

if (hallitseNappi) {
    hallitseNappi.addEventListener("click", function(event) {
      event.preventDefault();
      document.getElementById("aanestysMonitor").style.display = "none";
      document.getElementById("hDiv").style.display = "block";
    });
  }

  //äänestyksen lisäys funktio
  const äänestysForm = document.getElementById("lisaaForm");
  if (äänestysForm) {
    äänestysForm.addEventListener("submit", function(event) {
      event.preventDefault();
      // haetaan tiedot
      const nimi = document.getElementById("nimi").value;
      const vaihtoehtoKentat = document.querySelectorAll("input[name='vaihtoehto']");
  
      // luodaan vaihtoehdot (vain täytetyt)
      const vaihtoehdot = Array.from(vaihtoehtoKentat)
        .filter(input => input.value.trim() !== "")
        .map(input => ({ nimi: input.value, aania: 0 }));

      // luodaan uusi äänestys-objekti
      const uusiAanestys = {
        nimi: nimi,
        vaihtoehdot: vaihtoehdot
      };

      // lisätään taulukkoon
      aanestykset.push(uusiAanestys);

      const vanhaViesti = document.getElementById("eiAanestyksia");
      if (vanhaViesti) {
        vanhaViesti.remove();
      }

      // luo uusi div
      luoAanestysDiv(uusiAanestys);

      // nollataan lomake
      äänestysForm.reset();


      document.getElementById("aanestysMonitor").style.display = "block";
      document.getElementById("hDiv").style.display = "none";
      
      });
  }

