import NetflixSlider from "./movieListSlider.js"

const init = async () => {
  const fetchBackdrops = async () => {
    let data = await fetch("./data/backdrops.json")
    data = await data.json()
    return data
  }
  const backdropImages = await fetchBackdrops()

  const getRandomNFromArray = (n, array) => {
    return array.sort(() => 0.5 - Math.random()).slice(0, n)
  }

  NetflixSlider(".popular", getRandomNFromArray(16, backdropImages))
  NetflixSlider(".mylist", getRandomNFromArray(25, backdropImages))
  NetflixSlider(".repeat", getRandomNFromArray(20, backdropImages))
}

init()
