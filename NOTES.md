The top level navigation links were not working.  For some reason it would work unless I added a Index Template. 

However, it seemed to be something with the ApplicationRoute preloading I was doing that was really causing it.

I removed the preloading and the index route and it seems to work fine now.

I tried to recreate in a JSBin but it didnt seem to have the same effect. http://emberjs.jsbin.com/ITOQeYA/1/edit



Looks like it has something to do with the wrapping div around elements.  I might just need to name the outlets.
Github similar issue: https://github.com/emberjs/ember.js/issues/2842

