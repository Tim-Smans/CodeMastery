import { Difficulty } from '@prisma/client';
import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}


export const getAvatarColor = () => {
  const colorKeys = Object.keys(AvatarColors).filter(key => isNaN(Number(key))); 

  const randomNumber = getRandomInt(colorKeys.length);
  const randomKey = colorKeys[randomNumber];
  return AvatarColors[randomKey as keyof typeof AvatarColors];
}

enum AvatarColors{
  PEACH = "#FFE5D5",
  BLUE = "#D5E8FF",
  GREEN = "#D5FFD5",
  YELLOW = "#FFF5D5",
  LAVENDER = "#EBD5FF",
  PINK = "#FFD5E5",
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

export const getDifficultyColor = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'EASY':
      return 'text-green-800'
    case 'MEDIUM':
      return 'text-yellow-800'
    case 'HARD':
      return 'text-red-800'
    default:
      return 'text-green-800'
  }
}

export const generateArtificialTimeout = (): Promise<void> => {
  const timeout = 2000
  return new Promise(r => setTimeout(r, timeout))
}