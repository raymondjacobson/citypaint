function makeBlock(x, y, length) {
	d3.select("#area")
		.append("rect")
		.attr("x", x)
		.attr("y", y)
		.attr("width", length)
		.attr("height", length)
}