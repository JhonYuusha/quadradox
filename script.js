// Seleciona os elementos do HTML
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
 
let searchPokemon = 1;
 
// Função para buscar dados do Pokémon na API
const fetchPokemon = async (pokemon) => {
    try {
const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        
        if (!APIResponse.ok) {
            throw new Error("Pokémon não encontrado!");
        }
 
        const data = await APIResponse.json();
        return data;
    } catch (error) {
        return null;
    }
};
 
// Função para renderizar o Pokémon na tela
const renderPokemon = async (pokemon) => {
    // Exibe "Loading..." enquanto busca os dados
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
 
    const data = await fetchPokemon(pokemon);
 
    if (data) {
pokemonImage.style.display = 'block';
pokemonName.innerHTML = data.name;
pokemonNumber.innerHTML = data.id;
 
        // Define a imagem animada da 5ª geração
        pokemonImage.src = data.sprites.versions['generation-v']['black-white']['animated']['front_default'];
 
        input.value = '';
searchPokemon = data.id;
    } else {
        // Caso não encontre o Pokémon
pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
};
 
// Evento para busca manual no input
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});
 
// Evento do botão "Prev"
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});
 
// Evento do botão "Next"
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});
 
// Renderiza o primeiro Pokémon ao carregar a página
renderPokemon(searchPokemon);