const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
 

//***************PLAYGROUND FUNCTIONAL CODE*****************************************
var createScene =  function () {

var scene = new BABYLON.Scene(engine);
var vrCam = new BABYLON.FreeCamera("vrCam", new BABYLON.Vector3(0, 1, 1), scene);
vrCam.setTarget(BABYLON.Vector3.Zero());
vrCam.attachControl(canvas, true);
vrCam.maxZ = 50000;
vrCam.minZ = 0.1;

var meshesToLoad = [
        "SM_Bath_F0.glb",
        "SM_Bath_Gl.glb",
        "SM_Bath_Mi.glb",
        "SM_BigR_F0.glb",
        "SM_Ceiling.glb",
        "SM_LivR_F0.glb",
        "SM_LivR_F1.glb",
        "SM_LivR_F2.glb",
        "SM_LivR_F3.glb",
        "SM_SmallR_F0.glb",
        "SM_Walls.glb",
        "SM_Ground.glb",
        "SM_SkySphere.glb",
        ];

var toLoad = meshesToLoad.length;

  //Lights
  var dLight = new BABYLON.DirectionalLight(
        "dLight",
        new BABYLON.Vector3(0.02, -0.05, -0.05),
        scene
      );
      dLight.position = new BABYLON.Vector3(0, 20, 0);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    
      //Shadows
      var shadowGenerator = new BABYLON.ShadowGenerator(2048, dLight);
      shadowGenerator.useBlurExponentialShadowMap = true;

 /**
   * ASYNC/AWAIT Function to load a model into the scene
   * @param {*} meshNames | can be "" for any
   * @param {*} rootUrl
   * @param {*} fileName
   */
  async function loadMeshes(meshNames, rootUrl, fileName) {
        var model = await BABYLON.SceneLoader.ImportMeshAsync(
          meshNames,
          rootUrl,
          fileName
        );

        console.log(fileName);
        // //Add shadow caster to each mesh within model
        // model.meshes.forEach((element) =>
        //   shadowGenerator.addShadowCaster(element, true)
        // );
    
      }

      for (var index = 0; index < meshesToLoad.length; index++) {
              loadMeshes("", "/src/models/", meshesToLoad[index]);
      }


//Setup environment
var env = scene.createDefaultEnvironment({
        createSkybox: true,
        skyboxSize: 150,
        skyboxColor: new BABYLON.Color3(0.0375,0.0375,0.0375),
        environmentTexture: "src/env/lilienstein.env",
        createGround: true,
        groundSize: 10,
        groundColor: new BABYLON.Color3(0.7,0.5,0.5),
        enableGroundShadow: true,
        groundYBias: 1,
      });

//*********WEBXR************************
    const xr = scene.createDefaultXRExperienceAsync({
    floorMeshes: [env.ground]
    });
//*********/WEBXR********************************


return scene;
};
//***************/PLAYGROUND FUNCTIONAL CODE*****************************************

const scene = createScene(); //Call the createScene function
        
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
                scene.render();
});


// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
        engine.resize();
 });
