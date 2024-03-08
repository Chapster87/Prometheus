const react = {
  forwardRef: () => {},
  createElement: () => {},
};
const reactNative = {
  Platform: {
    select: () => {},
  },
  StyleSheet: {
    create: () => {},
  },
  PixelRatio: {
    getFontScale: () => {},
  },
};
const gluestackStyleReact = {
  createConfig: (config) => {
    return config;
  },
  createStyle: (config) => {
    return config;
  },
  createComponents: (config) => {
    return config;
  },
};
const gluestackStyleAnimationResolver = {
  AnimationResolver: class {
    constructor() {}
  },
};
const gluestackStyleLegendMotionAnimationDriver = {
};
const gluestackStyleMotiAnimationDriver = {
};

module.exports = {
  ...react,
  ...reactNative,
  ...gluestackStyleReact,
  ...gluestackStyleAnimationResolver,
  ...gluestackStyleLegendMotionAnimationDriver,
  ...gluestackStyleMotiAnimationDriver,
}
