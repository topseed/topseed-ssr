class MySsrComp extends HTMLElement {
	
	static get is() { return 'my-ssrcomp' }

	constructor(){
		super()
		console.log('Myssrcomp constructor')
	}

	connectedCallback(){
		console.log('----Myssrcomp connectedCallback')
		//this.innerHTML = document.getElementById('xmy-ssrcomp').innerHTML

		console.log('title attr:'+this.getAttribute('title')+'*')
		
		//this.innerHTML = $('#xmy-ssrcomp').html()
		//document.getElementById('myssrcomp-title').innerHTML = this.getAttribute('title')||document.getElementById('myssrcomp-title').innerHTML
		$('#myssrcomp-title').text(this.getAttribute('title')||$('#myssrcomp-title').text())
		//$('#myssrcomp-title').text(this.getTitle()||$('#myssrcomp-title').text())

		if (!this.shadowRoot) {
			this.attachShadow({ mode: "open" }).innerHTML = $('#xmy-ssrcomp').html()
		}
		
	}
}

customElements.define(MySsrComp.is, MySsrComp);

module.exports = new MySsrComp()
	
	