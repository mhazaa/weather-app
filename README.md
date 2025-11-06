# InfoTrack Weather App - Take Home Test Project

https://mhazaa.github.io/weather-app


## Installation

1) install dependencies:
**_npm i_**

2) start project:
**_npm run start_**
<br>This will run a local preview server at **localhost:3000**
<br>Or alternatively, you can just manually open the build file **./build/index.html**


## npm commands

- **_npm run lint_**: Runs eslint on the codebase

- **_npm run dev_**: Development mode, builds project continously inside ./build

- **_npm run build_**: Runs linter then builds project inside ./build

- **_npm run start_**: Builds project then runs it in a localserver on port 3000


## Component Structure

Each component has a Props Interface in the same file, as well a styling object within the component, minus some global styles in the ./styles folder. Future component should follow the same pattern. Here's a list of the components:

#### MAIN COMPONENTS:
- **Logo:** Minimal logo component
- **ActiveLocation:** Topmost part of the app; component that displays city/town/county, state, alongside a button to add current/active city to favorites
- **ForecaseOverview** This is probably the most involved component, contains current temprature data, as well as hourly and weekly forecast. If I had more time or in a later version I might break this into mini components, refactor it a bit more, or add a different form of visualization as well.
- **LocationSelector** Input element that displays a dropdown list of locations, when an item is selected from the dropdown, it becomes the active location and the app displays weather data for said location
- **FavoriteLocations** List of all favorited locations. Potential improvments include adding functionality to remove favorites from the list without having to choose the location first.

#### MISC COMPONENTS:
- **LoadingScreen**
- **Seperator**

#### SVG COMPONENTS:
- **FavoriteIcon**


## Overall Reflections

This was very fun to work on. I hadn't used the National Weather Service (NWS) API before so it was a good learning experience. I got a little sucked in into this so might've spent more time working on it than I was supposed to but I'm happy with the results.

Some things I might do in a later version or with more time is maybe add a layer of map visualization, and tightening up the search functionality a bit. I would potentially also store favorite location in local storage and maybe add functionality to reorder the favorite locations list.