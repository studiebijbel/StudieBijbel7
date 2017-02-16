/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"843D1EC6-6530-4A48-8BE8-0794BA7B2EE4"}
 */
function BTN_next(event) {
	controller.getWindow().hide();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B2E9AA8D-DE28-45FA-9866-79110061BE29"}
 */
function BTN_newImport(event) {
	forms.import_wordstudyWizard_step1_pan.f_filename = null;
	forms.import_wordstudyWizard_dlg.elements.steps.tabIndex = 1;
}
