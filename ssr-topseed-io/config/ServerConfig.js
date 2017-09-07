'use strict'

class ServerConfig {
	get WEBROOT() {return 'public'}
	/*get SSR_PORT() {return 9080}*/
	get WWW_PORT()  {return 9081}
	get PUG_EXCLUDE() {return ['/bower_components']}
	
} module.exports = ServerConfig