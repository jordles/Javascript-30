# Day 13 Slide in on Scroll

Had some trouble figuring out all the properties. It really just dums down to how specific the boundaries are being counted. Some will include margins, borders, scrollbars, etc. while some are specifically referecing the content itself.  
The assignment was using the window's and images' boundaries to determines when they would slide in. I use getBoundingClientRect() for values in relation to the viewport instead.  
I still don't quite understand the debouncer function yet fully... will be looking into that more. 

## Attribution
* Unsplash Images


## Key Topics
* HTMLElements/Element - grab the following size and positioning of elements by using the appropriate properties to determine the math needed to create our logic. 
