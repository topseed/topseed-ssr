class MySsrComp extends HTMLElement {
	
	static get is() { return 'my-ssrcomp' }

	constructor(){
		super()
		console.log('============Myssrcomp constructor')
	}

	connectedCallback(){
		console.log('============Myssrcomp connectedCallback')

		//document.getElementById('myssrcomp-title').innerHTML = this.getAttribute('title')||document.getElementById('myssrcomp-title').innerHTML
		$('#myssrcomp-title').text(this.getAttribute('title')||$('#myssrcomp-title').text())

		if (!this.shadowRoot) {
			this.attachShadow({ mode: "open" }).innerHTML = $('#xmy-ssrcomp').html()
		}
	}
}

customElements.define(MySsrComp.is, MySsrComp);

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = MySsrComp
	
	