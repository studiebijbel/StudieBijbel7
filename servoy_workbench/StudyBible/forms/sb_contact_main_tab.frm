borderType:"EmptyBorder,0,0,0,0",
dataSource:"db:/sb_data/sb_contact",
items:[
{
borderType:"TitledBorder,i18n:CVB.label.required_fields,4,2,Tahoma,0,11,#0046d5",
formIndex:10100,
lineSize:1,
location:"10,10",
size:"380,180",
typeid:21,
uuid:"0591C740-3444-4387-B894-F222751D424B"
},
{
anchors:14,
imageMediaID:"84744620-B1F5-41C2-9205-33DDD7D0C74B",
location:"0,445",
mediaOptions:6,
size:"400,30",
tabSeq:-1,
typeid:7,
uuid:"11F2755A-E708-436B-B8EE-5A9171B35984"
},
{
dataProviderID:"contact_email",
formIndex:10300,
location:"131,108",
name:"contact_email",
onDataChangeMethodID:"B958DE0F-B8E1-46FD-A67B-C58AFD2CB31D",
size:"235,20",
tabSeq:4,
text:"contact_email",
typeid:4,
uuid:"125047CE-D720-4F62-89E5-968568604592"
},
{
borderType:"EmptyBorder,0,0,0,0",
dataProviderID:"gender",
displayType:3,
formIndex:10500,
location:"131,85",
name:"gender",
scrollbars:36,
size:"235,20",
tabSeq:3,
text:"gender",
typeid:4,
uuid:"1CF90F0C-49D4-43E6-87F6-014CB20A2D5E",
valuelistID:"1E48833E-8C31-4D47-BD9B-392E360EF3A2"
},
{
formIndex:11000,
labelFor:"name_last",
location:"31,61",
mediaOptions:14,
size:"80,20",
tabSeq:-1,
text:"i18n:CVB.field.sb_contact.name_last",
transparent:true,
typeid:7,
uuid:"26DEEE45-C035-4EB0-AC4E-903AFD30BEB2"
},
{
formIndex:12400,
labelFor:"sb_end_date",
location:"30,160",
mediaOptions:14,
size:"100,20",
tabSeq:-1,
text:"i18n:cvb.lb.expireDate",
transparent:true,
typeid:7,
uuid:"2FA8CF0A-5AF4-45A7-BA25-F4E253DFAA7A"
},
{
formIndex:10800,
labelFor:"name_first",
location:"31,38",
mediaOptions:14,
size:"80,20",
tabSeq:-1,
text:"i18n:CVB.field.sb_contact.name_first",
transparent:true,
typeid:7,
uuid:"3D92C3CF-6213-4D99-806B-C21A28327133"
},
{
borderType:"EmptyBorder,0,0,0,0",
dataProviderID:"demo_user_chk",
displayType:4,
formIndex:12100,
location:"350,20",
name:"demo_user_chk",
size:"15,15",
text:"demo_user_chk",
typeid:4,
uuid:"4F227292-1CE8-4CB5-9F13-12DE6DFB1267"
},
{
borderType:"EmptyBorder,0,0,0,0",
dataProviderID:"sb_trail_account_chk",
displayType:4,
formIndex:12500,
location:"250,20",
name:"sb_trail_account_chk",
onDataChangeMethodID:"B03B0BF2-F4D1-4DDE-AE6E-E8102E1D341C",
selectOnEnter:true,
size:"15,15",
transparent:true,
typeid:4,
uuid:"5DCF157B-F791-4A5B-85BF-D9C867F0FC33"
},
{
formIndex:11800,
labelFor:"login_name",
location:"30,226",
mediaOptions:14,
size:"80,20",
tabSeq:-1,
text:"i18n:CVB.field.sb_contact.login_name",
transparent:true,
typeid:7,
uuid:"6130790B-E948-434A-ACD7-C1C1CA88A6AA"
},
{
height:355,
partType:5,
typeid:19,
uuid:"6C5D0A2D-6095-469B-BD46-8C54EC6401B1"
},
{
formIndex:10600,
labelFor:"gender",
location:"31,85",
mediaOptions:14,
size:"80,20",
tabSeq:-1,
text:"i18n:CVB.field.sb_contact.gender",
transparent:true,
typeid:7,
uuid:"80A3FCD6-37BA-4E34-B18A-426A5D3C3007"
},
{
borderType:"TitledBorder,i18n:CVB.label.login_details,4,2,Tahoma,0,11,#0046d5",
formIndex:10000,
lineSize:1,
location:"10,204",
size:"380,55",
typeid:21,
uuid:"833FC584-2C60-46D9-8BBE-11FC33E8CE8D"
},
{
dataProviderID:"name_first",
formIndex:10700,
location:"131,38",
name:"name_first",
size:"235,20",
tabSeq:1,
text:"name_first",
typeid:4,
uuid:"8D72E068-7731-41F4-8567-9255A4127AE4"
},
{
anchors:6,
formIndex:3,
location:"313,449",
mediaOptions:14,
name:"btn_save",
onActionMethodID:"44CB3BC6-F3DD-4EED-B913-532981F5AB60",
size:"80,22",
tabSeq:8,
text:"i18n:CVB.button.save",
transparent:true,
typeid:7,
uuid:"8ECEF826-A3B5-4206-A662-8211E5E382C2"
},
{
formIndex:11300,
labelFor:"sb_group_code",
location:"30,131",
mediaOptions:14,
size:"100,20",
tabSeq:-1,
text:"i18n:CVB.field.sb_contact.sb_group_code",
transparent:true,
typeid:7,
uuid:"947882EB-8182-41B9-BBDD-8A352B9D0479"
},
{
borderType:"TitledBorder,Wachtwoord vergeten URL,4,2,Tahoma,0,11,#0046d5",
formIndex:10000,
groupID:"forgot_password",
lineSize:1,
location:"10,264",
size:"380,80",
typeid:21,
uuid:"A472EAE6-C599-463A-A5D3-721574B58783",
visible:false
},
{
dataProviderID:"c_reset_url",
displayType:1,
editable:false,
formIndex:11700,
groupID:"forgot_password",
location:"30,286",
name:"login_namec",
scrollbars:32,
size:"330,50",
text:"login_name",
typeid:4,
uuid:"B2FA0D01-8D48-4C2C-91D0-AC19C0E9628A",
visible:false
},
{
dataProviderID:"sb_group_code",
displayType:2,
editable:false,
formIndex:11400,
location:"131,131",
name:"sb_group_code",
size:"235,23",
tabSeq:5,
text:"sb_group_code",
typeid:4,
uuid:"C2900E3E-6274-4931-A631-00C4C1BFADAC",
valuelistID:"22EF6C2E-AC2A-44E4-B487-9BCFDC02A926"
},
{
dataProviderID:"name_last",
formIndex:10900,
location:"131,61",
name:"name_last",
size:"235,20",
tabSeq:2,
text:"name_last",
typeid:4,
uuid:"E1AFE6E9-B5D6-4B5E-AD39-88C863EAB836"
},
{
dataProviderID:"sb_end_date",
displayType:5,
formIndex:12300,
format:"dd-MM-yyyy",
location:"130,160",
name:"sb_end_date",
size:"140,20",
text:"sb_end_date",
typeid:4,
uuid:"E20DF219-1780-4F57-9C9C-E62B327480FC"
},
{
anchors:12,
formIndex:2,
location:"10,449",
mediaOptions:14,
name:"btn_reset",
onActionMethodID:"0B7C7846-B796-4394-9643-B0BD526BD709",
size:"100,22",
text:"i18n:CVB.button.reset_login",
transparent:true,
typeid:7,
uuid:"E73C67D9-5308-4051-9A5C-AE1AC4C1C31C"
},
{
dataProviderID:"login_name",
editable:false,
formIndex:11700,
location:"130,226",
name:"login_name",
size:"230,20",
styleClass:"readonly",
tabSeq:-2,
text:"login_name",
typeid:4,
uuid:"E866684B-D4BB-49EE-A451-61C155D868C2"
},
{
anchors:6,
formIndex:1,
location:"219,449",
mediaOptions:14,
name:"btn_cancel",
onActionMethodID:"7454207B-8803-4882-AE10-E8AE7BBE536A",
size:"90,22",
tabSeq:7,
text:"i18n:CVB.button.cancel",
transparent:true,
typeid:7,
uuid:"EA91FAD2-1B7E-454E-8ABB-BE865DD03CA9"
},
{
formIndex:10400,
labelFor:"contact_email",
location:"31,108",
mediaOptions:14,
size:"80,20",
tabSeq:-1,
text:"i18n:CVB.field.sb_contact.contact_email",
transparent:true,
typeid:7,
uuid:"EC6C27E7-1A8D-4896-B15D-78697A1B95D5"
},
{
formIndex:12600,
labelFor:"sb_trail_account_chk",
location:"190,15",
mediaOptions:14,
size:"60,20",
tabSeq:-1,
text:"i18n:cvb.lbl.trail",
transparent:true,
typeid:7,
uuid:"F8728B89-3562-4CDC-8810-0200F3D585AD"
},
{
formIndex:12200,
location:"270,15",
mediaOptions:14,
size:"80,20",
tabSeq:-1,
text:"Demo",
transparent:true,
typeid:7,
uuid:"FDDE414B-1D85-4322-9C79-7EEE1679D842"
}
],
name:"sb_contact_main_tab",
navigatorID:"-1",
onDeleteAllRecordsCmdMethodID:"-1",
onDeleteRecordCmdMethodID:"-1",
onDuplicateRecordCmdMethodID:"-1",
onFindCmdMethodID:"-1",
onInvertRecordsCmdMethodID:"-1",
onNewRecordCmdMethodID:"-1",
onOmitRecordCmdMethodID:"-1",
onPrintPreviewCmdMethodID:"-1",
onRecordSelectionMethodID:"30E290FD-169F-4F4C-9BDE-F7BD3429A40B",
onSearchCmdMethodID:"-1",
onShowAllRecordsCmdMethodID:"-1",
onShowMethodID:"B369C3B5-E678-4CE0-8774-B0457803D540",
onShowOmittedRecordsCmdMethodID:"-1",
onSortCmdMethodID:"-1",
paperPrintScale:100,
scrollbars:36,
size:"400,330",
styleName:"CvB",
typeid:3,
uuid:"E4FE5623-FB44-4414-89AF-2B752978A7CB"