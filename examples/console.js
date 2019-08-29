const ProgressBar = require('..');

const title = 'interval:';
const total = 100;

const progress = new ProgressBar({
  title, 
  total
});

let completed = 0;

function downloading() {
  if (completed <= total) {
    progress.render(completed++);
    // here ==>
    if(completed%20 === 0 ) progress.console(completed);
    // <== here

    setTimeout(function (){
      downloading();
    }, 100)
  }
}

downloading();