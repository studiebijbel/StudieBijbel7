/**
 * @properties={typeid:24,uuid:"ac1b6dd2-8279-4ae8-9942-ae0a0e9aadeb"}
 */
function gotoHTML()
{

 var htmlPage = 'http://studybibleweb.imagos.com/sb_cdrom_updates/update.exe'
if(utils.stringMiddle(application.getOSName(),1,7) == "Windows") 	{ 
    	application.executeProgram('rundll32', ['url.dll,FileProtocolHandler',htmlPage]) 
}
else {
		application.executeProgram('open', ['-a','safari',htmlPage])
}
}
