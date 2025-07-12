import { view } from '../view.js'

export var HomeController = class {
  static index() {
    view('home/index');
  }
}