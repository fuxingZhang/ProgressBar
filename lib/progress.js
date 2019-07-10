/**
 * progress
 */
const log = require('single-line-log').stdout;
require('./utils/node_colors');

class ProgressBar {
  constructor({ title, length, total }) {
    this.title = title || 'Progress';
    this.length = length || 50;
    this.total = total || 100;
  }

  render(completed) {
    const percent = (completed / this.total).toFixed(4);
    const cell_num = Math.floor(percent * this.length);

    const fulfill = new Array(cell_num).fill('█'.green).join('');
    const remain = new Array(this.length - cell_num).fill('█').join(''); // '░'

    const cmdText = `${this.title}: ${(100 * percent).toFixed(2)}% ${fulfill}${remain} ${completed}/${this.total}`;

    log(cmdText);
  }
}

module.exports = ProgressBar;