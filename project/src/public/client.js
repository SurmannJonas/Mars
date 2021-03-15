let store = {
    user: { name: "NASA Enthusiast" },
    //apod: '',
    //curiosity: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    console.log("New State ", newState)
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    let { rovers } = state

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
                ${dropDownMenu(DropDown)}
                ${roverSection(store.rovers.map(x => x))}
            </section>
        </main>
        <footer></footer>
    `
}
root.addEventListener('change', () => {
    getRoverAPI(store, roverForm().value)
})
const DropDown = (option1, option2, option3, buttonId, prompt) => {
    return `
        <select id='${buttonId}'>
        <option disabled selected value> -- ${prompt} -- </option>
        <option>${option1}</option>
        <option>${option2}</option>
        <option>${option3}</option>
        </select>
    `
}
const dropDownMenu = (callback) => {
    const roverMenu = store.rovers.map(x => x)
    return callback(roverMenu[0], roverMenu[1], roverMenu[2], 'dropDownMenu', 'choose a rover')
}

const roverForm = () => {
    //checks first if the dropdown menu is there
    if (document.getElementById('dropDownMenu')) {
      console.log("Test")
      return document.getElementById('dropDownMenu')}
    else return 'root'
}
//console.log(roverForm())

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

// Example of a pure function that renders infomation requested from the backend
const roverSection = (rover) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    console.log(rover);
    //getRoverAPI(store, rover[0])
    if (!rover || rover.date === '' ) {
        console.log(rover);
        getRoverAPI(store, rover)
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
        console.log(rover.image.photos[1])
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
const getRoverAPI = (state, rover) => {
    let { rovers } = state

    fetch(`http://localhost:3000/${rover}`)
        .then(res => res.json())
        .then(curiosity => updateStore(store, { rovers }))
}


// Example API call
//const getImageOfTheDay = (state) => {
    //let { apod } = state

    //fetch(`http://localhost:3000/apod`)
        //.then(res => res.json())
        //.then(apod => updateStore(store, { apod }))
//}
