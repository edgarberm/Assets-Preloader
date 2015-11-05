'use strict';

class ES6AssetsPreloader {

    constructor ( _path ) {
        this.successCount = 0;
		this.errorCount = 0;
		this.cache = {};
		this.downloadQueue = [];
        this.path = _path;

        this._handlePath( this.path );
    }


    // Check path
    _handlePath ( _path ) {
        if ( _path != null && _path instanceof Array ) {
	        this.downloadQueue = _path;
	    } else if ( typeof _path === 'string' ) {
	        this.downloadQueue.push( _path );
	    } else if ( _path === undefined ) {
	        throw new Error( 'You need a path to load!' );
	    } else {
	        throw new Error( 'The path is wrong!' );
	    }
    }


    // Load multiple assets
	load ( path ) { this._handlePath( path ); }


    // On assets loaded
	onLoad ( callback ) {
	   if ( this.downloadQueue.length === 0 )
	   		callback();

	    for ( let i = 0; i < this.downloadQueue.length; i++ ) {
	        let path = this.downloadQueue[ i ];
	        let img = new Image();

	        // Image load
	        img.addEventListener( 'load', function ( event ) {
	        	this.successCount += 1;
				if ( this._isDone() ) callback();
	        }.bind( this ), false );

	        // Image error
	        img.addEventListener( 'error', function ( event ) {

		        this.errorCount += 1;
				if ( this._isDone() ) callback();

		    }.bind( this ), false );

	        img.src = this.path;
	        this.cache[ this.path ] = img;
	    }
	}


    // Asset load is done
	_isDone ( ) {
	    return ( this.downloadQueue.length == this.successCount + this.errorCount );
	}


	// Get single asset
	getAsset ( path ) { return cache[ path ]; }

}

export default AssetsPreloader;
