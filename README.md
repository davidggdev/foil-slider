# Foil slider

![snapshot](http://davidggdev.es/images/snapshot_03.jpg)

This slider is designed to display three elements as a mini-catalog or 
mode/game selector/...

It also works with mobile events. To operate just click on the white icon 
or in mobile version scroll your finger from the center to the right
to activate the scrolling.

[Example online](https://davidggdev.es/workbench/foil/)

PAY ATTENTION

~~Currently it only works with one instance.~~

This software is in a fully alpha version and its stability, performance or 
side effects is not assured.

# Updates

![](https://img.shields.io/badge/Alpha_1_wip-5c7219?style=for-the-badge&logo=esbuild&labelColor=1e485a&logoColor=white) 
![](https://img.shields.io/badge/UPDATE-2022/09/11_20:22-red?style=for-the-badge) 
 
Added options array with transition speed
Added text alt in controls
Refactorized controls and div elements needed

[Example online](https://davidggdev.es/workbench/foil/)

---
![](https://img.shields.io/badge/Alpha_1_wip-5c7219?style=for-the-badge&logo=esbuild&labelColor=1e485a&logoColor=white) 
![](https://img.shields.io/badge/UPDATE-2022/09/11-red?style=for-the-badge) 
 
![snapshot](http://davidggdev.es/images/snapshot_04.jpg)

Add single instance updated!
 
---

![](https://img.shields.io/badge/Alpha_1_init-196672?style=for-the-badge&logo=esbuild&labelColor=1e485a&logoColor=white) 
![](https://img.shields.io/badge/UPDATE-2022/09/11-red?style=for-the-badge) 

 
Setup proyect and repository

## Getting Started

To use this plugin it is necessary to include the latest version of jQuery 
currently available in [3.x](https://releases.jquery.com/)

You must include/copy the plugin, which is currently located in the directory

    foil-slider/foil-slider.js
  
Finally, the css file must be linked/copy:

    style.css

This is generated from a Sass compiler from the source file style.scss. 
Currently the styles applied are example styles and we try to keep the responsibility for
the size to the developer to apply their own customization styles. 

## Running 

To create a new instance it is necessary to create a div with the data-attribute
of [foil-slider] and inside it must contain the images that we want to show in the 
show in the slider:

```html 
<div class="my-slider" foil-slider>
    <img src="cyberpunk.png" alt=""/>
    <img src="mediaval.png" alt=""/>
    <img src="zombies.png" alt=""/> 
</div> 
```

It is important to note that currently it only works with img elements only. 
The slider transforms into divs with a series of options and settings.

Then in our javascript we will create the instance:

 ```javascript
 $(function($){
    "use strict";

    // foillider instance
    $('.my-slider').foilSlider({});
});
```

## Options

It is possible to pass a series of options to configure 
certain attributes of the slider.

Currently it is possible set up transition between elements speed in seconds.

This is an example of how you can customize a slider changing speed:

In the js instance:
 ```javascript
 $(function($){
    "use strict";

    // foilSlider instance
    $('.my-slider').foilSlider({
        animationSeconds: "0.6"     // Transition speed
    }); 
});
 ```

## Contributros

My biggest thanks to [MbSaku](https://github.com/MbSaku) for allowing me use his
media for the creation of the cards as a game selector
idea at [Dethquest](http://dethquest.com/index.php) 

You are already late to go and register and enjoy the best web based tabletop 
rpg game engine out there!

## Authors

  - **David Gonz??lez** - *davidggdev@davidggdev.es*
  
## License

MIT License

Copyright (c) [2022] 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 
