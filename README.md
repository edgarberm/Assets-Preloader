# Assets-Preloader
Preload assets in background (only images)


## Usage

```javascript
var assets = [ 'img001.png', 'img002.png', 'img003.png' ];

var assetsPreloader = new AssetsPreloader();                 // Single initialize
var assetsPreloader = new AssetsPreloader( assets );         // Initialize passing the assets in the constructor

assetsPreloader.load( 'img001.png' );                        // Load sigle asset
assetsPreloader.load( assets );                              // Load multiple assets

assetsPreloader.onLoad( function ( event ) {                 // On assets loaded event
    console.log('DONE!');
    console.log(assetsPreloader.downloadQueue);
    var img = assetsPreloader.getAsset( 'img002.png' /*assets[ 1 ]*/ );      // Get loaded asset
    document.body.appendChild( img );   
});
```
