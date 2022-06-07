// Boilerplate für einen NetflixSlider im HTML
// {
//   <section class="popular">
//   <header class="container">Beliebt auf Netflix</header>
//   <div class="movielistslider">
//     <button type="button" class="moveleft btnnav"><i class="fas fa-chevron-left"></i></button>
//     <button type="button" class="moveright btnnav"><i class="fas fa-chevron-right"></i></button>
//     <div class="indicators"></div>
//     <div class="movielist"></div>
//   </div>
// </section>
// }
//
// Aufruf aus Javascript
// NetflixSlider(".popular", [{"src": "https://***"}, {"src": "https://***"}, ...])

export default function (classSelector, movieArray) {
  const slider = document.querySelector(classSelector + " .movielist")
  const btnLeft = document.querySelector(classSelector + " .moveleft")
  const btnRight = document.querySelector(classSelector + " .moveright")
  const indicatorWrapper = document.querySelector(classSelector + " .indicators")
  // const indicators = document.querySelectorAll(classSelector + " .indicator")
  let indicators = []
  const popularMovieList = document.querySelector(classSelector + " .movielist")

  let baseSliderWidth = slider.offsetWidth
  let activeIndex = 0 // the current page on the slider

  // Fill the slider with all the movies in the "movies" array
  const populateSlider = (moviearray) => {
    moviearray.forEach((movie) => {
      const newlistitem = document.createElement("div")
      newlistitem.classList.add("movielistitem")

      const img = document.createElement("img")
      img.setAttribute("src", movie.src)
      newlistitem.appendChild(img)

      popularMovieList.appendChild(newlistitem)
    })

    indicators = []
    indicatorWrapper.textContent = ""
    for (let i = 0; i < moviearray.length / 6; i++) {
      const indicator = document.createElement("div")
      indicator.classList.add("indicator", i === 0 && "active")

      indicators.push(indicator)
      indicatorWrapper.appendChild(indicator)
    }
  }

  populateSlider(movieArray)
  populateSlider(movieArray)

  // Update the indicators that show which page we're currently on
  const updateIndicators = (index) => {
    indicators.forEach((indicator) => {
      indicator.classList.remove("active")
    })

    let newActiveIndicator = indicators[index]
    newActiveIndicator.classList.add("active")
  }

  // Scroll Left button
  btnLeft.addEventListener("click", (e) => {
    let movieWidth = document.querySelector(classSelector + " .movielistitem").getBoundingClientRect().width
    let scrollDistance = movieWidth * 6

    slider.scrollBy({
      top: 0,
      left: -scrollDistance,
      behavior: "smooth",
    })

    activeIndex = (activeIndex - 1) % 3
    updateIndicators(activeIndex)
  })

  // Scroll Right button
  btnRight.addEventListener("click", (e) => {
    let movieWidth = document.querySelector(classSelector + " .movielistitem").getBoundingClientRect().width
    let scrollDistance = movieWidth * 6

    // if we're on the last page
    if (activeIndex === indicators.length - 1) {
      // duplicate all the items in the slider (this is how we make 'looping' slider)
      populateSlider(movieArray)
      slider.scrollBy({
        top: 0,
        left: +scrollDistance,
        behavior: "smooth",
      })
      activeIndex = 0
      updateIndicators(activeIndex)
    } else {
      slider.scrollBy({
        top: 0,
        left: +scrollDistance,
        behavior: "smooth",
      })
      activeIndex = (activeIndex + 1) % 3
      updateIndicators(activeIndex)
    }
  })
}
