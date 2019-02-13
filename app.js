const { createStore, applyMiddleware } = require('redux');

const defaultState = {
  courses: [
    {
      name: 'Learning React',
      topic: 'React',
    },
    {
      name: 'Learning Angular',
      topic: 'Angular',
    },
    {
      name: 'Using Redux with Angular',
      topic: 'Angular',
    }
  ]
};


// reducer function
function reducer(state, action) {
  switch(action.type) {
    case 'ADD_COURSE':
    // don't modify the state, return a new state that is the
    // old state + the new value
      return Object.assign({}, state, {
        courses: [...state.courses, action.course]
      });
    default:
      return state;
  }
}

const logger = store => next => action => {
  console.log('dispatching ', action);
  let result = next(action);
  console.log('state after action ', store.getState());
  return result;
}

// create redux store
const store = createStore(reducer, defaultState, applyMiddleware(logger));

function addView(viewFunc) {
  viewFunc(defaultState);
  store.subscribe(() => {
    viewFunc(store.getState());
  })
}

addView((state) => {
  console.log(`There are ${state.courses.length} courses in the library`);
});

addView((state) => {
  console.log(`The latest course in the library: ${state.courses[state.courses.length -1].name}`);
});


store.dispatch({
  type: 'ADD_COURSE',
  course: {
    name: 'this is a new course',
    topic: 'really does not matter'
  }
})