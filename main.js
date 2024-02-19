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
      this.el.addEventListener('hitstart', function (e) {
        // Get the entities that are currently in collision.
          self.isColliding = true;
      });
      this.el.addEventListener('hitend', function (e) {
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


// // Function to hide all meshes
// function hideMeshes() {
//     // Select the entities created by the real-world-meshing component
//     var entities = document.querySelectorAll('[data-world-mesh]');
  
//     // Loop through the entities and set their visible attribute to false
//     entities.forEach(function(entity) {
//       entity.setAttribute('visible', false);
//     });
//   }
  
// // Wait for the scene to load
// document.querySelector('a-scene').addEventListener('loaded', function () {
      
//   // Hide existing meshes
//   hideMeshes();
  
//   // Set an interval to hide new meshes
//   setInterval(hideMeshes, 1000);  // Check every second

//   });

AFRAME.registerComponent('plane-follower', {
  tick: function (t, dt) {
    const handPosition = document.querySelector('#leftHand').object3D.position;
    console.log(handPosition);
    const planePosition = this.el.object3D.position;
    planePosition.copy(handPosition); // Use this line to place the plane directly on the hand
    // Or adjust slightly: 
    planePosition.x = handPosition.x; planePosition.y = handPosition.y + 0.1; planePosition.z = handPosition.z;
  }
});

AFRAME.registerComponent('raycaster-listener', {
  init: function () {
    const raycaster = this.el; // Access raycaster element directly within the component

    raycaster.addEventListener('raycaster-intersection', (event) => {
      if (event.detail.intersectedEntity.id === 'plane') {
        event.detail.intersectedEntity.setAttribute('material', 'color', 'blue');
      }
    });

    raycaster.addEventListener('raycaster-intersection-cleared', (event) => {
      event.detail.intersectedEntity.setAttribute('material', 'color', 'red');
    });
  }
});
