/**
 * @properties={typeid:24,uuid:"dbecb58b-611d-4f34-b8a1-97f706a70ed1"}
 */
function printen() {
	forms.d_verse_translation.controller.print()
}

/**
 * @properties={typeid:24,uuid:"4b5d1b9e-a522-44cb-b8b5-4d442362fc86"}
 */
function printForm() {
	controller.getWindow().hide();
	forms.verse_translation.printForm();
}

/**
 * @properties={typeid:24,uuid:"c0508d3d-018c-45aa-afb7-3b226c9c9fa4"}
 */
function viewTranslations() {
	controller.getWindow().hide();
	//scopes.tools.output('SV')
	forms.verse_translation.viewTranslationsForSelectedVerse();

	forms.verse_translation.newWindow()
}

/**
 * Callback method when form is resized.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E9BF88CE-F10E-4DAD-AB76-C5E193C78DC5"}
 */
function onResize_FORM(event) {
	
	
	
	//vDialog.show(forms['d_verse_translation']);
	if (!globals.FirstResize){
    var vWin = application.getWindow(event.getFormName())	
	globals.form_width = vWin.getWidth()
	globals.form_height = vWin.getHeight()
	scopes.tools.output("on Resize event"  +event.getFormName())	 
	scopes.tools.output("Resize W= "+globals.form_width)
	scopes.tools.output("Resize H= "+globals.form_height)		
	}
	else globals.FirstResize = false
	/*
	
    if (!globals.FirstResize){
	globals.form_width = controller.getFormWidth() //solutionModel.getForm(event.getFormName()).width//
	globals.form_height =  controller.getPartHeight(JSPart.BODY) +  controller.getPartHeight(JSPart.TITLE_HEADER) 
		scopes.tools.output("on Resize "  +event.getFormName())	    
    }
    else globals.FirstResize = false
		
		//var vDialog = application.createWindow('d_verse_translation',JSWindow.DIALOG,null);
	
		//vDialog.setInitialBounds(-1,-1,globals.form_width,globals.form_height)
	*/
		
	
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2EC6C0A2-41BD-4B10-A5BB-AFAE9AC791F9"}
 */
function onLoad_FORM(event) {
return
}
