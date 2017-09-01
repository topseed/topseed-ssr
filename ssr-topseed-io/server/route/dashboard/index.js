const express = require('express')
const router = express.Router()

const cheerio = require('cheerio')
const doT = require('dot')
//const fs = require('fs')
//const components = require("server-components")

require('@skatejs/ssr/register')
const render = require('@skatejs/ssr')

const Util = require('topseed-utils')
const U = new Util()
const ROOT = './' + ServerConfig.WEBROOT

const requestedResource = ROOT + '/page/dashboard/index.pug'

//component class
const Myssrcomp = require("../../ssrComp/Myssrcomp")

router.get('/', function (req, res) {
	
		console.log('dashboard SSR')
		const $page = U.getAsDoc(requestedResource)

		//here we only look for one ssr component, but we could loop through all

		//component dom, for use by component class
		global.$ = U.getAsDoc(ROOT + '/_webComp/Myssrcomp.pug')

		var myssrcomp = new Myssrcomp()
		//copy attributes
		var comptag = $page('my-ssrcomp').get(0)
		for (var name in comptag.attribs) { //cheerio
			myssrcomp.setAttribute(name, comptag.attribs[name])
		}

		//skatejs/ssr, 
		//https://medium.com/@treshugart/%C3%A5server-side-rendering-web-components-e5df705f3f48
		render(myssrcomp, {rehydrate: false}).then(function(renderResult){

			$ssrcomp = cheerio.load(renderResult)
			var styleId = $ssrcomp('style').first().attr('id')
			$ssrcomp('my-ssrcomp').attr('data-style-id', styleId)
			value = $ssrcomp.html()
			$page('my-ssrcomp').replaceWith(value)
			res.status(200).send( $page.html() ).end()
		})

})

module.exports = router
