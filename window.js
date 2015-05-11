// <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script> !!
// <script src="https://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script> !!
// style it yrself! sample styles included!

// title: string
// content: html string
// close: bool
// width & height: jQ css size strings/numbers
function Window (title, content, close, width, height) {
	this.title = title; // displays at top of window. not set to update.
	this.id = Date.now();
	this.width = width;
	this.height = height;
	this.close = close; // BOOL. should there be an x button to close the window?
	this.onClose = null; // you can add a close callback. see this.destroy() for deets.

	// set up our window div
	this.html = "<div class='dragme' data-window-id='" + this.id + "'>" +
					"<div class='handle'>" + this.title  + (close ? "<p class='x'>&times;</p>" : "") + "</div>" +
					"<div class='content'>" + content + "</div>" +
				"</div>";

	// run to display the div inside jQuery dom object $container at jQuery css position (x,y)
	this.display = function($container,x,y) {
		$container.append(this.html);
		var $w = $(".dragme[data-window-id='" + this.id + "']");
		$w.css("top", y);
		$w.css("left", x);
		$w.css("width", this.width);
		$w.css("height", this.height);

		$(".dragme").not($w).css("z-index", 9);
		$w.css("z-index", 10);

		if (this.close) {
			var self = this;
			$(".dragme[data-window-id='" + this.id + "'] p.x").click(function() {
				self.destroy();
			});
		}

		$w.draggable({ handle: ".handle" });

		$w.mousedown(function(e) {
				$(".dragme").not($w).css("z-index", 9);
				$w.css("z-index", 10);
		});
	};

	// called when the window's close button is clicked. can also be called from elsewhere.
	// will run cleanup handler this.onClose if it exists
	this.destroy = function() {	
		console.log(this.onClose);	
		if (this.onClose) {
			console.log("close callback");
			this.onClose.call();
		}
		$(".dragme[data-window-id='" + this.id + "']").remove();
	};

	// add a button to the top bar! make sure styles work out. probably won't be responsive.
	this.button = function(text, action) {
		$(".dragme[data-window-id='" + this.id + "'] .handle").append("<span class='button'>" + text + "</span>");
		var b = $(".dragme[data-window-id='" + this.id + "'] .handle").children(".button").last();
		b.click(action);
	};

	// interact with this window in jQuery
	this.jqObj = function() {
		return $(".dragme[data-window-id='" + this.id + "']");
	};
};