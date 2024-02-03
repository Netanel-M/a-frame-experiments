AFRAME.registerComponent('fall', {
    schema: {
      speed: {type: 'number', default: -9.8}
    },
  
    tick: function (time, timeDelta) {
      var velocity = this.el.getAttribute('velocity');
      
      // Apply gravity acceleration.
      velocity.y += this.data.speed * timeDelta / 1000;
  
      // Check for collisions (assuming a collision system is in place).
      var collisions = this.el.components.collision.collisions;
      if (collisions.length > 0) {
        // If the entity is colliding with something, stop it.
        velocity.y = 0;
      }
  
      // Update the entity's velocity.
      this.el.setAttribute('velocity', velocity);
    }
  });