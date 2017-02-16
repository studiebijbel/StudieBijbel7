borderType:"EmptyBorder,0,0,0,0",
dataSource:"db:/sb_data/sb_organisation",
items:[
{
borderType:"TitledBorder,i18n:CVB.label.postal_address,4,2,Tahoma,0,11,#0046d5",
formIndex:10100,
lineSize:1,
location:"0,0",
size:"300,140",
typeid:21,
uuid:"06389F15-B141-4586-8968-326AA68B3D66"
},
{
formIndex:11600,
labelFor:"post_street",
location:"320,30",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"80,20",
tabSeq:-1,
text:"i18n:CVB.label.street_nr",
transparent:true,
typeid:7,
uuid:"08D8DAE1-9F50-46A7-A63D-19BD6331C745"
},
{
dataProviderID:"visit_street",
formIndex:11500,
location:"415,30",
name:"visit_street",
size:"140,20",
text:"post_street",
typeid:4,
uuid:"0E701337-D819-4B54-ACF0-92AC1A5D29B0"
},
{
borderType:"TitledBorder,i18n:CVB.label.visit_address,4,2,Tahoma,0,11,#0046d5",
formIndex:11100,
lineSize:1,
location:"310,0",
size:"300,140",
typeid:21,
uuid:"16F5CE84-AE5D-425A-8B11-471B4B8414A6"
},
{
dataProviderID:"visit_zip",
formIndex:11700,
location:"415,54",
name:"visit_zip",
size:"180,20",
text:"post_zip",
typeid:4,
uuid:"1872C966-DA4F-43A9-84BE-5C46CF80923D"
},
{
dataProviderID:"post_nr",
formIndex:10400,
location:"247,30",
name:"post_nr",
size:"38,20",
text:"post_nr",
typeid:4,
uuid:"24BE4CB3-7337-48B9-A13D-7CCDE66CB935"
},
{
dataProviderID:"globals.sb_UserSearchValue",
formIndex:12600,
location:"180,160",
name:"search_field",
onActionMethodID:"3FF5D550-3E50-4340-9384-8679837D00F1",
size:"190,20",
typeid:4,
uuid:"2608889E-319A-46AD-8BE5-C45058F99AC6"
},
{
dataProviderID:"post_city",
formIndex:10200,
location:"105,76",
name:"post_city",
size:"180,20",
text:"post_city",
typeid:4,
uuid:"3A3DD803-7659-44C7-A39A-F897B01E9E2B"
},
{
anchors:13,
borderType:"TitledBorder,i18n:CVB.label.contacts,4,2,Tahoma,0,11,#0046d5",
formIndex:10000,
lineSize:1,
location:"0,145",
name:"bdr_contacts",
size:"610,200",
typeid:21,
uuid:"3D319115-CC66-4029-A691-8D0FBFF44778"
},
{
dataProviderID:"post_country",
formIndex:10900,
location:"105,99",
name:"post_country",
size:"180,20",
text:"post_country",
typeid:4,
uuid:"41591F4A-1B2C-48D9-94CB-6913C3CDB18B"
},
{
anchors:13,
formIndex:12100,
items:[
{
containsFormID:"E50A2F91-4DDF-40C7-9AD4-55FC1A263189",
location:"20,196",
relationName:"sb_organisation_to_sb_contact",
text:"sb_contact_tbl",
typeid:15,
uuid:"0539CCB2-0593-442D-9495-5963F2C1AC9A"
}
],
location:"10,186",
name:"tabs_contacts",
printable:false,
size:"590,150",
tabOrientation:-1,
typeid:16,
uuid:"546AC1D6-8F3A-4BD5-B640-203FC07EBF30"
},
{
formIndex:10600,
labelFor:"post_street",
location:"10,30",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"80,20",
tabSeq:-1,
text:"i18n:CVB.label.street_nr",
transparent:true,
typeid:7,
uuid:"55FB930F-B7DF-4F8E-8784-98F0511064AE"
},
{
formIndex:12400,
location:"10,161",
mediaOptions:14,
name:"btn_new_contact",
onActionMethodID:"099C6959-4DF3-4CAA-B4F2-BF81948C659B",
size:"90,22",
text:"i18n:CVB.button.add",
toolTipText:"i18n:CVB.tooltip.add_organisation",
typeid:7,
uuid:"5F2A9FBD-02FB-4990-ABBB-1EF9392E7713"
},
{
height:350,
partType:5,
typeid:19,
uuid:"6191B932-A1AC-43A2-BC88-1BFD8D0142B4"
},
{
formIndex:12800,
location:"370,160",
mediaOptions:14,
name:"search_btn",
onActionMethodID:"3FF5D550-3E50-4340-9384-8679837D00F1",
size:"80,20",
text:"i18n:CVB.label.search",
typeid:7,
uuid:"63480FA0-F8E1-4D35-BF1F-42F8905944DD"
},
{
dataProviderID:"post_zip",
formIndex:10700,
location:"105,54",
name:"post_zip",
size:"180,20",
text:"post_zip",
typeid:4,
uuid:"72FB14C8-25B6-46EE-9587-244E70431629"
},
{
formIndex:11800,
labelFor:"post_zip",
location:"320,54",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"80,20",
tabSeq:-1,
text:"i18n:CVB.field.sb_organisation.post_zip",
transparent:true,
typeid:7,
uuid:"8200136E-67E7-4DA0-83F0-1355D6189577"
},
{
formIndex:12000,
labelFor:"post_country",
location:"320,99",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"80,20",
tabSeq:-1,
text:"i18n:CVB.field.sb_organisation.post_country",
transparent:true,
typeid:7,
uuid:"87101FC9-B26C-48A5-BE33-83829B64C7F6"
},
{
dataProviderID:"visit_country",
formIndex:11900,
location:"415,99",
name:"visit_country",
size:"180,20",
text:"post_country",
typeid:4,
uuid:"9B8A7674-D888-4C48-A14E-71ADD2C50E6C"
},
{
displaysTags:true,
formIndex:12500,
horizontalAlignment:4,
location:"427,170",
mediaOptions:14,
name:"totalUsers",
showClick:false,
showFocus:false,
size:"170,14",
styleClass:"small",
tabSeq:-1,
text:"i18n:cvb.lbl.totalUsers",
transparent:true,
typeid:7,
uuid:"A6478094-7DA9-4490-8CF1-1ACA123FF9B3"
},
{
dataProviderID:"visit_city",
formIndex:11200,
location:"415,76",
name:"visit_city",
size:"180,20",
text:"post_city",
typeid:4,
uuid:"A7F13ACB-300F-487D-9C67-DC978EB9F9D3"
},
{
formIndex:11300,
labelFor:"post_city",
location:"320,76",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"120,20",
tabSeq:-1,
text:"i18n:CVB.field.sb_organisation.post_city",
transparent:true,
typeid:7,
uuid:"B9786A2D-B887-4DDA-9822-2E0A356F31C7"
},
{
dataProviderID:"post_street",
formIndex:10500,
location:"105,30",
name:"post_street",
size:"140,20",
text:"post_street",
typeid:4,
uuid:"C7B516E1-14B8-46E6-8A81-042BC13A4D58"
},
{
formIndex:10800,
labelFor:"post_zip",
location:"10,54",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"80,20",
tabSeq:-1,
text:"i18n:CVB.field.sb_organisation.post_zip",
transparent:true,
typeid:7,
uuid:"D14738E1-7434-4C8B-A1E0-BDC0882E4D73"
},
{
dataProviderID:"visit_nr",
formIndex:11400,
location:"557,30",
name:"visit_nr",
size:"38,20",
text:"post_nr",
typeid:4,
uuid:"DB2F63FA-2C10-4B55-90DB-E61219EEF78C"
},
{
formIndex:11000,
labelFor:"post_country",
location:"10,99",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"80,20",
tabSeq:-1,
text:"i18n:CVB.field.sb_organisation.post_country",
transparent:true,
typeid:7,
uuid:"E6704C92-38EC-4CD0-A461-52CA1EF8ED2A"
},
{
formIndex:10300,
labelFor:"post_city",
location:"10,76",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"120,20",
tabSeq:-1,
text:"i18n:CVB.field.sb_organisation.post_city",
transparent:true,
typeid:7,
uuid:"FD21045C-E44C-4073-9970-04140FFC6DB9"
}
],
name:"sb_organisation_detail_frm",
navigatorID:"-2",
onDeleteAllRecordsCmdMethodID:"-1",
onDeleteRecordCmdMethodID:"-1",
onDuplicateRecordCmdMethodID:"-1",
onFindCmdMethodID:"-1",
onInvertRecordsCmdMethodID:"-1",
onNewRecordCmdMethodID:"-1",
onNextRecordCmdMethodID:"-1",
onOmitRecordCmdMethodID:"-1",
onPreviousRecordCmdMethodID:"-1",
onPrintPreviewCmdMethodID:"-1",
onRecordSelectionMethodID:"2C1F1F69-22E7-44E5-BB72-32809DEB7DEA",
onSearchCmdMethodID:"-1",
onShowAllRecordsCmdMethodID:"-1",
onShowMethodID:"94B741F5-92CF-4FF4-9307-A18080EF795B",
onShowOmittedRecordsCmdMethodID:"-1",
onSortCmdMethodID:"-1",
paperPrintScale:100,
scrollbars:33,
size:"610,350",
styleClass:"tab",
styleName:"CvB",
typeid:3,
uuid:"6988F085-EA3D-45F7-BBC7-D0B27CCBD48C"