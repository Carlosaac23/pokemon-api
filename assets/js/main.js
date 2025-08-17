function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

async function getPokemon() {
  try {
    const pokemonNameEl = document.getElementById('pokemonName').value.toLowerCase();
    if (!pokemonNameEl) {
      return showAlerts('Debes proporcionar un nombre de un Pokémon', 'error');
    }

    const POKEMON_API = `https://pokeapi.co/api/v2/pokemon/${pokemonNameEl}`;
    const response = await fetch(POKEMON_API);

    if (!response.ok) {
      return response.text().then(text => {
        console.log(text);
        showAlerts(`${capitalize(pokemonNameEl)} no existe. Intente con otro nombre`, 'error');
      });
    }

    return response.json();
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

async function renderPokemon() {
  const data = await getPokemon();

  if (!data) {
    return showAlerts('No hay data', 'error');
  }

  if (!data.sprites || !data.sprites.front_default) {
    return showAlerts('No se encontró la imagen del Pokémon', 'error');
  }

  const infoContainerEl = document.querySelector('.info');
  const infoContainer = document.getElementById('pokemonInfo');
  infoContainer.innerHTML = '';

  infoContainerEl.style.display = 'flex';
  const pokemonName = data.name;
  const pokemonImg = data.sprites.front_default;
  const types = data.types.map(t => t.type.name).join(', ');
  const abilities = data.abilities.map(a => a.ability.name).join(', ');
  const moves = data.moves
    .slice(0, 5)
    .map(m => m.move.name)
    .join(', ');

  const pokemonNameText = document.createElement('div');
  const pokemonImgEl = document.getElementById('pokemonSprite');
  const idText = document.createElement('p');
  const typeText = document.createElement('p');
  const heightText = document.createElement('p');
  const weightText = document.createElement('p');
  const abilitiesText = document.createElement('p');
  const statsText = document.createElement('ul');
  const movesText = document.createElement('p');

  // Show in the page
  pokemonImgEl.src = pokemonImg;
  pokemonImgEl.style.cssText = 'display: block; width: 250px';

  pokemonNameText.id = 'pokemonNameText';
  pokemonNameText.textContent = `Nombre: ${capitalize(pokemonName)}`;
  idText.textContent = `ID: ${data.id}`;
  typeText.textContent = `Tipo(s): ${types}`;
  heightText.textContent = `Altura: ${data.height / 10} m`;
  weightText.textContent = `Peso: ${data.weight / 10} kg`;
  abilitiesText.textContent = `Habilidades: ${abilities}`;
  statsText.textContent = 'Estadísticas base:';
  data.stats.forEach(stat => {
    const li = document.createElement('li');
    li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    statsText.appendChild(li);
  });
  movesText.textContent = `Movimientos: ${moves}`;

  infoContainer.appendChild(pokemonNameText);
  infoContainer.appendChild(idText);
  infoContainer.appendChild(typeText);
  infoContainer.appendChild(heightText);
  infoContainer.appendChild(weightText);
  infoContainer.appendChild(abilitiesText);
  infoContainer.appendChild(statsText);
  infoContainer.appendChild(movesText);
}

function showAlerts(msg, type) {
  const existAlert = document.querySelector(`.alert-${type}`);
  const alertContainer = document.getElementById('alert-container');

  if (!existAlert) {
    const alertDiv = document.createElement('p');
    alertDiv.classList.add(`alert-${type}`);
    alertDiv.textContent = msg;

    alertContainer.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 2500);
  }
}
