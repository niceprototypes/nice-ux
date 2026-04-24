export const getPicsum = (
  width: number,
  height: number = width,
  id: number = Math.floor(Math.random() * 1000)
): string => `https://picsum.photos/id/${id}/${width}/${height}`
