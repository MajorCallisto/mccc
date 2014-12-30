if (typeof Element != 'undefined') {
Element.prototype.hasClass = function (className) {
    return new RegExp(' ' + className + ' ').test(' ' + this.className + ' ');
};
Element.prototype.addClass = function (className) {
	if (!this.hasClass(className)) { this.className += ' ' + className; }
};
Element.prototype.removeClass = function (className) {
	var newClass = ' ' + this.className.replace(/[\t\r\n]/g, ' ') + ' ';
	if (this.hasClass(className)) {
		while (newClass.indexOf( ' ' + className + ' ') >= 0) {
			newClass = newClass.replace(' ' + className + ' ', ' ');
		}
		this.className = newClass.replace(/^\s+|\s+$/g, ' ');
	}
};
}
window.addEventListener("keydown", function(e){
	
	if (e.keyCode == 68){
		/*if (document.body.hasClass("debug")){
			document.body.removeClass("debug")
		}else{
			document.body.addClass("debug")
		}
		*/
	}
	
});