AFRAME.registerComponent('fall', {
    schema: {
      speed: {type: 'number', default: -9.8}
    },
  
    init: function () {
        console.log("initializing");
      // Set initial velocity to 0.
      this.el.setAttribute('velocity', {x: 0, y: 0, z: 0});
      
      // Initialize state.
      this.isColliding = false;
      
      // Listen for collisions.
      var self = this; // Reference to the component.
      this.el.addEventListener('obbcollisionstarted', function (e) {
        // Get the entities that are currently in collision.
          self.isColliding = true;
      });
      this.el.addEventListener('obbcollisionended', function (e) {
        // Get the entities that are currently in collision.
          self.isColliding = false;
      });
    },
  
    tick: function (time, timeDelta) {
      // Check if velocity is set.
      console.log("tick");
      if (!this.el.getAttribute('velocity')) {
        console.log("no velocity");
        return;
      }
  
      var velocity = this.el.getAttribute('velocity');
      var position = this.el.getAttribute('position');

      // Apply gravity acceleration if not colliding.
      if (!this.isColliding) {
        velocity.y = 0.01; 
        position.y -= 0.01;
      } else {
        // If the entity is colliding with something, stop it.
        console.log("collision");
      }
  
      // Update the entity's velocity.
      this.el.setAttribute('velocity', velocity);
    }
});