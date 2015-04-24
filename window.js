// <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script> !!
// <script src="https://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script> !!
// style it yrself!
function Window (title, content, close, width, height) {
	this.title = title;
	this.content = content;
	this.id = Date.now();
	this.width = width;
	this.height = height;

	this.html = "<div class='dragme' data-window-id='" + this.id + "'>" +
					"<div class='handle'>" + this.title  + (close ? "<p class='x'>&times;</p>" : "") + "</div>" +
					"<div class='content'>" + this.content + "</div>" +
				"</div>";

	this.display = function($container,x,y) {
		$container.append(this.html);
		var $w = $(".dragme[data-window-id='" + this.id + "']");
		$w.css("top", y);
		$w.css("left", x);
		console.log(this);
		$w.css("width", this.width);
		$w.css("height", this.height);

		if (close)
			$w.children("p.x").click(this.destroy);

		$w.draggable({ handle: ".handle" });

		$w.mousedown(function(e) {
				$(".dragme").not($w).css("z-index", 9);
				$w.css("z-index", 10);
		});
	};

	this.destroy = function() {
		$(".dragme[data-window-id='" + this.id + "']").remove();
	};
};