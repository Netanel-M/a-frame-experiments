AFRAME.registerComponent('fall', {
    schema: {
      speed: {type: 'number', default: -9.8}
    },
  
    init: function () {
      // Set initial velocity to 0.
      this.el.setAttribute('velocity', {x: 0, y: 0, z: 0});
      
      // Initialize state.
      this.isColliding = false;
      
      // Listen for collisions.
      var self = this; // Reference to the component.
      this.el.addEventListener('collisions', function (e) {
        // Get the entities that are currently in collision.
        var collidedEntities = e.detail.els;
        
        // If there are collided entities, set isColliding to true.
        if (collidedEntities.length) {
          self.isColliding = true;
        } else {
          self.isColliding = false;
        }
      });
    },
  
    tick: function (time, timeDelta) {
      // Check if velocity is set.
      if (!this.el.getAttribute('velocity')) {
        return;
      }
  
      var velocity = this.el.getAttribute('velocity');
      
      // Apply gravity acceleration if not colliding.
      if (!this.isColliding) {
        velocity.y += this.data.speed * timeDelta / 1000;
      } else {
        // If the entity is colliding with something, stop it.
        velocity.y = 0;
      }
  
      // Update the entity's velocity.
      this.el.setAttribute('velocity', velocity);
    }
});
