let store = Immutable.Map({
    user: Immutable.Map({ name: "NASA Enthusiast" }),
    curiosity: '',
    spirit: '',
    opportunity: '',
})
// ------------------------------------------------------  COMPONENTS
// add our markup to the page
const root = document.getElementById('root')

// ------------------------------------------------------  EVENT LISTENERS
// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
    getRoverAPI(store)
    getSpirit(store)
    getOpportunity(store)
})
root.addEventListener('change', () => {
  const result = triggerRover()
}, false)

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
            ${Greeting(store.get('user').get('name'))}
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
                <h3>Choose between the Curiosity, Spirit & Opportunity Mars rover to see genuine Mars pictures</h3>
                <p>${roverChoice(DropDownMenu)}  </p>
                <p id='roverPath'></p>
            </section>
        </main>
        <footer></footer>
    `
}
// the DropDown function allows us to create a custom dropdown menu
const DropDownMenu = (option1, option2, option3, btnID, prompt) => {
    return `
        <select id='${btnID}'>
        <option disabled selected value> -- ${prompt} -- </option>
        <option>${option1}</option>
        <option>${option2}</option>
        <option>${option3}</option>
        </select>
    `
}
//higher order function
const roverChoice = (callback) => {
    return callback('curiosity', 'spirit', 'opportunity', 'roverChoice', 'choose a rover')
}

const getRoverChoice = () => {
    if (document.getElementById('roverChoice')) {
      const menuElement = document.getElementById('roverChoice')
      return menuElement
    }
    else {
      return 'root'
    }
}

const roverDisplay = (variable) => {
    if(variable.value === 'curiosity'){
      return roverSection(store.curiosity, 1, variable.value)
    } else if (variable.value === 'spirit') {
      return roverSection(store.spirit, 2, variable.value)
    } else if (variable.value === 'opportunity') {
      return roverSection(store.opportunity, 3, variable.value)
    } else {
      const placeholder = 'Choose a Mars rover'
      return placeholder
    }
}

const triggerRover = () => {
    const roverData = roverDisplay(getRoverChoice())
    const roverHTML = document.getElementById('roverPath')
    roverHTML.innerHTML = roverData
}

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

const roverSection = (rover, roverVar, whichRover) => {
    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    if (roverVar === 1) {
      if (!rover || rover !== store.curiosity) {
          getRoverAPI(store)
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

    const finalRover = roverImages(rover)
    return (
          finalRover+
          `
            <p>Rover: ${rover.image.latest_photos[0].rover.name}</p>
            <p>Launch date: ${rover.image.latest_photos[0].rover.launch_date}</p>
            <p>Landing date: ${rover.image.latest_photos[0].rover.landing_date}</p>
            <p>Status: ${rover.image.latest_photos[0].rover.status}</p>
            <p>Date of photo taken: ${rover.image.latest_photos[0].earth_date}</p>
        `)

}

const roverImages = (roverData) => {

            const filterRover = roverData.image.latest_photos.filter((curRover, i, roverAry) => {
                if (i > 0) return curRover.camera.full_name != roverAry[i - 1].camera.full_name
                else return curRover = curRover
            })
            const mapRover = filterRover.map((thisRover) => {
                return (`
                     <p><img src='${thisRover.img_src}' /></p>
                     <figcaption>Taken with the ${thisRover.camera.full_name}</figcaption>
                `)

            })
            return mapRover
}

// ------------------------------------------------------  API CALLS
const getRoverAPI = async function (state) {
    let { curiosity } = state

    const curiosityResp = await fetch(`http://localhost:3000/curiosity`)
    curiosity = await curiosityResp.json()
    updateStore(store, { curiosity })
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
    updateStore(store, { opportunity })
}
