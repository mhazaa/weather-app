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
- **Logo:** Minimal logo component.
- **ActiveLocation:** Topmost part of the app; component that displays city/town/county, state, alongside a button to add current/active city to favorites.
- **ForecastOverview** This is probably the most involved component, contains current temprature data, as well as hourly and weekly forecast. If I had more time or in a later version I might break this into mini components, refactor it a bit more, or add a different form of visualization as well.
- **LocationSelector** Input element that displays a dropdown list of locations, when an item is selected from the dropdown, it becomes the active location and the app displays weather data for said location.
- **FavoriteLocations** List of all favorited locations. Potential improvments include adding functionality to remove favorites from the list without having to activate the location first.

#### MISC COMPONENTS:
- **LoadingScreen**
- **Seperator**

#### SVG COMPONENTS:
- **FavoriteIcon**


## Overall Reflections

This was very fun to work on. I hadn't used the National Weather Service (NWS) API before so it was a good learning experience. I got a little sucked in into this so might've spent more time working on it than I was supposed to but I'm happy with the results.

Some things I might do in a later version or with more time is maybe add a layer of map visualization, and tightening up the search functionality a bit. I would potentially also store favorite location in local storage and maybe add functionality to reorder the favorite locations list.

## Notes on API Usage

- One thing about National Weather Service API is that it uses weather forecast grid cells, which are part of the NWS’s internal forecast zone system. With each forecast grid being assigned to the nearest NWS office’s coverage area which sometimes crosses city boundaries. Therefore using location coordinates, as I'm doing in this app can trigger a certain quirk of the API where in certain areas of Manhattan current location may display as Hoboken, New Jersey. One way around is potentially using a true reverse-geocoding API for city/state.

- Aside from the National Weather Service API, I used Nominatim API for the LocationSelector component to search for places within the US, retrieve their coordinates, and pass it to the NWS API for forecast data. It's the best free one I found but the predictaive results can be haphazard. For example, passing the string 'Phila' as an input, the API would return 10 results of buildings, offices, and other miscellaneous addresses that contain the string 'Phila' somewhere in their meta data but not Philadelphia, Pennsylvania. I used some array filtering to clean up those results, but the input value largely has to be as close as possible to the actual city/town/county name before it shows up in the dropdown menu. There are likely other location APIs with more intuitive search patterns but most of the other ones I found are paid.