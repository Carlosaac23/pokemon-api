function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

async function main() {
  try {
    const pokemonNameEl = document.getElementById('pokemonName').value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNameEl}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`No se encontró el Pokémon "${capitalize(pokemonNameEl)}". Verifica el nombre e inténtalo de nuevo.`);
      } else {
        throw new Error(`Error del servidor (${response.status}). Intenta más tarde.`);
      }
    }

    const data = await response.json();
    console.log(data);

    if (!data.sprites || !data.sprites.front_default) {
      throw new Error('No se encontró la imagen del Pokémon');
    }

    const pokemonName = data.name;
    const pokemonImg = data.sprites.front_default;

    const pokemonNameText = document.createElement('div');
    const pokemonImgEl = document.getElementById('pokemonSprite');
    const idText = document.createElement('p');

    const oldNameDiv = document.getElementById('pokemonNameText');
    if (oldNameDiv) {
      oldNameDiv.remove();
    }

    // Show in the page
    pokemonImgEl.src = pokemonImg;
    pokemonImgEl.style.cssText = 'display: block; width: 150px';

    pokemonNameText.id = 'pokemonNameText';
    pokemonNameText.textContent = `Nombre: ${capitalize(pokemonName)}`;
    document.body.appendChild(pokemonNameText);
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}
