import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

/* eslint-env browser, node */

function isDataURL(str) {
  if (str === null) {
    return false;
  }
  var regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z-]+=[a-z-]+)?)?(;base64)?,[a-z0-9!$&',()*+;=\-._~:@/?%\s]*\s*$/i;
  return !!str.match(regex);
}

function loadImageURL(imageURL, crossOrigin) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload = function () {
      return resolve(image);
    };
    image.onerror = reject;
    if (isDataURL(imageURL) === false && crossOrigin) {
      image.crossOrigin = crossOrigin;
    }
    image.src = imageURL;
  });
}

/* eslint-env browser, node */
function loadImageFile(imageFile) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function (e) {
      try {
        var image = loadImageURL(e.target.result);
        resolve(image);
      } catch (e) {
        reject(e);
      }
    };
    reader.readAsDataURL(imageFile);
  });
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* eslint-env browser, node */
var makeCancelable = function makeCancelable(promise) {
  var hasCanceled_ = false;

  var wrappedPromise = new Promise(function (resolve, reject) {
    /* eslint-disable prefer-promise-reject-errors */
    promise.then(function (val) {
      return hasCanceled_ ? reject({ isCanceled: true }) : resolve(val);
    }, function (error) {
      return hasCanceled_ ? reject({ isCanceled: true }) : reject(error);
    });
  });

  return {
    promise: wrappedPromise,
    cancel: function cancel() {
      hasCanceled_ = true;
    }
  };
};

var isTouchDevice = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && ('ontouchstart' in window || navigator.msMaxTouchPoints > 0));

var isFileAPISupported = typeof File !== 'undefined';

var isPassiveSupported = function isPassiveSupported() {
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
  var passiveSupported = false;
  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function get$$1() {
        passiveSupported = true;
      }
    });

    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, options);
  } catch (err) {
    passiveSupported = false;
  }
  return passiveSupported;
};

var draggableEvents = {
  touch: {
    react: {
      down: 'onTouchStart',
      mouseDown: 'onMouseDown',
      drag: 'onTouchMove',
      move: 'onTouchMove',
      mouseMove: 'onMouseMove',
      up: 'onTouchEnd',
      mouseUp: 'onMouseUp'
    },
    native: {
      down: 'touchstart',
      mouseDown: 'mousedown',
      drag: 'touchmove',
      move: 'touchmove',
      mouseMove: 'mousemove',
      up: 'touchend',
      mouseUp: 'mouseup'
    }
  },
  desktop: {
    react: {
      down: 'onMouseDown',
      drag: 'onDragOver',
      move: 'onMouseMove',
      up: 'onMouseUp'
    },
    native: {
      down: 'mousedown',
      drag: 'dragStart',
      move: 'mousemove',
      up: 'mouseup'
    }
  }
};
var deviceEvents = isTouchDevice ? draggableEvents.touch : draggableEvents.desktop;

var pixelRatio = typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1;

// Draws a rounded rectangle on a 2D context.
var drawRoundedRect = function drawRoundedRect(context, x, y, width, height, borderRadius) {
  if (borderRadius === 0) {
    context.rect(x, y, width, height);
  } else {
    var widthMinusRad = width - borderRadius;
    var heightMinusRad = height - borderRadius;
    context.translate(x, y);
    context.arc(borderRadius, borderRadius, borderRadius, Math.PI, Math.PI * 1.5);
    context.lineTo(widthMinusRad, 0);
    context.arc(widthMinusRad, borderRadius, borderRadius, Math.PI * 1.5, Math.PI * 2);
    context.lineTo(width, heightMinusRad);
    context.arc(widthMinusRad, heightMinusRad, borderRadius, Math.PI * 2, Math.PI * 0.5);
    context.lineTo(borderRadius, height);
    context.arc(borderRadius, heightMinusRad, borderRadius, Math.PI * 0.5, Math.PI);
    context.translate(-x, -y);
  }
};

var defaultEmptyImage = {
  x: 0.5,
  y: 0.5
};

