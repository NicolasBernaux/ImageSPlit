# Image Effect

A lightweight split image animation in canvas.

### Usage
``` javascript
var myAnimation = new ImageSplit({
    parent: '.container',
    image: 'https://picsum.photos/1280/720',
  });
```
#### Mandatory parameters

| Name  | type | Default |
| ------------- | :--- | ------------- |
| parent | null | Query Selector |
| image | null | Image to animate|

#### Optional parameters

| Name  | type | Default |
| ------------- | :--- | ------------- |
| animationDuration | 1.2 | animation duration |
| intensity | 100 | intensity of the animation |
| linesNumbers | 32 | number of line for the image |

#### Animations
- `myAnimation.animationHoverIn();` Animate split
- `myAnimation.animationHoverOut(Int);` Animate slipt end
- `myAnimation.animateNext(Image);` Animate to change image with a next direction
- `myAnimation.animatePrevious(Image)` Animate to change image with a previous direction
- `myAnimation.updateLinesNumbers(Int)` Change the number of lines
- `myAnimation.resetAnimate(duration)` Reset with an animation

#### Ohter
- `myAnimation.el` Element
- `myAnimation.property` Element property (height, width)
