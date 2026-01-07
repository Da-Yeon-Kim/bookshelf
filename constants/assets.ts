export const IMGS = {
  1: ["1-1.png"],
  2: ["2-1.png"],
  3: ["3-1.png"],
  4: ["4-1.png"],
  5: ["5-1.png"],
  6: ["6-1.png"],
  7: ["7-1.png"],
};

export const getRandomImg = (width: number) => {
  const list = IMGS[width as keyof typeof IMGS] || IMGS[1];
  const fileName = list[Math.floor(Math.random() * list.length)];
  return `/assets/type${width}/${fileName}`;
};
