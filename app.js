const { createStore } = require('redux');

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

function reducer(state, action) {
  return state;
}

// create redux store
const store = createStore(reducer, defaultState);

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


defaultState.courses.push({
  name: 'this is a new course',
  topic: 'really does not matter'
});

