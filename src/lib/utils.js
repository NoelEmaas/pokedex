import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function transformString (string) {
  // Converting a string from kebab-case to Title Case
  return string.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function getTypeColor (type) {
  const typeColor = {
    bug: '#90C12C',
    dark: '#5A5366',
    dragon: '#0A6DC4',
    electric: '#F3D23B',
    fairy: '#EC8FE6',
    fighting: '#CE4069',
    fire: '#FE8830',
    flying: '#8FA8DD',
    ghost: '#5269AC',
    grass: '#63BB5B',
    ground: '#D97746',
    ice: '#74CEC0',
    normal: '#9099A1',
    poison: '#AB6AC8',
    psychic: '#F97176',
    rock: '#C7B78B',
    steel: '#5A8EA1',
    water: '#4D90D5'
  }

  return typeColor[type];
}

export const typeIcons = {
    bug: '/assets/type_icons/bug.png',
    dark: '/assets/type_icons/dark.png',
    dragon: '/assets/type_icons/dragon.png',
    electric: '/assets/type_icons/electric.png',
    fairy: '/assets/type_icons/fairy.png',
    fighting: '/assets/type_icons/fighting.png',
    fire: '/assets/type_icons/fire.png',
    flying: '/assets/type_icons/flying.png',
    ghost: '/assets/type_icons/ghost.png',
    grass: '/assets/type_icons/grass.png',
    ground: '/assets/type_icons/ground.png',
    ice: '/assets/type_icons/ice.png',
    normal: '/assets/type_icons/normal.png',
    poison: '/assets/type_icons/poison.png',
    psychic: '/assets/type_icons/psychic.png',
    rock: '/assets/type_icons/rock.png',
    steel: '/assets/type_icons/steel.png',
    water: '/assets/type_icons/water.png',
    bug_full: '/assets/type_icons/bug_full.png',
    dark_full: '/assets/type_icons/dark_full.png',
    dragon_full: '/assets/type_icons/dragon_full.png',
    electric_full: '/assets/type_icons/electric_full.png',
    fairy_full: '/assets/type_icons/fairy_full.png',
    fighting_full: '/assets/type_icons/fighting_full.png',
    fire_full: '/assets/type_icons/fire_full.png',
    flying_full: '/assets/type_icons/flying_full.png',
    ghost_full: '/assets/type_icons/ghost_full.png',
    grass_full: '/assets/type_icons/grass_full.png',
    ground_full: '/assets/type_icons/ground_full.png',
    ice_full: '/assets/type_icons/ice_full.png',
    normal_full: '/assets/type_icons/normal_full.png',
    poison_full: '/assets/type_icons/poison_full.png',
    psychic_full: '/assets/type_icons/psychic_full.png',
    rock_full: '/assets/type_icons/rock_full.png',
    steel_full: '/assets/type_icons/steel_full.png',
    water_full: '/assets/type_icons/water_full.png'
}

export const sortList = (list, order) => {
    const sortedList = [...list]; 
    if (order === '0') {
        return sortedList.sort((a, b) => a.id - b.id);
    }
    else if (order === '1') {
        return sortedList.sort((a, b) => b.id - a.id);
    }
    else if (order === '2') {
        return sortedList.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (order === '3') {
        return sortedList.sort((a, b) => b.name.localeCompare(a.name));
    }
}