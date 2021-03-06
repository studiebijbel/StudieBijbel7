
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5159AAF6-3FDB-48DC-96D0-1B5EECA5EC16"}
 */
function BTN_Classes(event) {
	plugins.WebClientUtils.setExtraCssClass(elements.clouds, "cvb-mobile-clouds");
	plugins.WebClientUtils.setExtraCssClass(elements.title, "cvb-mobile-center cvb-mobile-title");
	plugins.WebClientUtils.setExtraCssClass(elements.content, "cvb-mobile-center cvb-mobile-message");
	plugins.WebClientUtils.setExtraCssClass(elements.cvb_logo, "cvb-mobile-center cvb-mobile-logo");
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"ADBF0088-7B1A-4F2C-8231-5A5295E077A3"}
 */
function EVENT_clickSplash(event) {
	application.showURL("https://www.studiebijbel.nl", "_self");
}
