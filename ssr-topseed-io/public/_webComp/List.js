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
		//listEl.shadow = TW.attachShadow(listEl, '#xlist-el')
		listEl.blx = null
		//this.shadowRoot.querySelector('#title').innerHTML = this.getAttribute('title') || this.shadow.querySelector('#title').innerHTML
		$('#listel-title').text(this.getAttribute('title')||$('#listel-title').text())
	
		if (!this.shadowRoot) {
			this.attachShadow({ mode: "open" }).innerHTML = $('#xlist-el').html()
		}

		//$('#listel-title').text(this.getAttribute('title')||$('#listel-title').text()) //doesn't work
		
	}

	list(values, doT) {
		console.log('=================ListEl.list')
		var templateId = '#ListTemplate'
		var listId = '#myList'
		var templateText = $(templateId).text(); $(templateId).remove()
		var templateFunction = doT.template(templateText)

		//console.log('output:'+templateFunction({'array': values}))

		//bind to element in shadow DOM
		//$('list-el').shadowRoot.getElementById("mylist").innerHTML = templateFunction({'array': values})
		$(listId).html(templateFunction({'array': values}))


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
