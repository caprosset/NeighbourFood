# NeighbourFood


<br>


## Description

Shared platform for neighbours who would like to meet your next door person sharing a meal. You can host a dinner for your neighbour or attend one near you.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **homepage** - As a user I want to be able to access the homepage and input my post code to check out the meals events happening near me, I also want to log in and sign up.
- **sign up** - As a user I want to sign up on the web page so that I can have access to the private pages, check the events information, host an event or attend one.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account.
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **create profile** - As user I want to create a profile and add my information.
- **edit user** - As a user I want to be able to edit my profile.
- **delete user** - As a user I want to be able to delete my profile.
- **profile** - As user I want to check my profile page and check my personal information, the events I hosted, the events I attended and the upcoming events. As a host I'm able to accept or reject a guest. 
- **meal events** - As a user I want to see the list of the events, filter by near location and attend them.
- **host event** - As a user I want to be able to create a new event and add information for the event.
- **attend event** - As a user I want to be able to attend an event from the events list.



<br>



## API Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.   Redirects to the `meal-events` view.                      |                                     |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. Redirects to the `meal-events` view.| 
                 |            
| `GET`      | `/profile/:id`            | Private route. Renders `profile` view.             |                                     
|
| `GET`      | `/profile/:id/edit`            | Private route. Renders `edit-profile` form view.             |                                                          |
| `PUT`      | `/profile/:id/edit`            | Private route. Sends edit-profile info to server and updates user in DB. Redirects to the `profile` view.| 
|
| `DELETE`      | `/profile/:id/delete`            | Private route. Deeletes the profile from the server and updates DB. Redirects to the `index` view.| 
|
| `GET`      | `/events`               | Private route. Render the `meal-events` view.                  |                                                          |
| `GET`     | `/events/create`              | Private route. Renders a form to add a new event for the current user.     |                                |
| `POST`     | `/events/create`              | Private route. Adds a new event for the current user.    Redirects to the `meal-events` view. |                                |
|
| `GET`   | `/events/:id` | Private route. Renders the `meal-events-details` view. |
|
| `PUT`   | `/events/:id/edit` | Private route. Edits the existing event from the current user. Redirects to the `meal-events` view.|  
|
| `DELETE`   | `/events/:id/delete` | Private route. Deletes the existing event from the current user. Redirects to the `meal-events` view.|                                                          |
                                                     




## Models

User model

```javascript
{
  name: {type: String, required: true} ,
  email: {type: String, required: true} ,
  password: {type: String, required: true} ,
  address: {
    street: {type: String, required: true} ,
    zipcode: {type: String, required: true} ,
    houseNumber: {type: String, required: true} ,
    city: {type: String, required: true} 
}
  description: {type: String, required: true} ,
  profileImg: {type: String, required: true} ,
  score: {type: Number} ,
  hostedEvents: {  type: mongoose.Schema.Types.ObjectId,
              ref: "MealEvent"},
  attendedEvents: {  type: mongoose.Schema.Types.ObjectId,
              ref: "MealEvent"},
  reviews: {type: Array} ,
  requests: { type: String, enum: ['pending','confirmed','rejected' ],
}
}

```



Event model

```javascript
{
  eventName: {type: String, required: true} ,
  cuisine: {type: String, required: true} ,
  dish: {type: String, required: true} ,
  date: {type: Date, required: true} ,
  eventImg: {type: String} ,
  host: {  type: mongoose.Schema.Types.ObjectId,
              ref: "User"},
  guest: {  type: mongoose.Schema.Types.ObjectId,
              ref: "User"},
  eventDescription:{type: String, required: true} ,
  numberAttend: {type: Number, required: true} ,
  costScore: {type: Number} ,
  adressEvent: {  type: mongoose.Schema.Types.ObjectId,
              ref: "User"},
}

```



<br>



## Backlog
- Add reviews to the users
- Geolocation - Google Maps API
- System of points as an exchange system for the meals
- Inbox Messages - Send/receive messages between users
- Add a event to Favorities
- Authentication with Gmail/ Facebook accounts
- Filter events by distance
- Add a map in the event accepted page
- Instructions page for first signup


<br>



## Links

[See the Trello board.](https://trello.com/invite/b/OBlApTPe/52825291d577d19ce2660b9daef60c74/neighbourfood)

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/barbara-carnieri/NeighbourFood)

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link]