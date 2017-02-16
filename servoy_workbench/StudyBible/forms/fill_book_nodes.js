/**
 * @properties={typeid:24,uuid:"142b31f2-fce2-4e41-8213-06af65b5989f"}
 * @AllowToRunInFind
 */
function insertBooks()
{
	return false;
//forms.books_fill_in.controller.loadAllRecords()
////Add a filter parameter to limit the foundset permanently
//forms.books_fill_in.controller.addFoundSetFilterParam('testament', '=', 'Old');//possible to add multiple
//forms.books_fill_in.controller.loadAllRecords();//to make param(s) effective
//globals.log = ""
//
///** @type {*} */
//var _books = forms._books_fill_in.foundset
//var length = _books.getMaxRecordIndex()
//for(var i=1; i<=length; i++)
//{
//	_books.setSelectedIndex(i);
//	var bookabbr = _books.abbreviation
//	globals.log +="Adding book no "+ _books.pk + ": "+_books.book_name + " ("+bookabbr+ ")\n"
//	
//	forms.books_fill_in.controller.find()
//	forms.books_fill_in.pk = _books.pk
//	forms.books_fill_in.controller.search()
//	if (forms.books_fill_in.foundset.getMaxRecordIndex()==0)
//	{
//		globals.log +="\tEntry not found, adding new record in the \"books\" table\n"
//		forms.books_fill_in.controller.newRecord()
//	}
//	else
//	{	
//		globals.log +="\tEntry found, updating, old order number is: "+forms.books_fill_in.order_number+", new order number is: "+_books.order_number+"\n"
//	}
//	forms.books_fill_in.pk = _books.pk
//	forms.books_fill_in.abbreviation = _books.abbreviation
//	forms.books_fill_in.book_name = _books.book_name
//	forms.books_fill_in.max_chapter = _books.max_chapter
//	forms.books_fill_in.order_number = _books.order_number
//	forms.books_fill_in.testament = _books.testament
//	forms.books_fill_in.controller.saveData()
///*	
//	success = forms._chapters_fill_in.controller.addFoundSetFilterParam('book_id', '=',_books.pk );//possible to add multiple
//	forms._chapters_fill_in.controller.loadAllRecords();//to make param(s) effective
//	var _chapters = forms._chapters_fill_in.foundset
//	var clength = _chapters.getMaxRecordIndex()
//	for(var j=1; j<=clength; j++)
//	{
//		_chapters.setSelectedIndex(j)
//		globals.log+= "\tAdding chapter no "+_chapters.pk
//		
//		forms.chapters_fill_in.controller.find()
//		forms.chapters_fill_in.pk = _chapters.pk
//		forms.chapters_fill_in.controller.search()
//		if (forms.chapters_fill_in.foundset.getMaxRecordIndex()==0)
//		{
//			globals.log +="\n\t\tEntry not found, adding new record in the \"chapters\" table\n"
//			forms.chapters_fill_in.controller.newRecord()
//		}
//		else
//		{	
//			globals.log +="\n\t\tEntry found, updating, old book_id is: "+forms.chapters_fill_in.book_id+"\n"
//		}
//		forms.chapters_fill_in.pk = _chapters.pk
//		forms.chapters_fill_in.book_id = _books.pk
//		forms.chapters_fill_in.chapter_no = _chapters.chapter_no
//		forms.chapters_fill_in.subscr_id = _chapters.subscr_id
//		forms.chapters_fill_in.calc_book_name = _books.book_name
//		forms.chapters_fill_in.controller.saveData()
//	}	
//*/
//}

}
