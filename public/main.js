
const valider = document.getElementById('valider');
const update = document.getElementById('update');
const avengers = document.getElementById('avengers');
const batman = document.getElementById('batman');
const harry = document.getElementById('harry');
const prenom = document.getElementById('prenom');
const nom= document.getElementById('nom');
const fichiersJson = [];

let selectAnvegers = null;
let selectBatman = null;
let selectHarry = null;
let choixDeTrie;
let concatenerJson = [];

  avengers.addEventListener('click', () => {
    selectAnvegers = (avengers.checked ) ? 'avengers.json' : null;
  });
  batman.addEventListener('click', () => {
    selectBatman = (batman.checked ) ? 'batman.json' : null;
  });
  harry.addEventListener('click', () => {
    selectHarry = (harry.checked ) ? 'harry_potter.json' : null;
  });
  prenom.addEventListener('click', () => {
    choixDeTrie = (prenom.checked) ? 'firstName' : null;
  });
  nom.addEventListener('click', () => {
    choixDeTrie = (nom.checked) ? 'lastName' : null;
  });
  update.addEventListener('click', () => {
    valider.disabled = false;
    location.reload();

  });


  /* Concatener les fichiers Json  */
function listeConcatener(concatener){
  let temporaire = [];
  if(concatenerJson === null){
    concatenerJson = concatener;
  } else {
    temporaire = concatenerJson.concat(concatener);
    concatenerJson = temporaire;
  }
}



/* Trier la liste selon le nom et prénom */
function listetrier(){
  if(choixDeTrie === 'firstName' && choixDeTrie !== null){
    concatenerJson.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }
  if(choixDeTrie === 'lastName' && choixDeTrie !== null){
    concatenerJson.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }
}

  /*  Code exemple video Promise */
  function fetchAndDecode(url, type) {
      return fetch(url).then(response => {
        if(!response.ok){
            throw new Error(`HTTP error! statuc: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .catch ( error => {
        console.log(`There has been a problem with your fetch` + error.message);
      });
  }


  /* Action sur boutton  */
  valider.addEventListener('click', () => {
      valider.disabled = true;

      let avengers =  (selectAnvegers !== null) ? fetchAndDecode(selectAnvegers, 'json') : null;
      let batman = (selectBatman !== null) ? fetchAndDecode(selectBatman, 'json') : null;
      let harry  = (selectHarry !== null) ? fetchAndDecode(selectHarry, 'json') : null;

      Promise.all([avengers,batman,harry])
      .then( values  => {
          let avengers = values[0];
          let batman = values[1];
          let harry = values[2];

          /* On concaten */
          if(avengers !== null) { listeConcatener(avengers); }
          if(batman !== null) { listeConcatener(batman); }
          if(harry !== null) { listeConcatener(harry); }

          /* On trie */
          listetrier();

          /* On affiche  */
          for(let i = 0; i < concatenerJson.length; ++i){
            let table = document.createElement('li');
            table.textContent = concatenerJson[i].firstName + " "  + concatenerJson[i].lastName;
            document.body.appendChild(table);
          }
      })
  });

















