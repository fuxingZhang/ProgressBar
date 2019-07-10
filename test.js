/**
 * test
 */
const ProgressBar = require('./index');

const title = '下载进度';
const length = 50;
const total = 200;

const progress = new ProgressBar({
  title, 
  length,
  total
});

let num = 0;

function downloading() {
  if (num <= total) {
    progress.render(num++);

    setTimeout(function (){
      downloading();
    }, 500)
  }
}

downloading();