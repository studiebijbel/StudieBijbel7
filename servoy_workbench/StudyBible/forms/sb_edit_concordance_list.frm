borderType:"EmptyBorder,0,0,0,0",
dataSource:"db:/sb/word_study_concordance",
items:[
{
height:187,
partType:2,
typeid:19,
uuid:"07BB9DE8-1DA9-433D-B8B3-84F95AC94697"
},
{
labelFor:"lblText",
location:"2,162",
size:"80,20",
text:"i18n:cvb.wordstudy.WordConcordance",
transparent:true,
typeid:7,
uuid:"090226E8-26E2-4754-BF29-B8A2344F0EF5"
},
{
anchors:3,
dataProviderID:"fvVerseId",
displayType:2,
location:"610,75",
onDataChangeMethodID:"3BD978AF-12B8-4BAA-9355-E991159072D0",
size:"75,20",
typeid:4,
uuid:"10C1E83E-DA90-4557-82EB-8D90EC5B81BA",
valuelistID:"A0F8F8C2-EA0A-452F-AF93-192F7F82F017"
},
{
anchors:3,
fontType:"sansserif,1,11",
foreground:"#ffffff",
horizontalAlignment:0,
location:"473,3",
mediaOptions:14,
name:"btn_newcc",
rolloverCursor:12,
showClick:false,
showFocus:false,
size:"105,20",
text:"i18n:cvb.btn.save",
transparent:true,
typeid:7,
uuid:"15019A99-8103-457E-9C4A-19B9B3FC8527"
},
{
background:"#ffffff",
height:234,
partType:5,
typeid:19,
uuid:"1F73C328-6DC1-41EB-9655-52FDACCDD606"
},
{
anchors:3,
formIndex:1,
imageMediaID:"6DBF2995-8A21-4871-89D9-79918F9A39F4",
location:"470,2",
mediaOptions:14,
onActionMethodID:"8E5C966A-22AA-4D44-9E35-93574CE5389D",
printable:false,
rolloverCursor:12,
showClick:false,
showFocus:false,
size:"105,23",
transparent:true,
typeid:7,
uuid:"355E2C69-F135-4BB1-9742-8D2441EAAA8C"
},
{
anchors:3,
displaysTags:true,
formIndex:5,
location:"515,100",
size:"170,20",
text:"%%con_word_study_concordance_to_analyze_concordance.con_analyze_concordance_to_word_study_analyze.word_translation%%",
transparent:true,
typeid:7,
uuid:"5B687254-BD15-4B51-BF32-368E7279684E"
},
{
anchors:3,
formIndex:1,
imageMediaID:"6DBF2995-8A21-4871-89D9-79918F9A39F4",
location:"580,2",
mediaOptions:14,
onActionMethodID:"05D46E49-1E7C-4290-B03B-DD292113AF16",
printable:false,
rolloverCursor:12,
showClick:false,
showFocus:false,
size:"105,23",
transparent:true,
typeid:7,
uuid:"65A545FF-F554-40F2-8F18-B5DA38611D83"
},
{
anchors:10,
borderType:"SpecialMatteBorder,0.0,0.0,1.0,0.0,#000000,#000000,#666666,#000000,0.0,",
displaysTags:true,
location:"2,199",
name:"lblText",
size:"596,20",
styleClass:"table",
text:"%%calc_word_text%%",
transparent:true,
typeid:7,
uuid:"664948E1-C72F-4AF4-9970-78C921609272"
},
{
anchors:3,
location:"538,75",
size:"8,20",
text:":",
transparent:true,
typeid:7,
uuid:"9A934257-B851-4551-98C2-FCEE09AE2033"
},
{
background:"#666666",
height:30,
partType:1,
typeid:19,
uuid:"C15EC0D9-FB1F-4EAD-9518-76A4380CB190"
},
{
anchors:3,
dataProviderID:"fvBookId",
displayType:2,
editable:false,
location:"515,50",
onDataChangeMethodID:"952400A0-848E-4491-B60E-D6D161542887",
size:"170,20",
typeid:4,
uuid:"C65A05E4-CE14-4EE0-9BF9-A1E61EE76AE1",
valuelistID:"2EEF82A1-FF95-4A38-B202-E3A1717117CC"
},
{
anchors:11,
location:"0,33",
name:"html_editor",
printable:false,
size:"500,116",
tabOrientation:-1,
transparent:true,
typeid:16,
uuid:"CD1DDB93-1E12-4DCF-8D85-698F3E1D5FCD"
},
{
anchors:3,
fontType:"sansserif,1,11",
foreground:"#ffffff",
horizontalAlignment:0,
location:"580,3",
mediaOptions:14,
name:"btn_newc",
rolloverCursor:12,
showClick:false,
showFocus:false,
size:"105,20",
text:"i18n:cvb.btn.cancel",
transparent:true,
typeid:7,
uuid:"DA502EBF-1360-4C21-8A40-EA23ED2E654A"
},
{
anchors:3,
dataProviderID:"fvChapterId",
displayType:2,
location:"515,75",
onDataChangeMethodID:"5DE726E1-104D-4B53-8FC8-B8ADE33D0D90",
size:"75,20",
typeid:4,
uuid:"F1907DF5-C15D-4D0C-86D6-72CBB65B6E17",
valuelistID:"4CFADA8A-D3D9-4928-89A9-56C9A6A8EAC3"
}
],
name:"sb_edit_concordance_list",
onLoadMethodID:"546C912E-BA87-46C1-95EC-9825CE723938",
onRecordSelectionMethodID:"9322A859-03E3-43EB-B95B-C66A393AD8D5",
onShowMethodID:"55D574BA-73D3-460D-9080-422800A983AD",
scrollbars:32,
showInMenu:true,
size:"700,234",
styleName:"CvB",
typeid:3,
uuid:"EA7BB864-FCDB-4112-9E10-735C157D1BD7",
view:3