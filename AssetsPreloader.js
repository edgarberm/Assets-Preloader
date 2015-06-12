/**********************************************************************************
 *
 * AssetsPreloader.js: Preload assets in background
 *
 * @author:  Edgar Bermejo - @BuiltByEdgar - http://builtbyedgar.com/
 * @version: 0.0.1 - Beta (11/07/2015)
 * @repository: https://github.com/BuiltByEdgar/Assets-Preloader
 * @license: MIT License
 *
 *
 *
 *
 **********************************************************************************/


'use script';

// CONSTRUCTOR
function AssetsPreloader ( path ) {

    this.successCount = 0;
    this.errorCount = 0;
    this.cache = {};
    this.downloadQueue = []

    // Check path
    if (path != null && path instanceof Array ) {
        this.downloadQueue = path 
    } else if ( typeof path === 'string' ) {
        this.downloadQueue.push( path )  
    } else {
        throw new Error( 'The path is wrong!' );
    }

};


// Load single asset
AssetsPreloader.prototype.loadAsset = function ( path ) {

    if ( typeof path === 'string' ) {
        this.downloadQueue.push( path )  
    } else {
        throw new Error( 'The path is wrong!' );
    }

}


// Load multiple assets
AssetsPreloader.prototype.loadAssets = function ( path ) {

    if ( path instanceof Array ) {
        this.downloadQueue = path 
    } else {
        throw new Error( 'The path is wrong!' );
    }

}


// On assets loaded
AssetsPreloader.prototype.onAssetsLoaded = function ( callback ) {

    if ( this.downloadQueue.length === 0 )
	callback();

    for ( var i = 0; i < this.downloadQueue.length; i++ ) {

        var path = this.downloadQueue[ i ];
        var img = new Image();
        var that = this;

        // Image load
        img.addEventListener( 'load', function ( event ) {

            that.successCount += 1;
	    if ( that.isDone() ) callback();

        }, false );

        // Image error
        img.addEventListener( 'error', function ( event ) {

	        that.errorCount += 1;
		if ( that.isDone() ) callback();

	    }, false );

        img.src = path;
        this.cache[ path ] = img;
        
    }

}


// Asset load is done
AssetsPreloader.prototype.isDone = function ( ) {

    return ( this.downloadQueue.length == this.successCount + this.errorCount );

}


// Get single asset
AssetsPreloader.prototype.getAsset = function ( path ) {

    return this.cache[ path ];

}
