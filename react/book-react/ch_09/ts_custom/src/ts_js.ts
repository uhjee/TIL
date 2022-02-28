import { getValue } from './legacy';

export default function ({ name, age }: { name: string; age: number }) {
  const value = getValue();
  console.log(value.substr(0, 10));
}
