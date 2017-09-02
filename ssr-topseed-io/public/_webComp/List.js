var listEl = null //instance, to keep state

class ListEl extends HTMLElement {
	
	static get is() { return 'list-el' }

	constructor(){
		super()
		console.log('============ListEl constructor')
	}

	connectedCallback() {
		console.log('============ListEl connectedCallback'+this.getAttribute('title')+'*')

		listEl = this
		listEl.shadow = TW.attachShadow(listEl, '#xlist-el')
		listEl.blx = null
		this.shadow.querySelector('#title').innerHTML = this.getAttribute('title') || this.shadow.querySelector('#title').innerHTML
		//$('#listel-title').text(this.getAttribute('title')||$('#listel-title').text())
	}

	list(values) {
		console.log('ListEl.list')
		var tpl = document.getElementById('ListTemplate').text
		var data2 = {'array': values}
		var res = TW.bind(tpl, data2)
		var lst = listEl.shadow.querySelector('#myList') 
		lst.innerHTML = res
	}

	init(_blx) {
		console.log('ListEl.init, received _blx')
		listEl.blx = _blx 
	}

	nav(url, circleVal, gaugeVal){
		console.log('listEl.nav')
		if (listEl.blx != null) //blx not required when component doesn't broadcast
		{
			console.log('listEl.nav blx not null')
			listEl.blx.emit('mySelection', {"circleVal": circleVal, "gaugeVal": gaugeVal})
		}
		else 
			window.open(url, "_blank")
		return false;		
	}
}

customElements.define(ListEl.is, ListEl);

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = ListEl
