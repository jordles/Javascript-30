# Day 11 Custom Video Player

Had some initial issues pushing Day 11 to github. I didn't realize there was a 100mb limit, and i was having trouble removing a large file (almost 600mb) from my git history.  
I wanted to use a HD video for my fullscreen functionality to make the video clearer, but hosting this large file would not be feasible.

I added a couple new features like: fullscreen, and intuitive designs like adding logos for volume and playback, displaying the current video length / duration.  

I learned alot about the video element, including the difference between progress and timeupdate (though at the time this tutorial was made, these probably weren't defined and thoroughly explained yet)  
Nonetheless, the difference is that progress tracks the loading progress of a media data, often used to display the loading progress visually, while timeupdate is specifically used to track the playback time as the media plays, and will trigger alot more than progress on events. 

## Attribution
* None


## Key Topics
* Video (HTMLMediaElement)- Lots of properties and methods were used from this object to create our own functional playback media controls.
