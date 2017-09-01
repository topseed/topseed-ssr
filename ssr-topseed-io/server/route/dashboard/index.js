const express = require('express')
const router = express.Router()

const cheerio = require('cheerio')
const doT = require('dot')
//const fs = require('fs')
//const components = require("server-components")

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

		render(myssrcomp, {debug: true, rehydrate: false}).then(function(value){
			$ssrcomp = cheerio.load(value)
			var styleId = $ssrcomp('style').first().attr('id')
			$ssrcomp('my-ssrcomp').attr('data-style-id', styleId)
			value = $ssrcomp.html()

			console.log('ssr content'+value)
			$page('my-ssrcomp').replaceWith(value)
			//html = html.replace('<my-ssrcomp title="MINE"></my-ssrcomp>', value)

			res.status(200).send( $page.html() ).end()
		})

})

module.exports = router
