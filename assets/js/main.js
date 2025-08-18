async function getPokemon() {
  try {
    const pokemonNameEl = document.getElementById('pokemonName').value.toLowerCase().trim();
    const POKEMON_API = `https://pokeapi.co/api/v2/pokemon/${pokemonNameEl}`;
    const response = await fetch(POKEMON_API);

    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(text);
      });
    }

    return response.json();
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

async function renderPokemon() {
  const pokemonNameEl = document.getElementById('pokemonName').value.toLowerCase().trim();
  const infoContainerEl = document.getElementById('info');
  const infoContainer = document.getElementById('pokemonInfo');
  const statsContainer = document.getElementById('pokemonStats');
  const pokemonImgEl = document.getElementById('pokemonSprite');
  const alertContainer = document.getElementById('alert-container');

  alertContainer.innerHTML = '';

  if (!pokemonNameEl) {
    return showAlerts('Debes proporcionar un nombre de un Pokémon', 'error');
  }

  try {
    const button = document.getElementById('btn');
    const originalText = button.textContent;
    button.innerHTML = 'Buscando... <span class="loading"></span>';
    button.disabled = true;

    const data = await getPokemon();

    const {
      sprites: { front_default },
      name,
      id,
      base_experience,
      height,
      weight,
    } = data;

    infoContainerEl.style.display = 'flex';

    const types = data.types
      .map(type => {
        return `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`;
      })
      .join('');

    const stats = data.stats
      .map(stat => {
        return `<p><strong>${stat.stat.name}:</strong> ${stat.base_stat}</p>`;
      })
      .join('');

    // Show in the page
    pokemonImgEl.src = front_default;
    pokemonImgEl.alt = `Imagen de ${name}`;
    pokemonImgEl.style.cssText = 'display: block; width: 250px; height: auto';

    infoContainer.innerHTML = `
    <h3>${name}</h3>
    <div class="pokemon-types">${types}</div> 
`;

    statsContainer.innerHTML = `
    <p><strong>ID:</strong> ${id}</p>
    <p><strong>Base Experience:</strong> ${base_experience} XP</p>
    <p><strong>Height:</strong> ${height / 10} m</p>
    <p><strong>Weight:</strong> ${weight / 10} kg</p>
    ${stats}
`;

    button.textContent = originalText;
    button.disabled = false;
  } catch (error) {
    showAlerts(`${pokemonNameEl} no existe. Verifica el nombre e inténtalo de nuevo.`, 'error');
    infoContainerEl.style.display = 'none';
    const button = document.getElementById('btn');
    button.textContent = 'Buscar Pokemon';
    button.disabled = false;
  }
}

function showAlerts(msg, type) {
  const existAlert = document.querySelector(`.alert-${type}`);
  const alertContainer = document.getElementById('alert-container');

  alertContainer.style.display = 'initial';

  if (!existAlert) {
    const alertDiv = document.createElement('p');
    alertDiv.classList.add(`alert-${type}`);
    alertDiv.textContent = msg;

    alertContainer.appendChild(alertDiv);
    setTimeout(() => {
      alertDiv.classList.add('hide');

      alertDiv.addEventListener('animationend', () => {
        alertDiv.remove();
        alertContainer.style.display = 'none';
      });
    }, 2500);
  }
}

window.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    renderPokemon();
  }
});
