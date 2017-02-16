
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"039533E2-0626-4B0D-A9EF-825E37EF594A"}
 */
function onAction(event) {
	var vQuestion = globals.DIALOGS.showQuestionDialog("i18n:cvb.lbl.deleteMessage", "i18n:cvb.lbl.deleteMessage", "i18n:cvb.btn.yes", "i18n:cvb.btn.no");
	if(vQuestion == i18n.getI18NMessage("cvb.btn.yes")) {
		foundset.deleteRecord();
	}
}
