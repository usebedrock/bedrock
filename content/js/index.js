import { NgModule } from '@angular/core';

require('../../core/js/index');
import bar from './foo';

console.log(bar);

class Greeter {
  greet(name) {
    return 'Hello ' + name + '!';
  }
}

@NgModule({
  providers: [
    Greeter
  ]
})
class HelloWorld {
  greeter;

  constructor(greeter) {
    this.greeter = greeter;
  }
}
