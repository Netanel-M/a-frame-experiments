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
      const handPosition = document.querySelector('#leftHand').object3D.children[0];
     // console.log( document.querySelector('#leftHand').object3D.children);
     let planePosition = this.el.object3D.position;
     let planeRotation = this.el.object3D.rotation;

      if (document.querySelector('#leftHand').object3D.children.length > 0) {
        
        const wristObject3D = document.querySelector('#leftHand').object3D.children[0].children.find(child => child.name === 'wrist');
        const scene = document.querySelector("a-scene")
        // Convert wrist position from world space to the scene root's local space
        const wristLocalPosition = new THREE.Vector3();
        const c = wristObject3D.localToWorld(wristLocalPosition);
        console.log(c);

        // Now you have the absolute world position of the wrist in wristWorldPosition
                // Proceed with wristObject3D if it exists
       // planePosition.copy(wristLocalPosition); // Use this line to place the plane directly on the hand
       // planePosition.y += 0.2;
      //  planeRotation.copy(wristObject3D.rotation);
      //   planeRotation.x += 90;
      //   planeRotation.y += 60;

        planePosition.copy(c); // Use this line to place the plane directly on the hand
       // Or adjust slightly: 
       planePosition.y += 0.1;

        planeRotation.copy(wristObject3D.rotation)

        } else {
        // Handle the case where the hand isn't recognized yet
        console.log(document.querySelector('#leftHand').object3D.children);
      }    

  }
});

AFRAME.registerComponent('raycaster-listener', {
  init: function () {
    const raycaster = this.el; // Access raycaster element directly within the component

    raycaster.addEventListener('raycaster-intersection', (event) => {
      console.log(event);
      if (event.detail.intersectedEntity.id === 'plane') {
        event.detail.intersectedEntity.setAttribute('material', 'color', 'blue');
      }
    });

    raycaster.addEventListener('raycaster-intersection-cleared', (event) => {
      console.log(event);
      event.detail.intersectedEntity.setAttribute('material', 'color', 'red');
    });
  }
});
