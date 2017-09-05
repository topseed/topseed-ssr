function ListBusiness() {// 'closure|module'-iso.

	var urlSpec = {root:'http://localhost:9081', selectList: '/page/list/dummy.json'}

	var SiteListDao = BDS.extend({}) 
	
	var SimpleBusiness = BLX.extend({

		ssrList: function(listId, templateId, doT) {
			return sb.siteListDao.selectList().then(function(values) {
					var templateText = $(templateId).text(); $(templateId).remove()
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
					comp.list(values, doT)

				}).catch(function(error) {
					console.log('ListBusiness.selectList error: '+error.message);
				}
			) 
		}

		, ssrCompList: function(comp, doT) {
			return sb.siteListDao.selectList().then(function(values) {
				comp.list(values, doT)
			}).catch(function(error) {
				console.log('ListBusiness.selectList error: '+error.message);
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
	sb.siteListDao = new SiteListDao(urlSpec) //Add DAO to Business
	
	return sb //Return instance to page 
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = ListBusiness //node
