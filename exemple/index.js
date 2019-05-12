import ImageEffect from './ImageSplit';

window.setTimeout(() => {
  const myAnimation = new ImageSplit({
    parent: '.container',
    image: "https://picsum.photos/1280/1080",
  });

  // myAnimation.animationHoverIn();
  // myAnimation.animationHoverOut(Int);
  // myAnimation.animateNext(Image);
  // myAnimation.animatePrevious(Image)
  // myAnimation.updateLinesNumbers(Int)
  // myAnimation.resetAnimate(duration)
},1000);