var AvatarEditor = function (_React$Component) {
  inherits(AvatarEditor, _React$Component);

  function AvatarEditor() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, AvatarEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = AvatarEditor.__proto__ || Object.getPrototypeOf(AvatarEditor)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      drag: false,
      my: null,
      mx: null,
      image: defaultEmptyImage
    }, _this.handleImageReady = function (image) {
      var imageState = _this.getInitialSize(image.width, image.height);
      imageState.resource = image;
      imageState.x = 0.5;
      imageState.y = 0.5;
      _this.setState({ drag: false, image: imageState }, _this.props.onImageReady);
      _this.props.onLoadSuccess(imageState);
    }, _this.clearImage = function () {
      var canvas = _this.canvas;
      var context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      _this.setState({
        image: defaultEmptyImage
      });
    }, _this.handleMouseDown = function (e) {
      e = e || window.event;
      // if e is a touch event, preventDefault keeps
      // corresponding mouse events from also being fired
      // later.
      e.preventDefault();
      _this.setState({
        drag: true,
        mx: null,
        my: null
      });
    }, _this.handleMouseUp = function () {
      if (_this.state.drag) {
        _this.setState({ drag: false });
        _this.props.onMouseUp();
      }
    }, _this.handleMouseMove = function (e) {
      e = e || window.event;
      if (_this.state.drag === false) {
        return;
      }

      e.preventDefault(); // stop scrolling on iOS Safari

      var mousePositionX = e.targetTouches ? e.targetTouches[0].pageX : e.clientX;
      var mousePositionY = e.targetTouches ? e.targetTouches[0].pageY : e.clientY;

      var newState = {
        mx: mousePositionX,
        my: mousePositionY
      };

      var rotate = _this.props.rotate;

      rotate %= 360;
      rotate = rotate < 0 ? rotate + 360 : rotate;

      if (_this.state.mx && _this.state.my) {
        var mx = _this.state.mx - mousePositionX;
        var my = _this.state.my - mousePositionY;

        var width = _this.state.image.width * _this.props.scale;
        var height = _this.state.image.height * _this.props.scale;

        var _this$getCroppingRect = _this.getCroppingRect(),
            lastX = _this$getCroppingRect.x,
            lastY = _this$getCroppingRect.y;

        lastX *= width;
        lastY *= height;

        // helpers to calculate vectors
        var toRadians = function toRadians(degree) {
          return degree * (Math.PI / 180);
        };
        var cos = Math.cos(toRadians(rotate));
        var sin = Math.sin(toRadians(rotate));

        var x = lastX + mx * cos + my * sin;
        var y = lastY + -mx * sin + my * cos;

        var relativeWidth = 1 / _this.props.scale * _this.getXScale();
        var relativeHeight = 1 / _this.props.scale * _this.getYScale();

        var position = {
          x: x / width + relativeWidth / 2,
          y: y / height + relativeHeight / 2
        };

        _this.props.onPositionChange(position);

        newState.image = _extends({}, _this.state.image, position);
      }

      _this.setState(newState);

      _this.props.onMouseMove(e);
    }, _this.setCanvas = function (canvas) {
      _this.canvas = canvas;
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(AvatarEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // scaling by the devicePixelRatio can impact performance on mobile as it creates a very large canvas. This is an override to increase performance.
      if (this.props.disableHiDPIScaling) {
        pixelRatio = 1;
      }
      // eslint-disable-next-line react/no-find-dom-node
      var context = ReactDOM.findDOMNode(this.canvas).getContext('2d');
      if (this.props.image) {
        this.loadImage(this.props.image);
      }
      this.paint(context);
      if (document) {
        var passiveSupported = isPassiveSupported();
        var thirdArgument = passiveSupported ? { passive: false } : false;

        var nativeEvents = deviceEvents.native;
        document.addEventListener(nativeEvents.move, this.handleMouseMove, thirdArgument);
        document.addEventListener(nativeEvents.up, this.handleMouseUp, thirdArgument);
        if (isTouchDevice) {
          document.addEventListener(nativeEvents.mouseMove, this.handleMouseMove, thirdArgument);
          document.addEventListener(nativeEvents.mouseUp, this.handleMouseUp, thirdArgument);
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.image && this.props.image !== newProps.image || this.props.width !== newProps.width || this.props.height !== newProps.height) {
        this.loadImage(newProps.image);
      } else if (!newProps.image) {
        this.clearImage();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      // eslint-disable-next-line react/no-find-dom-node
      var canvas = ReactDOM.findDOMNode(this.canvas);
      var context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      this.paint(context);
      this.paintImage(context, this.state.image, this.props.border);

      if (prevProps.image !== this.props.image || prevProps.width !== this.props.width || prevProps.height !== this.props.height || prevProps.position !== this.props.position || prevProps.scale !== this.props.scale || prevProps.rotate !== this.props.rotate || prevState.my !== this.state.my || prevState.mx !== this.state.mx || prevState.image.x !== this.state.image.x || prevState.image.y !== this.state.image.y) {
        this.props.onImageChange();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (document) {
        var nativeEvents = deviceEvents.native;
        document.removeEventListener(nativeEvents.move, this.handleMouseMove, false);
        document.removeEventListener(nativeEvents.up, this.handleMouseUp, false);
        if (isTouchDevice) {
          document.removeEventListener(nativeEvents.mouseMove, this.handleMouseMove, false);
          document.removeEventListener(nativeEvents.mouseUp, this.handleMouseUp, false);
        }
      }
    }
  }, {
    key: 'isVertical',
    value: function isVertical() {
      return this.props.rotate % 180 !== 0;
    }
  }, {
    key: 'getBorders',
    value: function getBorders() {
      var border = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.border;

      return Array.isArray(border) ? border : [border, border];
    }
  }, {
    key: 'getDimensions',
    value: function getDimensions() {
      var _props = this.props,
          width = _props.width,
          height = _props.height,
          rotate = _props.rotate,
          border = _props.border;


      var canvas = {};

      var _getBorders = this.getBorders(border),
          _getBorders2 = slicedToArray(_getBorders, 2),
          borderX = _getBorders2[0],
          borderY = _getBorders2[1];

      var canvasWidth = width;
      var canvasHeight = height;

      if (this.isVertical()) {
        canvas.width = canvasHeight;
        canvas.height = canvasWidth;
      } else {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
      }

      canvas.width += borderX * 2;
      canvas.height += borderY * 2;

      return {
        canvas: canvas,
        rotate: rotate,
        width: width,
        height: height,
        border: border
      };
    }
  }, {
    key: 'getImage',
    value: function getImage() {
      // get relative coordinates (0 to 1)
      var cropRect = this.getCroppingRect();
      var image = this.state.image;

      // get actual pixel coordinates
      cropRect.x *= image.resource.width;
      cropRect.y *= image.resource.height;
      cropRect.width *= image.resource.width;
      cropRect.height *= image.resource.height;

      // create a canvas with the correct dimensions
      var canvas = document.createElement('canvas');

      if (this.isVertical()) {
        canvas.width = cropRect.height;
        canvas.height = cropRect.width;
      } else {
        canvas.width = cropRect.width;
        canvas.height = cropRect.height;
      }

      // draw the full-size image at the correct position,
      // the image gets truncated to the size of the canvas.
      var context = canvas.getContext('2d');

      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(this.props.rotate * Math.PI / 180);
      context.translate(-(canvas.width / 2), -(canvas.height / 2));

      if (this.isVertical()) {
        context.translate((canvas.width - canvas.height) / 2, (canvas.height - canvas.width) / 2);
      }

      context.drawImage(image.resource, -cropRect.x, -cropRect.y);

      return canvas;
    }

    /**
     * Get the image scaled to original canvas size.
     * This was default in 4.x and is now kept as a legacy method.
     */

  }, {
    key: 'getImageScaledToCanvas',
    value: function getImageScaledToCanvas() {
      var _getDimensions = this.getDimensions(),
          width = _getDimensions.width,
          height = _getDimensions.height;

      var canvas = document.createElement('canvas');

      if (this.isVertical()) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }

      // don't paint a border here, as it is the resulting image
      this.paintImage(canvas.getContext('2d'), this.state.image, 0, 1);

      return canvas;
    }
  }, {
    key: 'getXScale',
    value: function getXScale() {
      var canvasAspect = this.props.width / this.props.height;
      var imageAspect = this.state.image.width / this.state.image.height;

      return Math.min(1, canvasAspect / imageAspect);
    }
  }, {
    key: 'getYScale',
    value: function getYScale() {
      var canvasAspect = this.props.height / this.props.width;
      var imageAspect = this.state.image.height / this.state.image.width;

      return Math.min(1, canvasAspect / imageAspect);
    }
  }, {
    key: 'getCroppingRect',
    value: function getCroppingRect() {
      var position = this.props.position || {
        x: this.state.image.x,
        y: this.state.image.y
      };
      var width = 1 / this.props.scale * this.getXScale();
      var height = 1 / this.props.scale * this.getYScale();

      var croppingRect = {
        x: position.x - width / 2,
        y: position.y - height / 2,
        width: width,
        height: height
      };

      var xMin = 0;
      var xMax = 1 - croppingRect.width;
      var yMin = 0;
      var yMax = 1 - croppingRect.height;

      // If the cropping rect is larger than the image, then we need to change
      // our maxima & minima for x & y to allow the image to appear anywhere up
      // to the very edge of the cropping rect.
      var isLargerThanImage = this.props.disableBoundaryChecks || width > 1 || height > 1;

      if (isLargerThanImage) {
        xMin = -croppingRect.width;
        xMax = 1;
        yMin = -croppingRect.height;
        yMax = 1;
      }

      return _extends({}, croppingRect, {
        x: Math.max(xMin, Math.min(croppingRect.x, xMax)),
        y: Math.max(yMin, Math.min(croppingRect.y, yMax))
      });
    }
  }, {
    key: 'loadImage',
    value: function loadImage(image) {
      if (isFileAPISupported && image instanceof File) {
        this.loadingImage = makeCancelable(loadImageFile(image)).promise.then(this.handleImageReady).catch(this.props.onLoadFailure);
      } else if (typeof image === 'string') {
        this.loadingImage = makeCancelable(loadImageURL(image, this.props.crossOrigin)).promise.then(this.handleImageReady).catch(this.props.onLoadFailure);
      }
    }
  }, {
    key: 'getInitialSize',
    value: function getInitialSize(width, height) {
      var newHeight = void 0;
      var newWidth = void 0;

      var dimensions = this.getDimensions();
      var canvasRatio = dimensions.height / dimensions.width;
      var imageRatio = height / width;

      if (canvasRatio > imageRatio) {
        newHeight = this.getDimensions().height;
        newWidth = width * (newHeight / height);
      } else {
        newWidth = this.getDimensions().width;
        newHeight = height * (newWidth / width);
      }

      return {
        height: newHeight,
        width: newWidth
      };
    }
  }, {
    key: 'paintImage',
    value: function paintImage(context, image, border) {
      var scaleFactor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : pixelRatio;

      if (image.resource) {
        var position = this.calculatePosition(image, border);

        context.save();

        context.translate(context.canvas.width / 2, context.canvas.height / 2);
        context.rotate(this.props.rotate * Math.PI / 180);
        context.translate(-(context.canvas.width / 2), -(context.canvas.height / 2));

        if (this.isVertical()) {
          context.translate((context.canvas.width - context.canvas.height) / 2, (context.canvas.height - context.canvas.width) / 2);
        }

        context.scale(scaleFactor, scaleFactor);

        context.globalCompositeOperation = 'destination-over';
        context.drawImage(image.resource, position.x, position.y, position.width, position.height);

        context.restore();
      }
    }
  }, {
    key: 'calculatePosition',
    value: function calculatePosition(image, border) {
      image = image || this.state.image;

      var _getBorders3 = this.getBorders(border),
          _getBorders4 = slicedToArray(_getBorders3, 2),
          borderX = _getBorders4[0],
          borderY = _getBorders4[1];

      var croppingRect = this.getCroppingRect();

      var width = image.width * this.props.scale;
      var height = image.height * this.props.scale;

      var x = -croppingRect.x * width;
      var y = -croppingRect.y * height;

      if (this.isVertical()) {
        x += borderY;
        y += borderX;
      } else {
        x += borderX;
        y += borderY;
      }

      return {
        x: x,
        y: y,
        height: height,
        width: width
      };
    }
  }, {
    key: 'paint',
    value: function paint(context) {
      context.save();
      context.scale(pixelRatio, pixelRatio);
      context.translate(0, 0);
      context.fillStyle = 'rgba(' + this.props.color.slice(0, 4).join(',') + ')';

      var borderRadius = this.props.borderRadius;
      var dimensions = this.getDimensions();

      var _getBorders5 = this.getBorders(dimensions.border),
          _getBorders6 = slicedToArray(_getBorders5, 2),
          borderSizeX = _getBorders6[0],
          borderSizeY = _getBorders6[1];

      var height = dimensions.canvas.height;
      var width = dimensions.canvas.width;

      // clamp border radius between zero (perfect rectangle) and half the size without borders (perfect circle or "pill")
      borderRadius = Math.max(borderRadius, 0);
      borderRadius = Math.min(borderRadius, width / 2 - borderSizeX, height / 2 - borderSizeY);

      context.beginPath();
      // inner rect, possibly rounded
      drawRoundedRect(context, borderSizeX, borderSizeY, width - borderSizeX * 2, height - borderSizeY * 2, borderRadius);
      context.rect(width, 0, -width, height); // outer rect, drawn "counterclockwise"
      context.fill('evenodd');

      context.restore();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          scale = _props2.scale,
          rotate = _props2.rotate,
          image = _props2.image,
          border = _props2.border,
          borderRadius = _props2.borderRadius,
          width = _props2.width,
          height = _props2.height,
          position = _props2.position,
          color = _props2.color,
          style = _props2.style,
          crossOrigin = _props2.crossOrigin,
          onLoadFailure = _props2.onLoadFailure,
          onLoadSuccess = _props2.onLoadSuccess,
          onImageReady = _props2.onImageReady,
          onImageChange = _props2.onImageChange,
          onMouseUp = _props2.onMouseUp,
          onMouseMove = _props2.onMouseMove,
          onPositionChange = _props2.onPositionChange,
          disableBoundaryChecks = _props2.disableBoundaryChecks,
          disableHiDPIScaling = _props2.disableHiDPIScaling,
          rest = objectWithoutProperties(_props2, ['scale', 'rotate', 'image', 'border', 'borderRadius', 'width', 'height', 'position', 'color', 'style', 'crossOrigin', 'onLoadFailure', 'onLoadSuccess', 'onImageReady', 'onImageChange', 'onMouseUp', 'onMouseMove', 'onPositionChange', 'disableBoundaryChecks', 'disableHiDPIScaling']);


      var dimensions = this.getDimensions();
      var defaultStyle = {
        width: dimensions.canvas.width,
        height: dimensions.canvas.height,
        cursor: this.state.drag ? 'grabbing' : 'grab',
        touchAction: 'none'
      };

      var attributes = {
        width: dimensions.canvas.width * pixelRatio,
        height: dimensions.canvas.height * pixelRatio,
        style: _extends({}, defaultStyle, style)
      };

      attributes[deviceEvents.react.down] = this.handleMouseDown;
      if (isTouchDevice) {
        attributes[deviceEvents.react.mouseDown] = this.handleMouseDown;
      }

      return React.createElement('canvas', _extends({ ref: this.setCanvas }, attributes, rest));
    }
  }]);
  return AvatarEditor;
}(React.Component);

