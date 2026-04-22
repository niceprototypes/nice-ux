export const getPicsum = (id: number = Math.floor(Math.random() * 1000)): string =>
  `https://picsum.photos/id/${id}/360/240`
