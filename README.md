# ProgressBar
ProgressBar in cmd or powershell

## Usage  

``` js  
const ProgressBar = require('./ProgressBar');
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
```  

## test

> node test