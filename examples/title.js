const ProgressBar = require('..');

const title = 'download:';
const total = 100;

const progress = new ProgressBar({
  // here ==>
  title, 
  // <== here
  total
});

let completed = 0;

function downloading() {
  if (completed <= total) {
    progress.render(completed++);

    setTimeout(function (){
      downloading();
    }, 100)
  }
}

downloading();