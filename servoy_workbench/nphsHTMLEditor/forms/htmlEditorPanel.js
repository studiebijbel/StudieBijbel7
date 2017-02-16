/**
 * @type {Packages.javafx.scene.web.HTMLEditor}
 *
 * @properties={typeid:35,uuid:"29B0373F-3CC6-4103-95B3-DF093E2D699F",variableType:-4}
 */
var htmlEditor;

/**
 * Only stored for resize issue debugging purposes
 * @private
 * @type {Packages.javafx.scene.Scene}
 *
 * @properties={typeid:35,uuid:"F42C344E-BC33-488B-87C2-D24BC253B5C6",variableType:-4}
 */
var scene;

/**
 * Callback method when form is (re)loaded.
 *
 * @private
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1CB41E4B-6AB2-4ABB-A65E-52E88339A402"}
 */
function onLoad(event) {
	setUpPanel();
}

/**
 * @private
 * @properties={typeid:24,uuid:"72DF5DE2-132B-4CC6-ABFE-5FDFDCF97F0E"}
 */
function setUpPanel() {
	var Platform = Packages.javafx.application.Platform;
	var Scene = Packages.javafx.scene.Scene;
	var Runnable = java.lang.Runnable;

	var HTMLEditor = Packages.javafx.scene.web.HTMLEditor;

	Platform.runLater(new Runnable({
		run: function() {
			htmlEditor = new HTMLEditor();
			htmlEditor.setPrefHeight(100);

			scene = new Scene(htmlEditor);
			elements.editorPanel.setScene(scene);
		}
	}))
}

/**
 * @param {String} _content
 *
 * @properties={typeid:24,uuid:"2569B15A-61AB-4074-9AEB-A48AABF146D1"}
 */
function setContent(_content) {
	htmlEditor.setHtmlText(_content);
}

/**
 * @properties={typeid:24,uuid:"E3A5E19D-C1DA-4E7B-A8E7-46196BC4B834"}
 */
function getContent(_content) {
	return htmlEditor.getHtmlText();
}

/**
 * @properties={typeid:24,uuid:"EF0EE54B-A255-404E-9DF5-D24C0F1C648C"}
 */
function getCaretPosition() {
	return htmlEditor.cursorProperty();
}
