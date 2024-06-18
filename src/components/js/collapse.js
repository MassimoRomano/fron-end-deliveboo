export const collapse = {
    Ordina: ['Consegna più rapida', 'Consigliati', 'Distanza', 'I più votati'],
    Offerte: ['Consegna gratuita', 'Offerte di oggi', 'Tutto il menu', 'Prodotti omaggio'],
    Cucine: ['Italiano', 'Cinese', 'Giapponese', 'Indiano', 'Brasiliano', 'Spagnolo', 'Greco'],
    Piatti: ['Pollo', 'Hamburger', 'Pizza', 'Insalata', 'Carne', 'Pasta']
};

export const dropdownStates = {};

export function initializeDropdownStates() {
    for (let category in collapse) {
        dropdownStates[category] = { isOpen: false, selectedOption: null };
    }
}

export function toggleDropdown(name) {
    const dropdownContent = document.getElementById(`dropdown-${name}`);
    const isOpen = dropdownStates[name].isOpen;

    if (isOpen) {
        dropdownContent.classList.remove('open');
        dropdownStates[name].isOpen = false;
    } else {
        dropdownContent.classList.add('open');
        dropdownStates[name].isOpen = true;
    }
}

export function selectOption(name, index) {
    if (dropdownStates[name].selectedOption === index) {
        dropdownStates[name].selectedOption = null;
    } else {
        dropdownStates[name].selectedOption = index;
    }
}