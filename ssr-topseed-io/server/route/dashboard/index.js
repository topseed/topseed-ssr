const express = require('express')
const router = express.Router()

const Sr = require('../../util/SR')
const SR = new Sr()
const Util = require('topseed-utils')
const U = new Util()
global.fetch = require('node-fetch')
global.BLX = require('../../util/BLX')
global.BDS = require('../../util/BDS')
const doT = require('dot')

const ROOT = './' + ServerConfig.WEBROOT
const PUG_PATH = ROOT + '/_webComp/'
const COMP_PATH = '../../.'+PUG_PATH


const requestedResource = ROOT + '/page/dashboard/index.pug'

//custom business logic to fetch list data async before rendering
const ListBusiness = require('../../.'+ROOT+'/_js/ListBusiness')
const sb = ListBusiness()
sb.urlSpec = {root:'http://127.0.0.1:'+ServerConfig.WWW_PORT, selectList: '/page/list/dummy.json'}

//component(s) to be rendered serverside
const compFiles = ['Myssrcomp', 'List']

router.get('/', function (req, res) {
	
	const $page = U.getAsDoc(requestedResource)

	//process compFiles
	var queue = Promise.resolve()
	compFiles.forEach(function(compFile){
		queue = queue.then(function(){
			var Comp = require(COMP_PATH+compFile)
			var comp = new Comp()
			var initFn
			switch (compFile)
			{
				case 'List': initFn = function(){return sb.ssrCompList(comp, doT)}; break;
			}
			return SR.renderComp(PUG_PATH+compFile+'.pug', Comp, comp, $page, initFn)
		})
	})
	queue.then(function(){
		res.status(200).send( $page.html() ).end()
	})
})

module.exports = router
