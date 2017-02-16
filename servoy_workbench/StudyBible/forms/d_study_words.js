/**
 * @properties={typeid:24,uuid:"af87ba4f-68ff-4aaa-8b04-cb98b5606c0f"}
 */
function FORM_onShow()
{
//var  vp = elements.bean_452.viewport
//vp.add(elements.bean_485)

var vSQL = "SELECT pk FROM verses WHERE pk =?"

foundset.loadRecords( vSQL,  [globals.selected_verse_id])
}

/**
 * @properties={typeid:24,uuid:"583a4823-0c3b-497c-830a-b8fbb5ced45c"}
 */
function printen()
{
forms.d_study_words.controller.print() 
}

/**
 * @properties={typeid:24,uuid:"8e02690b-11ca-409f-ab7a-9b425cbb252d"}
 */
function printForm()
{
/*
application.closeFormDialog();

forms.study_words.printForm();*/

forms.study_words.printForm();
}

/**
 * @properties={typeid:24,uuid:"5332055c-5429-4182-b3ba-c30e816202e2"}
 */
function viewWords()
{
	//application.closeFormDialog(true)
	//SMM - 23-05-2010
//	var win = controller.getWindow(u)
//	if (win) {
//		win.close()
//	}
//	
	forms.study_words.viewWordsForSelectedVerse();

	forms.study_words.newWindow();

}

/**
 * Callback method when form is resized.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"05DAD53A-0F68-4199-A644-ED93212D2765"}
 */
function onResize_FORM(event) {
	//SMM 10-06-2011	
	var vWin = application.getWindow(event.getFormName())
	
	if (vWin != null) {
		globals.form_study_width = vWin.getWidth()
		globals.form_study_height = vWin.getHeight()
	}
}
