const ProgressBar = require('..');

const total = 100;

const progress = new ProgressBar({
  total,
  // ==> here
  complete: '=',
  incomplete: '-'
  // <== here
});

let completed = 0;

function run() {
  if (completed <= total) {
    progress.render(completed++);

    setTimeout(function (){
      run();
    }, 100)
  }
}

run();