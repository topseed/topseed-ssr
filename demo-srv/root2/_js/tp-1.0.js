//Loaded from main.js
//Support for Polymer Components
var TP = { //class:
	_loadedComp : {'exComp': true} // don't load 2x

	, loadComp : function(url){
		return new Promise(function (resolve, reject){
			if (url in TP._loadedComp) {//guard: we loaded it before, thank you very much
				console.log('already loaded')
				resolve("OK2")
			} else {
				fetch(url, {
					method: 'get'
				}).then(function(response) {
					if (!response.ok) {
						console.log('not ok')
						console.log(response)
						reject(response.statusText)
					} 
					return response.text()
				}).then(function(txt) {
					//registerComp = function(){} //null function	
					TP._loadedComp[url] = true
					console.log('loading (again?):', url)
					
					//add component to head tag
					var el = document.createElement('link')
					el.href = url
					el.rel = 'import'
					window.document['head'].appendChild(el)

					//$here.append(txt)
					//generic register, component must implement
					//registerComp()
					console.log('loading (again?)2!')
					resolve("OK")
				})	
			}
		})	
	}

	/*, _isCReg: function(name) {
		return (window.creg && window.creg.hasOwnProperty(name))
		//	return window.creg[name]
		//return false
	}
	
	, _cReg: function(name, comp) { // register a component
		if (!window.creg)
			window.creg = {}
		window.creg[name] = comp 
	}

	, registerComp: function(tag, KlassEl) {//register class
		var xx
		if(!TP._isCReg(tag)) {
			if (tag.indexOf('-')==-1)
				throw 'Custom element name must contain a - (dash)!'  
			xx = document.registerElement(tag, {prototype: KlassEl})
			TP._cReg(tag, xx)
		}
		xx = TP._isCReg(tag)	
		return xx
	}

	, regC: function(tag, KlassEl) {
		return TP.registerComp(tag, KlassEl)
	}	

	, attachShadow: function(thiz, templ) {
		var templateElement = document.querySelector(templ)
		var clone = document.importNode(templateElement.content, true);

		//var shadow = this.createShadowRoot() NOPE
		var shadow = thiz.attachShadow({mode: 'open'})
		shadow.appendChild(clone)
		return shadow
	}

	, attS: function(thiz, templ){
		return TP.attachShadow(thiz, templ)
	}

	, bind: function (tpl, data) { // take tmpl and bind w/ data
		var tpl1Foo = doT.template(tpl)
		return tpl1Foo(data)
	}

 	, loadIE: function() {
		if (bowser.msie || bowser.a)
			{
			return Promise.all([
				TS.load('https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/template.js')
			])
		}
	}
	, loadNotChrome: function() {
		if (!bowser.blink)
		{
			return Promise.all([
				TS.load('https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/bower_components/webcomponentsjs/CustomElements.min.js')
				, TS.load('https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/shadydom.min.js')
			])
		}
	}

	, init: function(){
		return Promise.all([
			TP.loadIE(), TP.loadNotChrome()
		])
	}*/
}