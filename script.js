const getRandomNFromArray = (n, array) => {
  return array.sort(() => 0.5 - Math.random()).slice(0, n)
}
