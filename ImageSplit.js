import { TweenMax, Circ } from 'gsap';

/**
 *
 * @param opts
 */
export default function (opts) {
  const animationDuration = opts.animationDuration || 1.2;
  const image = new Image();
  image.src = opts.image;
  const parent = document.querySelector(opts.parent);
  const intensity = opts.intensity || 100;
  const ease = Circ.easeInOut;

  let linesNumbers = opts.line || 32;
  const defaultPosition = 150;
  const images = {
    image1: {
      image: new Image(),
      pos1: { value: defaultPosition },
      pos2: { value: defaultPosition },
      opacity: { value: 1 },
    },
    image2: {
      image: null,
      pos1: { value: defaultPosition },
      pos2: { value: defaultPosition },
      opacity: { value: 0 },
    },
  };
  images.image1.image.src = opts.image;

  // Create canvas
  const property = {};
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 1200;
  parent.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function draw(imageOpts) {
    if (imageOpts.image) {
      const halfLinesNumbers = linesNumbers / 2;
      const lineSize = 1600 / linesNumbers;
      // first image
      ctx.globalAlpha = imageOpts.opacity.value;
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i <= halfLinesNumbers; i += 1) {
        ctx.rect(i * lineSize * 2, imageOpts.pos1.value, lineSize, 900);
      }
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(imageOpts.image, 0, imageOpts.pos1.value, 1600, 900);
      ctx.restore();

      // second image
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i <= halfLinesNumbers; i += 1) {
        ctx.rect((i * lineSize * 2) - lineSize, imageOpts.pos2.value, lineSize, 900);
      }
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(imageOpts.image, 0, imageOpts.pos2.value, 1600, 900);
      ctx.restore();
    }
  }

  function animationHoverIn() {
    TweenMax.to(images.image1.pos1, animationDuration / 4, {
      value: defaultPosition - intensity / 4, rounProps: 'value', ease,
    });
    TweenMax.to(images.image1.pos2, animationDuration / 4, {
      value: defaultPosition + intensity / 4, rounProps: 'value', ease,
    });
  }

  function animationHoverOut(_animationDuration = animationDuration) {
    TweenMax.to(images.image1.pos1, _animationDuration / 4, {
      value: defaultPosition, rounProps: 'value', ease,
    });
    TweenMax.to(images.image1.pos2, _animationDuration / 4, {
      value: defaultPosition, intensity, rounProps: 'value', ease,
    });
  }

  function animateNext(_image) {
    images.image2.image = new Image();
    images.image2.image.src = _image;
    // Image 1
    TweenMax.to(images.image1.pos1, animationDuration, {
      value: defaultPosition + intensity * 8, rounProps: 'value', ease,
    });
    TweenMax.to(images.image1.pos2, animationDuration, {
      value: defaultPosition + intensity * 4, rounProps: 'value', ease,
    });
    TweenMax.to(images.image1.opacity, animationDuration / 8, {
      value: 0, rounProps: 'value', delay: animationDuration / 2 - animationDuration / 16,
    });

    // Image 2
    images.image2.pos1.value = defaultPosition + intensity * 8;
    images.image2.pos2.value = defaultPosition + intensity * 4;
    TweenMax.to([images.image2.pos1, images.image2.pos2], animationDuration, {
      value: defaultPosition, rounProps: 'value', ease,
    });
    TweenMax.to(images.image2.opacity, animationDuration / 8, {
      value: 1, rounProps: 'value', delay: animationDuration / 2 - animationDuration / 16,
    });
    window.setTimeout(() => {
      images.image1.opacity.value = 1;
      images.image2.opacity.value = 0;
      images.image1.pos1.value = defaultPosition;
      images.image1.pos2.value = defaultPosition;
      images.image1.image = images.image2.image;
      images.image2.image = null;
    }, animationDuration * 1000 + 200);
  }

  function animatePrevious(_image) {
    images.image2.image = new Image();
    images.image2.image.src = _image;
    // Image 1
    TweenMax.to(images.image1.pos1, animationDuration, {
      value: defaultPosition - intensity * 4, rounProps: 'value', ease,
    });
    TweenMax.to(images.image1.pos2, animationDuration, {
      value: defaultPosition - intensity * 2, rounProps: 'value', ease,
    });
    TweenMax.to(images.image1.opacity, animationDuration / 8, {
      value: 0, rounProps: 'value', delay: animationDuration / 2 - animationDuration / 16,
    });

    // Image 2
    images.image2.pos1.value = defaultPosition - intensity * 4;
    images.image2.pos2.value = defaultPosition - intensity * 2;
    TweenMax.to([images.image2.pos1, images.image2.pos2], animationDuration, {
      value: defaultPosition, rounProps: 'value', ease,
    });
    TweenMax.to(images.image2.opacity, animationDuration / 8, {
      value: 1, rounProps: 'value', delay: animationDuration / 2 - animationDuration / 16,
    });
    window.setTimeout(() => {
      images.image1.opacity.value = 1;
      images.image2.opacity.value = 0;
      images.image1.pos1.value = defaultPosition;
      images.image1.pos2.value = defaultPosition;
      images.image1.image = images.image2.image;
      images.image2.image = null;
    }, animationDuration * 1000 + 200);
  }

  function animate() {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, 1600, 1200);
    draw(images.image1);
    draw(images.image2);
  }

  function resizeCanvas() {
    property.width = parent.offsetWidth;
    property.height = parent.offsetHeight;
    canvas.style.width = `${property.width}px`;
  }

  function updateLinesNumbers(_linesNumbers) {
    linesNumbers = _linesNumbers;
  }

  window.addEventListener('resize', resizeCanvas);

  image.onload = () => {
    animate();
    resizeCanvas();
  };

  this.animationHoverIn = animationHoverIn;
  this.animationHoverOut = animationHoverOut;
  this.animateNext = animateNext;
  this.animatePrevious = animatePrevious;
  this.updateLinesNumbers = updateLinesNumbers;
  this.el = canvas;
  this.property = property;
}
