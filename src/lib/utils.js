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
    bug: '#729F3F',
    dark: '#2A2A2A',
    dragon: '#53A4CF',
    electric: '#FFFA07',
    fairy: '#FDB9E9',
    fighting: '#D56723',
    fire: '#FD7D24',
    flying: '#3DC7EF',
    ghost: '#7B62A3',
    grass: '#9BCC50',
    ground: '#F7DE3F',
    ice: '#51C4E7',
    normal: '#A4ACAF',
    poison: '#B97FC9',
    psychic: '#F366B9',
    rock: '#A38C21',
    steel: '#9EB7B8',
    water: '#4592C4'
  }

  return typeColor[type];
}