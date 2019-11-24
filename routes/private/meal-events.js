const express = require('express');
const router = express.Router();

const MealEvent = require('../../models/MealEvent');
const User = require('../../models/User');


// GET /meal-events --> renders all the events
router.get('/', (req, res, next) => {

  MealEvent.find()
  .then( (allMealEventsFromDB) => {
      // console.log(allMealEventsFromDB)
      res.render('meal-views/show-all', { allMealEventsFromDB, userInfo: req.session.currentUser});
  })
  .catch( (err) => console.log(err));
});


//  GET /meal-events/create	--> Renders the form view to add a new event
router.get('/create', (req, res, next) => {
  res.render('meal-views/create')
  });

// POST	/meal-events/create	--> Adds a new event in the DB 
router.post('/create', (req, res, next) => {
  const theMealEvent = new MealEvent({
  eventName: req.body.eventName,
  cuisine: req.body.cuisine ,
  dish: req.body.dish ,
  date: req.body.date ,
  eventImg: req.body.eventImg ,
  host: req.session.currentUser._id,
  guest: [],
  eventDescription:req.body.eventDescription ,
  numberAttend: req.body.numberAttend,
  costScore: 10
  });

  // console.log('THE MEAL EVENT I ADDED', theMealEvent);

  theMealEvent.save()
  .then( mealevent => {
    // console.log('MEAL EVENT', mealevent);
    // console.log('SAVE HOSTED EVENT IN USER')
    // console.log('MEAL EVENT ID', mealevent._id);
    // console.log('USER ID', req.session.currentUser._id);

    User.updateOne({ _id: req.session.currentUser._id }, { $addToSet: { hostedEvents: mealevent._id} }, {new: true})
    // User.find({ email: 'capcap@cap'})
    // .then( (data) => console.log('USER FOUND', data))
    // .catch( (err) => console.log(err))
  })
  .then( () => { 
    res.redirect('/meal-events'); 
  })
  .catch( (err) => {
    console.log(err);
    res.render('meal-views/create');
  });
  
});


// GET	/meal-events/:id --> Renders the meal event details page
router.get('/:id', (req, res, next) => {
  MealEvent.findOne({ _id: req.params.id })
  .then( (theMealEvent) => {
    console.log('USER IDDDDDDDDD', req.session.currentUser._id);
    console.log('EVENT HOSSSSTTT', theMealEvent.host);

    const currentUserId = req.session.currentUser._id;

    res.render('meal-views/show', {mealEvent: theMealEvent, currentUserId});
  })
  .catch( (err) => console.log(err));
});


// GET /meal-events/:id/edit --> Renders the form to edit a specific meal event
router.get('/:id/edit', (req, res, next) => {
  MealEvent.findOne({ _id: req.params.id }, (err, theMealEvent) => {
    if (err) {
      return next(err);
    }

    res.render('meal-views/edit', {
      mealEvent: theMealEvent,
    });
  });
});

// PUT	/meal-events/:id/edit --> Updates the meal event in the DB
router.post('/:id', function(req, res, next) {
  const updatedEvent = {
    eventName: req.body.eventName,
    cuisine: req.body.cuisine ,
    dish: req.body.dish ,
    date: req.body.date ,
    eventImg: req.body.eventImg ,
    eventDescription:req.body.eventDescription ,
    numberAttend: req.body.numberAttend,
  };
  MealEvent.update(
    { _id: req.params.id },
    updatedEvent,
    (err, theMealEvent) => {
      if (err) {
        return next(err);
      }

      res.redirect('/meal-events');
    },
  );
});


// POST /meal-events/:id/attend --> Adds the current user as a meal event guest in the DB
router.post('/:id/attend', function(req, res, next) {
  const id = req.params.id;
  const updatedEvent = { guest: req.session.currentUser._id };

  const pr1 = MealEvent.update(
    { _id: req.params.id },
    updatedEvent,
    (err) => { if (err) { return next(err); }},
  );

  const pr2 = User.update(
    { _id: req.session.currentUser._id},
    { $addToSet: { attendedEvents: id} },
    (err) => { if (err) { return next(err); }},
  )

  Promise.all([pr1, pr2])
  .then( () => res.redirect(`/profile/${req.session.currentUser._id}/events`))
  .catch( (err) => console.log(err));    
});


// DELETE	/meal-events/:id/delete --> Deletes the meal event in the DB
router.get('/:id/delete', (req, res, next) => {
  // console.log('DELETE', req.params);

  MealEvent.findOne({ _id: req.params.id }, (err, theMealEvent) => {
    if (err) {
      return next(err);
    }

    theMealEvent.remove(err => {
      if (err) {
        return next(err);
      }

      res.redirect('/meal-events');
    });
  });
});


module.exports = router;