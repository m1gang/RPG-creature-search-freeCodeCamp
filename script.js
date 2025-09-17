const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const creatureWeight = document.getElementById('weight');
const creatureHeight = document.getElementById('height');
const creatureTypes = document.getElementById('types');
const creatureHp = document.getElementById('hp');
const creatureAttack = document.getElementById('attack');
const creatureDefense = document.getElementById('defense');
const spAttack = document.getElementById('special-attack');
const spDefense = document.getElementById('special-defense');
const creatureSpeed = document.getElementById('speed');
const form = document.getElementById('search-form');
const table = document.querySelector('table');
const title = document.querySelector('h1');


const colorsType = {
    normal: 'linear-gradient(to right, rgb(199, 210, 254), rgb(254, 202, 202), rgb(254, 249, 195))',
    fire: 'linear-gradient(to right, rgb(251, 113, 133), rgb(253, 186, 116))',
    water: 'linear-gradient(to right, rgb(56, 189, 248), rgb(59, 130, 246))',
    electric: 'conic-gradient(at center top, rgb(14, 165, 233), rgb(254, 215, 170), rgb(202, 138, 4))',
    grass: 'conic-gradient(at center top, rgb(254, 240, 138), rgb(167, 243, 208), rgb(254, 240, 138))',
    ice: 'linear-gradient(to right, rgb(255, 228, 230), rgb(204, 251, 241))',
    fighting: 'linear-gradient(to right, rgb(239, 68, 68), rgb(153, 27, 27))',
    poison: 'linear-gradient(to right, rgb(196, 181, 253), rgb(167, 139, 250))',
    ground: 'linear-gradient(to right, rgb(254, 249, 195), rgb(253, 224, 71), rgb(234, 179, 8))',
    flying: 'linear-gradient(to left bottom, rgb(49, 46, 129), rgb(129, 140, 248), rgb(49, 46, 129))',
    psychic: 'linear-gradient(to right top, rgb(139, 92, 246), rgb(253, 186, 116))',
    bug: 'linear-gradient(to right, rgb(254, 240, 138), rgb(187, 247, 208), rgb(34, 197, 94))',
    rock: 'linear-gradient(to right, rgb(100, 116, 139), rgb(254, 249, 195))',
    ghost: 'linear-gradient(rgba(101, 113, 139, 1), rgb(88, 28, 135), rgb(124, 58, 237))',
    dragon: 'conic-gradient(at left bottom, rgb(240, 171, 252), rgb(74, 222, 128), rgb(190, 18, 60))',
    dark: 'linear-gradient(to right, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))',
    steel: 'conic-gradient(at right center, rgb(199, 210, 254), rgb(71, 85, 105), rgb(199, 210, 254))',
    fairy: 'conic-gradient(at left center, rgb(234, 179, 8), rgb(168, 85, 247), rgb(59, 130, 246))'
}

const changeColorType = () => {
    const types = document.querySelectorAll('.type');
    types.forEach(type => {
        const name = type.textContent.toLowerCase();
        if (colorsType[name]) {
            type.style.background = colorsType[name];
            type.style.color = (name === 'dark') ? 'white' : 'black';
            table.style.background = colorsType[name];
            table.style.color = (name === 'dark') ? 'white' : 'black';
            title.style.background = colorsType[name];
            title.style.color = "transparent";
            title.style.backgroundClip = 'text';
        }
    })
}

changeColorType();

const fetchMoreData = async (idOrName) => {
    try{
        const url = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${idOrName}`
        const res = await fetch(url);
        
    
        const data = await res.json();
        const { name, id, weight, height, types, stats } = data;
    
    
        return {
            name,
            id,
            weight: `${weight} kg`,
            height: `${height} cm`,
            types: types.map(type => `<p class="type ${type.name}">${type.name}</p>`).join(''),
            hp: stats[0].base_stat,
            attack: stats[1].base_stat,
            defense: stats[2].base_stat,
            specialAttack: stats[3].base_stat,
            specialDefense: stats[4].base_stat,
            speed: stats[5].base_stat,
        }

    }
    catch(error){
        alert('Creature not found');
        searchInput.value = '';
        console.log(error);
    }

}



const displayCreature = async (idOrName) => {
    const { name, id, weight, height, types, hp, attack, defense, specialAttack, specialDefense, speed } = await fetchMoreData(idOrName);

    creatureName.textContent = name;
    creatureId.textContent = `# ${id}`;
    creatureWeight.textContent = `Peso: ${weight}`;
    creatureHeight.textContent = `Altura: ${height}`;
    creatureTypes.innerHTML = `${types}`;
    changeColorType();
    creatureHp.textContent = `${hp}`;
    creatureAttack.textContent = `${attack}`;
    creatureDefense.textContent = `${defense}`;
    spAttack.textContent = `${specialAttack}`;
    spDefense.textContent = `${specialDefense}`;
    creatureSpeed.textContent = `${speed}`;
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const value = searchInput.value.trim().toLowerCase();
    if (!value) return;
    await displayCreature(value);
    searchInput.value = '';
})