class MySsrComp extends HTMLElement {
	
	static get is() { return 'my-ssrcomp' }

	constructor(){
		super()
	}

	connectedCallback(){
		//console.log('============Myssrcomp connectedCallback')
		
		if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') //SSR
		{
			//document.getElementById('myssrcomp-title').innerHTML = this.getAttribute('title')||document.getElementById('myssrcomp-title').innerHTML
			$('#myssrcomp-title').text(this.getAttribute('title')||$('#myssrcomp-title').text())
			this.innerHTML = $('#xmy-ssrcomp').html()
		}
	}
}

customElements.define(MySsrComp.is, MySsrComp);

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = MySsrComp
	
	