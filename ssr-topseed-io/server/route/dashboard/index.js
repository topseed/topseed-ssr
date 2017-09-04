const express = require('express')
const router = express.Router()

const cheerio = require('cheerio')
const fs = require('fs')
const doT = require('dot')
BLX = require('../../util/BLX') //serverside version
BDS = require('../../util/BDS') //serverside version
fetch = require('node-fetch')

require('@skatejs/ssr/register')
const render = require('@skatejs/ssr')

const Util = require('topseed-utils')
const U = new Util()

ROOT = './' + ServerConfig.WEBROOT
PUG_PATH = ROOT + '/_webComp/'
COMP_PATH = '../../.'+PUG_PATH

//require('../../.'+ROOT+'/_js/tw2-1.0.js')

const requestedResource = ROOT + '/page/dashboard/index.pug'

const ListBusiness = require('../../.'+ROOT+'/_js/ListBusiness')
const sb = ListBusiness()
sb.urlSpec = {root:'http://127.0.0.1:'+ServerConfig.WWW_PORT, selectList: '/page/list/dummy.json'}


const compFiles = ['Myssrcomp', 'List']

router.get('/', function (req, res) {
	
	console.log('dashboard SSR')
	const $page = U.getAsDoc(requestedResource)

	//process compFiles
	var queue = Promise.resolve()
	compFiles.forEach(function(compFile){
		console.log('handling compFile '+compFile)
		queue = queue.then(function(){
			var Comp = require(COMP_PATH+compFile)
			var comp = new Comp()
			var initFn
			switch (compFile)
			{
				case 'List': initFn = function(){return sb.ssrCompList(comp, doT)}; break;
			}
			return renderComp(compFile, Comp, comp, $page, initFn)
		})
	})
	queue.then(function(){
		res.status(200).send( $page.html() ).end()
	})
})

var renderComp = function(compFile, Comp, comp, $page, initFn){
	return new Promise(function (resolve, reject){

		global.$ = U.getAsDoc(PUG_PATH+compFile+'.pug')
			
		//copy attributes
		var comptag = $page(Comp.is).get(0) //one component with this name per page
		for (var name in comptag.attribs) { //cheerio
			comp.setAttribute(name, comptag.attribs[name])
		}

		var p = Promise.resolve()
		p.then(function(){
			if (initFn)
				return initFn()
			else
				return Promise.resolve()
		})
		.then(function(){
			//skatejs/ssr, 
			//https://medium.com/@treshugart/%C3%A5server-side-rendering-web-components-e5df705f3f48
			return render(comp, {rehydrate: false})
		})
		.then(function(renderResult){
			$comp = cheerio.load(renderResult)
			//need to copy css to shadow dom during rehydration, by id generated by skatejs
			//var styleId = $comp('style').first().attr('id')
			//$comp(Comp.is).attr('data-style-id', styleId)

			var styleId = '__style_'+Comp.is
			$comp('style').first().attr('id', styleId)
			$comp(Comp.is).attr('data-style-id', styleId)


			//replace el in page
			$page(Comp.is).replaceWith($comp.html())
			return Promise.resolve()
		}).then(resolve)
	})
}

module.exports = router
