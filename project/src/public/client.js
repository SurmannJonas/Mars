let store = {
    user: { name: "Student" },
    apod: '',
    curiosity: '',
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
    //console.log(apod)
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
                ${roverSection(apod)}

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

const roverSection = (rover) => {
    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    //console.log(rover)
    //console.log(store.curiosity)
    //if (!store.curiosity || store.curiosity.date === '' ) {
    //getCuriosity(store)
    if (!store.curiosity) {
        //console.log(rover)
        console.log(store.curiosity)
        //console.log(curiosity.image)
        getCuriosity(store)
    } else{
      const photodate = new Date(store.curiosity.date)
    }

    // check if the photo of the day is actually type video!
    if (store.curiosity.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${store.curiosity.url}">here</a></p>
            <p>${store.curiosity.title}</p>
            <p>${store.curiosity.explanation}</p>
        `)
    } else {
        //console.log(rover.image.photos[1])
        return (`
            <img src="${store.curiosity.image.photos[0].img_src}" height="350px" width="100%" />
            <p>Rover: ${store.curiosity.image.photos[0].rover.name}</p>
            <p>Launch date: ${store.curiosity.image.photos[0].rover.launch_date}</p>
            <p>Landing date: ${store.curiosity.image.photos[0].rover.landing_date}</p>
            <p>Status: ${store.curiosity.image.photos[0].rover.status}</p>
            <p>Date of photo taken: ${store.curiosity.image.photos[0].earth_date}</p>
        `)
    }
}

const roverSection2 = (rover) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    //console.log(store);
    //getRoverAPI(store, rover[0])
    if (!rover || rover.date === '' ) {
        //console.log(rover)
        getSpirit(store)
    } else{
      const photodate = new Date(rover.date)
      //console.log(store, curiosity);
      //console.log(photodate.getDate(), today.getDate());
      //console.log(photodate.getDate() === today.getDate());
    }

    // check if the photo of the day is actually type video!
    if (rover.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${rover.url}">here</a></p>
            <p>${rover.title}</p>
            <p>${rover.explanation}</p>
        `)
    } else {
        //console.log(rover.image.photos[1])
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
    //console.log(curiosity)
    const curiosityResp = await fetch(`http://localhost:3000/curiosity`)
    curiosity = await curiosityResp.json()
    //console.log(curiosity)
    updateStore(store, { curiosity })
        //.then(res => res.json())
        //.then(apod => updateStore(store, { apod }))
}
const getSpirit = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/spirit`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))


}
const getOpportunity = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/opportunity`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
}
