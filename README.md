# ProgressBar
ProgressBar in cmd or powershell

## Install

```sh
$ npm i @zhangfuxing/progress
```  

## Useage  

```js
const ProgressBar = require('@zhangfuxing/progress');

const title = 'downloading:';
const total = 100;

const progress = new ProgressBar({
  title, 
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
```  

More examples in the `examples` folder.

## options
### constructor  
* `title` optional, Progress bar title 
  - default: ''
* `total` optional, total number of ticks to complete 
  - Can also be set within the render method
* `width` optional, the displayed width of the progress 
  - default: 50
* `complete` optional, completion character 
  - default: colors.bgGreen(' '), can use any string
* `incomplete` optional, incomplete character 
  - default: colors.bgWhite(' '), can use any string
* `interval` optional, minimum time between updates in milliseconds, default: 0
* `display` optional, What is displayed and display order
  - default: ':title :percent :bar :time :completed/:total'
* `clear` optional, clear the bar on completion
  - default: false

### render  
* `completed` completed value
* `total` optional, total number of ticks to complete, Can also be set in the constructor

### console  
* `message` The message to write  

### end
* end a progress bar  


## types
```js
/**
 * constructor
 * 
 * @param {String} [title] Progress bar title, default: ''
 * @param {Number} [total] total number of ticks to complete, Can also be set within the render method
 * @param {Number} [width] the displayed width of the progress, default: 50
 * @param {String} [complete] completion character, default: colors.bgGreen(' '), can use any string
 * @param {String} [incomplete] incomplete character, default: colors.bgWhite(' '), can use any string
 * @param {Boolean} [clear]  clear the bar on completion, default: false
 * @param {Number} [interval]  minimum time between updates in milliseconds, default: 0
 * @param {String} [display]  What is displayed and display order, default: ':title :percent :bar :time :completed/:total'
 */

/**
 * progressBar.render: render the progress bar
 * 
 * @param {Number} completed Completed value
 * @param {Number} [total] total number of ticks to complete, Can also be set in the constructor
 */

/**
 * progressBar.end: interrupt the progress bar and write a message above it
 * 
 * @param {string | number} message The message to write
 */

/**
 * progressBar.end: end a progress bar.
 * 
 * @api public
 */
```  
