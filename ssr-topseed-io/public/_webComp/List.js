var listEl = null //instance, to keep state

class ListEl extends HTMLElement {
	
	static get is() { return 'list-el' }

	constructor(){
		super()
		console.log('============ListEl constructor')
	}

	render() {
		console.log('List render')
		this.innerHTML = $('#xlist-el').html()
		console.log(this.innerHTML)
	}

	connectedCallback() {
		console.log('============ListEl connectedCallback'+this.getAttribute('title')+'*')

		listEl = this
		//listEl.blx = null
		$('#listel-title').text(this.getAttribute('title')||$('#listel-title').text())
	
		//no need to use Shadow DOM server-side, using <shadow-dom> marker element in HTML instead
		this.innerHTML = $('#xlist-el').html() //last thing before ssr render
	}

	list(values, doT) {
		console.log('=================ListEl.list')
		var templateId = '#ListTemplate'
		var listId = '#myList'
		var templateText = $(templateId).text(); $(templateId).remove()
		var templateFunction = doT.template(templateText)

		//console.log('output:'+templateFunction({'array': values}))

		//$('list-el').shadowRoot.getElementById("mylist").innerHTML = templateFunction({'array': values})
		$(listId).html(templateFunction({'array': values}))

		console.log('==============done listEl.list')


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
