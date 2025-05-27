# Wild Campers

[Visit Site](https://wild-campers-frontend.onrender.com)

Wild Campers is a site to allow nature enthusiasts to share their favourite wild camping locations. It can be hard to find places in the wild to camp where you are not breaking any rules or tresspassing. Wild Campers is here to provide that service for you.


## Repo
The repo can be found here: [Github](https://github.com/shanedunne/wild_campers_svelte)

## Features

- **Location Summaries**: Summaries for each location including images, amenities, maps, weather
- **Maps**: Maps containing all locations and loction specific maps
- **Login System**: The ability to create an account, login and logout
- **Admin Dashboard**: The admin account can create and delete categories, review metrics.

## Pages
### Index / Home
Home page prompting the user to either sign up or log in via the buttons in the nav bar

### Signup
- This page requests the users first name, last name, email address and desired password. 
- When the user provides this information and presses sign up, their data will be added to the users database along with a user ID. 
- A cookie is created to record their signed in status based on the users ID
- All passwords are salted and hashed for security
- Users are then directed to the dashboard

### login
- If already a member, users provide their email and password and press log in
- Users are then directed to the dashboard

### Dashboard
- The dashboard is where the user can access and add wild camping locations
- The user can add a camping spots by providing the location name, coordinates and a brief description. When adding a location, the user can upload multiple images, select amenities from a provided list.

### Location View
- The location view contains all information related to a camping spot.


### Admin Dashboard
- An admin can manage categories users can choose when adding locaitons and observe metrics as locations are added


## Use Cases
- Add your favourite wild camping spots and keep them all in one place

- Discover new camping locations and read reviews provided by others





## Technologies used

- Typescript
- Sveltekit
- Axios
- Hapi
- MongoDB
- Mongoose
- Chart JS
- Leaflet
- Open Weather Map API

