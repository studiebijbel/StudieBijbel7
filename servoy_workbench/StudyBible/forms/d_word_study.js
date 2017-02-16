/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BB3E0929-FD5A-4F99-835E-40C83EDB5CD0"}
 */
var v_viewWordStudy = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"59A96258-0144-4835-AE15-EFD1C5FA365A",variableType:4}
 */
var v_previous_next = null;

/**
 * @properties={typeid:24,uuid:"d3cf8620-a404-47da-8c01-12dfc53a0a10"}
 */
function openWS()
{

/*
forms.word_study.openWS(arguments[0])
application.closeFormDialog(false)
forms.word_study.newWindow();
*/
v_viewWordStudy = 1
globals.word_number = arguments[0]
//scopes.tools.output(globals.word_number)
globals.colored = 1
forms.word_study.viewWordStudy()

globals.d_study_analyze = globals.study_analyze;
globals.d_study_analyze = globals.d_study_analyze.replace('<PP>', '')
globals.d_study_analyze = globals.d_study_analyze.replace('</PP>', '')

globals.d_study_analyze = globals.d_study_analyze.replace('javascript:forms.word_study.next','javascript:forms.d_word_study.next') 	
globals.d_study_analyze = globals.d_study_analyze.replace('javascript:forms.word_study.previous','javascript:forms.d_word_study.previous')
globals.d_study_analyze = globals.d_study_analyze.replace(/javascript:forms.word_study.openWS/g,'javascript:forms.d_word_study.openWS')

}

/**
 * @properties={typeid:24,uuid:"71b9cb0d-331e-43ab-a76b-c65719e2b1b4"}
 */
function printen()
{
forms.d_word_study.controller.print() 
}

/**
 * @properties={typeid:24,uuid:"255a72e7-0c99-4591-a0ec-ecda4f78b84e"}
 */
function printForm()
{
//application.closeFormDialog()
forms.word_study.printForm();
}

/**
 * @properties={typeid:24,uuid:"c52a6887-3d04-42c6-9331-32a40ed61a49"}
 */
function tlink()
{
globals.tlink(arguments[0])

if(globals.flag == false)
{
	globals.flag = true;
	globals.tlink(arguments[0])
}
}

/**
 * @properties={typeid:24,uuid:"313a68e5-c542-41b5-a953-d156e8e300a1"}
 */
function viewWordStudy()
{

if (v_previous_next) return //SMM 04-11-2011 when clicking Concordantie.previous or Concordantie.next inside form d_word_study
if (v_viewWordStudy) return //SMM 04-11-2011 when clicking view word study (bgcolor) inside form d_word_study
	
//SMM I do not know when this code will be used...
controller.getWindow().hide();
forms.word_study.viewWordStudy();
forms.word_study.newWindow()

}

/**
 * @properties={typeid:24,uuid:"66ce23bf-16ec-482c-a693-8ebb40283e00"}
 * @param {String} inp
 */
function wlink(inp)
{
globals.wlink(inp, null, null, null);

if(globals.flag == false)
{
	globals.flag = true;
	globals.wlink(inp, null, null, null);
}
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"A1B2B727-9E16-4DBF-A74D-C8E215134693"}
 */
function onHide_FORM(event) {
	//SMM - 14-06-2011	
	if (globals.form_wordstudy_width && globals.form_wordstudy_height){	
		globals.setUserSetting('form_wordstudy_width',globals.form_wordstudy_width)
		globals.setUserSetting('form_wordstudy_height',globals.form_wordstudy_height)
	}
	return true
}

/**
 * Callback method when form is resized.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BA23D31D-5539-464A-B662-F432086F50FA"}
 */
function onResize_FORM(event) {
	//SMM - 14-06-2011
	var vWin = application.getWindow('WordStudyForm')
	globals.form_wordstudy_width = vWin.getWidth()
	globals.form_wordstudy_height = vWin.getHeight()
	
}

/**
 * @properties={typeid:24,uuid:"B7CE058B-208C-48D7-A728-1DD2958EE28F"}
 */
function previous() {
	v_previous_next = 1
	//SMM 04-11-2011
	globals.iConcordance = globals.iConcordance - 10	
	forms.word_study.calcConcordantie();
	forms.word_study.display();	

	globals.d_study_analyze = globals.study_analyze;
	globals.d_study_analyze = globals.d_study_analyze.replace('<PP>', '')
	globals.d_study_analyze = globals.d_study_analyze.replace('</PP>', '')

    globals.d_study_analyze = globals.d_study_analyze.replace('javascript:forms.word_study.next','javascript:forms.d_word_study.next') 	
	globals.d_study_analyze = globals.d_study_analyze.replace('javascript:forms.word_study.previous','javascript:forms.d_word_study.previous')
	globals.d_study_analyze = globals.d_study_analyze.replace(/javascript:forms.word_study.openWS/g,'javascript:forms.d_word_study.openWS')
}

/**
 * @properties={typeid:24,uuid:"183F7A59-6C8E-449D-8990-FFEA5EE48FBB"}
 */
function next() {
	v_previous_next = 1
	//SMM 04-11-2011
	globals.iConcordance = globals.iConcordance + 10
	forms.word_study.calcConcordantie()
	forms.word_study.display()
	
	globals.d_study_analyze = globals.study_analyze;
	globals.d_study_analyze = globals.d_study_analyze.replace('<PP>', '')
	globals.d_study_analyze = globals.d_study_analyze.replace('</PP>', '')

    globals.d_study_analyze = globals.d_study_analyze.replace('javascript:forms.word_study.next','javascript:forms.d_word_study.next') 	
	globals.d_study_analyze = globals.d_study_analyze.replace('javascript:forms.word_study.previous','javascript:forms.d_word_study.previous')
    globals.d_study_analyze = globals.d_study_analyze.replace(/javascript:forms.word_study.openWS/g,'javascript:forms.d_word_study.openWS')
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D878553A-D9F1-4C6C-9522-B7BA470BB461"}
 */
function onShow(firstShow, event) {
	//SMM 04-11-2011
	v_previous_next = 0 //used when clicking Concordantie.previous or Concordantie.next inside form d_word_study
	v_viewWordStudy = 0 //used when clicking view word study (bgcolor) inside form d_word_study
}
