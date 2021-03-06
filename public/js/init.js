
function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    scene.fog = new THREE.FogExp2( 0xd7cbb1, 0.06 );
    scene.overrideMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.01, 23.5 );

    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.48 );
	scene.add( ambientLight );

    //cubemap
    var path = 'https://edelweiss-game.s3.eu-west-3.amazonaws.com/skybox/';
    var format = '.jpg';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];

    var reflectionCube = new THREE.CubeTextureLoader().load( urls );
    reflectionCube.format = THREE.RGBFormat;

    scene.background = reflectionCube;


    //

    /*
    stats = new Stats();
    document.body.appendChild( stats.dom );
    stats.dom.style.right = '0px' ;
    stats.dom.style.left = 'auto' ;
    */

    



    /////////////////////
    //   RENDERERS
    /////////////////////

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('world') });

    renderer.autoClear = false;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true ;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap ;

    //

    var renderPass = new THREE.RenderPass( scene, camera );

    fxaaPass = new THREE.ShaderPass( THREE.FXAAShader );

    var pixelRatio = renderer.getPixelRatio();

    fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth * pixelRatio );
    fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * pixelRatio );

    composer = new THREE.EffectComposer( renderer );
    composer.addPass( renderPass );
    composer.addPass( fxaaPass );

    /////


    /////////////////////
    ///   MISC
    /////////////////////

    clock = new THREE.Clock();

    gltfLoader = new THREE.GLTFLoader();
    var dracoLoader = new THREE.DRACOLoader();

    dracoLoader.setDecoderPath( 'libs/draco/' )
    gltfLoader.setDRACOLoader( dracoLoader );

    textureLoader = new THREE.TextureLoader();
    fileLoader = new THREE.FileLoader()

    //


    uaParser = new UAParser();
    socketIO = SocketIO();
    atlas = Atlas();
    input = Input();
    stamina = Stamina();
    interaction = Interaction();
    dynamicItems = DynamicItems();
    mapManager = MapManager();
    optimizer = Optimizer();
    gameState = GameState();
    assetManager = AssetManager();
    soundMixer = SoundMixer();


    loop();

};