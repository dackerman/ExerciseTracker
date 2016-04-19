
export let WorkoutDB = function() {
  var db = {
    '2016-05-13': {
      sets: [
        { reps: 10, weight: 25 },
        { reps: 8, weight: 35 },
        { reps: 8, weight: 30 },
        { reps: 8, weight: 30 }
      ]
    }
  };
  return {
    setsForDay(day) {
      db[day] = db[day] || {sets: []};
      return db[day];
    }
  };
}();

