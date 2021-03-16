let store = {
    user: { name: "NASA Enthusiast" },
    curiosity: '',
    spirit: '',
    opportunity: '',
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

// create content
const App = (state) => {

    return `
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h3>Some facts</h3>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                <h3>Choose between the Curiosity, Spirit & Opportunity Mars rover</h3>
                ${roverSection(store.curiosity, 1)}
                ${roverSection(store.spirit, 2)}
                ${roverSection(store.opportunity, 3)}
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Dear ${name}, welcome to the Mars dashboard!</h1>
        `
    }
    return `
        <h1>Hello!</h1>
    `
}

const roverSection = (rover, roverVar) => {
    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()

    //if (!store.curiosity || store.curiosity.image.photos[0].earth_date === '' ) {
    if (roverVar === 1) {
      if (!rover || rover !== store.curiosity) {
          getCuriosity(store)
          rover = store.curiosity
      } else{
        const photodate = new Date(rover.date)
      }
    }
    if (roverVar === 2) {
      if (!rover || rover !== store.spirit) {
          getSpirit(store)
          rover = store.spirit
      } else{
        const photodate = new Date(rover.date)
      }
    }
    if (roverVar === 3) {
      if (!rover || rover !== store.opportunity) {
          getOpportunity(store)
          rover = store.opportunity
      } else{
        const photodate = new Date(rover.date)
      }
    }
    console.log(rover)
    // check if the photo of the day is actually type video!
    if (rover.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${rover.url}">here</a></p>
            <p>${rover.title}</p>
            <p>${rover.explanation}</p>
        `)
    } else {

        return (`
            <img src="${rover.image.photos[0].img_src}" height="350px" width="100%" />
            <p>Rover: ${rover.image.photos[0].rover.name}</p>
            <p>Launch date: ${rover.image.photos[0].rover.launch_date}</p>
            <p>Landing date: ${rover.image.photos[0].rover.landing_date}</p>
            <p>Status: ${rover.image.photos[0].rover.status}</p>
            <p>Date of photo taken: ${rover.image.photos[0].earth_date}</p>
        `)
    }
}





// ------------------------------------------------------  API CALLS
const getCuriosity = async function (state) {
    let { curiosity } = state

    const curiosityResp = await fetch(`http://localhost:3000/curiosity`)
    curiosity = await curiosityResp.json()
    updateStore(store, { curiosity })
    //console.log(curiosity)
}
const getSpirit = async function (state) {
    let { spirit } = state

    const spiritResp = await fetch(`http://localhost:3000/spirit`)
    spirit = await spiritResp.json()
    updateStore(store, { spirit })
}
const getOpportunity = async function (state) {
    let { opportunity } = state

    const opportunityResp = await fetch(`http://localhost:3000/opportunity`)
    opportunity  = await opportunityResp.json()
    updateStore(store, { opportunity  })
}
