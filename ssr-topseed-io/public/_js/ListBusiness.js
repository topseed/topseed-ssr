function ListBusiness() {// 'closure|module'-iso.

	var urlSpec = {root:'http://localhost:9081', selectList: '/page/list/dummy.json'}

	var SiteListDao = BDS.extend({}) 
	
	var SimpleBusiness = BLX.extend({

		ssrList: function(listId, templateId, doT) {
			console.log('******ssrList')
			return sb.siteListDao.selectList().then(function(values) {
					console.log(values)
					var templateText = $(templateId).text(); $(templateId).remove()
					console.log('templateText:'+templateText)
					var templateFunction = doT.template(templateText)
					$(listId).html(templateFunction({'array': values}))

				}).catch(function(error) {
					console.log('NewsBusiness.ssrList error: '+error.message);
				}
			)
		}

		, list: function(listId, templateId) {
			sb.siteListDao.selectList().then(function(values) {
					//http://www.javascriptoo.com/dot-js
					var templateText = document.getElementById(templateId).text
					var templateFunction = doT.template(templateText)
					document.getElementById(listId).innerHTML = templateFunction({'array': values})

				}).catch(function(error) {
			  		console.log('ListBusiness.selectList error: '+error.message);
				}
			)
		}

		, compList: function(componentName, doT) {
			//if (1==1) return
			sb.siteListDao.selectList().then(function(values) {

					var comp = document.querySelector(componentName) //good if only one
					console.log('got component'+comp)
					comp.list(values, doT)

				}).catch(function(error) {
					console.log('ListBusiness.selectList error: '+error.message);
				}
			) 
		}

		, ssrCompList: function(comp, doT) {
			//if (1==1) return
			console.log('ssrCompList')
			return new Promise(function (resolve, reject){

				sb.siteListDao.selectList().then(function(values) {
					console.log('got results')
					// var comp = document.querySelector(componentName) //good if only one
					console.log('got component'+comp)
					comp.list(values, doT)
					return resolve()

				}).catch(function(error) {
					console.log('ListBusiness.selectList error: '+error.message);
				})
			}) 
		}


		, addComp: function(componentSelector) {
            console.log('componentSelector:'+componentSelector)
			var comp = document.querySelector(componentSelector)
			comp.init(sb) //pass in sb as message bus
		}
	})

	//Instantiate Business
	const sb = new SimpleBusiness()
	console.log('using urlspec')
	sb.siteListDao = new SiteListDao(urlSpec) //Add DAO to Business
	
	return sb //Return instance to page 
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = ListBusiness //node
