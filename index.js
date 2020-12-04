/*
 * ProgressBar
 */
const colors = require('@zhangfuxing/colors/fn');

class ProgressBar {
  /**
   * constructor
   * 
   * @param {String} [title] Progress bar title, default: ''
   * @param {Number} [total] total number of ticks to complete, Can also be set within the render method
   * @param {Number} [width] the displayed width of the progress, default: 50
   * @param {String} [complete] completion character, default: colors.bgGreen(' '), can use any string
   * @param {String} [incomplete] incomplete character, default: colors.bgWhite(' '), can use any string
   * @param {Boolean} [clear]  clear the bar on completion, default: false
   * @param {Number} [interval]  minimum time between updates in milliseconds, default: 16
   * @param {String} [display]  What is displayed and display order, default: ':title :percent :bar :time :completed/:total'
   */
  constructor({ title, total, width, complete, incomplete, clear, interval, display } = {}) {
    this.title = title || '';
    this.total = total;
    this.width = width || 50;
    this.complete = complete || colors.bgGreen(' ');
    this.incomplete = incomplete || colors.bgWhite(' ');
    this.clear = clear || false;
    this.interval = interval || 16;
    this.display = display || ':title :percent :bar :time :completed/:total';
    this.stream = process.stdout;
    this.isCompleted = false;
    this.lastStr = '';
    this.start = Date.now();
    this.time = 0;
    this.lastRender = 0;

    if (typeof this.title !== 'string') throw new Error(`title must be 'string'`);
    if (total !== undefined && typeof total !== 'number') throw new Error(`total must be 'number'`);
    if (typeof this.width !== 'number') throw new Error(`width must be 'number'`);
    if (typeof this.complete !== 'string') throw new Error(`complete must be 'string'`);
    if (typeof this.incomplete !== 'string') throw new Error(`incomplete must be 'string'`);
    if (typeof this.clear !== 'boolean') throw new Error(`clear must be 'boolean'`);
    if (typeof this.interval !== 'number') throw new Error(`interval must be 'number'`);
    if (typeof this.display !== 'string') throw new Error(`display must be 'string'`);
  }

  /**
   * "render" the progress bar with completed and optional `total`
   * 
   * @param {Number} completed Completed value
   * @param {Number} [total] total number of ticks to complete, Can also be set in the constructor
   * 
   * @api public
   */
  render(completed, total = this.total) {
    if (!this.stream.isTTY || this.isCompleted) return;

    completed = +completed;
    if (!Number.isInteger(completed)) throw new Error(`completed must be 'number'`);
    if (completed < 0) throw new Error(`completed must greater than or equal to 0`);

    if (total === undefined) throw new Error(`total required`);
    if (!Number.isInteger(total)) throw new Error(`total must be 'number'`);

    const now = Date.now();
    const ms = now - this.lastRender;
    if (ms < this.interval && completed < total) return;

    this.lastRender = now;
    this.time = ((now - this.start) / 1000).toFixed(1) + 's';

    const percent = ((completed / total) * 100).toFixed(2) + '%';

    // :title :percent :bar :time :completed/:total
    let str = this.display
      .replace(':title', this.title)
      .replace(':time', this.time)
      .replace(':percent', percent)
      .replace(':completed', completed)
      .replace(':total', total);

    // compute the available space (non-zero) for the bar
    let availableSpace = Math.max(0, this.stream.columns - str.replace(':bar', '').length);
    if (availableSpace && process.platform === 'win32') availableSpace -= 1;

    const width = Math.min(this.width, availableSpace);

    // :bar
    const completeLength = Math.round(width * completed / total);
    const complete = new Array(completeLength).fill(this.complete).join('');
    const incomplete = new Array(width - completeLength).fill(this.incomplete).join('');

    str = str.replace(':bar', complete + incomplete);

    if (this.lastStr !== str) {
      this.stream.cursorTo(0);
      this.stream.write(str);
      this.stream.clearLine(1);
      this.stream.cursorTo(0);
      this.lastStr = str;
    }

    if (completed >= total) this.end();
  }

  /**
   * end a progress bar.
   * 
   * @api public
   */
  end() {
    this.isCompleted = true;

    if (this.clear) {
      if (this.stream.clearLine) {
        this.stream.clearLine(0);
        this.stream.cursorTo(0);
      }
    } else {
      this.stream.write('\n');
    }
  }

  /**
   * interrupt the progress bar and write a message above it
   * 
   * @param {string | number} message The message to write
   * 
   * @api public
   */
  console(message) {
    // clear the current line
    this.stream.clearLine(0);
    // move the cursor to the start of the line
    this.stream.cursorTo(0);
    // write the message text
    this.stream.write(`${message}`);
    // wrap after writing the message
    this.stream.write('\n');
    // re-display the progress bar with its lastStr
    this.stream.write(this.lastStr);
  };
}

module.exports = ProgressBar