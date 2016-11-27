

import scroll from './scroll';
import anime from './anime';

var app = function () {

  var app = {};

  app.log = function () {
    console.log("Hello world");
  };

  scroll.attach();

  return app;
};

export default app();
