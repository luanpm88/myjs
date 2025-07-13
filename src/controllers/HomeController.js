import { view } from '../view.js'

export var HomeController = class {
  static index() {
    return view('home/index');
  }
}