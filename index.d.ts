// Type definitions

interface ProgressBarOptions {
  /**
   * Progress bar title, default: ''
   */
  title?: string;

  /**
   * total number of ticks to complete, Can also be set within the render method
   */
  total?: number;

  /**
   * tthe displayed width of the progress, default: 50
   */
  width?: number;

  /**
   * completion character, default: colors.bgGreen(' '), can use any string
   */
  complete?: string;

  /**
   * incomplete character, default: colors.bgWhite(' '), can use any string
   */
  incomplete?: string;

  /**
   * minimum time between updates in milliseconds, default: 16
   */
  interval?: number;

  /**
   * What is displayed and display order, default: ':title :percent :bar :time :completed/:total'
   */
  display?: string;

  /**
   * clear the bar on completion, default: false
   */
  clear?: boolean;
}

export declare class ProgressBar {
  /**
   * Options:
   *   - `title` optional, Progress bar title, default: ''
   *   - `total` optional, total number of ticks to complete, Can also be set within the render method
   *   - `width` optional, the displayed width of the progress, default: 50
   *   - `complete` optional, completion character, default: colors.bgGreen(' '), can use any string
   *   - `incomplete` optional, incomplete character, default: colors.bgWhite(' '), can use any string
   *   - `interval` optional, minimum time between updates in milliseconds, default: 16
   *   - `display` optional, What is displayed and display order, default: ':title :percent :bar :time :completed/:total'
   *   - `clear` optional, clear the bar on completion, default: false
   */
  constructor(options: ProgressBarOptions);

  /**
   * "render" the progress bar with completed and optional `total`
   * 
   *  `completed` completed value
   *  `total` optional, total number of ticks to complete, Can also be set in the constructor
   */
  render(completed: number, total?: number): void;

  /**
   * interrupt the progress bar and write a message above it
   */
  console(message: string | number): void;

  /**
   * end a progress bar.
   */
  end(): void;
}