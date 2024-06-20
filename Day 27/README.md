# Day 27 Click and Drag

I added scroll snapping functionalities. Elements are coded to snap to the middle. You can use arrow keys, mouse scroll (non-snapping), or click and dragging to move our scrollbar. I encountered some issue with scroll snapping interacting with other elements, but the internet is a very helpful place! 

## Attribution
*[draggable w/ snapping](https://stackoverflow.com/questions/67962715/how-to-make-drag-to-scroll-work-smoothly-with-scroll-snapping)
* [animation w/ snapping](https://stackoverflow.com/questions/70014622/html-scroll-snap-doesnt-work-when-a-css-animation-is-playing)
* [horizontal scroll w/ snapping](https://stackoverflow.com/questions/61794477/css-scroll-snap-type-with-horizontal-scrolling)


## Key Topics
* We use mouse events and grab the position of our scrollbar and the elements we interact with to calculate the proper distance and location to move the scrollbar. 