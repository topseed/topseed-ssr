const express = require('express')
const router = express.Router()

const cheerio = require('cheerio')
const doT = require('dot')
//const fs = require('fs')
const components = require("server-components")

require('@skatejs/ssr/register')
const render = require('@skatejs/ssr')

const myssrcomp = require("../../ssrComp/Myssrcomp")

const Util = require('topseed-utils')
const U = new Util()
const ROOT = './' + ServerConfig.WEBROOT

const requestedResource = ROOT + '/page/dashboard/index.pug'

router.get('/', function (req, res) {
	
		console.log('dashboard SSR')
		const $page = U.getAsDoc(requestedResource)
		var html = $page.html()
		console.log

		global.$ = U.getAsDoc(ROOT + '/_webComp/Myssrcomp.pug')
		var $tpl = $('template')
		//$comp('style').remove()

		//var $script = $comp('script')
		//stuck here, how to execute it

		console.log('loaded component js on the serverside')

		//global.document = $[0]

		render(myssrcomp).then(function(value){
			console.log('ssr content'+value)

			/*var NewElement = components.newElement()
			NewElement.createdCallback = function () {
				this.innerHTML = value
				console.log('elementCreated callback')
			}
			components.registerElement("my-ssrcomp", { prototype: NewElement })*/
			
			html = html.replace('<my-ssrcomp></my-ssrcomp>', value)
			res.status(200).send( html ).end()
			
		
		})/*.then(function(){
			components.renderPage(html).then(function (output) {
				res.status(200).send( output ).end()
		})*/

})

module.exports = router
