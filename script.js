let dragged;
const pos = 30;
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Multiple_items
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event
 * https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
 */

 /**
  * Rather than defining the <a> manually and repeatedly, we're using a JS object.
  * An empty object {} will leave a button-sized gap to help with alignment.
  */
let buttons = [
	{
		title: "I'm just a regular webpage",
		url: "https://obsproject.com/startup/v23-0-0"
	},
	{
		title: "800x600",
		url: "http://howbigismybrowser.com/",
		params: {
			"layer-name": "Resolution Info",
			"layer-width": 800,
			"layer-height": 600
		}
	},
	{
		title: "I'm a fancy third party overlay",
		url: "./overlay_example.html",
		params: {
			"layer-name": "Fancy Lower Third"
		},
		style: "btn-danger",
		tooltip: "Canvas Size<br>Drag me into OBS!"
	},
	{
		title: "1280x720",
		url: "http://howbigismybrowser.com/",
		params: {
			"layer-name": "Resolution Info",
			randomStuff: "Who knows",
			andMore: true,
			andEvenMore: 0,
			"layer-width": 1280,
			"layer-height": 720
		}
	},
	{},
	{
		title: "1280x1080",
		url: "http://howbigismybrowser.com/",
		params: {
			"layer-name": "Resolution Info",
			"layer-width": 1280,
			"layer-height": 1080
		}
	}
];


document.addEventListener("dragstart", e => {
	dragged = e.target;
	e.dataTransfer.setDragImage(document.querySelector('#dragImage'), pos, pos);
	e.dataTransfer.setData("text/uri-list", dragged.href);
});

document.addEventListener("dragend", e => dragged.blur());
document.addEventListener("click", e => e.preventDefault());
 
window.addEventListener("load", () => {
	var wrapper = document.getElementById("button-wrapper"); 
	for (let i = 0; i < buttons.length; i++) {
		const element = buttons[i];
		var linkWrapper = document.createElement("p");
		linkWrapper.classList.add("col-6");
		var newLink = document.createElement("a"); 
		newLink.href = element.url;
		if (element.params) newLink.href += '?' + $.param(element.params);
		newLink.draggable = true;
		newLink.classList.add("btn", "btn-primary", "link");
		if (element.style) newLink.classList.add(element.style);
		if (!element.url) newLink.classList.add("invisible");
		if (element.tooltip) {
			newLink.setAttribute("data-toggle", "tooltip");
			newLink.setAttribute("data-placement", "bottom");
			newLink.setAttribute("data-html", true);
			newLink.setAttribute("title", element.tooltip);
		}
		newLink.textContent = element.title;
		linkWrapper.appendChild(newLink);
		wrapper.appendChild(linkWrapper);
	
	}
	$('[data-toggle="tooltip"]').tooltip();
}, false);