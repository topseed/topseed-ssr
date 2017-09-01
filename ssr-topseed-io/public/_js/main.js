//requires setup-6.1.js or higher
var TM = {

	loadLibs: function(){
		console.log('loadLibs called')

		//most of these could be in manifest
		return Promise.all([
			TS.load('//cdn.rawgit.com/topseed/topseed-turbo/master/vendor/jquery.jsForm.min.js')
			, TS.load('//cdn.jsdelivr.net/dot.js/1.1.1/doT.min.js')
			//, TS.load('//cdn.rawgit.com/topseed/topseed-turbo/master/webComps/tw0-1.0.js').then(function(){TW.init()}) //Support for Standard Web Component
			, TS.load('/_js/tw2-1.0.js') //Late-loader Helper for Standard Web components
			, TS.load('/_js/tp2-1.0.js') //Late-loader Helper for Polymer 2 components
			, TS.load('/bower_components/webcomponentsjs/webcomponents-lite.js') //Polymer Polyfills
			//, TS.load('/bower_components/webcomponentsjs/custom-elements-es5-adapter.js') //use when downcompiling
			, TS.load('/bower_components/polymer/polymer.html') //Support for Polymer (2.0.0)
			//, TS.load('//cdn.jsdelivr.net/riot/3.4.4/riot+compiler.min.js') //Support for RIOT
			, TS.load('//rawgit.com/topseed/topseed-turbo/master/release/topseed-turbo-latest.js')
			, TS.load('/_js/BLX.js')
			, TS.load('/_js/BDS.js')
		])
		/*.then(function(){
			return TS.load('/_js/tp2-1.0.js')
		})*/	
		.then(TM.libsLoaded)
	}	

	, libsLoaded: function(){

		TS.signalAppReady()

		TT.ScontentID ='#content-wrapper'
		TT.handle(function(evt) {
			console.log(':')
			if (TT.PRE == evt.typ)  {//start
				console.log(evt.$new)
				//$('#content-wrapper').fadeTo(100,.2)
			}
			if (TT.PAGE == evt.typ)  {//new pg loaded
				$(TT.ScontentID).html(evt.$new)
				//$('#content-wrapper').fadeTo(100,1)
			}
		})
	}	
} //class

TM.loadLibs()