AvatarEditor.propTypes = {
  scale: PropTypes.number,
  rotate: PropTypes.number,
  image: PropTypes.oneOfType([PropTypes.string].concat(toConsumableArray(isFileAPISupported ? [PropTypes.instanceOf(File)] : []))),
  border: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  borderRadius: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  color: PropTypes.arrayOf(PropTypes.number),
  crossOrigin: PropTypes.oneOf(['', 'anonymous', 'use-credentials']),

  onLoadFailure: PropTypes.func,
  onLoadSuccess: PropTypes.func,
  onImageReady: PropTypes.func,
  onImageChange: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseMove: PropTypes.func,
  onPositionChange: PropTypes.func,
  disableBoundaryChecks: PropTypes.bool,
  disableHiDPIScaling: PropTypes.bool
};
AvatarEditor.defaultProps = {
  scale: 1,
  rotate: 0,
  border: 25,
  borderRadius: 0,
  width: 200,
  height: 200,
  color: [0, 0, 0, 0.5],
  onLoadFailure: function onLoadFailure() {},
  onLoadSuccess: function onLoadSuccess() {},
  onImageReady: function onImageReady() {},
  onImageChange: function onImageChange() {},
  onMouseUp: function onMouseUp() {},
  onMouseMove: function onMouseMove() {},
  onPositionChange: function onPositionChange() {},

  disableBoundaryChecks: false,
  disableHiDPIScaling: false
};

export default AvatarEditor;
