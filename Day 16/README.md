# Day 16 Mouse Move Shadow

Instead of using offsetX or offsetY, I used clientX and clientY, since that property is checking the window itself, instead of checking relative to the targeted element.  
It saves me the need of checking which element is not part of the target.  
And i added some more cat themes :D

## Attribution
* None


## Key Topics
* MouseEvent - we used MouseEvent properties to target the mouse position and calculate how far our text-shadow should move out toward that mouse position.
