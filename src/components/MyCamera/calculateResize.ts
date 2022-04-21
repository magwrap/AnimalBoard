export default (height: number, width: number) => {
  const phoneRatio = height / width;
  const goalRatio = 16 / 9;
  const ratioDiff = parseFloat(Math.abs(phoneRatio - goalRatio).toFixed(2));
  const newWidth = Math.floor(width + width * ratioDiff);

  return {
    height,
    width: newWidth,
  };
};
