import { greetingsArray } from '@/config/const';


export const getGreeting = (name:string) => {
    const randomIndex = Math.floor(Math.random() * greetingsArray.length);
    return greetingsArray[randomIndex].replace('{name}', name);
  };