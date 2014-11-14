require([
    "/assets/dist/components/react/react.min.js",
    "/assets/dist/components/lodash/dist/lodash.min.js"
], function(React, lodash) {

    React.render(
      <h1>Hello, world!</h1>,
      document.getElementById('example')
    );

});
