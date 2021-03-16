let store = {
    user: { name: "NASA Enthusiast" },
    apod: '',
    curiosity: '',
    spirit: '',
    opportunity: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
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
    let { rovers, apod, curiosity } = state

    return `
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                ${roverSection1(store.curiosity)}
              
            </section>
        </main>
        <footer></footer>
    `
}
//${ImageOfTheDay(apod)}
// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }
    return `
        <h1>Hello!</h1>
    `
}

const roverSection1 = (rover) => {
    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()

    //if (!store.curiosity || store.curiosity.image.photos[0].earth_date === '' ) {

    if (!rover) {
        getCuriosity(store)
        rover = store.curiosity
        console.log(rover)
    } else{
      const photodate = new Date(rover.date)
    }

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

    const spiritResp = await fetch(`http://localhost:3000/curiosity`)
    spirit = await spiritResp.json()
    updateStore(store, { spirit })
      console.log(spirit)
}
const getOpportunity = async function (state) {
    let { opportunity } = state

    const opportunityResp = await fetch(`http://localhost:3000/curiosity`)
    opportunity  = await opportunityResp.json()
    updateStore(store, { opportunity  })
      console.log(opportunity)
}
