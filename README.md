# Super Powered Web Gradient Creator

Create gradients in a variety of color spaces and generate a CSS compatible approximation.

Check it out! [gradients.cmiller.tech](https://gradients.cmiller.tech)


## What is this?

 A CSS gradient generator that can _simulate gradients in multiple color spaces_. This can provide more creative freedom with gradients on the web. The following color spaces are supported:

 - RGB (browser default)
 - LRGB
 - HSL
 - LAB
 - HCL

 ColorZilla has an [awesome gradient generator](http://www.colorzilla.com/gradient-editor/) but it's limited to RGB. Even if you set color stops in HSL, browsers will render the final gradient by interpolating RGB representations of the colors.

 The color space you choose to interpolate the values of a gradient can greatly affect the overall result. This experiment works around browser limitations and simulates CSS gradients in other color spaces. The generated gradients are still rendered in RGB, but they are nearly indistinguishable from a real gradient in the target color space. This is accomplished by adding several properly interpolated color stops in between the ones you set. With the extra help, the browser rendered gradients look good.


 ## TODO

 - Support an arbitrary number of color stops
 - Support other gradient types (radial, diagonal, etc.)


 ## Thanks

[Chroma.js](https://github.com/gka/chroma.js) was used for all of the color manipulation. Such a robust, well researched color library was indispensable.

[Material UI](http://www.material-ui.com) helped me iterate on the UI quickly with nice looking results.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). I've built asset pipelines myself, and it was a joy to not worry about that on this project. Huge shoutout to the maintainers of CRA for such a well thought out React CLI.
