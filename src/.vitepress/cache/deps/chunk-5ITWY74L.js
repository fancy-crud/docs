import {
  Comment,
  Fragment,
  Text,
  Transition,
  createApp,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  createVNode,
  defineComponent,
  h,
  mergeProps,
  normalizeClass,
  normalizeStyle,
  openBlock,
  render,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDirective,
  resolveDynamicComponent,
  toDisplayString,
  toHandlerKey,
  toHandlers,
  vModelCheckbox,
  vModelRadio,
  vModelSelect,
  vShow,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-ODOPCOSX.js";
import {
  __publicField
} from "./chunk-GKWPUQBP.js";

// node_modules/@oruga-ui/oruga-next/dist/esm/helpers.mjs
function signPoly(value) {
  if (value < 0)
    return -1;
  return value > 0 ? 1 : 0;
}
var sign = Math.sign || signPoly;
function hasFlag(val, flag) {
  return (val & flag) === flag;
}
function mod(n, mod2) {
  return (n % mod2 + mod2) % mod2;
}
function bound(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
function getValueByPath(obj, path, defaultValue = void 0) {
  const value = path.split(".").reduce((o, i) => typeof o !== "undefined" ? o[i] : void 0, obj);
  return typeof value !== "undefined" ? value : defaultValue;
}
function indexOf(array, obj, fn) {
  if (!array)
    return -1;
  if (!fn || typeof fn !== "function")
    return array.indexOf(obj);
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i], obj)) {
      return i;
    }
  }
  return -1;
}
var isObject = (item) => typeof item === "object" && !Array.isArray(item);
var mergeFn = (target, source, deep = false) => {
  if (deep || !Object.assign) {
    const isDeep = (prop) => isObject(source[prop]) && target !== null && Object.prototype.hasOwnProperty.call(target, prop) && isObject(target[prop]);
    let replaced;
    if (source === null || typeof source === "undefined") {
      replaced = false;
    } else {
      replaced = Object.getOwnPropertyNames(source).map((prop) => ({ [prop]: isDeep(prop) ? mergeFn(target[prop], source[prop], deep) : source[prop] })).reduce((a, b) => ({ ...a, ...b }), {});
    }
    return {
      ...target,
      ...replaced
    };
  } else {
    return Object.assign(target, source);
  }
};
var merge = mergeFn;
var isMobile = {
  Android: function() {
    return typeof window !== "undefined" && window.navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return typeof window !== "undefined" && window.navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return typeof window !== "undefined" && window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return typeof window !== "undefined" && window.navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return typeof window !== "undefined" && window.navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};
function isWebKit() {
  return typeof window !== "undefined" && window.navigator.userAgent.indexOf("AppleWebKit/") !== -1 && window.navigator.userAgent.indexOf("Chrome/") === -1;
}
function removeElement(el) {
  if (typeof el.remove !== "undefined") {
    el.remove();
  } else if (typeof el.parentNode !== "undefined" && el.parentNode !== null) {
    el.parentNode.removeChild(el);
  }
}
function createAbsoluteElement(el) {
  const root = document.createElement("div");
  root.style.position = "absolute";
  root.style.left = "0px";
  root.style.top = "0px";
  const wrapper = document.createElement("div");
  root.appendChild(wrapper);
  wrapper.appendChild(el);
  document.body.appendChild(root);
  return root;
}
function escapeRegExpChars(value) {
  if (!value)
    return value;
  return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function toCssDimension(width) {
  return width === void 0 ? null : isNaN(width) ? width : width + "px";
}
function blankIfUndefined(value) {
  return typeof value !== "undefined" && value !== null ? value : "";
}
function defaultIfUndefined(value, defaultValue) {
  return typeof value !== "undefined" && value !== null ? value : defaultValue;
}
function getMonthNames(locale = void 0, format = "long") {
  const dates = [];
  for (let i = 0; i < 12; i++) {
    dates.push(new Date(2e3, i, 15));
  }
  const dtf = new Intl.DateTimeFormat(locale, {
    month: format
    // timeZone: 'UTC'
  });
  return dates.map((d) => dtf.format(d));
}
function getWeekdayNames(locale = void 0, firstDayOfWeek = 0, format = "narrow") {
  const dates = [];
  for (let i = 1, j = 0; j < 7; i++) {
    const d = new Date(2e3, 0, i);
    const day = d.getDay();
    if (day === firstDayOfWeek || j > 0) {
      dates.push(d);
      j++;
    }
  }
  const dtf = new Intl.DateTimeFormat(locale, {
    weekday: format
    // timeZone: 'UTC'
  });
  return dates.map((d) => dtf.format(d));
}
function matchWithGroups(pattern, str) {
  const matches = str.match(pattern);
  return pattern.toString().match(/<(.+?)>/g).map((group) => {
    const groupMatches = group.match(/<(.+)>/);
    if (!groupMatches || groupMatches.length <= 0) {
      return null;
    }
    return group.match(/<(.+)>/)[1];
  }).reduce((acc, curr, index30) => {
    if (matches && matches.length > index30) {
      acc[curr] = matches[index30 + 1];
    } else {
      acc[curr] = null;
    }
    return acc;
  }, {});
}
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate)
        func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow)
      func.apply(context, args);
  };
}
function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
var isDefined = (d) => d !== void 0;
function removeDiacriticsFromString(value) {
  if (!value)
    return value;
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// node_modules/@oruga-ui/oruga-next/dist/esm/config.mjs
var config = {
  iconPack: "mdi",
  useHtml5Validation: true,
  statusIcon: true,
  transformClasses: void 0
};
var setOptions = (options) => {
  config = options;
};
var getOptions = () => {
  return config;
};
var VueInstance;
var setVueInstance = (Vue) => {
  VueInstance = Vue;
};
var Programmatic = {
  getOptions,
  setOptions(options) {
    setOptions(merge(getOptions(), options, true));
  }
};
var Plugin = {
  install(Vue, options = {}) {
    setVueInstance(Vue);
    setOptions(merge(getOptions(), options, true));
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/plugins-0d853d1f.mjs
var _defaultSuffixProcessor = (input, suffix) => {
  return blankIfUndefined(input).split(" ").filter((cls) => cls.length > 0).map((cls) => cls + suffix).join(" ");
};
var _getContext = (vm) => {
  const computedNames = vm.$options.computed ? Object.keys(vm.$options.computed) : [];
  const computed = computedNames.filter((e) => !endsWith(e, "Classes")).reduce((o, key) => {
    o[key] = vm[key];
    return o;
  }, {});
  return { props: vm.$props, data: vm.$data, computed };
};
var BaseComponentMixin = defineComponent({
  isOruga: true,
  props: {
    override: Boolean
  },
  methods: {
    computedClass(field, defaultValue, suffix = "") {
      const config2 = this.$props.override === true ? {} : getOptions();
      const override = this.$props.override || getValueByPath(config2, `${this.$options.configField}.override`, false);
      const overrideClass = getValueByPath(config2, `${this.$options.configField}.${field}.override`, override);
      const globalTransformClasses = getValueByPath(config2, `transformClasses`, void 0);
      const localTransformClasses = getValueByPath(config2, `${this.$options.configField}.transformClasses`, void 0);
      let globalClass = getValueByPath(config2, `${this.$options.configField}.${field}.class`, "") || getValueByPath(config2, `${this.$options.configField}.${field}`, "");
      let currentClass = getValueByPath(this.$props, field);
      if (Array.isArray(currentClass)) {
        currentClass = currentClass.join(" ");
      }
      if (defaultValue.search("{*}") !== -1) {
        defaultValue = defaultValue.replace(/\{\*\}/g, suffix);
      } else {
        defaultValue = defaultValue + suffix;
      }
      let context = null;
      if (typeof currentClass === "function") {
        context = _getContext(this);
        currentClass = currentClass(suffix, context);
      } else {
        currentClass = _defaultSuffixProcessor(currentClass, suffix);
      }
      if (typeof globalClass === "function") {
        globalClass = globalClass(suffix, context || _getContext(this));
      } else {
        globalClass = _defaultSuffixProcessor(globalClass, suffix);
      }
      let appliedClasses = `${override && !overrideClass || !override && !overrideClass ? defaultValue : ""} ${blankIfUndefined(globalClass)} ${blankIfUndefined(currentClass)}`.trim().replace(/\s\s+/g, " ");
      if (localTransformClasses) {
        appliedClasses = localTransformClasses(appliedClasses);
      }
      if (globalTransformClasses) {
        appliedClasses = globalTransformClasses(appliedClasses);
      }
      return appliedClasses;
    }
  }
});
var oruga = {};
function addProgrammatic(property, component) {
  oruga[property] = component;
}
function useProgrammatic() {
  return { oruga, addProgrammatic };
}
var registerPlugin = (app, plugin) => {
  app.use(plugin);
};
var registerComponent = (app, component) => {
  app.component(component.name, component);
};
var registerComponentProgrammatic = (app, property, component) => {
  const { oruga: oruga2, addProgrammatic: addProgrammatic2 } = useProgrammatic();
  addProgrammatic2(property, component);
  if (!(app._context.provides && app._context.provides.oruga))
    app.provide("oruga", oruga2);
  if (!app.config.globalProperties.$oruga)
    app.config.globalProperties.$oruga = oruga2;
};

// node_modules/@oruga-ui/oruga-next/dist/esm/Icon-e7ad13c9.mjs
var mdiIcons = {
  sizes: {
    "default": "mdi-24px",
    "small": null,
    "medium": "mdi-36px",
    "large": "mdi-48px"
  },
  iconPrefix: "mdi-"
};
var faIcons = () => {
  const iconComponent = getValueByPath(getOptions(), "iconComponent");
  const faIconPrefix = iconComponent ? "" : "fa-";
  return {
    sizes: {
      "default": null,
      "small": null,
      "medium": faIconPrefix + "lg",
      "large": faIconPrefix + "2x"
    },
    iconPrefix: faIconPrefix,
    internalIcons: {
      "check": "check",
      "information": "info-circle",
      "alert": "exclamation-triangle",
      "alert-circle": "exclamation-circle",
      "arrow-up": "arrow-up",
      "chevron-right": "angle-right",
      "chevron-left": "angle-left",
      "chevron-down": "angle-down",
      "chevron-up": "angle-up",
      "eye": "eye",
      "eye-off": "eye-slash",
      "caret-down": "caret-down",
      "caret-up": "caret-up",
      "close-circle": "times-circle",
      "close": "times",
      "loading": "circle-notch"
    }
  };
};
var getIcons = () => {
  let icons = {
    mdi: mdiIcons,
    fa: faIcons(),
    fas: faIcons(),
    far: faIcons(),
    fad: faIcons(),
    fab: faIcons(),
    fal: faIcons()
  };
  const customIconPacks = getValueByPath(getOptions(), "customIconPacks");
  if (customIconPacks) {
    icons = merge(icons, customIconPacks, true);
  }
  return icons;
};
var getIcons$1 = getIcons;
var script = defineComponent({
  name: "OIcon",
  mixins: [BaseComponentMixin],
  configField: "icon",
  props: {
    /**
     * 	Color of the icon, optional
     *  @values primary, info, success, warning, danger, and any other custom color
     */
    variant: [String, Object],
    /**
     * Icon component name
     */
    component: String,
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    pack: String,
    /**
     * Icon name
     */
    icon: String,
    /**
     * Icon size, optional
     * @values small, medium, large
     */
    size: String,
    /**
     * Overrides icon font size, optional
     * @values Depends on library: null (smallest), fa-lg, fa-2x, fa-3x, fa-4x, fa-5x, mdi-18px, mdi-24px, mdi-36px, mdi-48px
     */
    customSize: String,
    /**
     * Add class to icon font, optional. See here for MDI, here for FontAwesome 4 and here for FontAwesome 5 custom classes
     */
    customClass: String,
    /**
     * When true makes icon clickable
     */
    clickable: Boolean,
    /** Enable spin effect on icon */
    spin: Boolean,
    /** Rotation 0-360 */
    rotation: [Number, String],
    /** @ignore */
    both: Boolean,
    rootClass: [String, Function, Array],
    clickableClass: [String, Function, Array],
    spinClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-icon"),
        { [this.computedClass("clickableClass", "o-icon--clickable")]: this.clickable },
        { [this.computedClass("spinClass", "o-icon--spin")]: this.spin },
        { [this.computedClass("sizeClass", "o-icon--", this.size)]: this.size },
        { [this.computedClass("variantClass", "o-icon--", this.newVariant)]: this.newVariant }
      ];
    },
    rootStyle() {
      const style = {};
      if (this.rotation) {
        style["transform"] = `rotate(${this.rotation}deg)`;
      }
      return style;
    },
    iconConfig() {
      return getIcons$1()[this.newPack];
    },
    iconPrefix() {
      if (this.iconConfig && this.iconConfig.iconPrefix) {
        return this.iconConfig.iconPrefix;
      }
      return "";
    },
    /**
    * Internal icon name based on the pack.
    * If pack is 'fa', gets the equivalent FA icon name of the MDI,
    * internal icons are always MDI.
    */
    newIcon() {
      return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`;
    },
    newPack() {
      return this.pack || getValueByPath(getOptions(), "iconPack", "mdi");
    },
    newVariant() {
      if (!this.variant)
        return;
      let newVariant = "";
      if (typeof this.variant === "string") {
        newVariant = this.variant;
      } else {
        newVariant = Object.keys(this.variant).filter((key) => this.variant[key])[0];
      }
      return newVariant;
    },
    newCustomSize() {
      return this.customSize || this.customSizeByPack;
    },
    customSizeByPack() {
      if (this.iconConfig && this.iconConfig.sizes) {
        if (this.size && this.iconConfig.sizes[this.size] !== void 0) {
          return this.iconConfig.sizes[this.size];
        } else if (this.iconConfig.sizes.default) {
          return this.iconConfig.sizes.default;
        }
      }
      return null;
    },
    useIconComponent() {
      if (this.component)
        return this.component;
      const component = getValueByPath(getOptions(), "iconComponent");
      if (component)
        return component;
      return null;
    }
  },
  methods: {
    /**
    * Equivalent icon name of the MDI.
    */
    getEquivalentIconOf(value) {
      if (!this.both) {
        return value;
      }
      if (this.iconConfig && this.iconConfig.internalIcons && this.iconConfig.internalIcons[value]) {
        return this.iconConfig.internalIcons[value];
      }
      return value;
    }
  }
});
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "span",
    {
      class: normalizeClass(_ctx.rootClasses),
      style: normalizeStyle(_ctx.rootStyle)
    },
    [!_ctx.useIconComponent ? (openBlock(), createElementBlock(
      "i",
      {
        key: 0,
        class: normalizeClass([_ctx.newPack, _ctx.newIcon, _ctx.newCustomSize, _ctx.customClass])
      },
      null,
      2
      /* CLASS */
    )) : (openBlock(), createElementBlock(
      Fragment,
      {
        key: 1
      },
      [createCommentVNode(" custom icon component "), (openBlock(), createBlock(resolveDynamicComponent(_ctx.useIconComponent), {
        icon: [_ctx.newPack, _ctx.newIcon],
        size: _ctx.newCustomSize,
        class: normalizeClass([_ctx.customClass])
      }, null, 8, ["icon", "size", "class"]))],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    ))],
    6
    /* CLASS, STYLE */
  );
}
script.render = render2;
script.__file = "src/components/icon/Icon.vue";

// node_modules/@oruga-ui/oruga-next/dist/esm/FormElementMixin-641da1dc.mjs
var validatableFormElementTypes = typeof window === "undefined" ? [] : [
  HTMLButtonElement,
  HTMLFieldSetElement,
  HTMLInputElement,
  HTMLObjectElement,
  HTMLOutputElement,
  HTMLSelectElement,
  HTMLTextAreaElement
];
function asValidatableFormElement(el) {
  if (validatableFormElementTypes.some((t) => el instanceof t)) {
    return el;
  } else {
    return null;
  }
}
var FormElementMixin = defineComponent({
  inject: {
    $field: { from: "$field", default: false }
  },
  emits: ["blur", "focus"],
  props: {
    /**
     * Makes input full width when inside a grouped or addon field
     */
    expanded: Boolean,
    /**
     * Makes the element rounded
     */
    rounded: Boolean,
    /**
     * Icon name to be added
     */
    icon: String,
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: String,
    /** Native options to use in HTML5 validation */
    autocomplete: String,
    /** Same as native maxlength, plus character counter */
    maxlength: [Number, String],
    /** Enable html 5 native validation */
    useHtml5Validation: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "useHtml5Validation", true);
      }
    },
    /** Show status icon using field and variant prop */
    statusIcon: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "statusIcon", true);
      }
    },
    /**
     * The message which is shown when a validation error occurs
     */
    validationMessage: String
  },
  data() {
    return {
      isValid: true,
      isFocused: false,
      newIconPack: this.iconPack
    };
  },
  computed: {
    parentField() {
      return this.$field;
    },
    /**
     * Get the type prop from parent if it's a Field.
     */
    statusVariant() {
      if (!this.parentField)
        return;
      if (!this.parentField.newVariant)
        return;
      if (typeof this.parentField.newVariant === "string") {
        return this.parentField.newVariant;
      } else {
        for (const key in this.parentField.newVariant) {
          if (this.parentField.newVariant[key]) {
            return key;
          }
        }
      }
    },
    /**
     * Get the message prop from parent if it's a Field.
     */
    statusMessage() {
      if (!this.parentField)
        return;
      return this.parentField.newMessage || this.parentField.hasMessageSlot;
    },
    /**
    * Icon name based on the variant.
    */
    statusVariantIcon() {
      const statusVariantIcon = getValueByPath(getOptions(), "statusVariantIcon", {
        "success": "check",
        "danger": "alert-circle",
        "info": "information",
        "warning": "alert"
      });
      return statusVariantIcon[this.statusVariant] || "";
    }
  },
  methods: {
    /**
     * Focus method that work dynamically depending on the component.
     */
    focus(e) {
      const el = this.getElement();
      if (!el)
        return;
      this.$nextTick(() => {
        if (el)
          el.focus();
      });
    },
    onBlur(event) {
      this.isFocused = false;
      if (this.parentField) {
        this.parentField.isFocused = false;
      }
      this.$emit("blur", event);
      this.checkHtml5Validity();
    },
    onFocus(event) {
      this.isFocused = true;
      if (this.parentField) {
        this.parentField.isFocused = true;
      }
      this.$emit("focus", event);
    },
    onInvalid(event) {
      this.checkHtml5Validity();
      const validatable = asValidatableFormElement(event.target);
      if (validatable && this.parentField && this.useHtml5Validation) {
        event.preventDefault();
        let isFirstInvalid = false;
        if (validatable.form != null) {
          const formElements = validatable.form.elements;
          for (let i = 0; i < formElements.length; ++i) {
            const element = asValidatableFormElement(formElements.item(i));
            if (element && element.willValidate && !element.validity.valid) {
              isFirstInvalid = validatable === element;
              break;
            }
          }
        }
        if (isFirstInvalid) {
          const fieldElement = this.parentField.$el;
          const invalidHandler = getValueByPath(getOptions(), "reportInvalidInput");
          if (invalidHandler instanceof Function) {
            invalidHandler(validatable, fieldElement);
          } else {
            const canScrollToField = fieldElement ? fieldElement.scrollIntoViewIfNeeded != void 0 : false;
            validatable.focus({ preventScroll: canScrollToField });
            if (canScrollToField) {
              fieldElement.scrollIntoViewIfNeeded();
            }
          }
        }
      }
      this.$emit("invalid", event);
    },
    getElement() {
      let el = this.$refs[this.$elementRef];
      while (el && el.$elementRef) {
        el = el.$refs[el.$elementRef];
      }
      return el;
    },
    setInvalid() {
      const variant = "danger";
      const message = this.validationMessage || this.getElement().validationMessage;
      this.setValidity(variant, message);
    },
    setValidity(variant, message) {
      this.$nextTick(() => {
        if (this.parentField) {
          if (!this.parentField.variant) {
            this.parentField.newVariant = variant;
          }
          if (!this.parentField.message) {
            this.parentField.newMessage = message;
          }
        }
      });
    },
    /**
     * Check HTML5 validation, set isValid property.
     * If validation fail, send 'danger' type,
     * and error message to parent if it's a Field.
     */
    checkHtml5Validity() {
      if (!this.useHtml5Validation)
        return;
      const el = this.getElement();
      if (!el)
        return;
      if (!el.validity.valid) {
        this.setInvalid();
        this.isValid = false;
      } else {
        this.setValidity(null, null);
        this.isValid = true;
      }
      return this.isValid;
    },
    syncFilled(value) {
      if (this.parentField) {
        this.parentField.isFilled = !!value;
      }
    }
  }
});

// node_modules/@oruga-ui/oruga-next/dist/esm/Input-5b84d324.mjs
var script2 = defineComponent({
  name: "OInput",
  components: {
    [script.name]: script
  },
  mixins: [BaseComponentMixin, FormElementMixin],
  configField: "input",
  inheritAttrs: false,
  emits: ["update:modelValue", "input", "focus", "blur", "invalid", "icon-click", "icon-right-click"],
  props: {
    /** @model */
    modelValue: [Number, String],
    /** Native options to use in HTML5 validation */
    autocomplete: String,
    /**
     * Input type, like native
     * @values Any native input type, and textarea
     */
    type: {
      type: String,
      default: "text"
    },
    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: String,
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: String,
    /**
     * 	Adds the reveal password functionality
     */
    passwordReveal: Boolean,
    /**
     * Makes the icon clickable
     */
    iconClickable: Boolean,
    /**
     * Show character counter when maxlength prop is passed
     */
    hasCounter: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "input.counter", false);
      }
    },
    /**
     * Automatically adjust height in textarea
     */
    autosize: {
      type: Boolean,
      default: false
    },
    /**
     * 	Icon name to be added on the right side
     */
    iconRight: String,
    /**
     * Make the icon right clickable
     */
    iconRightClickable: Boolean,
    /** Variant of right icon */
    iconRightVariant: String,
    /** Add a button/icon to clear the inputed text */
    clearable: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "input.clearable", false);
      }
    },
    rootClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    iconLeftSpaceClass: [String, Function, Array],
    iconRightSpaceClass: [String, Function, Array],
    inputClass: [String, Function, Array],
    roundedClass: [String, Function, Array],
    iconLeftClass: [String, Function, Array],
    iconRightClass: [String, Function, Array],
    counterClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },
  data() {
    return {
      newValue: this.modelValue,
      newType: this.type,
      // from mixin (ts workaround)
      newAutocomplete: this.autocomplete || getValueByPath(getOptions(), "input.autocompletete", "off"),
      isPasswordVisible: false,
      height: "auto"
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-ctrl-input"),
        { [this.computedClass("expandedClass", "o-ctrl-input--expanded")]: this.expanded }
      ];
    },
    inputClasses() {
      return [
        this.computedClass("inputClass", "o-input"),
        { [this.computedClass("roundedClass", "o-input--rounded")]: this.rounded },
        { [this.computedClass("sizeClass", "o-input--", this.size)]: this.size },
        { [this.computedClass("variantClass", "o-input--", this.statusVariant || this.variant)]: this.statusVariant || this.variant },
        { [this.computedClass("textareaClass", "o-input__textarea")]: this.type === "textarea" },
        { [this.computedClass("iconLeftSpaceClass", "o-input-iconspace-left")]: this.icon },
        { [this.computedClass("iconRightSpaceClass", "o-input-iconspace-right")]: this.hasIconRight }
      ];
    },
    iconLeftClasses() {
      return [
        this.computedClass("iconLeftClass", "o-input__icon-left")
      ];
    },
    iconRightClasses() {
      return [
        this.computedClass("iconRightClass", "o-input__icon-right")
      ];
    },
    counterClasses() {
      return [
        this.computedClass("counterClass", "o-input__counter")
      ];
    },
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        this.newValue = value;
        this.$emit("update:modelValue", this.newValue);
        this.syncFilled(this.newValue);
        !this.isValid && this.checkHtml5Validity();
      }
    },
    hasIconRight() {
      return this.passwordReveal || this.statusIcon && this.statusVariantIcon || this.clearable && this.newValue || this.iconRight;
    },
    rightIcon() {
      if (this.passwordReveal) {
        return this.passwordVisibleIcon;
      } else if (this.clearable && this.newValue) {
        return "close-circle";
      } else if (this.iconRight) {
        return this.iconRight;
      }
      return this.statusVariantIcon;
    },
    rightIconVariant() {
      if (this.passwordReveal || this.iconRight) {
        return this.iconRightVariant || this.variant || null;
      }
      return this.statusVariant;
    },
    /**
    * Check if have any message prop from parent if it's a Field.
    */
    hasMessage() {
      return !!this.statusMessage;
    },
    /**
    * Current password-reveal icon name.
    */
    passwordVisibleIcon() {
      return !this.isPasswordVisible ? "eye" : "eye-off";
    },
    /**
    * Get value length
    */
    valueLength() {
      if (typeof this.computedValue === "string") {
        return this.computedValue.length;
      } else if (typeof this.computedValue === "number") {
        return this.computedValue.toString().length;
      }
      return 0;
    },
    /**
    * Computed inline styles for autoresize
    */
    computedStyles() {
      if (!this.autosize)
        return {};
      return {
        resize: "none",
        height: this.height,
        overflow: "hidden"
      };
    },
    $elementRef() {
      return this.type === "textarea" ? "textarea" : "input";
    }
  },
  watch: {
    /**
    * When v-model is changed:
    *   1. Set internal value.
    */
    modelValue: {
      immediate: true,
      handler(value) {
        this.newValue = value;
        this.syncFilled(this.newValue);
        if (this.autosize) {
          this.resize();
        }
      }
    },
    type(type) {
      this.newType = type;
    }
  },
  methods: {
    /**
    * Toggle the visibility of a password-reveal input
    * by changing the type and focus the input right away.
    */
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
      this.newType = this.isPasswordVisible ? "text" : "password";
      this.$nextTick(() => {
        this.focus();
      });
    },
    onInput(event) {
      this.computedValue = event.target.value;
    },
    iconClick(emit, event) {
      this.$emit(emit, event);
      this.$nextTick(() => {
        this.focus();
      });
    },
    rightIconClick(event) {
      if (this.passwordReveal) {
        this.togglePasswordVisibility();
      } else if (this.clearable) {
        this.computedValue = "";
      } else if (this.iconRightClickable) {
        this.iconClick("icon-right-click", event);
      }
    },
    resize() {
      this.height = "auto";
      this.$nextTick(() => {
        const scrollHeight = this.$refs.textarea.scrollHeight;
        this.height = scrollHeight + "px";
      });
    }
  }
});
var _hoisted_1 = ["type", "autocomplete", "maxlength", "value"];
var _hoisted_2 = ["maxlength", "value"];
function render3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = resolveComponent("o-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.rootClasses)
    },
    [_ctx.type !== "textarea" ? (openBlock(), createElementBlock("input", mergeProps({
      key: 0
    }, _ctx.$attrs, {
      ref: "input",
      class: _ctx.inputClasses,
      type: _ctx.newType,
      autocomplete: _ctx.newAutocomplete,
      maxlength: _ctx.maxlength,
      value: _ctx.computedValue,
      onInput: _cache[0] || (_cache[0] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
      onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
      onFocus: _cache[2] || (_cache[2] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
      onInvalid: _cache[3] || (_cache[3] = (...args) => _ctx.onInvalid && _ctx.onInvalid(...args))
    }), null, 16, _hoisted_1)) : (openBlock(), createElementBlock("textarea", mergeProps({
      key: 1
    }, _ctx.$attrs, {
      ref: "textarea",
      class: _ctx.inputClasses,
      maxlength: _ctx.maxlength,
      value: _ctx.computedValue,
      onInput: _cache[4] || (_cache[4] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
      onBlur: _cache[5] || (_cache[5] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
      onFocus: _cache[6] || (_cache[6] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
      onInvalid: _cache[7] || (_cache[7] = (...args) => _ctx.onInvalid && _ctx.onInvalid(...args)),
      style: _ctx.computedStyles
    }), null, 16, _hoisted_2)), _ctx.icon ? (openBlock(), createBlock(_component_o_icon, {
      key: 2,
      class: normalizeClass(_ctx.iconLeftClasses),
      clickable: _ctx.iconClickable,
      icon: _ctx.icon,
      pack: _ctx.iconPack,
      size: _ctx.size,
      onClick: _cache[8] || (_cache[8] = ($event) => _ctx.iconClick("icon-click", $event))
    }, null, 8, ["class", "clickable", "icon", "pack", "size"])) : createCommentVNode("v-if", true), _ctx.hasIconRight ? (openBlock(), createBlock(_component_o_icon, {
      key: 3,
      class: normalizeClass(_ctx.iconRightClasses),
      clickable: _ctx.passwordReveal || _ctx.clearable || _ctx.iconRightClickable,
      icon: _ctx.rightIcon,
      pack: _ctx.iconPack,
      size: _ctx.size,
      variant: _ctx.rightIconVariant,
      both: "",
      onClick: _ctx.rightIconClick
    }, null, 8, ["class", "clickable", "icon", "pack", "size", "variant", "onClick"])) : createCommentVNode("v-if", true), _ctx.maxlength && _ctx.hasCounter && _ctx.isFocused && _ctx.type !== "number" ? (openBlock(), createElementBlock(
      "small",
      {
        key: 4,
        class: normalizeClass(_ctx.counterClasses)
      },
      toDisplayString(_ctx.valueLength) + " / " + toDisplayString(_ctx.maxlength),
      3
      /* TEXT, CLASS */
    )) : createCommentVNode("v-if", true)],
    2
    /* CLASS */
  );
}
script2.render = render3;
script2.__file = "src/components/input/Input.vue";

// node_modules/@oruga-ui/oruga-next/dist/esm/Autocomplete-4aff0b4b.mjs
var script3 = defineComponent({
  name: "OAutocomplete",
  configField: "autocomplete",
  components: {
    [script2.name]: script2
  },
  mixins: [BaseComponentMixin, FormElementMixin],
  inheritAttrs: false,
  emits: ["update:modelValue", "select", "infinite-scroll", "typing", "focus", "blur", "invalid", "icon-click", "icon-right-click"],
  props: {
    /** @model */
    modelValue: [Number, String],
    /** Options / suggestions */
    data: {
      type: Array,
      default: () => []
    },
    /** Native options to use in HTML5 validation */
    autocomplete: String,
    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: String,
    /** Property of the object (if data is array of objects) to use as display text, and to keep track of selected option */
    field: {
      type: String,
      default: "value"
    },
    /** The first option will always be pre-selected (easier to just hit enter or tab) */
    keepFirst: Boolean,
    /** Clear input text on select */
    clearOnSelect: Boolean,
    /** Open dropdown list on focus */
    openOnFocus: Boolean,
    /** Function to format an option to a string for display in the input as alternative to field prop) */
    customFormatter: Function,
    /** Makes the component check if list reached scroll end and emit infinite-scroll event. */
    checkInfiniteScroll: Boolean,
    /** Keep open dropdown list after select */
    keepOpen: Boolean,
    /** Add a button/icon to clear the inputed text */
    clearable: Boolean,
    /** Max height of dropdown content */
    maxHeight: [String, Number],
    /**
     * Position of dropdown
     * @values auto, top, bottom
     */
    menuPosition: {
      type: String,
      default: "auto"
    },
    /** Transition name to apply on dropdown list */
    animation: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "autocomplete.animation", "fade");
      }
    },
    /** Property of the object (if <code>data</code> is array of objects) to use as display text of group */
    groupField: String,
    /** Property of the object (if <code>data</code> is array of objects) to use as key to get items array of each group, optional */
    groupOptions: String,
    /** Number of milliseconds to delay before to emit typing event */
    debounceTyping: Number,
    /** Icon name to be added on the right side */
    iconRight: String,
    /** Clickable icon right if exists */
    iconRightClickable: Boolean,
    /** Append autocomplete content to body */
    appendToBody: Boolean,
    /** Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will add a tag when typing (default tab and enter) */
    confirmKeys: {
      type: Array,
      default: () => ["Tab", "Enter"]
    },
    /** Input type */
    type: {
      type: String,
      default: "text"
    },
    /**
     * Menu tag name
     */
    menuTag: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "autocomplete.menuTag", "div");
      }
    },
    /**
     * Menu item tag name
     */
    itemTag: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "autocomplete.itemTag", "div");
      }
    },
    /** Trigger the select event for the first pre-selected option when clicking outside and <code>keep-first</code> is enabled */
    selectOnClickOutside: Boolean,
    /** Allows the header in the autocomplete to be selectable */
    selectableHeader: Boolean,
    /** Allows the footer in the autocomplete to be selectable */
    selectableFooter: Boolean,
    rootClass: [String, Function, Array],
    menuClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    menuPositionClass: [String, Function, Array],
    itemClass: [String, Function, Array],
    itemHoverClass: [String, Function, Array],
    itemGroupTitleClass: [String, Function, Array],
    itemEmptyClass: [String, Function, Array],
    itemHeaderClass: [String, Function, Array],
    itemFooterClass: [String, Function, Array],
    inputClasses: {
      type: Object,
      default: () => {
        return getValueByPath(getOptions(), "autocomplete.inputClasses", {});
      }
    }
  },
  data() {
    return {
      selected: null,
      hovered: null,
      headerHovered: null,
      footerHovered: null,
      isActive: false,
      newValue: this.modelValue,
      ariaAutocomplete: this.keepFirst ? "both" : "list",
      newAutocomplete: this.autocomplete || "off",
      isListInViewportVertically: true,
      hasFocus: false,
      itemRefs: [],
      width: void 0,
      bodyEl: void 0
      // Used to append to body
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-acp"),
        { [this.computedClass("expandedClass", "o-acp--expanded")]: this.expanded }
      ];
    },
    menuClasses() {
      return [
        this.computedClass("menuClass", "o-acp__menu"),
        { [this.computedClass("menuPositionClass", "o-acp__menu--", this.newDropdownPosition)]: !this.appendToBody }
      ];
    },
    itemClasses() {
      return [
        this.computedClass("itemClass", "o-acp__item")
      ];
    },
    itemEmptyClasses() {
      return [
        ...this.itemClasses,
        this.computedClass("itemEmptyClass", "o-acp__item--empty")
      ];
    },
    itemGroupClasses() {
      return [
        ...this.itemClasses,
        this.computedClass("itemGroupTitleClass", "o-acp__item-group-title")
      ];
    },
    itemHeaderClasses() {
      return [
        ...this.itemClasses,
        this.computedClass("itemHeaderClass", "o-acp__item-header"),
        { [this.computedClass("itemHoverClass", "o-acp__item--hover")]: this.headerHovered }
      ];
    },
    itemFooterClasses() {
      return [
        ...this.itemClasses,
        this.computedClass("itemFooterClass", "o-acp__item-footer"),
        { [this.computedClass("itemHoverClass", "o-acp__item--hover")]: this.footerHovered }
      ];
    },
    inputBind() {
      return {
        ...this.$attrs,
        ...this.inputClasses
      };
    },
    computedData() {
      if (this.groupField) {
        if (this.groupOptions) {
          const newData = [];
          this.data.forEach((option) => {
            const group = getValueByPath(option, this.groupField);
            const items2 = getValueByPath(option, this.groupOptions);
            newData.push({ group, items: items2 });
          });
          return newData;
        } else {
          const tmp = {};
          this.data.forEach((option) => {
            const group = getValueByPath(option, this.groupField);
            if (!tmp[group])
              tmp[group] = [];
            tmp[group].push(option);
          });
          const newData = [];
          Object.keys(this.data).forEach((group) => {
            newData.push({ group, items: this.data[group] });
          });
          return newData;
        }
      }
      return [{ items: this.data }];
    },
    isEmpty() {
      if (!this.computedData)
        return true;
      return !this.computedData.some((element) => element.items && element.items.length);
    },
    /**
     * White-listed items to not close when clicked.
     * Add input, dropdown and all children.
     */
    whiteList() {
      const whiteList = [];
      whiteList.push(this.$refs.input.$el.querySelector("input"));
      whiteList.push(this.$refs.dropdown);
      if (this.$refs.dropdown !== void 0) {
        const children = this.$refs.dropdown.querySelectorAll("*");
        for (const child of children) {
          whiteList.push(child);
        }
      }
      return whiteList;
    },
    newDropdownPosition() {
      if (this.menuPosition === "top" || this.menuPosition === "auto" && !this.isListInViewportVertically) {
        return "top";
      }
      return "bottom";
    },
    newIconRight() {
      if (this.clearable && this.newValue) {
        return "close-circle";
      }
      return this.iconRight;
    },
    newIconRightClickable() {
      if (this.clearable) {
        return true;
      }
      return this.iconRightClickable;
    },
    menuStyle() {
      return {
        maxHeight: toCssDimension(this.maxHeight)
      };
    },
    $elementRef() {
      return "input";
    }
  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    modelValue(value) {
      this.newValue = value;
    },
    /**
     * When dropdown is toggled, check the visibility to know when
     * to open upwards.
     */
    isActive(active) {
      if (this.menuPosition === "auto") {
        if (active) {
          this.calcDropdownInViewportVertical();
        } else {
          setTimeout(() => {
            this.calcDropdownInViewportVertical();
          }, 100);
        }
      }
    },
    /**
     * When updating input's value
     *   1. Emit changes
     *   2. If value isn't the same as selected, set null
     *   3. Close dropdown if value is clear or else open it
     */
    newValue(value) {
      this.$emit("update:modelValue", value);
      const currentValue = this.getValue(this.selected);
      if (currentValue && currentValue !== value) {
        this.setSelected(null, false);
      }
      if (this.hasFocus && (!this.openOnFocus || value)) {
        this.isActive = !!value;
      }
    },
    /**
     * Select first option if "keep-first
     */
    data() {
      if (this.keepFirst) {
        this.$nextTick(() => {
          if (this.isActive) {
            this.selectFirstOption(this.computedData);
          } else {
            this.setHovered(null);
          }
        });
      } else {
        if (this.hovered) {
          const hoveredValue = this.getValue(this.hovered);
          const data = this.computedData.map((d) => d.items).reduce((a, b) => [...a, ...b], []);
          if (!data.some((d) => this.getValue(d) === hoveredValue)) {
            this.setHovered(null);
          }
        }
      }
    },
    debounceTyping: {
      handler(value) {
        this.debouncedEmitTyping = debounce(this.emitTyping, value);
      },
      immediate: true
    }
  },
  methods: {
    itemOptionClasses(option) {
      return [
        ...this.itemClasses,
        { [this.computedClass("itemHoverClass", "o-acp__item--hover")]: option === this.hovered }
      ];
    },
    /**
     * Set which option is currently hovered.
     */
    setHovered(option) {
      if (option === void 0)
        return;
      this.hovered = option;
    },
    /**
     * Set which option is currently selected, update v-model,
     * update input value and close dropdown.
     */
    setSelected(option, closeDropdown = true, event = void 0) {
      if (option === void 0)
        return;
      this.selected = option;
      this.$emit("select", this.selected, event);
      if (this.selected !== null) {
        if (this.clearOnSelect) {
          const input = this.$refs.input;
          input.newValue = "";
          input.$refs.input.value = "";
        } else {
          this.newValue = this.getValue(this.selected);
        }
        this.setHovered(null);
      }
      closeDropdown && this.$nextTick(() => {
        this.isActive = false;
      });
      this.checkValidity();
    },
    /**
     * Select first option
     */
    selectFirstOption(computedData) {
      this.$nextTick(() => {
        const nonEmptyElements = computedData.filter((element) => element.items && element.items.length);
        if (nonEmptyElements.length) {
          const option = nonEmptyElements[0].items[0];
          this.setHovered(option);
        } else {
          this.setHovered(null);
        }
      });
    },
    /**
     * Key listener.
     * Select the hovered option.
     */
    keydown(event) {
      const { key } = event;
      if (key === "Enter")
        event.preventDefault();
      if (key === "Escape" || key === "Tab") {
        this.isActive = false;
      }
      if (this.confirmKeys.indexOf(key) >= 0) {
        if (key === ",")
          event.preventDefault();
        const closeDropdown = !this.keepOpen || key === "Tab";
        if (this.hovered === null) {
          this.checkIfHeaderOrFooterSelected(event, null, closeDropdown);
          return;
        }
        this.setSelected(this.hovered, closeDropdown, event);
      }
    },
    selectHeaderOrFoterByClick(event, origin) {
      this.checkIfHeaderOrFooterSelected(event, { origin });
    },
    /**
     * Check if header or footer was selected.
     */
    checkIfHeaderOrFooterSelected(event, triggerClick, closeDropdown = true) {
      if (this.selectableHeader && (this.headerHovered || triggerClick && triggerClick.origin === "header")) {
        this.$emit("select-header", event);
        this.headerHovered = false;
        if (triggerClick)
          this.setHovered(null);
        if (closeDropdown)
          this.isActive = false;
      }
      if (this.selectableFooter && (this.footerHovered || triggerClick && triggerClick.origin === "header")) {
        this.$emit("select-footer", event);
        this.footerHovered = false;
        if (triggerClick)
          this.setHovered(null);
        if (closeDropdown)
          this.isActive = false;
      }
    },
    /**
     * Close dropdown if clicked outside.
     */
    clickedOutside(event) {
      if (!this.hasFocus && this.whiteList.indexOf(event.target) < 0) {
        if (this.keepFirst && this.hovered && this.selectOnClickOutside) {
          this.setSelected(this.hovered, true);
        } else {
          this.isActive = false;
        }
      }
    },
    /**
     * Return display text for the input.
     * If object, get value from path, or else just the value.
     */
    getValue(option) {
      if (option === null)
        return;
      if (typeof this.customFormatter !== "undefined") {
        return this.customFormatter(option);
      }
      return typeof option === "object" ? getValueByPath(option, this.field) : option;
    },
    /**
     * Check if the scroll list inside the dropdown
     * reached it's end.
     */
    checkIfReachedTheEndOfScroll() {
      const list = this.$refs.dropdown;
      const footerHeight = this.$slots.footer ? this.$refs.footer.clientHeight : 0;
      if (list.clientHeight !== list.scrollHeight && list.scrollTop + list.clientHeight + footerHeight >= list.scrollHeight) {
        this.$emit("infinite-scroll");
      }
    },
    /**
     * Calculate if the dropdown is vertically visible when activated,
     * otherwise it is openened upwards.
     */
    calcDropdownInViewportVertical() {
      this.$nextTick(() => {
        if (!this.$refs.dropdown)
          return;
        const rect = this.$refs.dropdown.getBoundingClientRect();
        this.isListInViewportVertically = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
        if (this.appendToBody) {
          this.updateAppendToBody();
        }
      });
    },
    /**
     * Arrows keys listener.
     * If dropdown is active, set hovered option, or else just open.
     */
    keyArrows(direction) {
      const sum = direction === "down" ? 1 : -1;
      if (this.isActive) {
        const data = this.computedData.map((d) => d.items).reduce((a, b) => [...a, ...b], []);
        if (this.$slots.header && this.selectableHeader) {
          data.unshift(void 0);
        }
        if (this.$slots.footer && this.selectableFooter) {
          data.push(void 0);
        }
        let index30;
        if (this.headerHovered) {
          index30 = 0 + sum;
        } else if (this.footerHovered) {
          index30 = data.length - 1 + sum;
        } else {
          index30 = data.indexOf(this.hovered) + sum;
        }
        index30 = index30 > data.length - 1 ? data.length - 1 : index30;
        index30 = index30 < 0 ? 0 : index30;
        this.footerHovered = false;
        this.headerHovered = false;
        this.setHovered(data[index30] !== void 0 ? data[index30] : null);
        if (this.$slots.footer && this.selectableFooter && index30 === data.length - 1) {
          this.footerHovered = true;
        }
        if (this.$slots.header && this.selectableHeader && index30 === 0) {
          this.headerHovered = true;
        }
        const list = this.$refs.dropdown;
        let items2 = this.itemRefs || [];
        if (this.$slots.header && this.selectableHeader) {
          items2 = [this.$refs.header, ...items2];
        }
        if (this.$slots.footer && this.selectableFooter) {
          items2 = [...items2, this.$refs.footer];
        }
        const element = items2[index30];
        if (!element)
          return;
        const visMin = list.scrollTop;
        const visMax = list.scrollTop + list.clientHeight - element.clientHeight;
        if (element.offsetTop < visMin) {
          list.scrollTop = element.offsetTop;
        } else if (element.offsetTop >= visMax) {
          list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight;
        }
      } else {
        this.isActive = true;
      }
    },
    /**
     * Focus listener.
     * If value is the same as selected, select all text.
     */
    focused(event) {
      if (this.getValue(this.selected) === this.newValue) {
        this.$el.querySelector("input").select();
      }
      if (this.openOnFocus) {
        this.isActive = true;
        if (this.keepFirst) {
          this.selectFirstOption(this.computedData);
        }
      }
      this.hasFocus = true;
      this.$emit("focus", event);
    },
    /**
    * Blur listener.
    */
    onBlur(event) {
      this.hasFocus = false;
      this.$emit("blur", event);
    },
    onInput() {
      const currentValue = this.getValue(this.selected);
      if (currentValue && currentValue === this.newValue)
        return;
      if (this.debounceTyping) {
        this.debouncedEmitTyping();
      } else {
        this.emitTyping();
      }
    },
    emitTyping() {
      this.$emit("typing", this.newValue);
      this.checkValidity();
    },
    rightIconClick(event) {
      if (this.clearable) {
        this.newValue = "";
        this.setSelected(null, false);
        if (this.openOnFocus) {
          this.$refs.input.$el.focus();
        }
      } else {
        this.$emit("icon-right-click", event);
      }
    },
    checkValidity() {
      if (this.useHtml5Validation) {
        this.$nextTick(() => {
          this.checkHtml5Validity();
        });
      }
    },
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el);
      }
    },
    updateAppendToBody() {
      const dropdownMenu = this.$refs.dropdown;
      const trigger = this.$refs.input.$el;
      if (dropdownMenu && trigger) {
        const root = this.$data.bodyEl;
        root.classList.forEach((item) => root.classList.remove(...item.split(" ")));
        this.rootClasses.forEach((item) => {
          if (item) {
            if (typeof item === "object") {
              Object.keys(item).filter((key) => key && item[key]).forEach((key) => root.classList.add(key));
            } else {
              root.classList.add(...item.split(" "));
            }
          }
        });
        const rect = trigger.getBoundingClientRect();
        let top = rect.top + window.scrollY;
        const left = rect.left + window.scrollX;
        if (this.newDropdownPosition !== "top") {
          top += trigger.clientHeight;
        } else {
          top -= dropdownMenu.clientHeight;
        }
        dropdownMenu.style.position = "absolute";
        dropdownMenu.style.top = `${top}px`;
        dropdownMenu.style.left = `${left}px`;
        dropdownMenu.style.width = `${trigger.clientWidth}px`;
        dropdownMenu.style.maxWidth = `${trigger.clientWidth}px`;
        dropdownMenu.style.zIndex = "9999";
      }
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("click", this.clickedOutside);
      if (this.menuPosition === "auto")
        window.addEventListener("resize", this.calcDropdownInViewportVertical);
    }
  },
  mounted() {
    const list = this.$refs.dropdown;
    if (this.checkInfiniteScroll && list) {
      list.addEventListener("scroll", this.checkIfReachedTheEndOfScroll);
    }
    if (this.appendToBody) {
      this.$data.bodyEl = createAbsoluteElement(list);
      this.updateAppendToBody();
    }
  },
  beforeUpdate() {
    this.width = this.$refs.input ? this.$refs.input.$el.clientWidth : void 0;
    this.itemRefs = [];
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("click", this.clickedOutside);
      if (this.menuPosition === "auto")
        window.removeEventListener("resize", this.calcDropdownInViewportVertical);
    }
    if (this.checkInfiniteScroll && this.$refs.dropdown) {
      const list = this.$refs.dropdown;
      list.removeEventListener("scroll", this.checkIfReachedTheEndOfScroll);
    }
    if (this.appendToBody) {
      removeElement(this.$data.bodyEl);
    }
  }
});
var _hoisted_12 = ["is"];
var _hoisted_22 = ["is"];
var _hoisted_3 = ["is"];
var _hoisted_4 = {
  key: 1
};
var _hoisted_5 = ["is", "onClick"];
var _hoisted_6 = {
  key: 1
};
var _hoisted_7 = ["is"];
var _hoisted_8 = ["is"];
function render4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_input = resolveComponent("o-input");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.rootClasses)
    },
    [createVNode(_component_o_input, mergeProps(_ctx.inputBind, {
      modelValue: _ctx.newValue,
      "onUpdate:modelValue": [_cache[0] || (_cache[0] = ($event) => _ctx.newValue = $event), _ctx.onInput],
      ref: "input",
      type: _ctx.type,
      size: _ctx.size,
      rounded: _ctx.rounded,
      icon: _ctx.icon,
      "icon-right": _ctx.newIconRight,
      "icon-right-clickable": _ctx.newIconRightClickable,
      "icon-pack": _ctx.iconPack,
      maxlength: _ctx.maxlength,
      autocomplete: _ctx.newAutocomplete,
      "use-html5-validation": false,
      "aria-autocomplete": _ctx.ariaAutocomplete,
      expanded: _ctx.expanded,
      onFocus: _ctx.focused,
      onBlur: _ctx.onBlur,
      onInvalid: _ctx.onInvalid,
      onKeydown: [_ctx.keydown, _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => _ctx.keyArrows("up"), ["prevent"]), ["up"])), _cache[2] || (_cache[2] = withKeys(withModifiers(($event) => _ctx.keyArrows("down"), ["prevent"]), ["down"]))],
      onIconRightClick: _ctx.rightIconClick,
      onIconClick: _cache[3] || (_cache[3] = (event) => _ctx.$emit("icon-click", event))
    }), null, 16, ["modelValue", "type", "size", "rounded", "icon", "icon-right", "icon-right-clickable", "icon-pack", "maxlength", "autocomplete", "aria-autocomplete", "expanded", "onUpdate:modelValue", "onFocus", "onBlur", "onInvalid", "onKeydown", "onIconRightClick"]), createVNode(Transition, {
      name: _ctx.animation,
      persisted: ""
    }, {
      default: withCtx(() => [withDirectives(createBaseVNode("div", {
        class: normalizeClass(_ctx.menuClasses),
        is: _ctx.menuTag,
        style: normalizeStyle(_ctx.menuStyle),
        ref: "dropdown"
      }, [_ctx.$slots.header ? (openBlock(), createElementBlock("div", {
        key: 0,
        is: _ctx.itemTag,
        ref: "header",
        role: "button",
        tabindex: 0,
        onClick: _cache[4] || (_cache[4] = ($event) => _ctx.selectHeaderOrFoterByClick($event, "header")),
        class: normalizeClass(_ctx.itemHeaderClasses)
      }, [renderSlot(_ctx.$slots, "header")], 10, _hoisted_22)) : createCommentVNode("v-if", true), (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.computedData, (element, groupindex) => {
          return openBlock(), createElementBlock(
            Fragment,
            null,
            [element.group ? (openBlock(), createElementBlock("div", {
              is: _ctx.itemTag,
              key: groupindex + "group",
              class: normalizeClass(_ctx.itemGroupClasses)
            }, [_ctx.$slots.group ? renderSlot(_ctx.$slots, "group", {
              key: 0,
              group: element.group,
              index: groupindex
            }) : (openBlock(), createElementBlock(
              "span",
              _hoisted_4,
              toDisplayString(element.group),
              1
              /* TEXT */
            ))], 10, _hoisted_3)) : createCommentVNode("v-if", true), (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(element.items, (option, index30) => {
                return openBlock(), createElementBlock("div", {
                  key: groupindex + ":" + index30,
                  is: _ctx.itemTag,
                  class: normalizeClass(_ctx.itemOptionClasses(option)),
                  onClick: withModifiers(($event) => _ctx.setSelected(option, !_ctx.keepOpen, $event), ["stop"]),
                  ref_for: true,
                  ref: _ctx.setItemRef
                }, [_ctx.$slots.default ? renderSlot(_ctx.$slots, "default", {
                  key: 0,
                  option,
                  index: index30
                }) : (openBlock(), createElementBlock(
                  "span",
                  _hoisted_6,
                  toDisplayString(_ctx.getValue(option)),
                  1
                  /* TEXT */
                ))], 10, _hoisted_5);
              }),
              128
              /* KEYED_FRAGMENT */
            ))],
            64
            /* STABLE_FRAGMENT */
          );
        }),
        256
        /* UNKEYED_FRAGMENT */
      )), _ctx.isEmpty && _ctx.$slots.empty ? (openBlock(), createElementBlock("div", {
        key: 1,
        is: _ctx.itemTag,
        class: normalizeClass(_ctx.itemEmptyClasses)
      }, [renderSlot(_ctx.$slots, "empty")], 10, _hoisted_7)) : createCommentVNode("v-if", true), _ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
        key: 2,
        is: _ctx.itemTag,
        ref: "footer",
        role: "button",
        tabindex: 0,
        onClick: _cache[5] || (_cache[5] = ($event) => _ctx.selectHeaderOrFoterByClick($event, "footer")),
        class: normalizeClass(_ctx.itemFooterClasses)
      }, [renderSlot(_ctx.$slots, "footer")], 10, _hoisted_8)) : createCommentVNode("v-if", true)], 14, _hoisted_12), [[vShow, _ctx.isActive && (!_ctx.isEmpty || _ctx.$slots.empty || _ctx.$slots.header || _ctx.$slots.footer)]])]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"])],
    2
    /* CLASS */
  );
}
script3.render = render4;
script3.__file = "src/components/autocomplete/Autocomplete.vue";

// node_modules/@oruga-ui/oruga-next/dist/esm/autocomplete.mjs
var index = {
  install(app) {
    registerComponent(app, script3);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/Button-b2686fa8.mjs
var script4 = defineComponent({
  name: "OButton",
  components: {
    [script.name]: script
  },
  configField: "button",
  mixins: [BaseComponentMixin],
  inheritAttrs: false,
  props: {
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: String,
    /**
     * Size of button, optional
     * @values small, medium, large
     */
    size: String,
    /**
     * Button label, optional when default slot
     */
    label: String,
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: String,
    /**
     * Icon name to show on the left
     */
    iconLeft: String,
    /**
     * Icon name to show on the right
     */
    iconRight: String,
    /**
     * Rounded style
     */
    rounded: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "button.rounded", false);
      }
    },
    /**
     * Outlined style
     */
    outlined: Boolean,
    /**
     * Loading style
     */
    loading: Boolean,
    /**
     * Button will be expanded (full-width)
     */
    expanded: Boolean,
    inverted: Boolean,
    /**
     * Button type, like native
     */
    nativeType: {
      type: String,
      default: "button",
      validator: (value) => {
        return [
          "button",
          "submit",
          "reset"
        ].indexOf(value) >= 0;
      }
    },
    /**
     * Button tag name
     * @values button, a, input, router-link, nuxt-link (or other nuxt alias)
     */
    tag: {
      type: String,
      default: "button"
    },
    /**
     * Button will be disabled
     */
    disabled: Boolean,
    /**  @ignore */
    iconBoth: Boolean,
    elementsWrapperClass: [String, Function, Array],
    rootClass: [String, Function, Array],
    outlinedClass: [String, Function, Array],
    loadingClass: [String, Function, Array],
    invertedClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    roundedClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    iconClass: [String, Function, Array],
    iconLeftClass: [String, Function, Array],
    iconRightClass: [String, Function, Array],
    labelClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-btn"),
        { [this.computedClass("sizeClass", "o-btn--", this.size)]: this.size },
        { [this.computedClass("variantClass", "o-btn--", this.variant)]: this.variant },
        { [this.computedClass("outlinedClass", "o-btn--outlined")]: this.outlined && !this.variant },
        { [this.computedClass("invertedClass", "o-btn--inverted")]: this.inverted && !this.variant },
        { [this.computedClass("outlinedClass", "o-btn--outlined-", this.variant)]: this.outlined && this.variant },
        { [this.computedClass("invertedClass", "o-btn--inverted-", this.variant)]: this.inverted && this.variant },
        { [this.computedClass("expandedClass", "o-btn--expanded")]: this.expanded },
        { [this.computedClass("loadingClass", "o-btn--loading")]: this.loading },
        { [this.computedClass("roundedClass", "o-btn--rounded")]: this.rounded },
        { [this.computedClass("disabledClass", "o-btn--disabled")]: this.disabled }
      ];
    },
    labelClasses() {
      return [
        this.computedClass("labelClass", "o-btn__label")
      ];
    },
    iconClasses() {
      return [
        this.computedClass("iconClass", "o-btn__icon")
      ];
    },
    iconLeftClasses() {
      return [
        ...this.iconClasses,
        this.computedClass("iconLeftClass", "o-btn__icon-left")
      ];
    },
    iconRightClasses() {
      return [
        ...this.iconClasses,
        this.computedClass("iconRightClass", "o-btn__icon-right")
      ];
    },
    elementsWrapperClasses() {
      return [
        this.computedClass("elementsWrapperClass", "o-btn__wrapper")
      ];
    },
    computedTag() {
      if (typeof this.disabled !== "undefined" && this.disabled !== false) {
        return "button";
      }
      return this.tag;
    },
    computedNativeType() {
      if (this.tag === "button" || this.tag === "input") {
        return this.nativeType;
      }
      return null;
    },
    computedDisabled() {
      if (this.disabled)
        return true;
      return null;
    }
  }
});
function render5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = resolveComponent("o-icon");
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.computedTag), mergeProps(_ctx.$attrs, {
    disabled: _ctx.computedDisabled,
    type: _ctx.computedNativeType,
    class: _ctx.rootClasses
  }), {
    default: withCtx(() => [createBaseVNode(
      "span",
      {
        class: normalizeClass(_ctx.elementsWrapperClasses)
      },
      [_ctx.iconLeft ? (openBlock(), createBlock(_component_o_icon, {
        key: 0,
        pack: _ctx.iconPack,
        icon: _ctx.iconLeft,
        size: _ctx.size,
        both: _ctx.iconBoth,
        class: normalizeClass(_ctx.iconLeftClasses)
      }, null, 8, ["pack", "icon", "size", "both", "class"])) : createCommentVNode("v-if", true), _ctx.label || _ctx.$slots.default ? (openBlock(), createElementBlock(
        "span",
        {
          key: 1,
          class: normalizeClass(_ctx.labelClasses)
        },
        [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(
          toDisplayString(_ctx.label),
          1
          /* TEXT */
        )])],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true), _ctx.iconRight ? (openBlock(), createBlock(_component_o_icon, {
        key: 2,
        pack: _ctx.iconPack,
        icon: _ctx.iconRight,
        size: _ctx.size,
        both: _ctx.iconBoth,
        class: normalizeClass(_ctx.iconRightClasses)
      }, null, 8, ["pack", "icon", "size", "both", "class"])) : createCommentVNode("v-if", true)],
      2
      /* CLASS */
    )]),
    _: 3
    /* FORWARDED */
  }, 16, ["disabled", "type", "class"]);
}
script4.render = render5;
script4.__file = "src/components/button/Button.vue";

// node_modules/@oruga-ui/oruga-next/dist/esm/button.mjs
var index2 = {
  install(app) {
    registerComponent(app, script4);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/InjectedChildMixin-52b9a851.mjs
var items = 1;
var sorted$1 = 3;
var Sorted$1 = sorted$1;
var ProviderParentMixin = (itemName, flags = 0) => {
  const mixin = defineComponent({
    provide() {
      return {
        ["o" + itemName]: this
      };
    }
  });
  if (hasFlag(flags, items)) {
    mixin.data = function() {
      return {
        childItems: [],
        sequence: 1
      };
    };
    mixin.methods = {
      _registerItem(item) {
        item.index = this.childItems.length;
        this.childItems.push(item);
        if (this.$el) {
          this.$nextTick(() => {
            const ids = this.childItems.map((it) => `[data-id="${itemName}-${it.newValue}"]`).join(",");
            const sortedIds = Array.from(this.$el.querySelectorAll(ids)).map((el) => el.getAttribute("data-id").replace(`${itemName}-`, ""));
            this.childItems.forEach((it) => it.index = sortedIds.indexOf(`${it.newValue}`));
          });
        }
      },
      _unregisterItem(item) {
        this.childItems = this.childItems.filter((i) => i !== item);
      },
      _nextSequence() {
        return this.sequence++;
      }
    };
    if (hasFlag(flags, sorted$1)) {
      mixin.computed = {
        /**
         * When items are added/removed sort them according to their position
         */
        sortedItems() {
          return this.childItems.slice().sort((i1, i2) => {
            return i1.index - i2.index;
          });
        }
      };
    }
  }
  return mixin;
};
var sorted = 1;
var optional = 2;
var Sorted = sorted;
var InjectedChildMixin = (parentItemName, flags = 0) => {
  const mixin = defineComponent({
    inject: {
      parent: { from: "o" + parentItemName }
    },
    created() {
      this.newValue = defaultIfUndefined(this.value, this.parent && this.parent._nextSequence());
      if (!this.parent) {
        if (!hasFlag(flags, optional)) {
          throw new Error("You should wrap " + this.$options.name + " in a " + parentItemName);
        }
      } else {
        this.parent._registerItem(this);
      }
    },
    beforeUnmount() {
      if (this.parent) {
        this.parent._unregisterItem(this);
      }
    }
  });
  if (hasFlag(flags, sorted)) {
    mixin.data = () => {
      return {
        index: null
      };
    };
  }
  return mixin;
};

// node_modules/@oruga-ui/oruga-next/dist/esm/carousel.mjs
var script$1 = defineComponent({
  name: "OCarousel",
  components: {
    [script.name]: script
  },
  configField: "carousel",
  mixins: [ProviderParentMixin("carousel", Sorted$1), BaseComponentMixin],
  emits: ["update:modelValue", "scroll", "click"],
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    interval: {
      type: Number,
      default: () => {
        return getValueByPath(getOptions(), "carousel.interval", 3500);
      }
    },
    hasDrag: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    pauseHover: {
      type: Boolean,
      default: false
    },
    repeat: {
      type: Boolean,
      default: false
    },
    indicator: {
      type: Boolean,
      default: true
    },
    indicatorInside: {
      type: Boolean,
      default: false
    },
    indicatorMode: {
      type: String,
      default: "click"
    },
    indicatorPosition: {
      type: String,
      default: "bottom"
    },
    indicatorStyle: {
      type: String,
      default: "dots"
    },
    overlay: Boolean,
    itemsToShow: {
      type: Number,
      default: 1
    },
    itemsToList: {
      type: Number,
      default: 1
    },
    asIndicator: Boolean,
    arrow: {
      type: Boolean,
      default: true
    },
    arrowHover: {
      type: Boolean,
      default: true
    },
    iconPack: String,
    iconSize: String,
    iconPrev: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "carousel.iconPrev", "chevron-left");
      }
    },
    iconNext: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "carousel.iconNext", "chevron-right");
      }
    },
    breakpoints: {
      type: Object,
      default: () => ({})
    },
    rootClass: [String, Function, Array],
    overlayClass: [String, Function, Array],
    sceneClass: [String, Function, Array],
    itemsClass: [String, Function, Array],
    itemsDraggingClass: [String, Function, Array],
    arrowIconClass: [String, Function, Array],
    arrowIconPrevClass: [String, Function, Array],
    arrowIconNextClass: [String, Function, Array],
    indicatorsClass: [String, Function, Array],
    indicatorsInsideClass: [String, Function, Array],
    indicatorsInsidePositionClass: [String, Function, Array],
    indicatorItemClass: [String, Function, Array],
    indicatorItemActiveClass: [String, Function, Array],
    indicatorItemStyleClass: [String, Function, Array]
  },
  data() {
    return {
      activeIndex: this.modelValue,
      scrollIndex: this.modelValue,
      delta: 0,
      dragX: false,
      hold: 0,
      windowWidth: 0,
      touch: false,
      observer: null,
      refresh_: 0,
      itemsHovered: false,
      isPause: false,
      timer: null
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-car"),
        { [this.computedClass("overlayClass", "o-car__overlay")]: this.overlay }
      ];
    },
    sceneClasses() {
      return [
        this.computedClass("sceneClass", "o-car__scene")
      ];
    },
    itemsClasses() {
      return [
        this.computedClass("itemsClass", "o-car__items"),
        { [this.computedClass("itemsDraggingClass", "o-car__items--dragging")]: this.dragging }
      ];
    },
    arrowIconClasses() {
      return [
        this.computedClass("arrowIconClass", "o-car__arrow__icon")
      ];
    },
    arrowIconPrevClasses() {
      return [
        ...this.arrowIconClasses,
        this.computedClass("arrowIconPrevClass", "o-car__arrow__icon-prev")
      ];
    },
    arrowIconNextClasses() {
      return [
        ...this.arrowIconClasses,
        this.computedClass("arrowIconNextClass", "o-car__arrow__icon-next")
      ];
    },
    indicatorsClasses() {
      return [
        this.computedClass("indicatorsClass", "o-car__indicators"),
        { [this.computedClass("indicatorsInsideClass", "o-car__indicators--inside")]: this.indicatorInside },
        { [this.computedClass("indicatorsInsidePositionClass", "o-car__indicators--inside--", this.indicatorPosition)]: this.indicatorInside && this.indicatorPosition }
      ];
    },
    indicatorClasses() {
      return [
        this.computedClass("indicatorClass", "o-car__indicator")
      ];
    },
    dragging() {
      return this.dragX !== false;
    },
    itemStyle() {
      return `width: ${this.itemWidth}px;`;
    },
    translation() {
      return -bound(this.delta + this.scrollIndex * this.itemWidth, 0, (this.childItems.length - this.settings.itemsToShow) * this.itemWidth);
    },
    total() {
      return this.childItems.length - this.settings.itemsToShow;
    },
    indicatorCount() {
      return Math.ceil(this.total / this.settings.itemsToList) + 1;
    },
    indicatorIndex() {
      return Math.ceil(this.scrollIndex / this.settings.itemsToList);
    },
    hasArrows() {
      return this.settings.arrowHover && this.itemsHovered || !this.settings.arrowHover;
    },
    hasPrev() {
      return (this.settings.repeat || this.scrollIndex > 0) && this.hasArrows;
    },
    hasNext() {
      return (this.settings.repeat || this.scrollIndex < this.total) && this.hasArrows;
    },
    breakpointKeys() {
      const keys = Object.keys(this.breakpoints).map(Number);
      return keys.sort((a, b) => b - a);
    },
    settings() {
      let breakpoint = this.breakpointKeys.filter((breakpoint2) => {
        if (this.windowWidth >= breakpoint2) {
          return true;
        }
      })[0];
      if (breakpoint) {
        return { ...this.$props, ...this.breakpoints[breakpoint] };
      }
      return this.$props;
    },
    itemWidth() {
      if (this.windowWidth) {
        this.refresh_;
        const rect = this.$el.getBoundingClientRect();
        return rect.width / this.settings.itemsToShow;
      }
      return 0;
    }
  },
  watch: {
    /**
     * When v-model is changed set the new active item.
     */
    modelValue(value) {
      if (value <= this.childItems.length - 1) {
        this.activeIndex = value;
        this.switchTo(value * this.settings.itemsToList, true);
      }
    },
    /**
     *  When autoplay is changed, start or pause timer accordingly
     */
    autoplay(status) {
      if (status) {
        this.startTimer();
      } else {
        this.pauseTimer();
      }
    },
    /**
     *  Since the timer can get paused at the end, if repeat is changed we need to restart it
     */
    repeat(status) {
      if (status) {
        this.startTimer();
      }
    }
  },
  methods: {
    indicatorItemClasses(index30) {
      return [
        this.computedClass("indicatorItemClass", "o-car__indicator__item"),
        { [this.computedClass("indicatorItemActiveClass", "o-car__indicator__item--active")]: this.indicatorIndex === index30 },
        { [this.computedClass("indicatorItemStyleClass", "o-car__indicator__item--", this.indicatorStyle)]: this.indicatorStyle }
      ];
    },
    getChildItems() {
      return this.childItems;
    },
    onMouseEnter() {
      this.itemsHovered = true;
      this.checkPause();
    },
    onMouseLeave() {
      this.itemsHovered = false;
      this.startTimer();
    },
    startTimer() {
      if (!this.autoplay || this.timer)
        return;
      this.isPause = false;
      this.timer = setInterval(() => {
        if (!this.repeat && this.activeIndex >= this.childItems.length - 1) {
          this.pauseTimer();
        } else {
          this.next();
        }
      }, this.interval);
    },
    pauseTimer() {
      this.isPause = true;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    restartTimer() {
      this.pauseTimer();
      this.startTimer();
    },
    checkPause() {
      if (this.pauseHover && this.autoplay) {
        this.pauseTimer();
      }
    },
    modeChange(trigger, value) {
      if (this.indicatorMode === trigger) {
        return this.switchTo(value * this.settings.itemsToList);
      }
    },
    resized() {
      this.windowWidth = window.innerWidth;
    },
    switchTo(newIndex, onlyMove = this.asIndicator) {
      if (this.settings.repeat) {
        newIndex = mod(newIndex, this.total + 1);
      }
      newIndex = bound(newIndex, 0, this.total);
      this.scrollIndex = newIndex;
      this.$emit("scroll", this.indicatorIndex);
      if (!onlyMove) {
        this.activeIndex = Math.ceil(newIndex / this.settings.itemsToList);
        if (this.modelValue !== this.activeIndex) {
          this.$emit("update:modelValue", this.activeIndex);
        }
      }
    },
    next() {
      this.switchTo(this.scrollIndex + this.settings.itemsToList);
    },
    prev() {
      this.switchTo(this.scrollIndex - this.settings.itemsToList);
    },
    // handle drag event
    dragStart(event) {
      if (this.dragging || !this.settings.hasDrag || event.button !== 0 && event.type !== "touchstart")
        return;
      this.hold = Date.now();
      this.touch = !!event.touches;
      this.dragX = this.touch ? event.touches[0].clientX : event.clientX;
      if (this.touch) {
        this.pauseTimer();
      }
      window.addEventListener(this.touch ? "touchmove" : "mousemove", this.dragMove);
      window.addEventListener(this.touch ? "touchend" : "mouseup", this.dragEnd);
    },
    dragMove(event) {
      if (!this.dragging)
        return;
      const dragEndX = event.touches ? (event.changedTouches[0] || event.touches[0]).clientX : event.clientX;
      this.delta = this.dragX - dragEndX;
      if (!event.touches) {
        event.preventDefault();
      }
    },
    dragEnd(event) {
      if (!this.dragging && !this.hold)
        return;
      if (this.hold) {
        const signCheck = sign(this.delta);
        const results = Math.round(Math.abs(this.delta / this.itemWidth) + 0.15);
        this.switchTo(this.scrollIndex + signCheck * results);
      }
      this.delta = 0;
      this.dragX = false;
      if (event && event.touches) {
        this.startTimer();
      }
      window.removeEventListener(this.touch ? "touchmove" : "mousemove", this.dragMove);
      window.removeEventListener(this.touch ? "touchend" : "mouseup", this.dragEnd);
    },
    refresh() {
      this.$nextTick(() => {
        this.refresh_++;
      });
    }
  },
  mounted() {
    if (typeof window !== "undefined") {
      if (window.ResizeObserver) {
        this.observer = new window.ResizeObserver(this.refresh);
        this.observer.observe(this.$el);
      }
      window.addEventListener("resize", this.resized);
      document.addEventListener("animationend", this.refresh);
      document.addEventListener("transitionend", this.refresh);
      document.addEventListener("transitionstart", this.refresh);
      this.resized();
      this.startTimer();
    }
    if (this.$attrs.config) {
      throw new Error("The config prop was removed, you need to use v-bind instead");
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      if (window.ResizeObserver) {
        this.observer.disconnect();
      }
      window.removeEventListener("resize", this.resized);
      document.removeEventListener("animationend", this.refresh);
      document.removeEventListener("transitionend", this.refresh);
      document.removeEventListener("transitionstart", this.refresh);
      this.dragEnd();
      this.pauseTimer();
    }
  }
});
var _hoisted_13 = ["onMouseover", "onClick"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = resolveComponent("o-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.rootClasses),
      onMouseenter: _cache[2] || (_cache[2] = (...args) => _ctx.onMouseEnter && _ctx.onMouseEnter(...args)),
      onMouseleave: _cache[3] || (_cache[3] = (...args) => _ctx.onMouseLeave && _ctx.onMouseLeave(...args))
    },
    [createBaseVNode(
      "div",
      {
        class: normalizeClass(_ctx.sceneClasses)
      },
      [createBaseVNode(
        "div",
        {
          onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.dragStart && _ctx.dragStart(...args)),
          onTouchstart: _cache[1] || (_cache[1] = (...args) => _ctx.dragStart && _ctx.dragStart(...args)),
          class: normalizeClass(_ctx.itemsClasses),
          style: normalizeStyle("transform:translateX(" + _ctx.translation + "px)")
        },
        [renderSlot(_ctx.$slots, "default")],
        38
        /* CLASS, STYLE, HYDRATE_EVENTS */
      ), renderSlot(_ctx.$slots, "arrow", {
        hasPrev: _ctx.hasPrev,
        prev: _ctx.prev,
        hasNext: _ctx.hasNext,
        next: _ctx.next
      }, () => [_ctx.arrow ? (openBlock(), createElementBlock(
        Fragment,
        {
          key: 0
        },
        [withDirectives(createVNode(_component_o_icon, {
          class: normalizeClass(_ctx.arrowIconPrevClasses),
          onClick: _ctx.prev,
          pack: _ctx.iconPack,
          icon: _ctx.iconPrev,
          size: _ctx.iconSize,
          both: ""
        }, null, 8, ["class", "onClick", "pack", "icon", "size"]), [[vShow, _ctx.hasPrev]]), withDirectives(createVNode(_component_o_icon, {
          class: normalizeClass(_ctx.arrowIconNextClasses),
          onClick: _ctx.next,
          pack: _ctx.iconPack,
          icon: _ctx.iconNext,
          size: _ctx.iconSize,
          both: ""
        }, null, 8, ["class", "onClick", "pack", "icon", "size"]), [[vShow, _ctx.hasNext]])],
        64
        /* STABLE_FRAGMENT */
      )) : createCommentVNode("v-if", true)])],
      2
      /* CLASS */
    ), renderSlot(_ctx.$slots, "indicators", {
      active: _ctx.activeIndex,
      switchTo: _ctx.switchTo,
      indicatorIndex: _ctx.indicatorIndex
    }, () => [_ctx.getChildItems().length ? (openBlock(), createElementBlock(
      Fragment,
      {
        key: 0
      },
      [_ctx.indicator && !_ctx.asIndicator ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass(_ctx.indicatorsClasses)
        },
        [(openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(_ctx.indicatorCount, (_, index30) => {
            return openBlock(), createElementBlock("a", {
              class: normalizeClass(_ctx.indicatorClasses),
              onMouseover: ($event) => _ctx.modeChange("hover", index30),
              onClick: ($event) => _ctx.modeChange("click", index30),
              key: index30
            }, [renderSlot(_ctx.$slots, "indicator", {
              i: index30
            }, () => [createBaseVNode(
              "span",
              {
                class: normalizeClass(_ctx.indicatorItemClasses(index30))
              },
              null,
              2
              /* CLASS */
            )])], 42, _hoisted_13);
          }),
          128
          /* KEYED_FRAGMENT */
        ))],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true)],
      64
      /* STABLE_FRAGMENT */
    )) : createCommentVNode("v-if", true)]), _ctx.overlay ? renderSlot(_ctx.$slots, "overlay", {
      key: 0
    }) : createCommentVNode("v-if", true)],
    34
    /* CLASS, HYDRATE_EVENTS */
  );
}
script$1.render = render$1;
script$1.__file = "src/components/carousel/Carousel.vue";
var script5 = defineComponent({
  name: "OCarouselItem",
  configField: "carousel",
  mixins: [InjectedChildMixin("carousel", Sorted), BaseComponentMixin],
  props: {
    itemClass: [String, Function, Array],
    itemActiveClass: [String, Function, Array]
  },
  computed: {
    itemClasses() {
      return [
        this.computedClass("itemClass", "o-car__item"),
        { [this.computedClass("itemActiveClass", "o-car__item--active")]: this.isActive }
      ];
    },
    itemStyle() {
      return `width: ${this.parent.itemWidth}px;`;
    },
    isActive() {
      return this.parent.activeIndex === this.index;
    }
  },
  methods: {
    onClick(event) {
      if (this.isActive) {
        this.parent.$emit("click", event);
      }
      if (this.parent.asIndicator) {
        this.parent.activeIndex = this.index;
        this.parent.$emit("update:modelValue", this.index);
      }
    }
  }
});
function render6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.itemClasses),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
      style: normalizeStyle(_ctx.itemStyle)
    },
    [renderSlot(_ctx.$slots, "default")],
    6
    /* CLASS, STYLE */
  );
}
script5.render = render6;
script5.__file = "src/components/carousel/CarouselItem.vue";
var index3 = {
  install(app) {
    registerComponent(app, script$1);
    registerComponent(app, script5);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/CheckRadioMixin-f5b57344.mjs
var CheckRadioMixin = defineComponent({
  emits: ["update:modelValue"],
  props: {
    /** @model */
    modelValue: [String, Number, Boolean, Array],
    /**
     * Same as native value
     */
    nativeValue: [String, Number, Boolean, Array],
    /**
     * Color of the control, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: String,
    /**
     * Same as native disabled
     */
    disabled: Boolean,
    required: Boolean,
    /**
     * Same as native name
     */
    name: String,
    /**
     * Size of the control, optional
     * @values small, medium, large
     */
    size: String
  },
  data() {
    return {
      newValue: this.modelValue
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        this.newValue = value;
        this.$emit("update:modelValue", this.newValue);
      }
    }
  },
  watch: {
    /**
     * When v-model change, set internal value.
     */
    modelValue(value) {
      this.newValue = value;
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    }
  }
});

// node_modules/@oruga-ui/oruga-next/dist/esm/Checkbox-87279cd9.mjs
var script6 = defineComponent({
  name: "OCheckbox",
  mixins: [BaseComponentMixin, CheckRadioMixin],
  configField: "checkbox",
  emits: [
    "input"
  ],
  props: {
    /**
     * Same as native indeterminate
     */
    indeterminate: {
      type: Boolean,
      default: false
    },
    /**
     * Overrides the returned value when it's checked
     */
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    /**
     * Overrides the returned value when it's not checked
     */
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    /** Accessibility label to establish relationship between the checkbox and control label */
    ariaLabelledby: String,
    /* Same as native autocomplete */
    autocomplete: String,
    rootClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    checkClass: [String, Function, Array],
    checkedClass: [String, Function, Array],
    checkCheckedClass: [String, Function, Array],
    checkIndeterminateClass: [String, Function, Array],
    labelClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },
  watch: {
    indeterminate: {
      handler(val) {
        this.isIndeterminate = val;
      },
      immediate: true
    }
  },
  computed: {
    getLabel() {
      return this.$refs.label;
    },
    isChecked() {
      return this.computedValue === this.trueValue || Array.isArray(this.computedValue) && this.computedValue.indexOf(this.nativeValue) !== -1;
    },
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-chk"),
        { [this.computedClass("checkedClass", "o-chk--checked")]: this.isChecked },
        { [this.computedClass("sizeClass", "o-chk--", this.size)]: this.size },
        { [this.computedClass("disabledClass", "o-chk--disabled")]: this.disabled },
        { [this.computedClass("variantClass", "o-chk--", this.variant)]: this.variant }
      ];
    },
    checkClasses() {
      return [
        this.computedClass("checkClass", "o-chk__check"),
        { [this.computedClass("checkCheckedClass", "o-chk__check--checked")]: this.isChecked },
        { [this.computedClass("checkIndeterminateClass", "o-chk__check--indeterminate")]: this.isIndeterminate }
      ];
    },
    labelClasses() {
      return [
        this.computedClass("labelClass", "o-chk__label")
      ];
    }
  }
});
var _hoisted_14 = ["disabled", "required", "name", "autocomplete", "value", ".indeterminate", "true-value", "false-value", "aria-labelledby"];
var _hoisted_23 = ["id"];
function render7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "label",
    {
      class: normalizeClass(_ctx.rootClasses),
      ref: "label",
      onClick: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.focus && _ctx.focus(...args), ["stop"])),
      onKeydown: _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => _ctx.getLabel.click(), ["prevent"]), ["enter"]))
    },
    [withDirectives(createBaseVNode("input", mergeProps({
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
      type: "checkbox"
    }, _ctx.$attrs, {
      ref: "input",
      onClick: _cache[1] || (_cache[1] = withModifiers(() => {
      }, ["stop"])),
      class: _ctx.checkClasses,
      disabled: _ctx.disabled,
      required: _ctx.required,
      name: _ctx.name,
      autocomplete: _ctx.autocomplete,
      value: _ctx.nativeValue,
      ".indeterminate": _ctx.indeterminate,
      "true-value": _ctx.trueValue,
      "false-value": _ctx.falseValue,
      "aria-labelledby": _ctx.ariaLabelledby
    }), null, 16, _hoisted_14), [[vModelCheckbox, _ctx.computedValue]]), createBaseVNode("span", {
      id: _ctx.ariaLabelledby,
      class: normalizeClass(_ctx.labelClasses)
    }, [renderSlot(_ctx.$slots, "default")], 10, _hoisted_23)],
    34
    /* CLASS, HYDRATE_EVENTS */
  );
}
script6.render = render7;
script6.__file = "src/components/checkbox/Checkbox.vue";

// node_modules/@oruga-ui/oruga-next/dist/esm/checkbox.mjs
var index4 = {
  install(app) {
    registerComponent(app, script6);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/collapse.mjs
var script7 = defineComponent({
  name: "OCollapse",
  mixins: [BaseComponentMixin],
  configField: "collapse",
  emits: ["update:open", "open", "close"],
  props: {
    /**
     * Whether collapse is open or not, v-model:open to make it two-way binding
     */
    open: {
      type: Boolean,
      default: true
    },
    /**
     * Custom animation (transition name)
     */
    animation: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "collapse.animation", "fade");
      }
    },
    ariaId: {
      type: String,
      default: ""
    },
    /**
     * Trigger position
     * @values top, bottom
     */
    position: {
      type: String,
      default: "top",
      validator: (value) => {
        return [
          "top",
          "bottom"
        ].indexOf(value) > -1;
      }
    },
    rootClass: [String, Function, Array],
    triggerClass: [String, Function, Array],
    contentClass: [String, Function, Array]
  },
  data() {
    return {
      isOpen: this.open
    };
  },
  watch: {
    open(value) {
      this.isOpen = value;
    }
  },
  methods: {
    /**
    * Toggle and emit events
    */
    toggle() {
      this.isOpen = !this.isOpen;
      this.$emit("update:open", this.isOpen);
      this.$emit(this.isOpen ? "open" : "close");
    }
  },
  render() {
    const trigger = h("div", {
      class: this.computedClass("triggerClass", "o-clps__trigger"),
      onClick: this.toggle
    }, this.$slots.trigger({ open: this.isOpen }));
    const content = h(Transition, { name: this.animation }, () => withDirectives(h("div", {
      class: this.computedClass("contentClass", "o-clps__content"),
      "id": this.ariaId
    }, this.$slots.default()), [[vShow, this.isOpen]]));
    return h("div", { class: this.computedClass("rootClass", "o-clps") }, this.position === "top" ? [trigger, content] : [content, trigger]);
  }
});
script7.__file = "src/components/collapse/Collapse.vue";
var index5 = {
  install(app) {
    registerComponent(app, script7);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/MatchMediaMixin-d91585a4.mjs
var MatchMediaMixin = defineComponent({
  props: {
    /**
     * Mobile breakpoint as max-width value
     */
    mobileBreakpoint: String
  },
  data() {
    return {
      matchMediaRef: void 0,
      isMatchMedia: void 0
    };
  },
  methods: {
    onMatchMedia(event) {
      this.isMatchMedia = event.matches;
    }
  },
  created() {
    if (typeof window !== "undefined") {
      let width = this.mobileBreakpoint;
      if (!width) {
        const config2 = getOptions();
        const defaultWidth = getValueByPath(config2, `mobileBreakpoint`, "1023px");
        width = getValueByPath(config2, `${this.$options.configField}.mobileBreakpoint`, defaultWidth);
      }
      this.matchMediaRef = window.matchMedia(`(max-width: ${width})`);
      if (this.matchMediaRef) {
        this.isMatchMedia = this.matchMediaRef.matches;
        this.matchMediaRef.addListener(this.onMatchMedia, false);
      } else {
        this.isMatchMedia = false;
      }
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      if (this.matchMediaRef) {
        this.matchMediaRef.removeListener(this.checkMatchMedia);
      }
    }
  }
});

// node_modules/@oruga-ui/oruga-next/dist/esm/trapFocus-f32fb08f.mjs
var findFocusable = (element, programmatic = false) => {
  if (!element) {
    return null;
  }
  if (programmatic) {
    return element.querySelectorAll(`*[tabindex="-1"]`);
  }
  return element.querySelectorAll(`a[href]:not([tabindex="-1"]),
                                     area[href],
                                     input:not([disabled]),
                                     select:not([disabled]),
                                     textarea:not([disabled]),
                                     button:not([disabled]),
                                     iframe,
                                     object,
                                     embed,
                                     *[tabindex]:not([tabindex="-1"]),
                                     *[contenteditable]`);
};
var onKeyDown;
var bind = (el, { value = true }) => {
  if (value) {
    let focusable = findFocusable(el);
    let focusableProg = findFocusable(el, true);
    if (focusable && focusable.length > 0) {
      onKeyDown = (event) => {
        focusable = findFocusable(el);
        focusableProg = findFocusable(el, true);
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];
        if (event.target === firstFocusable && event.shiftKey && event.key === "Tab") {
          event.preventDefault();
          lastFocusable.focus();
        } else if ((event.target === lastFocusable || Array.from(focusableProg).indexOf(event.target) >= 0) && !event.shiftKey && event.key === "Tab") {
          event.preventDefault();
          firstFocusable.focus();
        }
      };
      el.addEventListener("keydown", onKeyDown);
    }
  }
};
var unbind = (el) => {
  el.removeEventListener("keydown", onKeyDown);
};
var directive = {
  beforeMount: bind,
  beforeUnmount: unbind
};
var trapFocus = directive;

// node_modules/@oruga-ui/oruga-next/dist/esm/DropdownItem-bf81cb78.mjs
var script$12 = defineComponent({
  name: "ODropdown",
  directives: {
    trapFocus
  },
  configField: "dropdown",
  mixins: [BaseComponentMixin, MatchMediaMixin],
  provide() {
    return {
      $dropdown: this
    };
  },
  emits: ["update:modelValue", "active-change", "change"],
  props: {
    /** @model */
    modelValue: {
      type: [String, Number, Boolean, Object, Array],
      default: null
    },
    /**
     * Dropdown disabled
     */
    disabled: Boolean,
    /**
     * Dropdown content (items) are shown inline, trigger is removed
     */
    inline: Boolean,
    /**
     * Dropdown content will be scrollable
     */
    scrollable: Boolean,
    /**
     * Max height of dropdown content
     */
    maxHeight: {
      type: [String, Number],
      default: () => {
        return getValueByPath(getOptions(), "dropdown.maxHeight", 200);
      }
    },
    /**
     * Optional, position of the dropdown relative to the trigger
     * @values top-right, top-left, bottom-left
     */
    position: {
      type: String,
      validator: (value) => {
        return [
          "top-right",
          "top-left",
          "bottom-left",
          "bottom-right"
        ].indexOf(value) > -1;
      }
    },
    /**
     * Dropdown content (items) are shown into a modal on mobile
     */
    mobileModal: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "dropdown.mobileModal", true);
      }
    },
    /**
     * Role attribute to be passed to list container for better accessibility. Use menu only in situations where your dropdown is related to navigation menus
     * @values list, menu, dialog
     */
    ariaRole: {
      type: String,
      validator: (value) => {
        return [
          "menu",
          "list",
          "dialog"
        ].indexOf(value) > -1;
      },
      default: null
    },
    /**
     * Custom animation (transition name)
     */
    animation: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "dropdown.animation", "fade");
      }
    },
    /**
     * Allows multiple selections
     */
    multiple: Boolean,
    /**
     * Trap focus inside the dropdown.
     */
    trapFocus: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "dropdown.trapFocus", true);
      }
    },
    /**
     * Close dropdown when content is clicked
     */
    closeOnClick: {
      type: Boolean,
      default: true
    },
    /**
     * Can close dropdown by pressing escape or by clicking outside
     * @values escape, outside
     */
    canClose: {
      type: [Array, Boolean],
      default: true
    },
    /**
     * Dropdown will be expanded (full-width)
     */
    expanded: Boolean,
    /**
     * Dropdown will be triggered by any events
     * @values click, hover, contextmenu, focus
     */
    triggers: {
      type: Array,
      default: () => ["click"]
    },
    /**
     * Dropdown menu tag name
     */
    menuTag: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "dropdown.menuTag", "div");
      }
    },
    /**
     * Set the tabindex attribute on the dropdown trigger div (-1 to prevent selection via tab key)
     */
    triggerTabindex: {
      type: Number,
      default: 0
    },
    /**
     * Append dropdown content to body
     */
    appendToBody: Boolean,
    /**
    * @ignore
    */
    appendToBodyCopyParent: Boolean,
    rootClass: [String, Function, Array],
    triggerClass: [String, Function, Array],
    inlineClass: [String, Function, Array],
    menuMobileOverlayClass: [String, Function, Array],
    menuClass: [String, Function, Array],
    menuPositionClass: [String, Function, Array],
    menuActiveClass: [String, Function, Array],
    mobileClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    expandedClass: [String, Function, Array]
  },
  data() {
    return {
      selected: this.modelValue,
      isActive: false,
      isHoverable: false,
      bodyEl: void 0
      // Used to append to body
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-drop"),
        { [this.computedClass("disabledClass", "o-drop--disabled")]: this.disabled },
        { [this.computedClass("expandedClass", "o-drop--expanded")]: this.expanded },
        { [this.computedClass("inlineClass", "o-drop--inline")]: this.inline },
        { [this.computedClass("mobileClass", "o-drop--mobile")]: this.isMobileModal && this.isMatchMedia && !this.hoverable }
      ];
    },
    triggerClasses() {
      return [
        this.computedClass("triggerClass", "o-drop__trigger")
      ];
    },
    menuMobileOverlayClasses() {
      return [
        this.computedClass("menuMobileOverlayClass", "o-drop__overlay")
      ];
    },
    menuClasses() {
      return [
        this.computedClass("menuClass", "o-drop__menu"),
        { [this.computedClass("menuPositionClass", "o-drop__menu--", this.position)]: this.position },
        { [this.computedClass("menuActiveClass", "o-drop__menu--active")]: this.isActive || this.inline }
      ];
    },
    isMobileModal() {
      return this.mobileModal && !this.inline;
    },
    cancelOptions() {
      return typeof this.canClose === "boolean" ? this.canClose ? ["escape", "outside"] : [] : this.canClose;
    },
    menuStyle() {
      return {
        maxHeight: this.scrollable ? toCssDimension(this.maxHeight) : null,
        overflow: this.scrollable ? "auto" : null
      };
    },
    hoverable() {
      return this.triggers.indexOf("hover") >= 0;
    }
  },
  watch: {
    /**
    * When v-model is changed set the new selected item.
    */
    modelValue(value) {
      this.selected = value;
    },
    /**
    * Emit event when isActive value is changed.
    */
    isActive(value) {
      this.$emit("active-change", value);
      if (this.appendToBody) {
        this.$nextTick(() => {
          this.updateAppendToBody();
        });
      }
    }
  },
  methods: {
    /**
     * Click listener from DropdownItem.
     *   1. Set new selected item.
     *   2. Emit input event to update the user v-model.
     *   3. Close the dropdown.
     */
    selectItem(value) {
      if (this.multiple) {
        if (this.selected) {
          if (this.selected.indexOf(value) === -1) {
            this.selected = [...this.selected, value];
          } else {
            this.selected = this.selected.filter((val) => val !== value);
          }
        } else {
          this.selected = [value];
        }
        this.$emit("change", this.selected);
      } else {
        if (this.selected !== value) {
          this.selected = value;
          this.$emit("change", this.selected);
        }
      }
      this.$emit("update:modelValue", this.selected);
      if (!this.multiple) {
        this.isActive = !this.closeOnClick;
        if (this.hoverable && this.closeOnClick) {
          this.isHoverable = false;
        }
      }
    },
    /**
    * White-listed items to not close when clicked.
    */
    isInWhiteList(el) {
      if (el === this.$refs.dropdownMenu)
        return true;
      if (el === this.$refs.trigger)
        return true;
      if (this.$refs.dropdownMenu !== void 0) {
        const children = this.$refs.dropdownMenu.querySelectorAll("*");
        for (const child of children) {
          if (el === child) {
            return true;
          }
        }
      }
      if (this.$refs.trigger !== void 0) {
        const children = this.$refs.trigger.querySelectorAll("*");
        for (const child of children) {
          if (el === child) {
            return true;
          }
        }
      }
      return false;
    },
    /**
    * Close dropdown if clicked outside.
    */
    clickedOutside(event) {
      if (this.cancelOptions.indexOf("outside") < 0)
        return;
      if (this.inline)
        return;
      if (!this.isInWhiteList(event.target))
        this.isActive = false;
    },
    /**
     * Keypress event that is bound to the document
     */
    keyPress({ key }) {
      if (this.isActive && (key === "Escape" || key === "Esc")) {
        if (this.cancelOptions.indexOf("escape") < 0)
          return;
        this.isActive = false;
      }
    },
    onClick() {
      if (this.triggers.indexOf("click") < 0)
        return;
      this.toggle();
    },
    onContextMenu() {
      if (this.triggers.indexOf("contextmenu") < 0)
        return;
      this.toggle();
    },
    onHover() {
      if (this.triggers.indexOf("hover") < 0)
        return;
      this.isHoverable = true;
    },
    onFocus() {
      if (this.triggers.indexOf("focus") < 0)
        return;
      this.toggle();
    },
    /**
    * Toggle dropdown if it's not disabled.
    */
    toggle() {
      if (this.disabled)
        return;
      if (!this.isActive) {
        this.$nextTick(() => {
          const value = !this.isActive;
          this.isActive = value;
          setTimeout(() => this.isActive = value);
        });
      } else {
        this.isActive = !this.isActive;
      }
    },
    updateAppendToBody() {
      const dropdownMenu = this.$refs.dropdownMenu;
      const trigger = this.$refs.trigger;
      if (dropdownMenu && trigger) {
        const dropdown = this.$data.bodyEl.children[0];
        dropdown.classList.forEach((item) => dropdown.classList.remove(...item.split(" ")));
        this.rootClasses.forEach((item) => {
          if (item) {
            if (typeof item === "object") {
              Object.keys(item).filter((key) => key && item[key]).forEach((key) => dropdown.classList.add(key));
            } else {
              dropdown.classList.add(...item.split(" "));
            }
          }
        });
        if (this.appendToBodyCopyParent) {
          const parentNode = this.$refs.dropdown.parentNode;
          const parent = this.$data.bodyEl;
          parent.classList.forEach((item) => parent.classList.remove(...item.split(" ")));
          parentNode.classList.forEach((item) => parent.classList.add(...item.split(" ")));
        }
        const rect = trigger.getBoundingClientRect();
        let top = rect.top + window.scrollY;
        let left = rect.left + window.scrollX;
        if (!this.position || this.position.indexOf("bottom") >= 0) {
          top += trigger.clientHeight;
        } else {
          top -= dropdownMenu.clientHeight;
        }
        if (this.position && this.position.indexOf("left") >= 0) {
          left -= dropdownMenu.clientWidth - trigger.clientWidth;
        }
        dropdownMenu.style.position = "absolute";
        dropdownMenu.style.top = `${top}px`;
        dropdownMenu.style.left = `${left}px`;
        dropdownMenu.style.zIndex = "9999";
      }
    }
  },
  mounted() {
    if (this.appendToBody) {
      this.$data.bodyEl = createAbsoluteElement(this.$refs.dropdownMenu);
      this.updateAppendToBody();
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("click", this.clickedOutside);
      document.addEventListener("keyup", this.keyPress);
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("click", this.clickedOutside);
      document.removeEventListener("keyup", this.keyPress);
    }
    if (this.appendToBody) {
      removeElement(this.$data.bodyEl);
    }
  }
});
var _hoisted_15 = ["tabindex"];
var _hoisted_24 = ["aria-hidden"];
var _hoisted_32 = ["is", "aria-hidden", "role", "aria-modal"];
function render$12(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_trap_focus = resolveDirective("trap-focus");
  return openBlock(), createElementBlock(
    "div",
    {
      ref: "dropdown",
      class: normalizeClass(_ctx.rootClasses),
      onMouseleave: _cache[4] || (_cache[4] = ($event) => _ctx.isHoverable = false)
    },
    [!_ctx.inline ? (openBlock(), createElementBlock("div", {
      key: 0,
      tabindex: _ctx.disabled ? null : _ctx.triggerTabindex,
      ref: "trigger",
      class: normalizeClass(_ctx.triggerClasses),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
      onContextmenu: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.onContextMenu && _ctx.onContextMenu(...args), ["prevent"])),
      onMouseenter: _cache[2] || (_cache[2] = (...args) => _ctx.onHover && _ctx.onHover(...args)),
      onFocusCapture: _cache[3] || (_cache[3] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
      "aria-haspopup": "true"
    }, [renderSlot(_ctx.$slots, "trigger", {
      active: _ctx.isActive
    })], 42, _hoisted_15)) : createCommentVNode("v-if", true), createVNode(Transition, {
      name: _ctx.animation
    }, {
      default: withCtx(() => [_ctx.isMobileModal ? withDirectives((openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.menuMobileOverlayClasses),
        "aria-hidden": !_ctx.isActive
      }, null, 10, _hoisted_24)), [[vShow, _ctx.isActive]]) : createCommentVNode("v-if", true)]),
      _: 1
      /* STABLE */
    }, 8, ["name"]), createVNode(Transition, {
      name: _ctx.animation,
      persisted: ""
    }, {
      default: withCtx(() => [withDirectives((openBlock(), createElementBlock("div", {
        ref: "dropdownMenu",
        is: _ctx.menuTag,
        class: normalizeClass(_ctx.menuClasses),
        "aria-hidden": !_ctx.isActive,
        role: _ctx.ariaRole,
        "aria-modal": !_ctx.inline,
        style: normalizeStyle(_ctx.menuStyle)
      }, [renderSlot(_ctx.$slots, "default")], 14, _hoisted_32)), [[vShow, !_ctx.disabled && (_ctx.isActive || _ctx.isHoverable) || _ctx.inline], [_directive_trap_focus, _ctx.trapFocus]])]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"])],
    34
    /* CLASS, HYDRATE_EVENTS */
  );
}
script$12.render = render$12;
script$12.__file = "src/components/dropdown/Dropdown.vue";
var script8 = defineComponent({
  name: "ODropdownItem",
  mixins: [BaseComponentMixin],
  configField: "dropdown",
  inject: ["$dropdown"],
  emits: ["click"],
  props: {
    /**
     * The value that will be returned on events and v-model
     */
    value: {
      type: [String, Number, Boolean, Object, Array]
    },
    /**
     * Item is disabled
     */
    disabled: Boolean,
    /**
     * Item is clickable and emit an event
     */
    clickable: {
      type: Boolean,
      default: true
    },
    /**
     * Dropdown item tag name
     */
    tag: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "dropdown.itemTag", "div");
      }
    },
    tabindex: {
      type: [Number, String],
      default: 0
    },
    ariaRole: {
      type: String,
      default: ""
    },
    itemClass: [String, Function, Array],
    itemActiveClass: [String, Function, Array],
    itemDisabledClass: [String, Function, Array]
  },
  computed: {
    parent() {
      return this.$dropdown;
    },
    rootClasses() {
      return [
        this.computedClass("itemClass", "o-drop__item"),
        { [this.computedClass("itemDisabledClass", "o-drop__item--disabled")]: this.parent.disabled || this.disabled },
        { [this.computedClass("itemActiveClass", "o-drop__item--active")]: this.isActive }
      ];
    },
    ariaRoleItem() {
      return this.ariaRole === "menuitem" || this.ariaRole === "listitem" ? this.ariaRole : null;
    },
    isClickable() {
      return !this.parent.disabled && !this.disabled && this.clickable;
    },
    isActive() {
      if (this.parent.selected === null)
        return false;
      if (this.parent.multiple)
        return this.parent.selected.indexOf(this.value) >= 0;
      return this.value === this.parent.selected;
    }
  },
  methods: {
    /**
    * Click listener, select the item.
    */
    selectItem() {
      if (!this.isClickable)
        return;
      this.parent.selectItem(this.value);
      this.$emit("click");
    }
  },
  created() {
    if (!this.parent) {
      throw new Error("You should wrap oDropdownItem on a oDropdown");
    }
  }
});
function render8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass(_ctx.rootClasses),
    onClick: _ctx.selectItem,
    role: _ctx.ariaRoleItem,
    tabindex: _ctx.tabindex
  }, {
    default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
    _: 3
    /* FORWARDED */
  }, 8, ["class", "onClick", "role", "tabindex"]);
}
script8.render = render8;
script8.__file = "src/components/dropdown/DropdownItem.vue";

// node_modules/@oruga-ui/oruga-next/dist/esm/Field-64a63988.mjs
var script$13 = defineComponent({
  name: "OFieldBody",
  inject: ["$field"],
  configField: "field",
  computed: {
    parent() {
      return this.$field;
    }
  },
  render() {
    let first = true;
    const slot = this.$slots.default();
    const children = slot.length === 1 && Array.isArray(slot[0].children) ? slot[0].children : slot;
    return h("div", { class: this.parent.bodyHorizontalClasses }, children.map((element) => {
      let message;
      if (element.type === Comment || element.type === Text) {
        return element;
      }
      if (first) {
        message = this.parent.newMessage;
        first = false;
      }
      return h(resolveComponent("OField"), { variant: this.parent.newVariant, message }, () => [element]);
    }));
  }
});
script$13.__file = "src/components/field/FieldBody.vue";
var script9 = defineComponent({
  name: "OField",
  components: {
    [script$13.name]: script$13
  },
  configField: "field",
  mixins: [BaseComponentMixin, MatchMediaMixin],
  provide() {
    return {
      $field: this
    };
  },
  inject: {
    $field: { from: "$field", default: false }
  },
  props: {
    /**
     * 	Color of the field and help message, also adds a matching icon, optional. Used by Input, Select and Autocomplete
     *  @values primary, info, success, warning, danger, and any other custom color
     */
    variant: String,
    /**
     * Field label
     */
    label: String,
    /**
     * Same as native for set on the label
     */
    labelFor: String,
    /**
     * Help message text
     */
    message: String,
    /**
     * Direct child components/elements of Field will be grouped horizontally (see which ones at the top of the page)
     */
    grouped: Boolean,
    /**
     * Allow controls to fill up multiple lines, making it responsive
     */
    groupMultiline: Boolean,
    /**
     * Group label and control on the same line for horizontal forms
     */
    horizontal: Boolean,
    /**
     * Field automatically attach controls together
     */
    addons: {
      type: Boolean,
      default: true
    },
    /**
    * Vertical size of input, optional
    * @values small, medium, large
    */
    labelSize: String,
    rootClass: [String, Function, Array],
    horizontalClass: [String, Function, Array],
    groupedClass: [String, Function, Array],
    groupMultilineClass: [String, Function, Array],
    labelClass: [String, Function, Array],
    labelSizeClass: [String, Function, Array],
    labelHorizontalClass: [String, Function, Array],
    bodyClass: [String, Function, Array],
    bodyHorizontalClass: [String, Function, Array],
    addonsClass: [String, Function, Array],
    messageClass: [String, Function, Array],
    variantMessageClass: [String, Function, Array],
    variantLabelClass: [String, Function, Array],
    mobileClass: [String, Function, Array],
    focusedClass: [String, Function, Array],
    filledClass: [String, Function, Array]
  },
  data() {
    return {
      newVariant: this.variant,
      newMessage: this.message,
      isFocused: false,
      isFilled: false
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-field"),
        { [this.computedClass("horizontalClass", "o-field--horizontal")]: this.horizontal },
        { [this.computedClass("mobileClass", "o-field--mobile")]: this.isMatchMedia },
        { [this.computedClass("focusedClass", "o-field--focused")]: this.isFocused },
        { [this.computedClass("filledClass", "o-field--filled")]: this.isFilled }
      ];
    },
    messageClasses() {
      return [
        this.computedClass("messageClass", "o-field__message"),
        { [this.computedClass("variantMessageClass", "o-field__message-", this.newVariant)]: this.newVariant }
      ];
    },
    labelClasses() {
      return [
        this.computedClass("labelClass", "o-field__label"),
        { [this.computedClass("labelSizeClass", "o-field__label-", this.labelSize)]: this.labelSize },
        { [this.computedClass("variantLabelClass", "o-field__label-", this.newVariant)]: this.newVariant }
      ];
    },
    labelHorizontalClasses() {
      return [
        this.computedClass("labelHorizontalClass", "o-field__horizontal-label")
      ];
    },
    bodyClasses() {
      return [
        this.computedClass("bodyClass", "o-field__body")
      ];
    },
    bodyHorizontalClasses() {
      return [
        this.computedClass("bodyHorizontalClass", "o-field__horizontal-body")
      ];
    },
    innerFieldClasses() {
      return [
        this.computedClass("rootClass", "o-field"),
        { [this.computedClass("groupMultilineClass", "o-field--grouped-multiline")]: this.groupMultiline },
        { [this.computedClass("groupedClass", "o-field--grouped")]: this.grouped },
        { [this.computedClass("addonsClass", "o-field--addons")]: !this.grouped && this.hasAddons() }
      ];
    },
    parent() {
      return this.$field;
    },
    hasLabelSlot() {
      return this.$slots.label;
    },
    hasMessageSlot() {
      return this.$slots.message;
    },
    hasLabel() {
      return this.label || this.hasLabelSlot;
    },
    hasMessage() {
      return (!this.parent || !this.parent.hasInnerField) && this.newMessage || this.hasMessageSlot;
    },
    hasInnerField() {
      return this.grouped || this.groupMultiline || this.hasAddons();
    }
  },
  watch: {
    /**
    * Set internal variant when prop change.
    */
    variant(value) {
      this.newVariant = value;
    },
    /**
    * Set internal message when prop change.
    */
    message(value) {
      this.newMessage = value;
    },
    /**
    * Set parent message if we use Field in Field.
    */
    newMessage(value) {
      if (this.parent && this.parent.hasInnerField) {
        if (!this.parent.variant) {
          this.parent.newVariant = this.newVariant;
        }
        if (!this.parent.message) {
          this.parent.newMessage = value;
        }
      }
    }
  },
  methods: {
    hasAddons() {
      let renderedNode = 0;
      const slot = this.$slots.default();
      if (slot) {
        const children = slot.length === 1 && Array.isArray(slot[0].children) ? slot[0].children : slot;
        renderedNode = children.reduce((i, node) => node ? i + 1 : i, 0);
      }
      return renderedNode > 1 && this.addons && !this.horizontal;
    }
  }
});
var _hoisted_16 = ["for"];
var _hoisted_25 = ["for"];
function render9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_field_body = resolveComponent("o-field-body");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.rootClasses)
    },
    [_ctx.horizontal ? (openBlock(), createElementBlock(
      "div",
      {
        key: 0,
        class: normalizeClass(_ctx.labelHorizontalClasses)
      },
      [_ctx.hasLabel ? (openBlock(), createElementBlock("label", {
        key: 0,
        for: _ctx.labelFor,
        class: normalizeClass(_ctx.labelClasses)
      }, [_ctx.hasLabelSlot ? renderSlot(_ctx.$slots, "label", {
        key: 0
      }) : (openBlock(), createElementBlock(
        Fragment,
        {
          key: 1
        },
        [createTextVNode(
          toDisplayString(_ctx.label),
          1
          /* TEXT */
        )],
        64
        /* STABLE_FRAGMENT */
      ))], 10, _hoisted_16)) : createCommentVNode("v-if", true)],
      2
      /* CLASS */
    )) : (openBlock(), createElementBlock(
      Fragment,
      {
        key: 1
      },
      [_ctx.hasLabel ? (openBlock(), createElementBlock("label", {
        key: 0,
        for: _ctx.labelFor,
        class: normalizeClass(_ctx.labelClasses)
      }, [_ctx.hasLabelSlot ? renderSlot(_ctx.$slots, "label", {
        key: 0
      }) : (openBlock(), createElementBlock(
        Fragment,
        {
          key: 1
        },
        [createTextVNode(
          toDisplayString(_ctx.label),
          1
          /* TEXT */
        )],
        64
        /* STABLE_FRAGMENT */
      ))], 10, _hoisted_25)) : createCommentVNode("v-if", true)],
      64
      /* STABLE_FRAGMENT */
    )), _ctx.horizontal ? (openBlock(), createBlock(_component_o_field_body, {
      key: 2
    }, {
      default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
      _: 3
      /* FORWARDED */
    })) : _ctx.hasInnerField ? (openBlock(), createElementBlock(
      "div",
      {
        key: 3,
        class: normalizeClass(_ctx.bodyClasses)
      },
      [createBaseVNode(
        "div",
        {
          class: normalizeClass(_ctx.innerFieldClasses)
        },
        [renderSlot(_ctx.$slots, "default")],
        2
        /* CLASS */
      )],
      2
      /* CLASS */
    )) : renderSlot(_ctx.$slots, "default", {
      key: 4
    }), _ctx.hasMessage && !_ctx.horizontal ? (openBlock(), createElementBlock(
      "p",
      {
        key: 5,
        class: normalizeClass(_ctx.messageClasses)
      },
      [_ctx.hasMessageSlot ? renderSlot(_ctx.$slots, "message", {
        key: 0
      }) : (openBlock(), createElementBlock(
        Fragment,
        {
          key: 1
        },
        [createTextVNode(
          toDisplayString(_ctx.newMessage),
          1
          /* TEXT */
        )],
        64
        /* STABLE_FRAGMENT */
      ))],
      2
      /* CLASS */
    )) : createCommentVNode("v-if", true)],
    2
    /* CLASS */
  );
}
script9.render = render9;
script9.__file = "src/components/field/Field.vue";

// node_modules/@oruga-ui/oruga-next/dist/esm/Select-2ed6c9d4.mjs
var script10 = defineComponent({
  name: "OSelect",
  components: {
    [script.name]: script
  },
  mixins: [BaseComponentMixin, FormElementMixin],
  configField: "select",
  inheritAttrs: false,
  emits: ["update:modelValue", "focus", "blur", "invalid"],
  props: {
    /** @model */
    modelValue: {
      type: [String, Number, Boolean, Object, Array],
      default: null
    },
    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: String,
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: String,
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "select.iconPack", void 0);
      }
    },
    /**
     * 	Icon name to be added on the right side
     */
    iconRight: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "select.iconRight", void 0);
      }
    },
    /** Text when nothing is selected */
    placeholder: String,
    multiple: Boolean,
    /** Same as native size */
    nativeSize: [String, Number],
    rootClass: [String, Function, Array],
    selectClass: [String, Function, Array],
    iconLeftSpaceClass: [String, Function, Array],
    iconRightSpaceClass: [String, Function, Array],
    roundedClass: [String, Function, Array],
    multipleClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    iconLeftClass: [String, Function, Array],
    iconRightClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    placeholderClass: [String, Function, Array],
    arrowClass: [String, Function, Array]
  },
  data() {
    return {
      selected: this.modelValue
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-ctrl-sel"),
        { [this.computedClass("expandedClass", "o-ctrl-sel--expanded")]: this.expanded }
      ];
    },
    selectClasses() {
      return [
        this.computedClass("selectClass", "o-sel"),
        { [this.computedClass("roundedClass", "o-sel--rounded")]: this.rounded },
        { [this.computedClass("multipleClass", "o-sel--multiple")]: this.multiple },
        { [this.computedClass("sizeClass", "o-sel--", this.size)]: this.size },
        { [this.computedClass("variantClass", "o-sel--", this.statusVariant || this.variant)]: this.statusVariant || this.variant },
        { [this.computedClass("iconLeftSpaceClass", "o-sel-iconspace-left")]: this.icon },
        { [this.computedClass("iconRightSpaceClass", "o-sel-iconspace-right")]: this.iconRight },
        { [this.computedClass("placeholderClass", "o-sel--placeholder")]: this.placeholderVisible },
        { [this.computedClass("arrowClass", "o-sel-arrow")]: !this.iconRight && !this.multiple }
      ];
    },
    iconLeftClasses() {
      return [
        this.computedClass("iconLeftClass", "o-sel__icon-left")
      ];
    },
    iconRightClasses() {
      return [
        this.computedClass("iconRightClass", "o-sel__icon-right")
      ];
    },
    placeholderVisible() {
      return this.computedValue === null;
    },
    computedValue: {
      get() {
        return this.selected;
      },
      set(value) {
        this.selected = value;
        this.$emit("update:modelValue", value);
        this.syncFilled(this.selected);
        !this.isValid && this.checkHtml5Validity();
      }
    },
    $elementRef() {
      return "select";
    }
  },
  watch: {
    /**
    * When v-model is changed:
    *   1. Set the selected option.
    *   2. If it's invalid, validate again.
    */
    modelValue(value) {
      this.selected = value;
      this.syncFilled(this.selected);
      !this.isValid && this.checkHtml5Validity();
    }
  }
});
var _hoisted_17 = ["autocomplete", "multiple", "size"];
var _hoisted_26 = {
  key: 0,
  value: null,
  disabled: "",
  hidden: ""
};
function render10(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = resolveComponent("o-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.rootClasses)
    },
    [withDirectives(createBaseVNode("select", mergeProps(_ctx.$attrs, {
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
      class: _ctx.selectClasses,
      ref: "select",
      autocomplete: _ctx.autocomplete,
      multiple: _ctx.multiple,
      size: _ctx.nativeSize,
      onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
      onFocus: _cache[2] || (_cache[2] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
      onInvalid: _cache[3] || (_cache[3] = (...args) => _ctx.onInvalid && _ctx.onInvalid(...args))
    }), [_ctx.placeholder ? (openBlock(), createElementBlock(
      Fragment,
      {
        key: 0
      },
      [_ctx.placeholderVisible ? (openBlock(), createElementBlock(
        "option",
        _hoisted_26,
        toDisplayString(_ctx.placeholder),
        1
        /* TEXT */
      )) : createCommentVNode("v-if", true)],
      64
      /* STABLE_FRAGMENT */
    )) : createCommentVNode("v-if", true), renderSlot(_ctx.$slots, "default")], 16, _hoisted_17), [[vModelSelect, _ctx.computedValue]]), _ctx.icon ? (openBlock(), createBlock(_component_o_icon, {
      key: 0,
      class: normalizeClass(_ctx.iconLeftClasses),
      icon: _ctx.icon,
      pack: _ctx.iconPack,
      size: _ctx.size
    }, null, 8, ["class", "icon", "pack", "size"])) : createCommentVNode("v-if", true), _ctx.iconRight && !_ctx.multiple ? (openBlock(), createBlock(_component_o_icon, {
      key: 1,
      class: normalizeClass(_ctx.iconRightClasses),
      icon: _ctx.iconRight,
      pack: _ctx.iconPack,
      size: _ctx.size
    }, null, 8, ["class", "icon", "pack", "size"])) : createCommentVNode("v-if", true)],
    2
    /* CLASS */
  );
}
script10.render = render10;
script10.__file = "src/components/select/Select.vue";

// node_modules/@oruga-ui/oruga-next/dist/esm/Datepicker-9e285d92.mjs
var script$3 = defineComponent({
  name: "ODatepickerTableRow",
  mixins: [BaseComponentMixin],
  configField: "datepicker",
  inject: {
    $datepicker: { from: "$datepicker", default: false }
  },
  emits: ["select", "rangeHoverEndDate", "change-focus"],
  props: {
    selectedDate: {
      type: [Date, Array]
    },
    hoveredDateRange: Array,
    day: {
      type: Number
    },
    week: {
      type: Array,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    showWeekNumber: Boolean,
    minDate: Date,
    maxDate: Date,
    disabled: Boolean,
    unselectableDates: Array,
    unselectableDaysOfWeek: Array,
    selectableDates: Array,
    events: Array,
    indicators: String,
    dateCreator: Function,
    nearbyMonthDays: Boolean,
    nearbySelectableMonthDays: Boolean,
    weekNumberClickable: Boolean,
    range: Boolean,
    multiple: Boolean,
    rulesForFirstWeek: Number,
    firstDayOfWeek: Number,
    tableRowClass: [String, Function, Array],
    tableCellClass: [String, Function, Array],
    tableCellSelectedClass: [String, Function, Array],
    tableCellFirstSelectedClass: [String, Function, Array],
    tableCellWithinSelectedClass: [String, Function, Array],
    tableCellLastSelectedClass: [String, Function, Array],
    tableCellFirstHoveredClass: [String, Function, Array],
    tableCellInvisibleClass: [String, Function, Array],
    tableCellWithinHoveredClass: [String, Function, Array],
    tableCellLastHoveredClass: [String, Function, Array],
    tableCellTodayClass: [String, Function, Array],
    tableCellSelectableClass: [String, Function, Array],
    tableCellUnselectableClass: [String, Function, Array],
    tableCellNearbyClass: [String, Function, Array],
    tableCellEventsClass: [String, Function, Array],
    tableEventClass: [String, Function, Array],
    tableEventIndicatorsClass: [String, Function, Array],
    tableEventsClass: [String, Function, Array],
    tableEventVariantClass: [String, Function, Array]
  },
  computed: {
    tableRowClasses() {
      return [
        this.computedClass("tableRowClass", "o-dpck__table__row")
      ];
    },
    tableCellClasses() {
      return [
        this.computedClass("tableCellClass", "o-dpck__table__cell")
      ];
    },
    tableEventsClasses() {
      return [
        this.computedClass("tableEventsClass", "o-dpck__table__events")
      ];
    },
    hasEvents() {
      return this.events && this.events.length;
    }
  },
  watch: {
    day(day) {
      const refName = `day-${this.month}-${day}`;
      this.$nextTick(() => {
        if (this.$refs[refName] && this.$refs[refName].length > 0) {
          if (this.$refs[refName][0]) {
            this.$refs[refName][0].focus();
          }
        }
      });
    }
  },
  methods: {
    firstWeekOffset(year, dow, doy) {
      const fwd = 7 + dow - doy;
      const firstJanuary = new Date(year, 0, fwd);
      const fwdlw = (7 + firstJanuary.getDay() - dow) % 7;
      return -fwdlw + fwd - 1;
    },
    daysInYear(year) {
      return this.isLeapYear(year) ? 366 : 365;
    },
    isLeapYear(year) {
      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },
    getSetDayOfYear(input) {
      return Math.round((input.getTime() - new Date(input.getFullYear(), 0, 1).getTime()) / 864e5) + 1;
    },
    weeksInYear(year, dow, doy) {
      const weekOffset = this.firstWeekOffset(year, dow, doy);
      const weekOffsetNext = this.firstWeekOffset(year + 1, dow, doy);
      return (this.daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    },
    getWeekNumber(mom) {
      const dow = this.firstDayOfWeek;
      const doy = this.rulesForFirstWeek;
      const weekOffset = this.firstWeekOffset(mom.getFullYear(), dow, doy);
      const week = Math.floor((this.getSetDayOfYear(mom) - weekOffset - 1) / 7) + 1;
      let resWeek;
      let resYear;
      if (week < 1) {
        resYear = mom.getFullYear() - 1;
        resWeek = week + this.weeksInYear(resYear, dow, doy);
      } else if (week > this.weeksInYear(mom.getFullYear(), dow, doy)) {
        resWeek = week - this.weeksInYear(mom.getFullYear(), dow, doy);
        resYear = mom.getFullYear() + 1;
      } else {
        resYear = mom.getFullYear();
        resWeek = week;
      }
      return resWeek;
    },
    clickWeekNumber(week) {
      if (this.weekNumberClickable) {
        this.$datepicker.$emit("week-number-click", week);
      }
    },
    /*
     * Check that selected day is within earliest/latest params and
     * is within this month
     */
    selectableDate(day) {
      const validity = [];
      if (this.minDate) {
        validity.push(day >= this.minDate);
      }
      if (this.maxDate) {
        validity.push(day <= this.maxDate);
      }
      if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
        validity.push(day.getMonth() === this.month);
      }
      if (this.selectableDates) {
        for (let i = 0; i < this.selectableDates.length; i++) {
          const enabledDate = this.selectableDates[i];
          if (day.getDate() === enabledDate.getDate() && day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
            return true;
          } else {
            validity.push(false);
          }
        }
      }
      if (this.unselectableDates) {
        for (let i = 0; i < this.unselectableDates.length; i++) {
          const disabledDate = this.unselectableDates[i];
          validity.push(day.getDate() !== disabledDate.getDate() || day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth());
        }
      }
      if (this.unselectableDaysOfWeek) {
        for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
          const dayOfWeek = this.unselectableDaysOfWeek[i];
          validity.push(day.getDay() !== dayOfWeek);
        }
      }
      return validity.indexOf(false) < 0;
    },
    /*
    * Emit select event with chosen date as payload
    */
    emitChosenDate(day) {
      if (this.disabled)
        return;
      if (this.selectableDate(day)) {
        this.$emit("select", day);
      }
    },
    eventsDateMatch(day) {
      if (!this.events || !this.events.length)
        return false;
      const dayEvents = [];
      for (let i = 0; i < this.events.length; i++) {
        if (this.events[i].date.getDay() === day.getDay()) {
          dayEvents.push(this.events[i]);
        }
      }
      if (!dayEvents.length) {
        return false;
      }
      return dayEvents;
    },
    /*
    * Build cellClasses for cell using validations
    */
    cellClasses(day) {
      function dateMatch(dateOne, dateTwo, multiple = false) {
        if (!dateOne || !dateTwo || multiple) {
          return false;
        }
        if (Array.isArray(dateTwo)) {
          return dateTwo.some((date) => dateOne.getDate() === date.getDate() && dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth());
        }
        return dateOne.getDate() === dateTwo.getDate() && dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
      }
      function dateWithin(dateOne, dates, multiple = false) {
        if (!Array.isArray(dates) || multiple) {
          return false;
        }
        return dateOne > dates[0] && dateOne < dates[1];
      }
      return [
        ...this.tableCellClasses,
        {
          [this.computedClass("tableCellSelectedClass", "o-dpck__table__cell--selected")]: dateMatch(day, this.selectedDate) || dateWithin(day, this.selectedDate, this.multiple)
        },
        {
          [this.computedClass("tableCellFirstSelectedClass", "o-dpck__table__cell--first-selected")]: dateMatch(day, Array.isArray(this.selectedDate) && this.selectedDate[0], this.multiple)
        },
        {
          [this.computedClass("tableCellWithinSelectedClass", "o-dpck__table__cell--within-selected")]: dateWithin(day, this.selectedDate, this.multiple)
        },
        {
          [this.computedClass("tableCellLastSelectedClass", "o-dpck__table__cell--last-selected")]: dateMatch(day, Array.isArray(this.selectedDate) && this.selectedDate[1], this.multiple)
        },
        {
          [this.computedClass("tableCellFirstHoveredClass", "o-dpck__table__cell--first-hovered")]: dateMatch(day, Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[0])
        },
        {
          [this.computedClass("tableCellWithinHoveredClass", "o-dpck__table__cell--within-hovered")]: dateWithin(day, this.hoveredDateRange)
        },
        {
          [this.computedClass("tableCellLastHoveredClass", "o-dpck__table__cell--last-hovered")]: dateMatch(day, Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[1])
        },
        {
          [this.computedClass("tableCellTodayClass", "o-dpck__table__cell--today")]: dateMatch(day, this.dateCreator())
        },
        {
          [this.computedClass("tableCellSelectableClass", "o-dpck__table__cell--selectable")]: this.selectableDate(day) && !this.disabled
        },
        {
          [this.computedClass("tableCellUnselectableClass", "o-dpck__table__cell--unselectable")]: !this.selectableDate(day) || this.disabled
        },
        {
          [this.computedClass("tableCellInvisibleClass", "o-dpck__table__cell--invisible")]: !this.nearbyMonthDays && day.getMonth() !== this.month
        },
        {
          [this.computedClass("tableCellNearbyClass", "o-dpck__table__cell--nearby")]: this.nearbySelectableMonthDays && day.getMonth() !== this.month
        },
        {
          [this.computedClass("tableCellEventsClass", "o-dpck__table__cell--events")]: this.hasEvents
        },
        {
          [this.computedClass("tableCellTodayClass", "o-dpck__table__cell--today")]: dateMatch(day, this.dateCreator())
        }
      ];
    },
    eventClasses(event) {
      return [
        this.computedClass("tableEventClass", "o-dpck__table__event"),
        { [this.computedClass("tableEventVariantClass", "o-dpck__table__event--", event.type)]: event.type },
        { [this.computedClass("tableEventIndicatorsClass", "o-dpck__table__event--", this.indicators)]: this.indicators }
      ];
    },
    setRangeHoverEndDate(day) {
      if (this.range) {
        this.$emit("rangeHoverEndDate", day);
      }
    },
    manageKeydown(event, weekDay) {
      const { key } = event;
      let preventDefault = true;
      switch (key) {
        case "Tab": {
          preventDefault = false;
          break;
        }
        case " ":
        case "Space":
        case "Spacebar":
        case "Enter": {
          this.emitChosenDate(weekDay);
          break;
        }
        case "ArrowLeft":
        case "Left": {
          this.changeFocus(weekDay, -1);
          break;
        }
        case "ArrowRight":
        case "Right": {
          this.changeFocus(weekDay, 1);
          break;
        }
        case "ArrowUp":
        case "Up": {
          this.changeFocus(weekDay, -7);
          break;
        }
        case "ArrowDown":
        case "Down": {
          this.changeFocus(weekDay, 7);
          break;
        }
      }
      if (preventDefault) {
        event.preventDefault();
      }
    },
    changeFocus(day, inc) {
      const nextDay = new Date(day.getTime());
      nextDay.setDate(day.getDate() + inc);
      while ((!this.minDate || nextDay > this.minDate) && (!this.maxDate || nextDay < this.maxDate) && !this.selectableDate(nextDay)) {
        nextDay.setDate(day.getDate() + Math.sign(inc));
      }
      this.setRangeHoverEndDate(nextDay);
      this.$emit("change-focus", nextDay);
    }
  }
});
var _hoisted_1$2 = ["disabled", "onClick", "onMouseenter", "onKeydown", "tabindex"];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.tableRowClasses)
    },
    [_ctx.showWeekNumber ? (openBlock(), createElementBlock(
      "a",
      {
        key: 0,
        class: normalizeClass(_ctx.tableCellClasses),
        style: normalizeStyle({
          "cursor": _ctx.weekNumberClickable ? "pointer" : "auto"
        }),
        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.clickWeekNumber(_ctx.getWeekNumber(_ctx.week[6])), ["prevent"]))
      },
      [createBaseVNode(
        "span",
        null,
        toDisplayString(_ctx.getWeekNumber(_ctx.week[6])),
        1
        /* TEXT */
      )],
      6
      /* CLASS, STYLE */
    )) : createCommentVNode("v-if", true), (openBlock(true), createElementBlock(
      Fragment,
      null,
      renderList(_ctx.week, (weekDay, index30) => {
        return openBlock(), createElementBlock(
          Fragment,
          {
            key: index30
          },
          [_ctx.selectableDate(weekDay) && !_ctx.disabled ? (openBlock(), createElementBlock("a", {
            key: 0,
            ref_for: true,
            ref: `day-${weekDay.getMonth()}-${weekDay.getDate()}`,
            class: normalizeClass(_ctx.cellClasses(weekDay)),
            role: "button",
            href: "#",
            disabled: _ctx.disabled,
            onClick: withModifiers(($event) => _ctx.emitChosenDate(weekDay), ["prevent"]),
            onMouseenter: ($event) => _ctx.setRangeHoverEndDate(weekDay),
            onKeydown: ($event) => _ctx.manageKeydown($event, weekDay),
            tabindex: _ctx.day === weekDay.getDate() && _ctx.month === weekDay.getMonth() ? null : -1
          }, [createBaseVNode(
            "span",
            null,
            toDisplayString(weekDay.getDate()),
            1
            /* TEXT */
          ), _ctx.eventsDateMatch(weekDay) ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(_ctx.tableEventsClasses)
            },
            [(openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(_ctx.eventsDateMatch(weekDay), (event, index31) => {
                return openBlock(), createElementBlock(
                  "div",
                  {
                    class: normalizeClass(_ctx.eventClasses(event)),
                    key: index31
                  },
                  null,
                  2
                  /* CLASS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)], 42, _hoisted_1$2)) : (openBlock(), createElementBlock(
            "div",
            {
              key: index30,
              class: normalizeClass(_ctx.cellClasses(weekDay))
            },
            [createBaseVNode(
              "span",
              null,
              toDisplayString(weekDay.getDate()),
              1
              /* TEXT */
            )],
            2
            /* CLASS */
          ))],
          64
          /* STABLE_FRAGMENT */
        );
      }),
      128
      /* KEYED_FRAGMENT */
    ))],
    2
    /* CLASS */
  );
}
script$3.render = render$3;
script$3.__file = "src/components/datepicker/DatepickerTableRow.vue";
var script$2 = defineComponent({
  name: "ODatepickerTable",
  mixins: [BaseComponentMixin],
  configField: "datepicker",
  components: {
    [script$3.name]: script$3
  },
  emits: ["update:modelValue", "range-start", "range-end", "update:focused"],
  props: {
    modelValue: {
      type: [Date, Array]
    },
    dayNames: Array,
    monthNames: Array,
    firstDayOfWeek: Number,
    events: Array,
    indicators: String,
    minDate: Date,
    maxDate: Date,
    focused: Object,
    disabled: Boolean,
    dateCreator: Function,
    unselectableDates: Array,
    unselectableDaysOfWeek: Array,
    selectableDates: Array,
    nearbyMonthDays: Boolean,
    nearbySelectableMonthDays: Boolean,
    showWeekNumber: Boolean,
    weekNumberClickable: Boolean,
    rulesForFirstWeek: Number,
    range: Boolean,
    multiple: Boolean,
    tableClass: [String, Function, Array],
    tableHeadClass: [String, Function, Array],
    tableHeadCellClass: [String, Function, Array],
    tableBodyClass: [String, Function, Array],
    tableRowClass: [String, Function, Array],
    tableCellClass: [String, Function, Array],
    tableCellSelectedClass: [String, Function, Array],
    tableCellFirstSelectedClass: [String, Function, Array],
    tableCellInvisibleClass: [String, Function, Array],
    tableCellWithinSelectedClass: [String, Function, Array],
    tableCellLastSelectedClass: [String, Function, Array],
    tableCellFirstHoveredClass: [String, Function, Array],
    tableCellWithinHoveredClass: [String, Function, Array],
    tableCellLastHoveredClass: [String, Function, Array],
    tableCellTodayClass: [String, Function, Array],
    tableCellSelectableClass: [String, Function, Array],
    tableCellUnselectableClass: [String, Function, Array],
    tableCellNearbyClass: [String, Function, Array],
    tableCellEventsClass: [String, Function, Array],
    tableEventClass: [String, Function, Array],
    tableEventIndicatorsClass: [String, Function, Array],
    tableEventsClass: [String, Function, Array],
    tableEventVariantClass: [String, Function, Array]
  },
  data() {
    return {
      selectedBeginDate: void 0,
      selectedEndDate: void 0,
      hoveredEndDate: void 0
    };
  },
  computed: {
    tableClasses() {
      return [
        this.computedClass("tableClass", "o-dpck__table")
      ];
    },
    tableHeadClasses() {
      return [
        this.computedClass("tableHeadClass", "o-dpck__table__head")
      ];
    },
    tableHeadCellClasses() {
      return [
        this.computedClass("tableHeadCellClass", "o-dpck__table__head-cell"),
        ...this.tableCellClasses
      ];
    },
    tableBodyClasses() {
      return [
        this.computedClass("tableBodyClass", "o-dpck__table__body")
      ];
    },
    tableCellClasses() {
      return [
        this.computedClass("tableCellClass", "o-dpck__table__cell")
      ];
    },
    visibleDayNames() {
      const visibleDayNames = [];
      let index30 = this.firstDayOfWeek;
      while (visibleDayNames.length < this.dayNames.length) {
        const currentDayName = this.dayNames[index30 % this.dayNames.length];
        visibleDayNames.push(currentDayName);
        index30++;
      }
      if (this.showWeekNumber)
        visibleDayNames.unshift("");
      return visibleDayNames;
    },
    /*
    * Return array of all events in the specified month
    */
    eventsInThisMonth() {
      if (!this.events)
        return [];
      const monthEvents = [];
      for (let i = 0; i < this.events.length; i++) {
        let event = this.events[i];
        if (!Object.prototype.hasOwnProperty.call(event, "date")) {
          event = { date: event };
        }
        if (event.date.getMonth() === this.focused.month && event.date.getFullYear() === this.focused.year) {
          monthEvents.push(event);
        }
      }
      return monthEvents;
    },
    /*
    * Return array of all weeks in the specified month
    */
    weeksInThisMonth() {
      this.validateFocusedDay();
      const month = this.focused.month;
      const year = this.focused.year;
      const weeksInThisMonth = [];
      let startingDay = 1;
      while (weeksInThisMonth.length < 6) {
        const newWeek = this.weekBuilder(startingDay, month, year);
        weeksInThisMonth.push(newWeek);
        startingDay += 7;
      }
      return weeksInThisMonth;
    },
    hoveredDateRange() {
      if (!this.range) {
        return [];
      }
      if (!isNaN(this.selectedEndDate)) {
        return [];
      }
      if (this.hoveredEndDate < this.selectedBeginDate) {
        return [this.hoveredEndDate, this.selectedBeginDate].filter((d) => d !== void 0);
      }
      return [this.selectedBeginDate, this.hoveredEndDate].filter((d) => d !== void 0);
    }
  },
  methods: {
    /*
    * Emit input event with selected date as payload for v-model in parent
    */
    updateSelectedDate(date) {
      if (!this.range && !this.multiple) {
        this.$emit("update:modelValue", date);
      } else if (this.range) {
        this.handleSelectRangeDate(date);
      } else if (this.multiple) {
        this.handleSelectMultipleDates(date);
      }
    },
    /*
    * If both begin and end dates are set, reset the end date and set the begin date.
    * If only begin date is selected, emit an array of the begin date and the new date.
    * If not set, only set the begin date.
    */
    handleSelectRangeDate(date) {
      if (this.selectedBeginDate && this.selectedEndDate) {
        this.selectedBeginDate = date;
        this.selectedEndDate = void 0;
        this.$emit("range-start", date);
      } else if (this.selectedBeginDate && !this.selectedEndDate) {
        if (this.selectedBeginDate > date) {
          this.selectedEndDate = this.selectedBeginDate;
          this.selectedBeginDate = date;
        } else {
          this.selectedEndDate = date;
        }
        this.$emit("range-end", date);
        this.$emit("update:modelValue", [this.selectedBeginDate, this.selectedEndDate]);
      } else {
        this.selectedBeginDate = date;
        this.$emit("range-start", date);
      }
    },
    /*
    * If selected date already exists list of selected dates, remove it from the list
    * Otherwise, add date to list of selected dates
    */
    handleSelectMultipleDates(date) {
      let multipleSelectedDates = this.modelValue;
      const multipleSelect = multipleSelectedDates.filter((selectedDate) => selectedDate.getDate() === date.getDate() && selectedDate.getFullYear() === date.getFullYear() && selectedDate.getMonth() === date.getMonth());
      if (multipleSelect.length) {
        multipleSelectedDates = multipleSelectedDates.filter((selectedDate) => selectedDate.getDate() !== date.getDate() || selectedDate.getFullYear() !== date.getFullYear() || selectedDate.getMonth() !== date.getMonth());
      } else {
        multipleSelectedDates = [...multipleSelectedDates, date];
      }
      this.$emit("update:modelValue", multipleSelectedDates);
    },
    /*
     * Return array of all days in the week that the startingDate is within
     */
    weekBuilder(startingDate, month, year) {
      const thisMonth = new Date(year, month);
      const thisWeek = [];
      const dayOfWeek = new Date(year, month, startingDate).getDay();
      const end = dayOfWeek >= this.firstDayOfWeek ? dayOfWeek - this.firstDayOfWeek : 7 - this.firstDayOfWeek + dayOfWeek;
      let daysAgo = 1;
      for (let i = 0; i < end; i++) {
        thisWeek.unshift(new Date(thisMonth.getFullYear(), thisMonth.getMonth(), startingDate - daysAgo));
        daysAgo++;
      }
      thisWeek.push(new Date(year, month, startingDate));
      let daysForward = 1;
      while (thisWeek.length < 7) {
        thisWeek.push(new Date(year, month, startingDate + daysForward));
        daysForward++;
      }
      return thisWeek;
    },
    validateFocusedDay() {
      const focusedDate = new Date(this.focused.year, this.focused.month, this.focused.day);
      if (this.selectableDate(focusedDate))
        return;
      let day = 0;
      const monthDays = new Date(this.focused.year, this.focused.month + 1, 0).getDate();
      let firstFocusable = null;
      while (!firstFocusable && ++day < monthDays) {
        const date = new Date(this.focused.year, this.focused.month, day);
        if (this.selectableDate(date)) {
          firstFocusable = focusedDate;
          const focused = {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
          };
          this.$emit("update:focused", focused);
        }
      }
    },
    /*
     * Check that selected day is within earliest/latest params and
     * is within this month
     */
    selectableDate(day) {
      const validity = [];
      if (this.minDate) {
        validity.push(day >= this.minDate);
      }
      if (this.maxDate) {
        validity.push(day <= this.maxDate);
      }
      if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
        validity.push(day.getMonth() === this.focused.month);
      }
      if (this.selectableDates) {
        for (let i = 0; i < this.selectableDates.length; i++) {
          const enabledDate = this.selectableDates[i];
          if (day.getDate() === enabledDate.getDate() && day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
            return true;
          } else {
            validity.push(false);
          }
        }
      }
      if (this.unselectableDates) {
        for (let i = 0; i < this.unselectableDates.length; i++) {
          const disabledDate = this.unselectableDates[i];
          validity.push(day.getDate() !== disabledDate.getDate() || day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth());
        }
      }
      if (this.unselectableDaysOfWeek) {
        for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
          const dayOfWeek = this.unselectableDaysOfWeek[i];
          validity.push(day.getDay() !== dayOfWeek);
        }
      }
      return validity.indexOf(false) < 0;
    },
    eventsInThisWeek(week) {
      return this.eventsInThisMonth.filter((event) => {
        const stripped = new Date(Date.parse(event.date));
        stripped.setHours(0, 0, 0, 0);
        const timed = stripped.getTime();
        return week.some((weekDate) => weekDate.getTime() === timed);
      });
    },
    setRangeHoverEndDate(day) {
      this.hoveredEndDate = day;
    },
    changeFocus(day) {
      const focused = {
        day: day.getDate(),
        month: day.getMonth(),
        year: day.getFullYear()
      };
      this.$emit("update:focused", focused);
    }
  }
});
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_datepicker_table_row = resolveComponent("o-datepicker-table-row");
  return openBlock(), createElementBlock(
    "section",
    {
      class: normalizeClass(_ctx.tableClasses)
    },
    [createBaseVNode(
      "header",
      {
        class: normalizeClass(_ctx.tableHeadClasses)
      },
      [(openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.visibleDayNames, (day, index30) => {
          return openBlock(), createElementBlock(
            "div",
            {
              key: index30,
              class: normalizeClass(_ctx.tableHeadCellClasses)
            },
            [createBaseVNode(
              "span",
              null,
              toDisplayString(day),
              1
              /* TEXT */
            )],
            2
            /* CLASS */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      ))],
      2
      /* CLASS */
    ), createBaseVNode(
      "div",
      {
        class: normalizeClass(_ctx.tableBodyClasses)
      },
      [(openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.weeksInThisMonth, (week, index30) => {
          return openBlock(), createBlock(_component_o_datepicker_table_row, {
            key: index30,
            "selected-date": _ctx.modelValue,
            day: _ctx.focused.day,
            week,
            month: _ctx.focused.month,
            "min-date": _ctx.minDate,
            "max-date": _ctx.maxDate,
            disabled: _ctx.disabled,
            "unselectable-dates": _ctx.unselectableDates,
            "unselectable-days-of-week": _ctx.unselectableDaysOfWeek,
            "selectable-dates": _ctx.selectableDates,
            events: _ctx.eventsInThisWeek(week),
            indicators: _ctx.indicators,
            "date-creator": _ctx.dateCreator,
            "nearby-month-days": _ctx.nearbyMonthDays,
            "nearby-selectable-month-days": _ctx.nearbySelectableMonthDays,
            "show-week-number": _ctx.showWeekNumber,
            "week-number-clickable": _ctx.weekNumberClickable,
            "first-day-of-week": _ctx.firstDayOfWeek,
            "rules-for-first-week": _ctx.rulesForFirstWeek,
            range: _ctx.range,
            "hovered-date-range": _ctx.hoveredDateRange,
            multiple: _ctx.multiple,
            "table-row-class": _ctx.tableRowClass,
            "table-cell-class": _ctx.tableCellClass,
            "table-cell-selected-class": _ctx.tableCellSelectedClass,
            "table-cell-first-selected-class": _ctx.tableCellFirstSelectedClass,
            "table-cell-invisible-class": _ctx.tableCellInvisibleClass,
            "table-cell-within-selected-class": _ctx.tableCellWithinSelectedClass,
            "table-cell-last-selected-class": _ctx.tableCellLastSelectedClass,
            "table-cell-first-hovered-class": _ctx.tableCellFirstHoveredClass,
            "table-cell-within-hovered-class": _ctx.tableCellWithinHoveredClass,
            "table-cell-last-hovered-class": _ctx.tableCellLastHoveredClass,
            "table-cell-today-class": _ctx.tableCellTodayClass,
            "table-cell-selectable-class": _ctx.tableCellSelectableClass,
            "table-cell-unselectable-class": _ctx.tableCellUnselectableClass,
            "table-cell-nearby-class": _ctx.tableCellNearbyClass,
            "table-cell-events-class": _ctx.tableCellEventsClass,
            "table-events-class": _ctx.tableEventsClass,
            "table-event-variant-class": _ctx.tableEventVariantClass,
            "table-event-class": _ctx.tableEventClass,
            "table-event-indicators-class": _ctx.tableEventIndicatorsClass,
            onSelect: _ctx.updateSelectedDate,
            onRangeHoverEndDate: _ctx.setRangeHoverEndDate,
            onChangeFocus: _ctx.changeFocus
          }, null, 8, ["selected-date", "day", "week", "month", "min-date", "max-date", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "nearby-month-days", "nearby-selectable-month-days", "show-week-number", "week-number-clickable", "first-day-of-week", "rules-for-first-week", "range", "hovered-date-range", "multiple", "table-row-class", "table-cell-class", "table-cell-selected-class", "table-cell-first-selected-class", "table-cell-invisible-class", "table-cell-within-selected-class", "table-cell-last-selected-class", "table-cell-first-hovered-class", "table-cell-within-hovered-class", "table-cell-last-hovered-class", "table-cell-today-class", "table-cell-selectable-class", "table-cell-unselectable-class", "table-cell-nearby-class", "table-cell-events-class", "table-events-class", "table-event-variant-class", "table-event-class", "table-event-indicators-class", "onSelect", "onRangeHoverEndDate", "onChangeFocus"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))],
      2
      /* CLASS */
    )],
    2
    /* CLASS */
  );
}
script$2.render = render$2;
script$2.__file = "src/components/datepicker/DatepickerTable.vue";
var DatepickerMixin = {
  methods: {
    manageKeydown(event, weekDay) {
      const { key } = event;
      let preventDefault = true;
      switch (key) {
        case "Tab": {
          preventDefault = false;
          break;
        }
        case " ":
        case "Space":
        case "Spacebar":
        case "Enter": {
          this.emitChosenDate(weekDay);
          break;
        }
        case "ArrowLeft":
        case "Left": {
          this.changeFocus(weekDay, -1);
          break;
        }
        case "ArrowRight":
        case "Right": {
          this.changeFocus(weekDay, 1);
          break;
        }
        case "ArrowUp":
        case "Up": {
          this.changeFocus(weekDay, -7);
          break;
        }
        case "ArrowDown":
        case "Down": {
          this.changeFocus(weekDay, 7);
          break;
        }
      }
      if (preventDefault) {
        event.preventDefault();
      }
    }
  }
};
var script$14 = {
  name: "ODatepickerMonth",
  mixins: [BaseComponentMixin, DatepickerMixin],
  configField: "datepicker",
  emits: ["update:modelValue", "range-start", "range-end", "updated:focused"],
  props: {
    modelValue: {
      type: [Date, Array]
    },
    monthNames: Array,
    events: Array,
    indicators: String,
    minDate: Date,
    maxDate: Date,
    focused: Object,
    disabled: Boolean,
    dateCreator: Function,
    unselectableDates: [Array, Function],
    unselectableDaysOfWeek: Array,
    selectableDates: [Array, Function],
    range: Boolean,
    multiple: Boolean,
    monthClass: [String, Function, Array],
    monthBodyClass: [String, Function, Array],
    monthTableClass: [String, Function, Array],
    monthCellClass: [String, Function, Array],
    monthCellSelectedClass: [String, Function, Array],
    monthCellFirstSelectedClass: [String, Function, Array],
    monthCellWithinSelectedClass: [String, Function, Array],
    monthCellLastSelectedClass: [String, Function, Array],
    monthCellWithinHoveredRangeClass: [String, Function, Array],
    monthCellFirstHoveredClass: [String, Function, Array],
    monthCellWithinHoveredClass: [String, Function, Array],
    monthCellLastHoveredClass: [String, Function, Array],
    monthCellTodayClass: [String, Function, Array],
    monthCellSelectableClass: [String, Function, Array],
    monthCellUnselectableClass: [String, Function, Array],
    monthCellEventsClass: [String, Function, Array]
  },
  data() {
    return {
      selectedBeginDate: void 0,
      selectedEndDate: void 0,
      hoveredEndDate: void 0,
      multipleSelectedDates: this.multiple && this.modelValue ? this.modelValue : []
    };
  },
  computed: {
    monthClasses() {
      return [
        this.computedClass("monthClass", "o-dpck__month")
      ];
    },
    monthBodyClasses() {
      return [
        this.computedClass("monthBodyClass", "o-dpck__month__body")
      ];
    },
    monthTableClasses() {
      return [
        this.computedClass("monthTableClass", "o-dpck__month__table")
      ];
    },
    monthCellClasses() {
      return [
        this.computedClass("monthCellClass", "o-dpck__month__cell")
      ];
    },
    hasEvents() {
      return this.events && this.events.length;
    },
    /*
    * Return array of all events in the specified month
    */
    eventsInThisYear() {
      if (!this.events)
        return [];
      const yearEvents = [];
      for (let i = 0; i < this.events.length; i++) {
        let event = this.events[i];
        if (!Object.prototype.hasOwnProperty.call(event, "date")) {
          event = { date: event };
        }
        if (!Object.prototype.hasOwnProperty.call(event, "type")) {
          event.type = "is-primary";
        }
        if (event.date.getFullYear() === this.focused.year) {
          yearEvents.push(event);
        }
      }
      return yearEvents;
    },
    monthDates() {
      const year = this.focused.year;
      const months = [];
      for (let i = 0; i < 12; i++) {
        const d = new Date(year, i, 1);
        d.setHours(0, 0, 0, 0);
        months.push(d);
      }
      return months;
    },
    focusedMonth() {
      return this.focused.month;
    },
    hoveredDateRange() {
      if (!this.range) {
        return [];
      }
      if (!isNaN(this.selectedEndDate)) {
        return [];
      }
      if (this.hoveredEndDate < this.selectedBeginDate) {
        return [this.hoveredEndDate, this.selectedBeginDate].filter(isDefined);
      }
      return [this.selectedBeginDate, this.hoveredEndDate].filter(isDefined);
    }
  },
  watch: {
    focusedMonth(month) {
      const refName = `month-${month}`;
      if (this.$refs[refName] && this.$refs[refName].length > 0) {
        this.$nextTick(() => {
          if (this.$refs[refName][0]) {
            this.$refs[refName][0].focus();
          }
        });
      }
    }
  },
  methods: {
    selectMultipleDates(date) {
      const multipleSelect = this.multipleSelectedDates.filter((selectedDate) => selectedDate.getDate() === date.getDate() && selectedDate.getFullYear() === date.getFullYear() && selectedDate.getMonth() === date.getMonth());
      if (multipleSelect.length) {
        this.multipleSelectedDates = this.multipleSelectedDates.filter((selectedDate) => selectedDate.getDate() !== date.getDate() || selectedDate.getFullYear() !== date.getFullYear() || selectedDate.getMonth() !== date.getMonth());
      } else {
        this.multipleSelectedDates.push(date);
      }
      this.$emit("update:modelValue", this.multipleSelectedDates);
    },
    selectableDate(day) {
      const validity = [];
      if (this.minDate) {
        validity.push(day >= this.minDate);
      }
      if (this.maxDate) {
        validity.push(day <= this.maxDate);
      }
      validity.push(day.getFullYear() === this.focused.year);
      if (this.selectableDates) {
        if (typeof this.selectableDates === "function") {
          if (this.selectableDates(day)) {
            return true;
          } else {
            validity.push(false);
          }
        } else {
          for (let i = 0; i < this.selectableDates.length; i++) {
            const enabledDate = this.selectableDates[i];
            if (day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
              return true;
            } else {
              validity.push(false);
            }
          }
        }
      }
      if (this.unselectableDates) {
        if (typeof this.unselectableDates === "function") {
          validity.push(!this.unselectableDates(day));
        } else {
          for (let i = 0; i < this.unselectableDates.length; i++) {
            const disabledDate = this.unselectableDates[i];
            validity.push(day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth());
          }
        }
      }
      if (this.unselectableDaysOfWeek) {
        for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
          const dayOfWeek = this.unselectableDaysOfWeek[i];
          validity.push(day.getDay() !== dayOfWeek);
        }
      }
      return validity.indexOf(false) < 0;
    },
    eventsDateMatch(day) {
      if (!this.eventsInThisYear.length)
        return false;
      const monthEvents = [];
      for (let i = 0; i < this.eventsInThisYear.length; i++) {
        if (this.eventsInThisYear[i].date.getMonth() === day.getMonth()) {
          monthEvents.push(this.events[i]);
        }
      }
      if (!monthEvents.length) {
        return false;
      }
      return monthEvents;
    },
    /*
    * Build cellClasses for cell using validations
    */
    cellClasses(day) {
      function dateMatch(dateOne, dateTwo, multiple = false) {
        if (!dateOne || !dateTwo || multiple) {
          return false;
        }
        if (Array.isArray(dateTwo)) {
          return dateTwo.some((date) => dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth());
        }
        return dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
      }
      function dateWithin(dateOne, dates, multiple = false) {
        if (!Array.isArray(dates) || multiple) {
          return false;
        }
        return dateOne > dates[0] && dateOne < dates[1];
      }
      function dateMultipleSelected(dateOne, dates, multiple = false) {
        if (!Array.isArray(dates) || !multiple) {
          return false;
        }
        return dates.some((date) => dateOne.getDate() === date.getDate() && dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth());
      }
      return [
        ...this.monthCellClasses,
        {
          [this.computedClass("monthCellSelectedClass", "o-dpck__month__cell--selected")]: dateMatch(day, this.modelValue, this.multiple) || dateWithin(day, this.modelValue, this.multiple) || dateMultipleSelected(day, this.multipleSelectedDates, this.multiple)
        },
        {
          [this.computedClass("monthCellFirstSelectedClass", "o-dpck__month__cell--first-selected")]: dateMatch(day, Array.isArray(this.modelValue) && this.modelValue[0], this.multiple)
        },
        {
          [this.computedClass("monthCellWithinSelectedClass", "o-dpck__month__cell--within-selected")]: dateWithin(day, this.modelValue, this.multiple)
        },
        {
          [this.computedClass("monthCellLastSelectedClass", "o-dpck__month__cell--last-selected")]: dateMatch(day, Array.isArray(this.modelValue) && this.modelValue[1], this.multiple)
        },
        {
          [this.computedClass("monthCellWithinHoveredRangeClass", "o-dpck__month__cell--within-hovered-range")]: this.hoveredDateRange && this.hoveredDateRange.length === 2 && (dateMatch(day, this.hoveredDateRange) || dateWithin(day, this.hoveredDateRange))
        },
        {
          [this.computedClass("monthCellFirstHoveredClass", "o-dpck__month__cell--first-hovered")]: dateMatch(day, Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[0])
        },
        {
          [this.computedClass("monthCellWithinHoveredClass", "o-dpck__month__cell--within-hovered")]: dateWithin(day, this.hoveredDateRange)
        },
        {
          [this.computedClass("monthCellLastHoveredClass", "o-dpck__month__cell--last-hovered")]: dateMatch(day, Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[1])
        },
        {
          [this.computedClass("monthCellTodayClass", "o-dpck__month__cell--today")]: dateMatch(day, this.dateCreator())
        },
        {
          [this.computedClass("monthCellSelectableclass", "o-dpck__month__cell--selectable")]: this.selectableDate(day) && !this.disabled
        },
        {
          [this.computedClass("monthCellUnselectableClass", "o-dpck__month__cell--unselectable")]: !this.selectableDate(day) || this.disabled
        },
        {
          [this.computedClass("monthCellEventsClass", "o-dpck__month__cell--events")]: this.hasEvents
        }
      ];
    },
    /*
     * Emit update:modelValue event with selected date as payload for v-model in parent
     */
    updateSelectedDate(date) {
      if (!this.range && !this.multiple) {
        this.emitChosenDate(date);
      } else if (this.range) {
        this.handleSelectRangeDate(date);
      } else if (this.multiple) {
        this.selectMultipleDates(date);
      }
    },
    /*
     * Emit select event with chosen date as payload
     */
    emitChosenDate(day) {
      if (this.disabled)
        return;
      if (!this.multiple) {
        if (this.selectableDate(day)) {
          this.$emit("update:modelValue", day);
        }
      } else {
        this.selectMultipleDates(day);
      }
    },
    /*
    * If both begin and end dates are set, reset the end date and set the begin date.
    * If only begin date is selected, emit an array of the begin date and the new date.
    * If not set, only set the begin date.
    */
    handleSelectRangeDate(date) {
      if (this.disabled)
        return;
      if (this.selectedBeginDate && this.selectedEndDate) {
        this.selectedBeginDate = date;
        this.selectedEndDate = void 0;
        this.$emit("range-start", date);
      } else if (this.selectedBeginDate && !this.selectedEndDate) {
        if (this.selectedBeginDate > date) {
          this.selectedEndDate = this.selectedBeginDate;
          this.selectedBeginDate = date;
        } else {
          this.selectedEndDate = date;
        }
        this.$emit("range-end", date);
        this.$emit("update:modelValue", [this.selectedBeginDate, this.selectedEndDate]);
      } else {
        this.selectedBeginDate = date;
        this.$emit("range-start", date);
      }
    },
    setRangeHoverEndDate(day) {
      if (this.range) {
        this.hoveredEndDate = day;
      }
    },
    changeFocus(month, inc) {
      const nextMonth = month;
      nextMonth.setMonth(month.getMonth() + inc);
      this.$emit("update:focused", nextMonth);
    }
  }
};
var _hoisted_1$1 = ["disabled", "onClick", "onMouseenter", "onKeydown", "tabindex"];
var _hoisted_2$1 = {
  key: 0,
  class: "events"
};
function render$13(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "section",
    {
      class: normalizeClass($options.monthClasses)
    },
    [createBaseVNode(
      "div",
      {
        class: normalizeClass($options.monthBodyClasses)
      },
      [createBaseVNode(
        "div",
        {
          class: normalizeClass($options.monthTableClasses)
        },
        [(openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList($options.monthDates, (date, index30) => {
            return openBlock(), createElementBlock(
              Fragment,
              {
                key: index30
              },
              [$options.selectableDate(date) && !$props.disabled ? (openBlock(), createElementBlock("a", {
                key: 0,
                ref_for: true,
                ref: `month-${date.getMonth()}`,
                class: normalizeClass($options.cellClasses(date)),
                role: "button",
                href: "#",
                disabled: $props.disabled,
                onClick: withModifiers(($event) => $options.updateSelectedDate(date), ["prevent"]),
                onMouseenter: ($event) => $options.setRangeHoverEndDate(date),
                onKeydown: withModifiers(($event) => _ctx.manageKeydown($event, date), ["prevent"]),
                tabindex: $props.focused.month === date.getMonth() ? null : -1
              }, [createTextVNode(
                toDisplayString($props.monthNames[date.getMonth()]) + " ",
                1
                /* TEXT */
              ), $options.eventsDateMatch(date) ? (openBlock(), createElementBlock("div", _hoisted_2$1, [(openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList($options.eventsDateMatch(date), (event, index31) => {
                  return openBlock(), createElementBlock(
                    "div",
                    {
                      class: normalizeClass(["event", event.type]),
                      key: index31
                    },
                    null,
                    2
                    /* CLASS */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))])) : createCommentVNode("v-if", true)], 42, _hoisted_1$1)) : (openBlock(), createElementBlock(
                "div",
                {
                  key: 1,
                  class: normalizeClass($options.cellClasses(date))
                },
                toDisplayString($props.monthNames[date.getMonth()]),
                3
                /* TEXT, CLASS */
              ))],
              64
              /* STABLE_FRAGMENT */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))],
        2
        /* CLASS */
      )],
      2
      /* CLASS */
    )],
    2
    /* CLASS */
  );
}
script$14.render = render$13;
script$14.__file = "src/components/datepicker/DatepickerMonth.vue";
var defaultDateFormatter = (date, vm) => {
  const targetDates = Array.isArray(date) ? date : [date];
  const dates = targetDates.map((date2) => {
    const d = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), 12);
    return !vm.isTypeMonth ? vm.dtf.format(d) : vm.dtfMonth.format(d);
  });
  return !vm.multiple ? dates.join(" - ") : dates.join(", ");
};
var defaultDateParser = (date, vm) => {
  if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === "function") {
    const formatRegex = (vm.isTypeMonth ? vm.dtfMonth : vm.dtf).formatToParts(new Date(2e3, 11, 25)).map((part) => {
      if (part.type === "literal") {
        return part.value;
      }
      return `((?!=<${part.type}>)\\d+)`;
    }).join("");
    const dateGroups = matchWithGroups(formatRegex, date);
    if (dateGroups.year && dateGroups.year.length === 4 && dateGroups.month && dateGroups.month <= 12) {
      if (vm.isTypeMonth)
        return new Date(dateGroups.year, dateGroups.month - 1);
      else if (dateGroups.day && dateGroups.day <= 31) {
        return new Date(dateGroups.year, dateGroups.month - 1, dateGroups.day, 12);
      }
    }
  }
  if (!vm.isTypeMonth)
    return new Date(Date.parse(date));
  if (date) {
    const s = date.split("/");
    const year = s[0].length === 4 ? s[0] : s[1];
    const month = s[0].length === 2 ? s[0] : s[1];
    if (year && month) {
      return new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1, 0, 0, 0, 0);
    }
  }
  return null;
};
var script11 = defineComponent({
  name: "ODatepicker",
  components: {
    [script$2.name]: script$2,
    [script$14.name]: script$14,
    [script9.name]: script9,
    [script2.name]: script2,
    [script10.name]: script10,
    [script.name]: script,
    [script$12.name]: script$12,
    [script8.name]: script8
  },
  configField: "datepicker",
  mixins: [BaseComponentMixin, FormElementMixin, MatchMediaMixin],
  inheritAttrs: false,
  provide() {
    return {
      $datepicker: this
    };
  },
  emits: ["update:modelValue", "focus", "blur", "invalid", "change-month", "change-year", "range-start", "range-end", "active-change", "icon-right-click"],
  props: {
    modelValue: {
      type: [Date, Array]
    },
    dayNames: {
      type: Array,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.dayNames", void 0);
      }
    },
    monthNames: {
      type: Array,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.monthNames", void 0);
      }
    },
    firstDayOfWeek: {
      type: Number,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.firstDayOfWeek", 0);
      }
    },
    /**
     * Size of button, optional
     * @values small, medium, large
     */
    size: String,
    inline: Boolean,
    minDate: Date,
    maxDate: Date,
    focusedDate: Date,
    placeholder: String,
    editable: Boolean,
    disabled: Boolean,
    unselectableDates: [Array, Function],
    unselectableDaysOfWeek: {
      type: Array,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.unselectableDaysOfWeek", void 0);
      }
    },
    selectableDates: [Array, Function],
    dateFormatter: {
      type: Function,
      default: (date, vm) => {
        const dateFormatter = getValueByPath(getOptions(), "datepicker.dateFormatter", void 0);
        if (typeof dateFormatter === "function") {
          return dateFormatter(date);
        } else {
          return defaultDateFormatter(date, vm);
        }
      }
    },
    dateParser: {
      type: Function,
      default: (date, vm) => {
        const dateParser = getValueByPath(getOptions(), "datepicker.dateParser", void 0);
        if (typeof dateParser === "function") {
          return dateParser(date);
        } else {
          return defaultDateParser(date, vm);
        }
      }
    },
    dateCreator: {
      type: Function,
      default: () => {
        const dateCreator = getValueByPath(getOptions(), "datepicker.dateCreator", void 0);
        if (typeof dateCreator === "function") {
          return dateCreator();
        } else {
          return /* @__PURE__ */ new Date();
        }
      }
    },
    mobileNative: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.mobileNative", true);
      }
    },
    position: String,
    iconRight: String,
    iconRightClickable: Boolean,
    events: Array,
    indicators: {
      type: String,
      default: "dots"
    },
    openOnFocus: Boolean,
    iconPrev: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.iconPrev", "chevron-left");
      }
    },
    iconNext: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.iconNext", "chevron-right");
      }
    },
    yearsRange: {
      type: Array,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.yearsRange", [-100, 10]);
      }
    },
    type: {
      type: String,
      validator: (value) => {
        return [
          "month"
        ].indexOf(value) >= 0;
      }
    },
    nearbyMonthDays: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.nearbyMonthDays", true);
      }
    },
    nearbySelectableMonthDays: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.nearbySelectableMonthDays", false);
      }
    },
    showWeekNumber: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.showWeekNumber", false);
      }
    },
    weekNumberClickable: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.weekNumberClickable", false);
      }
    },
    rulesForFirstWeek: {
      type: Number,
      default: () => 4
    },
    range: {
      type: Boolean,
      default: false
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    mobileModal: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.mobileModal", true);
      }
    },
    trapFocus: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.trapFocus", true);
      }
    },
    locale: {
      type: [String, Array],
      default: () => {
        return getValueByPath(getOptions(), "locale");
      }
    },
    appendToBody: Boolean,
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    rootClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    boxClass: [String, Function, Array],
    headerClass: [String, Function, Array],
    headerButtonsClass: [String, Function, Array],
    headerButtonsSizeClass: [String, Function, Array],
    prevBtnClass: [String, Function, Array],
    nextBtnClass: [String, Function, Array],
    listsClass: [String, Function, Array],
    footerClass: [String, Function, Array],
    tableClass: [String, Function, Array],
    tableHeadClass: [String, Function, Array],
    tableHeadCellClass: [String, Function, Array],
    tableBodyClass: [String, Function, Array],
    tableRowClass: [String, Function, Array],
    tableCellClass: [String, Function, Array],
    tableCellSelectedClass: [String, Function, Array],
    tableCellFirstSelectedClass: [String, Function, Array],
    tableCellInvisibleClass: [String, Function, Array],
    tableCellWithinSelectedClass: [String, Function, Array],
    tableCellLastSelectedClass: [String, Function, Array],
    tableCellFirstHoveredClass: [String, Function, Array],
    tableCellWithinHoveredClass: [String, Function, Array],
    tableCellLastHoveredClass: [String, Function, Array],
    tableCellTodayClass: [String, Function, Array],
    tableCellSelectableClass: [String, Function, Array],
    tableCellUnselectableClass: [String, Function, Array],
    tableCellNearbyClass: [String, Function, Array],
    tableCellEventsClass: [String, Function, Array],
    tableEventsClass: [String, Function, Array],
    tableEventVariantClass: [String, Function, Array],
    tableEventClass: [String, Function, Array],
    tableEventIndicatorsClass: [String, Function, Array],
    mobileClass: [String, Function, Array],
    /* datapickermonth classes */
    monthClass: [String, Function, Array],
    monthBodyClass: [String, Function, Array],
    monthTableClass: [String, Function, Array],
    monthCellClass: [String, Function, Array],
    monthCellSelectedClass: [String, Function, Array],
    monthCellFirstSelectedClass: [String, Function, Array],
    monthCellWithinSelectedClass: [String, Function, Array],
    monthCellLastSelectedClass: [String, Function, Array],
    monthCellWithinHoveredRangeClass: [String, Function, Array],
    monthCellFirstHoveredClass: [String, Function, Array],
    monthCellWithinHoveredClass: [String, Function, Array],
    monthCellLastHoveredClass: [String, Function, Array],
    monthCellTodayClass: [String, Function, Array],
    monthCellSelectableClass: [String, Function, Array],
    monthCellUnselectableClass: [String, Function, Array],
    monthCellEventsClass: [String, Function, Array],
    inputClasses: {
      type: Object,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.inputClasses", {});
      }
    },
    dropdownClasses: {
      type: Object,
      default: () => {
        return getValueByPath(getOptions(), "datepicker.dropdownClasses", {});
      }
    },
    selectListClasses: Object
  },
  data() {
    const focusedDate = (Array.isArray(this.modelValue) ? this.modelValue[0] : this.modelValue) || this.focusedDate || this.dateCreator();
    if (!this.modelValue && this.maxDate && this.maxDate.getFullYear() < focusedDate.getFullYear()) {
      focusedDate.setFullYear(this.maxDate.getFullYear());
    }
    return {
      dateSelected: this.modelValue,
      focusedDateData: {
        day: focusedDate.getDate(),
        month: focusedDate.getMonth(),
        year: focusedDate.getFullYear()
      }
    };
  },
  computed: {
    inputBind() {
      return {
        ...this.$attrs,
        ...this.inputClasses
      };
    },
    dropdownBind() {
      return {
        "root-class": this.computedClass("dropdownClasses.rootClass", "o-dpck__dropdown"),
        ...this.dropdownClasses
      };
    },
    selectListBind() {
      return {
        ...this.selectListClasses
      };
    },
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-dpck"),
        { [this.computedClass("sizeClass", "o-dpck--", this.size)]: this.size },
        { [this.computedClass("mobileClass", "o-dpck--mobile")]: this.isMatchMedia }
      ];
    },
    boxClasses() {
      return [
        this.computedClass("boxClass", "o-dpck__box")
      ];
    },
    headerClasses() {
      return [
        this.computedClass("headerClass", "o-dpck__header")
      ];
    },
    headerButtonsClasses() {
      return [
        this.computedClass("headerButtonsClass", "o-dpck__header__buttons"),
        { [this.computedClass("headerButtonsSizeClass", "o-dpck__header__buttons--", this.size)]: this.size }
      ];
    },
    prevBtnClasses() {
      return [
        this.computedClass("prevBtnClass", "o-dpck__header__previous")
      ];
    },
    nextBtnClasses() {
      return [
        this.computedClass("nextBtnClass", "o-dpck__header__next")
      ];
    },
    listsClasses() {
      return [
        this.computedClass("listsClass", "o-dpck__header__list")
      ];
    },
    footerClasses() {
      return [
        this.computedClass("footerClass", "o-dpck__footer")
      ];
    },
    computedValue: {
      get() {
        return this.dateSelected;
      },
      set(value) {
        this.updateInternalState(value);
        if (!this.multiple)
          this.togglePicker(false);
        this.$emit("update:modelValue", value);
        if (this.useHtml5Validation) {
          this.$nextTick(() => {
            this.checkHtml5Validity();
          });
        }
      }
    },
    formattedValue() {
      return this.formatValue(this.computedValue);
    },
    localeOptions() {
      return new Intl.DateTimeFormat(this.locale, {
        year: "numeric",
        month: "numeric"
      }).resolvedOptions();
    },
    dtf() {
      return new Intl.DateTimeFormat(
        this.locale
        /*, { timeZone: 'UTC' }*/
      );
    },
    dtfMonth() {
      return new Intl.DateTimeFormat(this.locale, {
        year: this.localeOptions.year || "numeric",
        month: this.localeOptions.month || "2-digit"
        // timeZone: 'UTC'
      });
    },
    newMonthNames() {
      if (Array.isArray(this.monthNames)) {
        return this.monthNames;
      }
      return getMonthNames(this.locale);
    },
    newDayNames() {
      if (Array.isArray(this.dayNames)) {
        return this.dayNames;
      }
      return getWeekdayNames(this.locale);
    },
    listOfMonths() {
      let minMonth = 0;
      let maxMonth = 12;
      if (this.minDate && this.focusedDateData.year === this.minDate.getFullYear()) {
        minMonth = this.minDate.getMonth();
      }
      if (this.maxDate && this.focusedDateData.year === this.maxDate.getFullYear()) {
        maxMonth = this.maxDate.getMonth();
      }
      return this.newMonthNames.map((name, index30) => {
        return {
          name,
          index: index30,
          disabled: index30 < minMonth || index30 > maxMonth
        };
      });
    },
    /*
     * Returns an array of years for the year dropdown. If earliest/latest
     * dates are set by props, range of years will fall within those dates.
     */
    listOfYears() {
      let latestYear = this.focusedDateData.year + this.yearsRange[1];
      if (this.maxDate && this.maxDate.getFullYear() < latestYear) {
        latestYear = Math.max(this.maxDate.getFullYear(), this.focusedDateData.year);
      }
      let earliestYear = this.focusedDateData.year + this.yearsRange[0];
      if (this.minDate && this.minDate.getFullYear() > earliestYear) {
        earliestYear = Math.min(this.minDate.getFullYear(), this.focusedDateData.year);
      }
      const arrayOfYears = [];
      for (let i = earliestYear; i <= latestYear; i++) {
        arrayOfYears.push(i);
      }
      return arrayOfYears.reverse();
    },
    showPrev() {
      if (!this.minDate)
        return false;
      if (this.isTypeMonth) {
        return this.focusedDateData.year <= this.minDate.getFullYear();
      }
      const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
      const date = new Date(this.minDate.getFullYear(), this.minDate.getMonth());
      return dateToCheck <= date;
    },
    showNext() {
      if (!this.maxDate)
        return false;
      if (this.isTypeMonth) {
        return this.focusedDateData.year >= this.maxDate.getFullYear();
      }
      const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
      const date = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth());
      return dateToCheck >= date;
    },
    isMobile() {
      return this.mobileNative && isMobile.any();
    },
    isTypeMonth() {
      return this.type === "month";
    },
    ariaRole() {
      return !this.inline ? "dialog" : void 0;
    },
    $elementRef() {
      return "input";
    }
  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    modelValue(value) {
      this.updateInternalState(value);
      if (!this.multiple)
        this.togglePicker(false);
    },
    focusedDate(value) {
      if (value) {
        this.focusedDateData = {
          day: value.getDate(),
          month: value.getMonth(),
          year: value.getFullYear()
        };
      }
    },
    /*
     * Emit input event on month and/or year change
     */
    "focusedDateData.month"(value) {
      this.$emit("change-month", value);
    },
    "focusedDateData.year"(value) {
      this.$emit("change-year", value);
    }
  },
  methods: {
    /*
     * Parse string into date
     */
    onChange(value) {
      const date = this.dateParser(value, this);
      if (date && (!isNaN(date) || Array.isArray(date) && date.length === 2 && !isNaN(date[0]) && !isNaN(date[1]))) {
        this.computedValue = date;
      } else {
        this.computedValue = null;
        if (this.$refs.input) {
          this.$refs.input.newValue = this.computedValue;
        }
      }
    },
    /*
     * Format date into string
     */
    formatValue(value) {
      if (Array.isArray(value)) {
        const isArrayWithValidDates = Array.isArray(value) && value.every((v) => !isNaN(v));
        return isArrayWithValidDates ? this.dateFormatter([...value], this) : null;
      }
      return value && !isNaN(value) ? this.dateFormatter(value, this) : null;
    },
    /*
     * Either decrement month by 1 if not January or decrement year by 1
     * and set month to 11 (December) or decrement year when 'month'
     */
    prev() {
      if (this.disabled)
        return;
      if (this.isTypeMonth) {
        this.focusedDateData.year -= 1;
      } else {
        if (this.focusedDateData.month > 0) {
          this.focusedDateData.month -= 1;
        } else {
          this.focusedDateData.month = 11;
          this.focusedDateData.year -= 1;
        }
      }
    },
    /*
     * Either increment month by 1 if not December or increment year by 1
     * and set month to 0 (January) or increment year when 'month'
     */
    next() {
      if (this.disabled)
        return;
      if (this.isTypeMonth) {
        this.focusedDateData.year += 1;
      } else {
        if (this.focusedDateData.month < 11) {
          this.focusedDateData.month += 1;
        } else {
          this.focusedDateData.month = 0;
          this.focusedDateData.year += 1;
        }
      }
    },
    formatNative(value) {
      return this.isTypeMonth ? this.formatYYYYMM(value) : this.formatYYYYMMDD(value);
    },
    /*
     * Format date into string 'YYYY-MM-DD'
     */
    formatYYYYMMDD(value) {
      const date = new Date(value);
      if (value && !isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year + "-" + ((month < 10 ? "0" : "") + month) + "-" + ((day < 10 ? "0" : "") + day);
      }
      return "";
    },
    /*
     * Format date into string 'YYYY-MM'
     */
    formatYYYYMM(value) {
      const date = new Date(value);
      if (value && !isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return year + "-" + ((month < 10 ? "0" : "") + month);
      }
      return "";
    },
    /*
     * Parse date from string
     */
    onChangeNativePicker(event) {
      const date = event.target.value;
      const s = date ? date.split("-") : [];
      if (s.length === 3) {
        const year = parseInt(s[0], 10);
        const month = parseInt(s[1]) - 1;
        const day = parseInt(s[2]);
        this.computedValue = new Date(year, month, day);
      } else {
        this.computedValue = null;
      }
    },
    updateInternalState(value) {
      if (this.dateSelected === value)
        return;
      const isArray = Array.isArray(value);
      const currentDate = isArray ? !value.length ? this.dateCreator() : value[value.length - 1] : !value ? this.dateCreator() : value;
      if (!isArray || isArray && this.dateSelected && value.length > this.dateSelected.length) {
        this.focusedDateData = {
          day: currentDate.getDate(),
          month: currentDate.getMonth(),
          year: currentDate.getFullYear()
        };
      }
      this.dateSelected = value;
    },
    /*
     * Toggle datepicker
     */
    togglePicker(active) {
      if (this.$refs.dropdown) {
        const isActive = typeof active === "boolean" ? active : !this.$refs.dropdown.isActive;
        if (isActive) {
          this.$refs.dropdown.isActive = isActive;
        } else if (this.closeOnClick) {
          this.$refs.dropdown.isActive = isActive;
        }
      }
    },
    /*
     * Call default onFocus method and show datepicker
     */
    handleOnFocus(event) {
      this.onFocus(event);
      if (this.openOnFocus) {
        this.togglePicker(true);
      }
    },
    /*
     * Toggle dropdown
     */
    toggle() {
      if (this.mobileNative && this.isMobile) {
        const input = this.$refs.input.$refs.input;
        input.focus();
        input.click();
        return;
      }
      this.$refs.dropdown.toggle();
    },
    /*
     * Avoid dropdown toggle when is already visible
     */
    onInputClick(event) {
      if (this.$refs.dropdown.isActive) {
        event.stopPropagation();
      }
    },
    /**
     * Keypress event that is bound to the document.
     */
    keyPress({ key }) {
      if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === "Escape" || key === "Esc")) {
        this.togglePicker(false);
      }
    },
    /**
     * Emit 'blur' event on dropdown is not active (closed)
     */
    onActiveChange(value) {
      if (!value) {
        this.onBlur();
      }
      this.$emit("active-change", value);
    },
    changeFocus(day) {
      this.focusedDateData = {
        day: day.getDate(),
        month: day.getMonth(),
        year: day.getFullYear()
      };
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
    }
  }
});
var _hoisted_18 = ["aria-label"];
var _hoisted_27 = ["aria-label"];
var _hoisted_33 = ["value", "disabled"];
var _hoisted_42 = ["value"];
function render11(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_input = resolveComponent("o-input");
  const _component_o_icon = resolveComponent("o-icon");
  const _component_o_select = resolveComponent("o-select");
  const _component_o_datepicker_table = resolveComponent("o-datepicker-table");
  const _component_o_datepicker_month = resolveComponent("o-datepicker-month");
  const _component_o_dropdown_item = resolveComponent("o-dropdown-item");
  const _component_o_dropdown = resolveComponent("o-dropdown");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.rootClasses)
    },
    [!_ctx.isMobile || _ctx.inline ? (openBlock(), createBlock(_component_o_dropdown, mergeProps({
      key: 0,
      ref: "dropdown"
    }, _ctx.dropdownBind, {
      position: _ctx.position,
      disabled: _ctx.disabled,
      inline: _ctx.inline,
      "mobile-modal": _ctx.mobileModal,
      "trap-focus": _ctx.trapFocus,
      "aria-role": _ctx.ariaRole,
      "aria-modal": !_ctx.inline,
      "trigger-tabindex": -1,
      "append-to-body": _ctx.appendToBody,
      "append-to-body-copy-parent": "",
      onActiveChange: _ctx.onActiveChange
    }), createSlots({
      default: withCtx(() => [createVNode(_component_o_dropdown_item, {
        override: "",
        tag: "div",
        "item-class": _ctx.boxClasses,
        disabled: _ctx.disabled,
        clickable: false
      }, {
        default: withCtx(() => [createBaseVNode(
          "header",
          {
            class: normalizeClass(_ctx.headerClasses)
          },
          [renderSlot(_ctx.$slots, "header", {}, () => [createBaseVNode(
            "div",
            {
              class: normalizeClass(_ctx.headerButtonsClasses)
            },
            [withDirectives(createBaseVNode("a", {
              class: normalizeClass(_ctx.prevBtnClasses),
              role: "button",
              href: "#",
              "aria-label": _ctx.ariaPreviousLabel,
              onClick: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.prev && _ctx.prev(...args), ["prevent"])),
              onKeydown: [_cache[4] || (_cache[4] = withKeys(withModifiers((...args) => _ctx.prev && _ctx.prev(...args), ["prevent"]), ["enter"])), _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => _ctx.prev && _ctx.prev(...args), ["prevent"]), ["space"]))]
            }, [createVNode(_component_o_icon, {
              icon: _ctx.iconPrev,
              pack: _ctx.iconPack,
              both: "",
              clickable: ""
            }, null, 8, ["icon", "pack"])], 42, _hoisted_18), [[vShow, !_ctx.showPrev && !_ctx.disabled]]), withDirectives(createBaseVNode("a", {
              class: normalizeClass(_ctx.nextBtnClasses),
              role: "button",
              href: "#",
              "aria-label": _ctx.ariaNextLabel,
              onClick: _cache[6] || (_cache[6] = withModifiers((...args) => _ctx.next && _ctx.next(...args), ["prevent"])),
              onKeydown: [_cache[7] || (_cache[7] = withKeys(withModifiers((...args) => _ctx.next && _ctx.next(...args), ["prevent"]), ["enter"])), _cache[8] || (_cache[8] = withKeys(withModifiers((...args) => _ctx.next && _ctx.next(...args), ["prevent"]), ["space"]))]
            }, [createVNode(_component_o_icon, {
              icon: _ctx.iconNext,
              pack: _ctx.iconPack,
              both: "",
              clickable: ""
            }, null, 8, ["icon", "pack"])], 42, _hoisted_27), [[vShow, !_ctx.showNext && !_ctx.disabled]]), createBaseVNode(
              "div",
              {
                class: normalizeClass(_ctx.listsClasses)
              },
              [!_ctx.isTypeMonth ? (openBlock(), createBlock(_component_o_select, mergeProps({
                key: 0,
                modelValue: _ctx.focusedDateData.month,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.focusedDateData.month = $event),
                disabled: _ctx.disabled,
                size: _ctx.size
              }, _ctx.selectListBind), {
                default: withCtx(() => [(openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(_ctx.listOfMonths, (month) => {
                    return openBlock(), createElementBlock("option", {
                      value: month.index,
                      key: month.name,
                      disabled: month.disabled
                    }, toDisplayString(month.name), 9, _hoisted_33);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))]),
                _: 1
                /* STABLE */
              }, 16, ["modelValue", "disabled", "size"])) : createCommentVNode("v-if", true), createVNode(_component_o_select, mergeProps({
                modelValue: _ctx.focusedDateData.year,
                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.focusedDateData.year = $event),
                disabled: _ctx.disabled,
                size: _ctx.size
              }, _ctx.selectListBind), {
                default: withCtx(() => [(openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(_ctx.listOfYears, (year) => {
                    return openBlock(), createElementBlock("option", {
                      value: year,
                      key: year
                    }, toDisplayString(year), 9, _hoisted_42);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))]),
                _: 1
                /* STABLE */
              }, 16, ["modelValue", "disabled", "size"])],
              2
              /* CLASS */
            )],
            2
            /* CLASS */
          )])],
          2
          /* CLASS */
        ), renderSlot(_ctx.$slots, "table", {}, () => [!_ctx.isTypeMonth ? (openBlock(), createBlock(_component_o_datepicker_table, {
          key: 0,
          modelValue: _ctx.computedValue,
          "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.computedValue = $event),
          "day-names": _ctx.newDayNames,
          "month-names": _ctx.newMonthNames,
          "first-day-of-week": _ctx.firstDayOfWeek,
          "rules-for-first-week": _ctx.rulesForFirstWeek,
          "min-date": _ctx.minDate,
          "max-date": _ctx.maxDate,
          focused: _ctx.focusedDateData,
          disabled: _ctx.disabled,
          "unselectable-dates": _ctx.unselectableDates,
          "unselectable-days-of-week": _ctx.unselectableDaysOfWeek,
          "selectable-dates": _ctx.selectableDates,
          events: _ctx.events,
          indicators: _ctx.indicators,
          "date-creator": _ctx.dateCreator,
          "type-month": _ctx.isTypeMonth,
          "nearby-month-days": _ctx.nearbyMonthDays,
          "nearby-selectable-month-days": _ctx.nearbySelectableMonthDays,
          "show-week-number": _ctx.showWeekNumber,
          "week-number-clickable": _ctx.weekNumberClickable,
          range: _ctx.range,
          multiple: _ctx.multiple,
          "table-class": _ctx.tableClass,
          "table-head-class": _ctx.tableHeadClass,
          "table-head-cell-class": _ctx.tableHeadCellClass,
          "table-body-class": _ctx.tableBodyClass,
          "table-row-class": _ctx.tableRowClass,
          "table-cell-class": _ctx.tableCellClass,
          "table-cell-selected-class": _ctx.tableCellSelectedClass,
          "table-cell-first-selected-class": _ctx.tableCellFirstSelectedClass,
          "table-cell-invisible-class": _ctx.tableCellInvisibleClass,
          "table-cell-within-selected-class": _ctx.tableCellWithinSelectedClass,
          "table-cell-last-selected-class": _ctx.tableCellLastSelectedClass,
          "table-cell-first-hovered-class": _ctx.tableCellFirstHoveredClass,
          "table-cell-within-hovered-class": _ctx.tableCellWithinHoveredClass,
          "table-cell-last-hovered-class": _ctx.tableCellLastHoveredClass,
          "table-cell-today-class": _ctx.tableCellTodayClass,
          "table-cell-selectable-class": _ctx.tableCellSelectableClass,
          "table-cell-unselectable-class": _ctx.tableCellUnselectableClass,
          "table-cell-nearby-class": _ctx.tableCellNearbyClass,
          "table-cell-events-class": _ctx.tableCellEventsClass,
          "table-events-class": _ctx.tableEventsClass,
          "table-event-variant-class": _ctx.tableEventVariantClass,
          "table-event-class": _ctx.tableEventClass,
          "table-event-indicators-class": _ctx.tableEventIndicatorsClass,
          onRangeStart: _cache[12] || (_cache[12] = (date) => _ctx.$emit("range-start", date)),
          onRangeEnd: _cache[13] || (_cache[13] = (date) => _ctx.$emit("range-end", date)),
          onClose: _cache[14] || (_cache[14] = ($event) => _ctx.togglePicker(false)),
          "onUpdate:focused": _cache[15] || (_cache[15] = ($event) => _ctx.focusedDateData = $event)
        }, null, 8, ["modelValue", "day-names", "month-names", "first-day-of-week", "rules-for-first-week", "min-date", "max-date", "focused", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "type-month", "nearby-month-days", "nearby-selectable-month-days", "show-week-number", "week-number-clickable", "range", "multiple", "table-class", "table-head-class", "table-head-cell-class", "table-body-class", "table-row-class", "table-cell-class", "table-cell-selected-class", "table-cell-first-selected-class", "table-cell-invisible-class", "table-cell-within-selected-class", "table-cell-last-selected-class", "table-cell-first-hovered-class", "table-cell-within-hovered-class", "table-cell-last-hovered-class", "table-cell-today-class", "table-cell-selectable-class", "table-cell-unselectable-class", "table-cell-nearby-class", "table-cell-events-class", "table-events-class", "table-event-variant-class", "table-event-class", "table-event-indicators-class"])) : createCommentVNode("v-if", true), _ctx.isTypeMonth ? (openBlock(), createBlock(_component_o_datepicker_month, {
          key: 1,
          modelValue: _ctx.computedValue,
          "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => _ctx.computedValue = $event),
          "month-names": _ctx.newMonthNames,
          "min-date": _ctx.minDate,
          "max-date": _ctx.maxDate,
          focused: _ctx.focusedDateData,
          disabled: _ctx.disabled,
          "unselectable-dates": _ctx.unselectableDates,
          "unselectable-days-of-week": _ctx.unselectableDaysOfWeek,
          "selectable-dates": _ctx.selectableDates,
          events: _ctx.events,
          indicators: _ctx.indicators,
          "date-creator": _ctx.dateCreator,
          range: _ctx.range,
          multiple: _ctx.multiple,
          "month-class": _ctx.monthClass,
          "month-body-class": _ctx.monthBodyClass,
          "month-table-class": _ctx.monthTableClass,
          "month-cell-class": _ctx.monthCellClass,
          "month-cell-selected-class": _ctx.monthCellSelectedClass,
          "month-cell-first-selected-class": _ctx.monthCellFirstSelectedClass,
          "month-cell-within-selected-class": _ctx.monthCellWithinSelectedClass,
          "month-cell-last-selected-class": _ctx.monthCellLastSelectedClass,
          "month-cell-within-hovered-range-class": _ctx.monthCellWithinHoveredRangeClass,
          "month-cell-first-hovered-class": _ctx.monthCellFirstHoveredClass,
          "month-cell-within-hovered-class": _ctx.monthCellWithinHoveredClass,
          "month-cell-last-hovered-class": _ctx.monthCellLastHoveredClass,
          "month-cell-today-class": _ctx.monthCellTodayClass,
          "month-cell-selectable-class": _ctx.monthCellSelectableClass,
          "month-cell-unselectable-class": _ctx.monthCellUnselectableClass,
          "month-cell-events-class": _ctx.monthCellEventsClass,
          onRangeStart: _cache[17] || (_cache[17] = (date) => _ctx.$emit("range-start", date)),
          onRangeEnd: _cache[18] || (_cache[18] = (date) => _ctx.$emit("range-end", date)),
          onClose: _cache[19] || (_cache[19] = ($event) => _ctx.togglePicker(false)),
          onChangeFocus: _ctx.changeFocus,
          "onUpdate:focused": _cache[20] || (_cache[20] = ($event) => _ctx.focusedDateData = $event)
        }, null, 8, ["modelValue", "month-names", "min-date", "max-date", "focused", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "range", "multiple", "month-class", "month-body-class", "month-table-class", "month-cell-class", "month-cell-selected-class", "month-cell-first-selected-class", "month-cell-within-selected-class", "month-cell-last-selected-class", "month-cell-within-hovered-range-class", "month-cell-first-hovered-class", "month-cell-within-hovered-class", "month-cell-last-hovered-class", "month-cell-today-class", "month-cell-selectable-class", "month-cell-unselectable-class", "month-cell-events-class", "onChangeFocus"])) : createCommentVNode("v-if", true)]), _ctx.$slots.footer !== void 0 ? (openBlock(), createElementBlock(
          "footer",
          {
            key: 0,
            class: normalizeClass(_ctx.footerClasses)
          },
          [renderSlot(_ctx.$slots, "footer")],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true)]),
        _: 3
        /* FORWARDED */
      }, 8, ["item-class", "disabled"])]),
      _: 2
      /* DYNAMIC */
    }, [!_ctx.inline ? {
      name: "trigger",
      fn: withCtx(() => [renderSlot(_ctx.$slots, "trigger", {}, () => [createVNode(_component_o_input, mergeProps({
        ref: "input",
        autocomplete: "off",
        "model-value": _ctx.formattedValue,
        expanded: _ctx.expanded,
        placeholder: _ctx.placeholder,
        size: _ctx.size,
        icon: _ctx.icon,
        "icon-right": _ctx.iconRight,
        "icon-right-clickable": _ctx.iconRightClickable,
        "icon-pack": _ctx.iconPack,
        rounded: _ctx.rounded,
        disabled: _ctx.disabled,
        readonly: !_ctx.editable
      }, _ctx.inputBind, {
        "use-html5-validation": false,
        onClick: _ctx.onInputClick,
        onIconRightClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("icon-right-click")),
        onKeyup: _cache[1] || (_cache[1] = withKeys(($event) => _ctx.togglePicker(true), ["enter"])),
        onChange: _cache[2] || (_cache[2] = ($event) => _ctx.onChange($event.target.value)),
        onFocus: _ctx.handleOnFocus
      }), null, 16, ["model-value", "expanded", "placeholder", "size", "icon", "icon-right", "icon-right-clickable", "icon-pack", "rounded", "disabled", "readonly", "onClick", "onFocus"])])]),
      key: "0"
    } : void 0]), 1040, ["position", "disabled", "inline", "mobile-modal", "trap-focus", "aria-role", "aria-modal", "append-to-body", "onActiveChange"])) : (openBlock(), createBlock(_component_o_input, mergeProps({
      key: 1,
      ref: "input",
      type: !_ctx.isTypeMonth ? "date" : "month",
      autocomplete: "off",
      value: _ctx.formatNative(_ctx.computedValue),
      placeholder: _ctx.placeholder,
      size: _ctx.size,
      icon: _ctx.icon,
      "icon-pack": _ctx.iconPack,
      rounded: _ctx.rounded,
      max: _ctx.formatNative(_ctx.maxDate),
      min: _ctx.formatNative(_ctx.minDate),
      disabled: _ctx.disabled,
      readonly: false
    }, _ctx.$attrs, {
      "use-html5-validation": false,
      onChange: _ctx.onChangeNativePicker,
      onFocus: _ctx.onFocus,
      onBlur: _ctx.onBlur,
      onInvalid: _ctx.onInvalid
    }), null, 16, ["type", "value", "placeholder", "size", "icon", "icon-pack", "rounded", "max", "min", "disabled", "onChange", "onFocus", "onBlur", "onInvalid"]))],
    2
    /* CLASS */
  );
}
script11.render = render11;
script11.__file = "src/components/datepicker/Datepicker.vue";

// node_modules/@oruga-ui/oruga-next/dist/esm/datepicker.mjs
var index6 = {
  install(app) {
    registerComponent(app, script11);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/Timepicker-a6098ce0.mjs
var AM = "AM";
var PM = "PM";
var HOUR_FORMAT_24 = "24";
var HOUR_FORMAT_12 = "12";
var defaultTimeFormatter = (date, vm) => {
  return vm.dtf.format(date);
};
var defaultTimeParser = (timeString, vm) => {
  if (timeString) {
    let d = null;
    if (vm.computedValue && !isNaN(vm.computedValue)) {
      d = new Date(vm.computedValue);
    } else {
      d = vm.timeCreator();
      d.setMilliseconds(0);
    }
    if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === "function") {
      const formatRegex = vm.dtf.formatToParts(d).map((part) => {
        if (part.type === "literal") {
          return part.value.replace(/ /g, "\\s?");
        } else if (part.type === "dayPeriod") {
          return `((?!=<${part.type}>)(${vm.amString}|${vm.pmString}|${AM}|${PM}|${AM.toLowerCase()}|${PM.toLowerCase()})?)`;
        }
        return `((?!=<${part.type}>)\\d+)`;
      }).join("");
      const timeGroups = matchWithGroups(formatRegex, timeString);
      timeGroups.hour = timeGroups.hour ? parseInt(timeGroups.hour, 10) : null;
      timeGroups.minute = timeGroups.minute ? parseInt(timeGroups.minute, 10) : null;
      timeGroups.second = timeGroups.second ? parseInt(timeGroups.second, 10) : null;
      if (timeGroups.hour && timeGroups.hour >= 0 && timeGroups.hour < 24 && timeGroups.minute && timeGroups.minute >= 0 && timeGroups.minute < 59) {
        if (timeGroups.dayPeriod && (timeGroups.dayPeriod.toLowerCase() === vm.pmString.toLowerCase() || timeGroups.dayPeriod.toLowerCase() === PM.toLowerCase()) && timeGroups.hour < 12) {
          timeGroups.hour += 12;
        }
        d.setHours(timeGroups.hour);
        d.setMinutes(timeGroups.minute);
        d.setSeconds(timeGroups.second || 0);
        return d;
      }
    }
    let am = false;
    if (vm.hourFormat === HOUR_FORMAT_12) {
      const dateString12 = timeString.split(" ");
      timeString = dateString12[0];
      am = dateString12[1] === vm.amString || dateString12[1] === AM;
    }
    const time = timeString.split(":");
    let hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);
    const seconds = vm.enableSeconds ? parseInt(time[2], 10) : 0;
    if (isNaN(hours) || hours < 0 || hours > 23 || vm.hourFormat === HOUR_FORMAT_12 && (hours < 1 || hours > 12) || isNaN(minutes) || minutes < 0 || minutes > 59) {
      return null;
    }
    d.setSeconds(seconds);
    d.setMinutes(minutes);
    if (vm.hourFormat === HOUR_FORMAT_12) {
      if (am && hours === 12) {
        hours = 0;
      } else if (!am && hours !== 12) {
        hours += 12;
      }
    }
    d.setHours(hours);
    return new Date(d.getTime());
  }
  return null;
};
var TimepickerMixin = defineComponent({
  mixins: [FormElementMixin],
  inheritAttrs: false,
  emits: ["update:modelValue"],
  props: {
    /** @model */
    modelValue: Date,
    inline: Boolean,
    minTime: Date,
    maxTime: Date,
    placeholder: String,
    editable: Boolean,
    disabled: Boolean,
    /**
     * Size of button, optional
     * @values small, medium, large
     */
    size: String,
    hourFormat: {
      type: String
    },
    incrementHours: {
      type: Number,
      default: 1
    },
    incrementMinutes: {
      type: Number,
      default: 1
    },
    incrementSeconds: {
      type: Number,
      default: 1
    },
    timeFormatter: {
      type: Function,
      default: (date, vm) => {
        const timeFormatter = getValueByPath(getOptions(), "timepicker.timeFormatter", void 0);
        if (typeof timeFormatter === "function") {
          return timeFormatter(date);
        } else {
          return defaultTimeFormatter(date, vm);
        }
      }
    },
    timeParser: {
      type: Function,
      default: (date, vm) => {
        const timeParser = getValueByPath(getOptions(), "timepicker.timeParser", void 0);
        if (typeof timeParser === "function") {
          return timeParser(date);
        } else {
          return defaultTimeParser(date, vm);
        }
      }
    },
    mobileNative: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "timepicker.mobileNative", true);
      }
    },
    timeCreator: {
      type: Function,
      default: () => {
        const timeCreator = getValueByPath(getOptions(), "timepicker.timeCreator", void 0);
        if (typeof timeCreator === "function") {
          return timeCreator();
        } else {
          return /* @__PURE__ */ new Date();
        }
      }
    },
    position: String,
    unselectableTimes: Array,
    openOnFocus: Boolean,
    enableSeconds: Boolean,
    defaultMinutes: Number,
    defaultSeconds: Number,
    appendToBody: Boolean,
    resetOnMeridianChange: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dateSelected: this.modelValue,
      hoursSelected: null,
      minutesSelected: null,
      secondsSelected: null,
      meridienSelected: null,
      _elementRef: "input"
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.dateSelected;
      },
      set(value) {
        this.dateSelected = value;
        this.$emit("update:modelValue", this.dateSelected);
      }
    },
    localeOptions() {
      return new Intl.DateTimeFormat(this.locale, {
        hour: "numeric",
        minute: "numeric",
        second: this.enableSeconds ? "numeric" : void 0
      }).resolvedOptions();
    },
    dtf() {
      return new Intl.DateTimeFormat(this.locale, {
        hour: this.localeOptions.hour || "numeric",
        minute: this.localeOptions.minute || "numeric",
        second: this.enableSeconds ? this.localeOptions.second || "numeric" : void 0,
        // @ts-ignore to update types
        hourCycle: !this.isHourFormat24 ? "h12" : "h23"
      });
    },
    newHourFormat() {
      return this.hourFormat || (this.localeOptions.hour12 ? HOUR_FORMAT_12 : HOUR_FORMAT_24);
    },
    sampleTime() {
      let d = this.timeCreator();
      d.setHours(10);
      d.setSeconds(0);
      d.setMinutes(0);
      d.setMilliseconds(0);
      return d;
    },
    hourLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
        let d = this.sampleTime;
        const parts = this.dtf.formatToParts(d);
        const literal = parts.find((part, idx) => idx > 0 && parts[idx - 1].type === "hour");
        if (literal) {
          return literal.value;
        }
      }
      return ":";
    },
    minuteLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
        let d = this.sampleTime;
        const parts = this.dtf.formatToParts(d);
        const literal = parts.find((part, idx) => idx > 0 && parts[idx - 1].type === "minute");
        if (literal) {
          return literal.value;
        }
      }
      return ":";
    },
    secondLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
        let d = this.sampleTime;
        const parts = this.dtf.formatToParts(d);
        const literal = parts.find((part, idx) => idx > 0 && parts[idx - 1].type === "second");
        if (literal) {
          return literal.value;
        }
      }
    },
    amString() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
        let d = this.sampleTime;
        d.setHours(10);
        const dayPeriod = this.dtf.formatToParts(d).find((part) => part.type === "dayPeriod");
        if (dayPeriod) {
          return dayPeriod.value;
        }
      }
      return AM;
    },
    pmString() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
        let d = this.sampleTime;
        d.setHours(20);
        const dayPeriod = this.dtf.formatToParts(d).find((part) => part.type === "dayPeriod");
        if (dayPeriod) {
          return dayPeriod.value;
        }
      }
      return PM;
    },
    hours() {
      if (!this.incrementHours || this.incrementHours < 1)
        throw new Error("Hour increment cannot be null or less than 1.");
      const hours = [];
      const numberOfHours = this.isHourFormat24 ? 24 : 12;
      for (let i = 0; i < numberOfHours; i += this.incrementHours) {
        let value = i;
        let label = value;
        if (!this.isHourFormat24) {
          value = i + 1;
          label = value;
          if (this.meridienSelected === this.amString) {
            if (value === 12) {
              value = 0;
            }
          } else if (this.meridienSelected === this.pmString) {
            if (value !== 12) {
              value += 12;
            }
          }
        }
        hours.push({
          label: this.formatNumber(label),
          value
        });
      }
      return hours;
    },
    minutes() {
      if (!this.incrementMinutes || this.incrementMinutes < 1)
        throw new Error("Minute increment cannot be null or less than 1.");
      const minutes = [];
      for (let i = 0; i < 60; i += this.incrementMinutes) {
        minutes.push({
          label: this.formatNumber(i, true),
          value: i
        });
      }
      return minutes;
    },
    seconds() {
      if (!this.incrementSeconds || this.incrementSeconds < 1)
        throw new Error("Second increment cannot be null or less than 1.");
      const seconds = [];
      for (let i = 0; i < 60; i += this.incrementSeconds) {
        seconds.push({
          label: this.formatNumber(i, true),
          value: i
        });
      }
      return seconds;
    },
    meridiens() {
      return [this.amString, this.pmString];
    },
    isMobile() {
      return this.mobileNative && isMobile.any();
    },
    isHourFormat24() {
      return this.newHourFormat === HOUR_FORMAT_24;
    }
  },
  watch: {
    hourFormat() {
      if (this.hoursSelected !== null) {
        this.meridienSelected = this.hoursSelected >= 12 ? this.pmString : this.amString;
      }
    },
    locale() {
      if (!this.value) {
        this.meridienSelected = this.amString;
      }
    },
    /**
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    modelValue: {
      handler(value) {
        this.updateInternalState(value);
        !this.isValid && this.$refs.input.checkHtml5Validity();
      },
      immediate: true
    }
  },
  methods: {
    onMeridienChange(value) {
      if (this.hoursSelected !== null && this.resetOnMeridianChange) {
        this.hoursSelected = null;
        this.minutesSelected = null;
        this.secondsSelected = null;
        this.computedValue = null;
      } else if (this.hoursSelected !== null) {
        if (value === this.pmString) {
          this.hoursSelected += 12;
        } else if (value === this.amString) {
          this.hoursSelected -= 12;
        }
      }
      this.updateDateSelected(this.hoursSelected, this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, value);
    },
    onHoursChange(value) {
      if (!this.minutesSelected && typeof this.defaultMinutes !== "undefined") {
        this.minutesSelected = this.defaultMinutes;
      }
      if (!this.secondsSelected && typeof this.defaultSeconds !== "undefined") {
        this.secondsSelected = this.defaultSeconds;
      }
      this.updateDateSelected(parseInt(value, 10), this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
    },
    onMinutesChange(value) {
      if (!this.secondsSelected && this.defaultSeconds) {
        this.secondsSelected = this.defaultSeconds;
      }
      this.updateDateSelected(this.hoursSelected, parseInt(value, 10), this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
    },
    onSecondsChange(value) {
      this.updateDateSelected(this.hoursSelected, this.minutesSelected, parseInt(value, 10), this.meridienSelected);
    },
    updateDateSelected(hours, minutes, seconds, meridiens) {
      if (hours != null && minutes != null && (!this.isHourFormat24 && meridiens !== null || this.isHourFormat24)) {
        let time = null;
        if (this.computedValue && !isNaN(this.computedValue)) {
          time = new Date(this.computedValue);
        } else {
          time = this.timeCreator();
          time.setMilliseconds(0);
        }
        time.setHours(hours);
        time.setMinutes(minutes);
        time.setSeconds(seconds);
        if (!isNaN(time.getTime())) {
          this.computedValue = new Date(time.getTime());
        }
      }
    },
    updateInternalState(value) {
      if (value) {
        this.hoursSelected = value.getHours();
        this.minutesSelected = value.getMinutes();
        this.secondsSelected = value.getSeconds();
        this.meridienSelected = value.getHours() >= 12 ? this.pmString : this.amString;
      } else {
        this.hoursSelected = null;
        this.minutesSelected = null;
        this.secondsSelected = null;
        this.meridienSelected = this.amString;
      }
      this.dateSelected = value;
    },
    isHourDisabled(hour) {
      let disabled = false;
      if (this.minTime) {
        const minHours = this.minTime.getHours();
        const noMinutesAvailable = this.minutes.every((minute) => {
          return this.isMinuteDisabledForHour(hour, minute.value);
        });
        disabled = hour < minHours || noMinutesAvailable;
      }
      if (this.maxTime) {
        if (!disabled) {
          const maxHours = this.maxTime.getHours();
          disabled = hour > maxHours;
        }
      }
      if (this.unselectableTimes) {
        if (!disabled) {
          const unselectable = this.unselectableTimes.filter((time) => {
            if (this.enableSeconds && this.secondsSelected !== null) {
              return time.getHours() === hour && time.getMinutes() === this.minutesSelected && time.getSeconds() === this.secondsSelected;
            } else if (this.minutesSelected !== null) {
              return time.getHours() === hour && time.getMinutes() === this.minutesSelected;
            }
            return false;
          });
          if (unselectable.length > 0) {
            disabled = true;
          } else {
            disabled = this.minutes.every((minute) => {
              return this.unselectableTimes.filter((time) => {
                return time.getHours() === hour && time.getMinutes() === minute.value;
              }).length > 0;
            });
          }
        }
      }
      return disabled;
    },
    isMinuteDisabledForHour(hour, minute) {
      let disabled = false;
      if (this.minTime) {
        const minHours = this.minTime.getHours();
        const minMinutes = this.minTime.getMinutes();
        disabled = hour === minHours && minute < minMinutes;
      }
      if (this.maxTime) {
        if (!disabled) {
          const maxHours = this.maxTime.getHours();
          const maxMinutes = this.maxTime.getMinutes();
          disabled = hour === maxHours && minute > maxMinutes;
        }
      }
      return disabled;
    },
    isMinuteDisabled(minute) {
      let disabled = false;
      if (this.hoursSelected !== null) {
        if (this.isHourDisabled(this.hoursSelected)) {
          disabled = true;
        } else {
          disabled = this.isMinuteDisabledForHour(this.hoursSelected, minute);
        }
        if (this.unselectableTimes) {
          if (!disabled) {
            const unselectable = this.unselectableTimes.filter((time) => {
              if (this.enableSeconds && this.secondsSelected !== null) {
                return time.getHours() === this.hoursSelected && time.getMinutes() === minute && time.getSeconds() === this.secondsSelected;
              } else {
                return time.getHours() === this.hoursSelected && time.getMinutes() === minute;
              }
            });
            disabled = unselectable.length > 0;
          }
        }
      }
      return disabled;
    },
    isSecondDisabled(second) {
      let disabled = false;
      if (this.minutesSelected !== null) {
        if (this.isMinuteDisabled(this.minutesSelected)) {
          disabled = true;
        } else {
          if (this.minTime) {
            const minHours = this.minTime.getHours();
            const minMinutes = this.minTime.getMinutes();
            const minSeconds = this.minTime.getSeconds();
            disabled = this.hoursSelected === minHours && this.minutesSelected === minMinutes && second < minSeconds;
          }
          if (this.maxTime) {
            if (!disabled) {
              const maxHours = this.maxTime.getHours();
              const maxMinutes = this.maxTime.getMinutes();
              const maxSeconds = this.maxTime.getSeconds();
              disabled = this.hoursSelected === maxHours && this.minutesSelected === maxMinutes && second > maxSeconds;
            }
          }
        }
        if (this.unselectableTimes) {
          if (!disabled) {
            const unselectable = this.unselectableTimes.filter((time) => {
              return time.getHours() === this.hoursSelected && time.getMinutes() === this.minutesSelected && time.getSeconds() === second;
            });
            disabled = unselectable.length > 0;
          }
        }
      }
      return disabled;
    },
    isMeridienDisabled(meridienString) {
      const offset = meridienString == "AM" ? 0 : 12;
      for (let i = 0; i < 12; i++) {
        if (!this.isHourDisabled(i + offset)) {
          return false;
        }
      }
      return true;
    },
    /*
     * Parse string into date
     */
    onChange(value) {
      const date = this.timeParser(value, this);
      this.updateInternalState(date);
      if (date && !isNaN(date)) {
        this.computedValue = date;
      } else {
        this.computedValue = null;
        this.$refs.input.newValue = this.computedValue;
      }
    },
    /*
     * Toggle timepicker
     */
    toggle(active) {
      if (this.$refs.dropdown) {
        this.$refs.dropdown.isActive = typeof active === "boolean" ? active : !this.$refs.dropdown.isActive;
      }
    },
    /*
     * Close timepicker
     */
    close() {
      this.toggle(false);
    },
    /*
     * Call default onFocus method and show timepicker
     */
    handleOnFocus() {
      this.onFocus();
      if (this.openOnFocus) {
        this.toggle(true);
      }
    },
    /*
     * Format date into string 'HH-MM-SS'
     */
    formatHHMMSS(value) {
      const date = new Date(value);
      if (value && !isNaN(date.getTime())) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return this.formatNumber(hours, true) + ":" + this.formatNumber(minutes, true) + ":" + this.formatNumber(seconds, true);
      }
      return "";
    },
    /*
     * Parse time from string
     */
    onChangeNativePicker(event) {
      const date = event.target.value;
      if (date) {
        let time = null;
        if (this.computedValue && !isNaN(this.computedValue)) {
          time = new Date(this.computedValue);
        } else {
          time = /* @__PURE__ */ new Date();
          time.setMilliseconds(0);
        }
        const t = date.split(":");
        time.setHours(parseInt(t[0], 10));
        time.setMinutes(parseInt(t[1], 10));
        time.setSeconds(t[2] ? parseInt(t[2], 10) : 0);
        this.computedValue = new Date(time.getTime());
      } else {
        this.computedValue = null;
      }
    },
    formatNumber(value, prependZero) {
      return this.isHourFormat24 || prependZero ? this.pad(value) : value;
    },
    pad(value) {
      return (value < 10 ? "0" : "") + value;
    },
    /*
     * Format date into string
     */
    formatValue(date) {
      if (date && !isNaN(date)) {
        return this.timeFormatter(date, this);
      } else {
        return null;
      }
    },
    /**
     * Keypress event that is bound to the document.
     */
    keyPress({ key }) {
      if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === "Escape" || key === "Esc")) {
        this.toggle(false);
      }
    },
    /**
     * Emit 'blur' event on dropdown is not active (closed)
     */
    onActiveChange(value) {
      if (!value) {
        this.onBlur();
      }
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
    }
  }
});
var script12 = defineComponent({
  name: "OTimepicker",
  components: {
    [script2.name]: script2,
    [script10.name]: script10,
    [script.name]: script,
    [script$12.name]: script$12,
    [script8.name]: script8
  },
  configField: "timepicker",
  mixins: [BaseComponentMixin, TimepickerMixin, MatchMediaMixin],
  inheritAttrs: false,
  props: {
    rootClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    boxClass: [String, Function, Array],
    separatorClass: [String, Function, Array],
    footerClass: [String, Function, Array],
    inputClasses: {
      type: Object,
      default: () => {
        return getValueByPath(getOptions(), "timepicker.inputClasses", {});
      }
    },
    dropdownClasses: {
      type: Object,
      default: () => {
        return getValueByPath(getOptions(), "timepicker.dropdownClasses", {});
      }
    },
    selectClasses: {
      type: Object,
      default: () => {
        return getValueByPath(getOptions(), "timepicker.selectClasses", {});
      }
    }
  },
  emits: ["focus", "blur", "invalid"],
  computed: {
    inputBind() {
      return {
        ...this.$attrs,
        ...this.inputClasses
      };
    },
    dropdownBind() {
      return {
        "root-class": this.computedClass("dropdownClasses.rootClass", "o-tpck__dropdown"),
        ...this.dropdownClasses
      };
    },
    selectBind() {
      return {
        "select-class": this.computedClass("selectClasses.selectClass", "o-tpck__select"),
        "placeholder-class": this.computedClass("selectClasses.placeholderClass", "o-tpck__select-placeholder"),
        ...this.selectClasses
      };
    },
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-tpck"),
        { [this.computedClass("sizeClass", "o-tpck--", this.size)]: this.size },
        { [this.computedClass("mobileClass", "o-tpck--mobile")]: this.isMatchMedia }
      ];
    },
    boxClasses() {
      return [
        this.computedClass("boxClass", "o-tpck__box")
      ];
    },
    separatorClasses() {
      return [
        this.computedClass("separatorClass", "o-tpck__separator")
      ];
    },
    footerClasses() {
      return [
        this.computedClass("footerClass", "o-tpck__footer")
      ];
    },
    nativeStep() {
      if (this.enableSeconds)
        return "1";
      return null;
    }
  }
});
var _hoisted_19 = ["value", "disabled"];
var _hoisted_28 = ["value", "disabled"];
var _hoisted_34 = ["value", "disabled"];
var _hoisted_43 = ["value", "disabled"];
function render12(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_input = resolveComponent("o-input");
  const _component_o_select = resolveComponent("o-select");
  const _component_o_dropdown_item = resolveComponent("o-dropdown-item");
  const _component_o_dropdown = resolveComponent("o-dropdown");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.rootClasses)
    },
    [!_ctx.isMobile || _ctx.inline ? (openBlock(), createBlock(_component_o_dropdown, mergeProps({
      key: 0,
      ref: "dropdown"
    }, _ctx.dropdownBind, {
      position: _ctx.position,
      disabled: _ctx.disabled,
      inline: _ctx.inline,
      "append-to-body": _ctx.appendToBody,
      "append-to-body-copy-parent": "",
      onActiveChange: _ctx.onActiveChange
    }), createSlots({
      default: withCtx(() => [createVNode(_component_o_dropdown_item, {
        override: "",
        tag: "div",
        "item-class": _ctx.boxClasses,
        disabled: _ctx.disabled,
        clickable: false
      }, {
        default: withCtx(() => [createVNode(_component_o_select, mergeProps({
          override: ""
        }, _ctx.selectBind, {
          modelValue: _ctx.hoursSelected,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.hoursSelected = $event),
          onChange: _cache[3] || (_cache[3] = ($event) => _ctx.onHoursChange($event.target.value)),
          disabled: _ctx.disabled,
          placeholder: "00"
        }), {
          default: withCtx(() => [(openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.hours, (hour) => {
              return openBlock(), createElementBlock("option", {
                value: hour.value,
                key: hour.value,
                disabled: _ctx.isHourDisabled(hour.value)
              }, toDisplayString(hour.label), 9, _hoisted_19);
            }),
            128
            /* KEYED_FRAGMENT */
          ))]),
          _: 1
          /* STABLE */
        }, 16, ["modelValue", "disabled"]), createBaseVNode(
          "span",
          {
            class: normalizeClass(_ctx.separatorClasses)
          },
          toDisplayString(_ctx.hourLiteral),
          3
          /* TEXT, CLASS */
        ), createVNode(_component_o_select, mergeProps({
          override: ""
        }, _ctx.selectBind, {
          modelValue: _ctx.minutesSelected,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.minutesSelected = $event),
          onChange: _cache[5] || (_cache[5] = ($event) => _ctx.onMinutesChange($event.target.value)),
          disabled: _ctx.disabled,
          placeholder: "00"
        }), {
          default: withCtx(() => [(openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.minutes, (minute) => {
              return openBlock(), createElementBlock("option", {
                value: minute.value,
                key: minute.value,
                disabled: _ctx.isMinuteDisabled(minute.value)
              }, toDisplayString(minute.label), 9, _hoisted_28);
            }),
            128
            /* KEYED_FRAGMENT */
          ))]),
          _: 1
          /* STABLE */
        }, 16, ["modelValue", "disabled"]), _ctx.enableSeconds ? (openBlock(), createElementBlock(
          Fragment,
          {
            key: 0
          },
          [createBaseVNode(
            "span",
            {
              class: normalizeClass(_ctx.separatorClasses)
            },
            toDisplayString(_ctx.minuteLiteral),
            3
            /* TEXT, CLASS */
          ), createVNode(_component_o_select, mergeProps({
            override: ""
          }, _ctx.selectBind, {
            modelValue: _ctx.secondsSelected,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.secondsSelected = $event),
            onChange: _cache[7] || (_cache[7] = ($event) => _ctx.onSecondsChange($event.target.value)),
            disabled: _ctx.disabled,
            placeholder: "00"
          }), {
            default: withCtx(() => [(openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(_ctx.seconds, (second) => {
                return openBlock(), createElementBlock("option", {
                  value: second.value,
                  key: second.value,
                  disabled: _ctx.isSecondDisabled(second.value)
                }, toDisplayString(second.label), 9, _hoisted_34);
              }),
              128
              /* KEYED_FRAGMENT */
            ))]),
            _: 1
            /* STABLE */
          }, 16, ["modelValue", "disabled"]), createBaseVNode(
            "span",
            {
              class: normalizeClass(_ctx.separatorClasses)
            },
            toDisplayString(_ctx.secondLiteral),
            3
            /* TEXT, CLASS */
          )],
          64
          /* STABLE_FRAGMENT */
        )) : createCommentVNode("v-if", true), !_ctx.isHourFormat24 ? (openBlock(), createBlock(_component_o_select, mergeProps({
          key: 1,
          override: ""
        }, _ctx.selectBind, {
          modelValue: _ctx.meridienSelected,
          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.meridienSelected = $event),
          onChange: _cache[9] || (_cache[9] = ($event) => _ctx.onMeridienChange($event.target.value)),
          disabled: _ctx.disabled
        }), {
          default: withCtx(() => [(openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.meridiens, (meridien) => {
              return openBlock(), createElementBlock("option", {
                value: meridien,
                key: meridien,
                disabled: _ctx.isMeridienDisabled(meridien)
              }, toDisplayString(meridien), 9, _hoisted_43);
            }),
            128
            /* KEYED_FRAGMENT */
          ))]),
          _: 1
          /* STABLE */
        }, 16, ["modelValue", "disabled"])) : createCommentVNode("v-if", true), _ctx.$slots.default !== void 0 ? (openBlock(), createElementBlock(
          "footer",
          {
            key: 2,
            class: normalizeClass(_ctx.footerClasses)
          },
          [renderSlot(_ctx.$slots, "default")],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true)]),
        _: 3
        /* FORWARDED */
      }, 8, ["item-class", "disabled"])]),
      _: 2
      /* DYNAMIC */
    }, [!_ctx.inline ? {
      name: "trigger",
      fn: withCtx(() => [renderSlot(_ctx.$slots, "trigger", {}, () => [createVNode(_component_o_input, mergeProps({
        ref: "input",
        "model-value": _ctx.formatValue(_ctx.computedValue),
        autocomplete: "off",
        placeholder: _ctx.placeholder,
        size: _ctx.size,
        icon: _ctx.icon,
        "icon-pack": _ctx.iconPack,
        disabled: _ctx.disabled,
        readonly: !_ctx.editable,
        rounded: _ctx.rounded
      }, _ctx.inputBind, {
        "use-html5-validation": _ctx.useHtml5Validation,
        onKeyup: _cache[0] || (_cache[0] = withKeys(($event) => _ctx.toggle(true), ["enter"])),
        onChange: _cache[1] || (_cache[1] = ($event) => _ctx.onChange($event.target.value)),
        onFocus: _ctx.handleOnFocus
      }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-pack", "disabled", "readonly", "rounded", "use-html5-validation", "onFocus"])])]),
      key: "0"
    } : void 0]), 1040, ["position", "disabled", "inline", "append-to-body", "onActiveChange"])) : (openBlock(), createBlock(_component_o_input, mergeProps({
      key: 1,
      ref: "input"
    }, _ctx.inputBind, {
      type: "time",
      step: _ctx.nativeStep,
      autocomplete: "off",
      value: _ctx.formatHHMMSS(_ctx.computedValue),
      placeholder: _ctx.placeholder,
      size: _ctx.size,
      icon: _ctx.icon,
      "icon-pack": _ctx.iconPack,
      rounded: _ctx.rounded,
      max: _ctx.formatHHMMSS(_ctx.maxTime),
      min: _ctx.formatHHMMSS(_ctx.minTime),
      disabled: _ctx.disabled,
      readonly: false,
      "use-html5-validation": _ctx.useHtml5Validation,
      onChange: _cache[10] || (_cache[10] = ($event) => _ctx.onChange($event.target.value)),
      onFocus: _ctx.handleOnFocus,
      onBlur: _ctx.onBlur,
      onInvalid: _ctx.onInvalid
    }), null, 16, ["step", "value", "placeholder", "size", "icon", "icon-pack", "rounded", "max", "min", "disabled", "use-html5-validation", "onFocus", "onBlur", "onInvalid"]))],
    2
    /* CLASS */
  );
}
script12.render = render12;
script12.__file = "src/components/timepicker/Timepicker.vue";

// node_modules/@oruga-ui/oruga-next/dist/esm/datetimepicker.mjs
var AM2 = "AM";
var PM2 = "PM";
var script13 = defineComponent({
  name: "ODatetimepicker",
  components: {
    [script11.name]: script11,
    [script12.name]: script12
  },
  configField: "datetimepicker",
  mixins: [FormElementMixin, BaseComponentMixin],
  inheritAttrs: false,
  emits: ["update:modelValue", "focus", "blur", "invalid", "change-year", "change-month", "icon-right-click", "active-change"],
  props: {
    modelValue: {
      type: Date
    },
    editable: {
      type: Boolean,
      default: false
    },
    size: String,
    placeholder: String,
    disabled: Boolean,
    iconRight: String,
    iconRightClickable: Boolean,
    inline: Boolean,
    openOnFocus: Boolean,
    position: String,
    mobileNative: {
      type: Boolean,
      default: true
    },
    minDatetime: Date,
    maxDatetime: Date,
    datetimeFormatter: {
      type: Function
    },
    datetimeParser: {
      type: Function
    },
    datetimeCreator: {
      type: Function,
      default: (date) => {
        const datetimeCreator = getValueByPath(getOptions(), "datetimepicker.datetimeCreator", void 0);
        if (typeof datetimeCreator === "function") {
          return datetimeCreator(date);
        } else {
          return date;
        }
      }
    },
    datepicker: Object,
    timepicker: Object,
    locale: {
      type: [String, Array],
      default: () => {
        return getValueByPath(getOptions(), "locale");
      }
    },
    appendToBody: Boolean,
    datepickerWrapperClass: [String, Function, Array],
    timepickerWrapperClass: [String, Function, Array]
  },
  data() {
    return {
      newValue: this.modelValue
    };
  },
  computed: {
    datepickerWrapperClasses() {
      return [
        this.computedClass("datepickerWrapperClass", "o-dtpck__date")
      ];
    },
    timepickerWrapperClasses() {
      return [
        this.computedClass("timepickerWrapperClass", "o-dtpck__time")
      ];
    },
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        if (value) {
          let val = new Date(value.getTime());
          if (this.newValue) {
            if ((value.getDate() !== this.newValue.getDate() || value.getMonth() !== this.newValue.getMonth() || value.getFullYear() !== this.newValue.getFullYear()) && value.getHours() === 0 && value.getMinutes() === 0 && value.getSeconds() === 0) {
              val.setHours(this.newValue.getHours(), this.newValue.getMinutes(), this.newValue.getSeconds(), 0);
            }
          } else {
            val = this.datetimeCreator(value);
          }
          if (this.minDatetime && val < this.minDatetime) {
            val = this.minDatetime;
          } else if (this.maxDatetime && val > this.maxDatetime) {
            val = this.maxDatetime;
          }
          this.newValue = new Date(val.getTime());
        } else {
          this.newValue = value;
        }
        this.$emit("update:modelValue", this.newValue);
      }
    },
    localeOptions() {
      return new Intl.DateTimeFormat(this.locale, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: this.enableSeconds() ? "numeric" : void 0
      }).resolvedOptions();
    },
    dtf() {
      return new Intl.DateTimeFormat(this.locale, {
        year: this.localeOptions.year || "numeric",
        month: this.localeOptions.month || "numeric",
        day: this.localeOptions.day || "numeric",
        hour: this.localeOptions.hour || "numeric",
        minute: this.localeOptions.minute || "numeric",
        second: this.enableSeconds() ? this.localeOptions.second || "numeric" : void 0,
        // @ts-ignore to update types
        hourCycle: !this.isHourFormat24() ? "h12" : "h23"
      });
    },
    isMobileNative() {
      return this.mobileNative;
    },
    isMobile() {
      return this.isMobileNative && isMobile.any();
    },
    minDate() {
      if (!this.minDatetime) {
        return this.datepicker ? this.datepicker.minDate : null;
      }
      return new Date(this.minDatetime.getFullYear(), this.minDatetime.getMonth(), this.minDatetime.getDate(), 0, 0, 0, 0);
    },
    maxDate() {
      if (!this.maxDatetime) {
        return this.datepicker ? this.datepicker.maxDate : null;
      }
      return new Date(this.maxDatetime.getFullYear(), this.maxDatetime.getMonth(), this.maxDatetime.getDate(), 0, 0, 0, 0);
    },
    // Only enable min/max time if local (not necessarily UTC) date portion matches
    minTime() {
      if (!this.minDatetime || (this.newValue === null || typeof this.newValue === "undefined") || this.newValue.getFullYear() != this.minDatetime.getFullYear() || this.newValue.getMonth() != this.minDatetime.getMonth() || this.newValue.getDate() != this.minDatetime.getDate()) {
        return this.timepicker ? this.timepicker.minTime : null;
      }
      return this.minDatetime;
    },
    maxTime() {
      if (!this.maxDatetime || (this.newValue === null || typeof this.newValue === "undefined") || this.newValue.getFullYear() != this.maxDatetime.getFullYear() || this.newValue.getMonth() != this.maxDatetime.getMonth() || this.newValue.getDate() != this.maxDatetime.getDate()) {
        return this.timepicker ? this.timepicker.maxTime : null;
      }
      return this.maxDatetime;
    },
    datepickerSize() {
      return this.datepicker && this.datepicker.size ? this.datepicker.size : this.size;
    },
    timepickerSize() {
      return this.timepicker && this.timepicker.size ? this.timepicker.size : this.size;
    },
    timepickerDisabled() {
      return this.timepicker && this.timepicker.disabled ? this.timepicker.disabled : this.disabled;
    }
  },
  watch: {
    modelValue(value) {
      this.newValue = value;
    }
  },
  methods: {
    enableSeconds() {
      if (this.$refs.timepicker) {
        return this.$refs.timepicker.enableSeconds;
      }
      return false;
    },
    isHourFormat24() {
      if (this.$refs.timepicker) {
        return this.$refs.timepicker.isHourFormat24;
      }
      return !this.localeOptions.hour12;
    },
    defaultDatetimeParser(date) {
      const datetimeParser = getValueByPath(getOptions(), "datetimepicker.datetimeParser", void 0);
      if (typeof this.datetimeParser === "function") {
        return this.datetimeParser(date);
      } else if (typeof datetimeParser === "function") {
        return datetimeParser(date);
      } else {
        if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
          let dayPeriods = [AM2, PM2, AM2.toLowerCase(), PM2.toLowerCase()];
          if (this.$refs.timepicker) {
            dayPeriods.push(this.$refs.timepicker.amString);
            dayPeriods.push(this.$refs.timepicker.pmString);
          }
          const parts = this.dtf.formatToParts(/* @__PURE__ */ new Date());
          const formatRegex = parts.map((part, idx) => {
            if (part.type === "literal") {
              if (idx + 1 < parts.length && parts[idx + 1].type === "hour") {
                return `[^\\d]+`;
              }
              return part.value.replace(/ /g, "\\s?");
            } else if (part.type === "dayPeriod") {
              return `((?!=<${part.type}>)(${dayPeriods.join("|")})?)`;
            }
            return `((?!=<${part.type}>)\\d+)`;
          }).join("");
          const datetimeGroups = matchWithGroups(formatRegex, date);
          if (datetimeGroups.year && datetimeGroups.year.length === 4 && datetimeGroups.month && datetimeGroups.month <= 12 && datetimeGroups.day && datetimeGroups.day <= 31 && datetimeGroups.hour && datetimeGroups.hour >= 0 && datetimeGroups.hour < 24 && datetimeGroups.minute && datetimeGroups.minute >= 0 && datetimeGroups.minute <= 59) {
            const d = new Date(datetimeGroups.year, datetimeGroups.month - 1, datetimeGroups.day, datetimeGroups.hour, datetimeGroups.minute, datetimeGroups.second || 0);
            return d;
          }
        }
        return new Date(Date.parse(date));
      }
    },
    defaultDatetimeFormatter(date) {
      const datetimeFormatter = getValueByPath(getOptions(), "datetimepicker.datetimeFormatter", void 0);
      if (typeof this.datetimeFormatter === "function") {
        return this.datetimeFormatter(date);
      } else if (typeof datetimeFormatter === "function") {
        return datetimeFormatter(date);
      } else {
        return this.dtf.format(date);
      }
    },
    /*
    * Parse date from string
    */
    onChangeNativePicker(event) {
      const date = event.target.value;
      const s = date ? date.split(/\D/) : [];
      if (s.length >= 5) {
        const year = parseInt(s[0], 10);
        const month = parseInt(s[1], 10) - 1;
        const day = parseInt(s[2], 10);
        const hours = parseInt(s[3], 10);
        const minutes = parseInt(s[4], 10);
        this.computedValue = new Date(year, month, day, hours, minutes);
      } else {
        this.computedValue = null;
      }
    },
    formatNative(value) {
      const date = new Date(value);
      if (value && !isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return year + "-" + ((month < 10 ? "0" : "") + month) + "-" + ((day < 10 ? "0" : "") + day) + "T" + ((hours < 10 ? "0" : "") + hours) + ":" + ((minutes < 10 ? "0" : "") + minutes) + ":" + ((seconds < 10 ? "0" : "") + seconds);
      }
      return "";
    },
    toggle() {
      this.$refs.datepicker.toggle();
    }
  },
  mounted() {
    if (!this.isMobile || this.inline) {
      if (this.newValue) {
        this.$refs.datepicker.$forceUpdate();
      }
    }
  }
});
function render13(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_timepicker = resolveComponent("o-timepicker");
  const _component_o_datepicker = resolveComponent("o-datepicker");
  const _component_o_input = resolveComponent("o-input");
  return !_ctx.isMobile || _ctx.inline ? (openBlock(), createBlock(_component_o_datepicker, mergeProps({
    key: 0,
    ref: "datepicker",
    modelValue: _ctx.computedValue,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.computedValue = $event)
  }, _ctx.datepicker, {
    class: _ctx.datepickerWrapperClasses,
    rounded: _ctx.rounded,
    "open-on-focus": _ctx.openOnFocus,
    position: _ctx.position,
    inline: _ctx.inline,
    editable: _ctx.editable,
    expanded: _ctx.expanded,
    "close-on-click": false,
    "date-formatter": _ctx.defaultDatetimeFormatter,
    "date-parser": _ctx.defaultDatetimeParser,
    "min-date": _ctx.minDate,
    "max-date": _ctx.maxDate,
    icon: _ctx.icon,
    "icon-right": _ctx.iconRight,
    "icon-right-clickable": _ctx.iconRightClickable,
    "icon-pack": _ctx.iconPack,
    size: _ctx.datepickerSize,
    placeholder: _ctx.placeholder,
    range: false,
    disabled: _ctx.disabled,
    "mobile-native": _ctx.isMobileNative,
    locale: _ctx.locale,
    "append-to-body": _ctx.appendToBody,
    onFocus: _ctx.onFocus,
    onBlur: _ctx.onBlur,
    onActiveChange: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("active-change", $event)),
    onIconRightClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("icon-right-click")),
    onChangeMonth: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("change-month", $event)),
    onChangeYear: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("change-year", $event))
  }), {
    footer: withCtx(() => [createBaseVNode(
      "div",
      {
        class: normalizeClass(_ctx.timepickerWrapperClasses)
      },
      [createVNode(_component_o_timepicker, mergeProps({
        ref: "timepicker"
      }, _ctx.timepicker, {
        modelValue: _ctx.computedValue,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
        inline: "",
        editable: _ctx.editable,
        "min-time": _ctx.minTime,
        "max-time": _ctx.maxTime,
        size: _ctx.timepickerSize,
        disabled: _ctx.timepickerDisabled,
        "mobile-native": _ctx.isMobileNative,
        locale: _ctx.locale
      }), null, 16, ["modelValue", "editable", "min-time", "max-time", "size", "disabled", "mobile-native", "locale"])],
      2
      /* CLASS */
    ), _ctx.$slots.footer !== void 0 ? renderSlot(_ctx.$slots, "footer", {
      key: 0
    }) : createCommentVNode("v-if", true)]),
    _: 3
    /* FORWARDED */
  }, 16, ["modelValue", "class", "rounded", "open-on-focus", "position", "inline", "editable", "expanded", "date-formatter", "date-parser", "min-date", "max-date", "icon", "icon-right", "icon-right-clickable", "icon-pack", "size", "placeholder", "disabled", "mobile-native", "locale", "append-to-body", "onFocus", "onBlur"])) : (openBlock(), createBlock(_component_o_input, mergeProps({
    key: 1,
    ref: "input",
    type: "datetime-local",
    autocomplete: "off",
    value: _ctx.formatNative(_ctx.computedValue),
    placeholder: _ctx.placeholder,
    size: _ctx.datepickerSize,
    icon: _ctx.icon,
    "icon-pack": _ctx.iconPack,
    rounded: _ctx.rounded,
    max: _ctx.formatNative(_ctx.maxDate),
    min: _ctx.formatNative(_ctx.minDate),
    disabled: _ctx.disabled,
    readonly: false
  }, _ctx.$attrs, {
    "use-html5-validation": _ctx.useHtml5Validation,
    onChange: _ctx.onChangeNativePicker,
    onFocus: _ctx.onFocus,
    onBlur: _ctx.onBlur,
    onInvalid: _ctx.onInvalid
  }), null, 16, ["value", "placeholder", "size", "icon", "icon-pack", "rounded", "max", "min", "disabled", "use-html5-validation", "onChange", "onFocus", "onBlur", "onInvalid"]));
}
script13.render = render13;
script13.__file = "src/components/datetimepicker/Datetimepicker.vue";
var index7 = {
  install(app) {
    registerComponent(app, script13);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/dropdown.mjs
var index8 = {
  install(app) {
    registerComponent(app, script$12);
    registerComponent(app, script8);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/field.mjs
var index9 = {
  install(app) {
    registerComponent(app, script9);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/icon.mjs
var index10 = {
  install(app) {
    registerComponent(app, script);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/input.mjs
var index11 = {
  install(app) {
    registerComponent(app, script2);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/inputitems.mjs
var script14 = defineComponent({
  name: "OInputitems",
  components: {
    [script3.name]: script3,
    [script.name]: script
  },
  mixins: [FormElementMixin, BaseComponentMixin],
  inheritAttrs: false,
  configField: "inputitems",
  emits: ["update:modelValue", "focus", "blur", "invalid", "add", "remove", "typing", "infinite-scroll", "icon-right-click"],
  props: {
    /** @model */
    modelValue: {
      type: Array,
      default: () => []
    },
    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: String,
    /** Items data */
    data: {
      type: Array,
      default: () => []
    },
    /**
     * Color of the each items, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: String,
    /** Limits the number of items, plus item counter */
    maxitems: {
      type: [Number, String],
      required: false
    },
    /** Show counter when maxlength or maxtags props are passed */
    hasCounter: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "inputitems.hasCounter", true);
      }
    },
    /** Property of the object (if data is array of objects) to use as display text */
    field: {
      type: String,
      default: "value"
    },
    /** Add autocomplete feature (if true, any Autocomplete props may be used too) */
    allowAutocomplete: Boolean,
    /**  Property of the object (if data is array of objects) to use as display text of group */
    groupField: String,
    /**  Property of the object (if data is array of objects) to use as key to get items array of each group, optional */
    groupOptions: String,
    /**  Opens a dropdown with choices when the input field is focused */
    openOnFocus: Boolean,
    /** Input will be disabled */
    disabled: Boolean,
    /** Add close/delete button to the item */
    closable: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "inputitems.closable", true);
      }
    },
    /**
     * Array of keys
     * (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
     * which will add a item when typing (default comma, tab and enter)
     */
    confirmKeys: {
      type: Array,
      default: () => {
        return getValueByPath(getOptions(), "inputitems.confirmKeys", [",", "Tab", "Enter"]);
      }
    },
    /** Allow removing last item when pressing given keys, if input is empty */
    removeOnKeys: {
      type: Array,
      default: () => {
        return getValueByPath(getOptions(), "inputitems.removeOnKeys", ["Backspace"]);
      }
    },
    /** When autocomplete, it allow to add new items */
    allowNew: Boolean,
    /** Array of chars used to split when pasting a new string */
    onPasteSeparators: {
      type: Array,
      default: () => {
        return getValueByPath(getOptions(), "inputitems.onPasteSeparators", [","]);
      }
    },
    /** Function to validate the value of the item before adding */
    beforeAdding: {
      type: Function,
      default: () => true
    },
    /** Allows adding the same item multiple time */
    allowDuplicates: {
      type: Boolean,
      default: false
    },
    /** Makes the autocomplete component check if list reached scroll end and emit infinite-scroll event */
    checkInfiniteScroll: {
      type: Boolean,
      default: false
    },
    /** Function to create a new item to push into v-model (items) */
    createItem: {
      type: Function,
      default: (item) => item
    },
    /** Icon name of close icon on selected item */
    closeIcon: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "inputitems.closeIcon", "close");
      }
    },
    /** The first option will always be pre-selected (easier to just hit enter or tab) */
    keepFirst: Boolean,
    /** Accessibility label for the close button */
    ariaCloseLabel: String,
    /** Append autocomplete content to body */
    appendToBody: Boolean,
    rootClass: [String, Array, Function],
    expandedClass: [String, Array, Function],
    variantClass: [String, Array, Function],
    closeClass: [String, Array, Function],
    itemClass: [String, Array, Function],
    counterClass: [String, Array, Function],
    autocompleteClasses: {
      type: Object,
      default: () => {
        return getValueByPath(getOptions(), "inputitems.autocompleteClasses", {});
      }
    }
  },
  data() {
    return {
      items: Array.isArray(this.modelValue) ? this.modelValue.slice(0) : this.modelValue || [],
      newItem: "",
      isComposing: false
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-inputit"),
        { [this.computedClass("expandedClass", "o-inputit--expanded")]: this.expanded }
      ];
    },
    containerClasses() {
      return [
        this.computedClass("containerClass", "o-inputit__container"),
        { [this.computedClass("sizeClass", "o-inputit__container--", this.size)]: this.size }
      ];
    },
    itemClasses() {
      return [
        this.computedClass("itemClass", "o-inputit__item"),
        { [this.computedClass("variantClass", "o-inputit__item--", this.variant)]: this.variant }
      ];
    },
    closeClasses() {
      return [
        this.computedClass("closeClass", "o-inputit__item__close")
      ];
    },
    counterClasses() {
      return [
        this.computedClass("counterClass", "o-inputit__counter")
      ];
    },
    autocompleteBind() {
      return {
        ...this.$attrs,
        "root-class": this.computedClass("autocompleteClasses.rootClass", "o-inputit__autocomplete"),
        "input-classes": {
          "input-class": this.computedClass("autocompleteClasses.inputClasses.inputClass", "o-inputit__input")
        },
        ...this.autocompleteClasses
      };
    },
    valueLength() {
      return this.newItem.trim().length;
    },
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    hasEmptySlot() {
      return !!this.$slots.empty;
    },
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
    /**
     * Show the input field if a maxitems hasn't been set or reached.
     */
    hasInput() {
      return this.maxitems == null || this.itemsLength < this.maxitems;
    },
    itemsLength() {
      return this.items.length;
    },
    /**
     * If input has onPasteSeparators prop,
     * returning new RegExp used to split pasted string.
     */
    separatorsAsRegExp() {
      const sep = this.onPasteSeparators;
      return sep.length ? new RegExp(sep.map((s) => {
        return s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : null;
      }).join("|"), "g") : null;
    },
    $elementRef() {
      return "autocomplete";
    }
  },
  watch: {
    /**
     * When modelValue is changed set internal value.
     */
    modelValue(value) {
      this.items = Array.isArray(value) ? value.slice(0) : value || [];
    },
    hasInput() {
      if (!this.hasInput)
        this.onBlur();
    }
  },
  methods: {
    addItem(item) {
      const itemToAdd = item || this.newItem.trim();
      if (itemToAdd) {
        if (!this.allowAutocomplete) {
          const reg = this.separatorsAsRegExp;
          if (reg && itemToAdd.match(reg)) {
            itemToAdd.split(reg).map((t) => t.trim()).filter((t) => t.length !== 0).map(this.addItem);
            return;
          }
        }
        const add = !this.allowDuplicates ? this.items.indexOf(this.createItem(itemToAdd)) === -1 : true;
        if (add && this.beforeAdding(itemToAdd)) {
          this.items.push(this.createItem(itemToAdd));
          this.$emit("update:modelValue", this.items);
          this.$emit("add", itemToAdd);
        }
      }
      requestAnimationFrame(() => {
        this.newItem = "";
        this.$emit("typing", "");
      });
    },
    getNormalizedItemText(item) {
      if (typeof item === "object") {
        item = getValueByPath(item, this.field);
      }
      return `${item}`;
    },
    customOnBlur(event) {
      if (!this.allowAutocomplete)
        this.addItem();
      this.onBlur(event);
    },
    onSelect(option) {
      if (!option)
        return;
      this.addItem(option);
      this.$nextTick(() => {
        this.newItem = "";
      });
    },
    removeItem(index30, event) {
      const item = this.items.splice(index30, 1)[0];
      this.$emit("update:modelValue", this.items);
      this.$emit("remove", item);
      if (event)
        event.stopPropagation();
      if (this.openOnFocus && this.$refs.autocomplete) {
        this.$refs.autocomplete.focus();
      }
      return item;
    },
    removeLastItem() {
      if (this.itemsLength > 0) {
        this.removeItem(this.itemsLength - 1);
      }
    },
    keydown(event) {
      const { key } = event;
      if (this.removeOnKeys.indexOf(key) !== -1 && !this.newItem.length) {
        this.removeLastItem();
      }
      if (this.allowAutocomplete && !this.allowNew)
        return;
      if (this.confirmKeys.indexOf(key) >= 0) {
        if (key !== "Tab")
          event.preventDefault();
        if (key === "Enter" && this.isComposing)
          return;
        this.addItem();
      }
    },
    onTyping(event) {
      this.$emit("typing", event.trim());
    }
  }
});
function render14(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = resolveComponent("o-icon");
  const _component_o_autocomplete = resolveComponent("o-autocomplete");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.rootClasses)
    },
    [createBaseVNode(
      "div",
      {
        class: normalizeClass(_ctx.containerClasses),
        onClick: _cache[5] || (_cache[5] = ($event) => _ctx.hasInput && _ctx.focus($event))
      },
      [renderSlot(_ctx.$slots, "selected", {
        items: _ctx.items
      }, () => [(openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.items, (item, index30) => {
          return openBlock(), createElementBlock(
            "span",
            {
              key: _ctx.getNormalizedItemText(item) + index30,
              class: normalizeClass(_ctx.itemClasses)
            },
            [createBaseVNode(
              "span",
              null,
              toDisplayString(_ctx.getNormalizedItemText(item)),
              1
              /* TEXT */
            ), _ctx.closable ? (openBlock(), createBlock(_component_o_icon, {
              key: 0,
              class: normalizeClass(_ctx.closeClasses),
              clickable: "",
              both: "",
              pack: _ctx.iconPack,
              icon: _ctx.closeIcon,
              onClick: ($event) => _ctx.removeItem(index30, $event),
              "aria-label": _ctx.ariaCloseLabel
            }, null, 8, ["class", "pack", "icon", "onClick", "aria-label"])) : createCommentVNode("v-if", true)],
            2
            /* CLASS */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      ))]), _ctx.hasInput ? (openBlock(), createBlock(_component_o_autocomplete, mergeProps({
        key: 0,
        ref: "autocomplete",
        modelValue: _ctx.newItem,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.newItem = $event)
      }, _ctx.autocompleteBind, {
        data: _ctx.data,
        field: _ctx.field,
        icon: _ctx.icon,
        "icon-pack": _ctx.iconPack,
        maxlength: _ctx.maxlength,
        "has-counter": false,
        size: _ctx.size,
        disabled: _ctx.disabled,
        autocomplete: _ctx.autocomplete,
        "open-on-focus": _ctx.openOnFocus,
        "keep-first": _ctx.keepFirst,
        "keep-open": _ctx.openOnFocus,
        "group-field": _ctx.groupField,
        "group-options": _ctx.groupOptions,
        "use-html5-validation": _ctx.useHtml5Validation,
        "check-infinite-scroll": _ctx.checkInfiniteScroll,
        "append-to-body": _ctx.appendToBody,
        "confirm-keys": _ctx.confirmKeys,
        onTyping: _ctx.onTyping,
        onFocus: _ctx.onFocus,
        onBlur: _ctx.customOnBlur,
        onInvalid: _ctx.onInvalid,
        onKeydown: _ctx.keydown,
        onCompositionstart: _cache[1] || (_cache[1] = ($event) => _ctx.isComposing = true),
        onCompositionend: _cache[2] || (_cache[2] = ($event) => _ctx.isComposing = false),
        onSelect: _ctx.onSelect,
        onInfiniteScroll: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("infinite-scroll", $event)),
        onIconRightClick: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("icon-right-click", $event))
      }), createSlots({
        _: 2
        /* DYNAMIC */
      }, [_ctx.hasHeaderSlot ? {
        name: "header",
        fn: withCtx(() => [renderSlot(_ctx.$slots, "header")]),
        key: "0"
      } : void 0, _ctx.hasDefaultSlot ? {
        name: "default",
        fn: withCtx((props) => [renderSlot(_ctx.$slots, "default", {
          option: props.option,
          index: props.index
        })]),
        key: "1"
      } : void 0, _ctx.hasEmptySlot ? {
        name: "empty",
        fn: withCtx(() => [renderSlot(_ctx.$slots, "empty")]),
        key: "2"
      } : void 0, _ctx.hasFooterSlot ? {
        name: "footer",
        fn: withCtx(() => [renderSlot(_ctx.$slots, "footer")]),
        key: "3"
      } : void 0]), 1040, ["modelValue", "data", "field", "icon", "icon-pack", "maxlength", "size", "disabled", "autocomplete", "open-on-focus", "keep-first", "keep-open", "group-field", "group-options", "use-html5-validation", "check-infinite-scroll", "append-to-body", "confirm-keys", "onTyping", "onFocus", "onBlur", "onInvalid", "onKeydown", "onSelect"])) : createCommentVNode("v-if", true)],
      2
      /* CLASS */
    ), _ctx.hasCounter && (_ctx.maxitems || _ctx.maxlength) ? (openBlock(), createElementBlock(
      "small",
      {
        key: 0,
        class: normalizeClass(_ctx.counterClasses)
      },
      [_ctx.maxlength && _ctx.valueLength > 0 ? (openBlock(), createElementBlock(
        Fragment,
        {
          key: 0
        },
        [createTextVNode(
          toDisplayString(_ctx.valueLength) + " / " + toDisplayString(_ctx.maxlength),
          1
          /* TEXT */
        )],
        64
        /* STABLE_FRAGMENT */
      )) : _ctx.maxitems ? (openBlock(), createElementBlock(
        Fragment,
        {
          key: 1
        },
        [createTextVNode(
          toDisplayString(_ctx.itemsLength) + " / " + toDisplayString(_ctx.maxitems),
          1
          /* TEXT */
        )],
        64
        /* STABLE_FRAGMENT */
      )) : createCommentVNode("v-if", true)],
      2
      /* CLASS */
    )) : createCommentVNode("v-if", true)],
    2
    /* CLASS */
  );
}
script14.render = render14;
script14.__file = "src/components/inputitems/Inputitems.vue";
var index12 = {
  install(Vue) {
    registerComponent(Vue, script14);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/ssr-85c76d50.mjs
var isSSR = typeof window === "undefined";
var HTMLElement = isSSR ? Object : window.HTMLElement;
var File = isSSR ? Object : window.File;

// node_modules/@oruga-ui/oruga-next/dist/esm/Loading-2c4345ed.mjs
var script15 = defineComponent({
  name: "OLoading",
  components: {
    [script.name]: script
  },
  mixins: [BaseComponentMixin],
  configField: "loading",
  emits: ["update:active", "close", "update:full-page"],
  props: {
    /** Whether loading is active or not, use v-model:active to make it two-way binding */
    active: Boolean,
    /** @ignore */
    programmatic: Object,
    /** @ignore */
    promise: Promise,
    container: [Object, Function, HTMLElement],
    /** Loader will overlay the full page */
    fullPage: {
      type: Boolean,
      default: true
    },
    /* Custom animation (transition name) */
    animation: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "loading.animation", "fade");
      }
    },
    /** Can close Loading by pressing escape or clicking outside */
    canCancel: {
      type: Boolean,
      default: false
    },
    /** Callback function to call after user canceled (pressed escape / clicked outside) */
    onCancel: {
      type: Function,
      default: () => {
      }
    },
    /** Icon name */
    icon: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "loading.icon", "loading");
      }
    },
    /** Enable spin effect on icon */
    iconSpin: {
      type: Boolean,
      default: true
    },
    iconSize: {
      type: String,
      default: "medium"
    },
    rootClass: [String, Function, Array],
    overlayClass: [String, Function, Array],
    iconClass: [String, Function, Array],
    fullPageClass: [String, Function, Array]
  },
  data() {
    return {
      isActive: this.active || false,
      displayInFullPage: this.fullPage
    };
  },
  watch: {
    active(value) {
      this.isActive = value;
    },
    fullPage(value) {
      this.displayInFullPage = value;
    }
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-load"),
        { [this.computedClass("fullPageClass", "o-load--fullpage")]: this.displayInFullPage }
      ];
    },
    overlayClasses() {
      return [
        this.computedClass("overlayClass", "o-load__overlay")
      ];
    },
    iconClasses() {
      return [
        this.computedClass("iconClass", "o-load__icon")
      ];
    }
  },
  methods: {
    /**
    * Close the Modal if canCancel.
    */
    cancel(method) {
      if (!this.canCancel || !this.isActive)
        return;
      this.close({ action: "cancel", method });
    },
    /**
    * Emit events, and destroy modal if it's programmatic.
    */
    close() {
      this.onCancel.apply(null, arguments);
      this.$emit("close");
      this.$emit("update:active", false);
      if (this.programmatic) {
        if (this.programmatic.instances) {
          this.programmatic.instances.remove(this);
        }
        if (this.programmatic.resolve) {
          this.programmatic.resolve.apply(null, arguments);
        }
        this.isActive = false;
        window.requestAnimationFrame(() => {
          removeElement(this.$el);
        });
      }
    },
    /**
    * Keypress event that is bound to the document.
    */
    keyPress({ key }) {
      if (key === "Escape" || key === "Esc")
        this.cancel("escape");
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
    }
  },
  mounted() {
    if (this.programmatic) {
      if (this.programmatic.instances) {
        this.programmatic.instances.add(this);
      }
      if (!this.container) {
        document.body.appendChild(this.$el);
      } else {
        this.displayInFullPage = false;
        this.$emit("update:full-page", false);
        this.container.appendChild(this.$el);
      }
      this.isActive = true;
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
    }
  }
});
function render15(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = resolveComponent("o-icon");
  return openBlock(), createBlock(Transition, {
    name: _ctx.animation
  }, {
    default: withCtx(() => [_ctx.isActive ? (openBlock(), createElementBlock(
      "div",
      {
        key: 0,
        class: normalizeClass(_ctx.rootClasses)
      },
      [createBaseVNode(
        "div",
        {
          class: normalizeClass(_ctx.overlayClasses),
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.cancel("outside"))
        },
        null,
        2
        /* CLASS */
      ), renderSlot(_ctx.$slots, "default", {}, () => [createVNode(_component_o_icon, {
        icon: _ctx.icon,
        spin: _ctx.iconSpin,
        size: _ctx.iconSize,
        class: normalizeClass(_ctx.iconClasses),
        both: ""
      }, null, 8, ["icon", "spin", "size", "class"])])],
      2
      /* CLASS */
    )) : createCommentVNode("v-if", true)]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
script15.render = render15;
script15.__file = "src/components/loading/Loading.vue";

// node_modules/@oruga-ui/oruga-next/dist/esm/InstanceRegistry-1e116bd6.mjs
var InstanceRegistry = class {
  constructor() {
    __publicField(this, "entries");
    this.entries = [];
  }
  add(entry) {
    this.entries.push(entry);
  }
  remove(entry) {
    let index30 = this.entries.indexOf(entry);
    this.entries.splice(index30, 1);
  }
  walk(callback) {
    this.entries = [...this.entries].filter((e) => {
      const ret = callback(e);
      return !(ret === true);
    });
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/loading.mjs
var localVueInstance;
var instances = new InstanceRegistry();
var LoadingProgrammatic = {
  open(params) {
    const defaultParam = {
      programmatic: { instances }
    };
    const propsData = merge(defaultParam, params);
    propsData.promise = new Promise((p1, p2) => {
      propsData.programmatic.resolve = p1;
      propsData.programmatic.reject = p2;
    });
    const app = localVueInstance || VueInstance;
    const vnode = createVNode(script15, propsData);
    vnode.appContext = app._context;
    render(vnode, document.createElement("div"));
    return vnode.component.proxy;
  },
  closeAll() {
    instances.walk((entry) => {
      entry.close(...arguments);
    });
  }
};
var index13 = {
  install(app) {
    localVueInstance = app;
    registerComponent(app, script15);
    registerComponentProgrammatic(app, "loading", LoadingProgrammatic);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/menu.mjs
var script$22 = defineComponent({
  name: "OMenu",
  configField: "menu",
  mixins: [BaseComponentMixin],
  props: {
    accordion: {
      type: Boolean,
      default: true
    },
    activable: {
      type: Boolean,
      default: true
    },
    rootClass: [String, Array, Function]
  },
  data() {
    return {
      menuItems: []
    };
  },
  computed: {
    rootClasses() {
      return this.computedClass("rootClass", "o-menu");
    }
  },
  methods: {
    registerMenuItem(item) {
      this.menuItems.push(item);
    },
    resetMenu(excludedItems = []) {
      this.menuItems.forEach((item) => {
        if (!excludedItems.includes(item))
          item.reset();
      });
    }
  },
  provide() {
    return {
      registerMenuItem: this.registerMenuItem,
      resetMenu: this.resetMenu,
      accordion: () => this.accordion,
      activable: () => this.activable
    };
  }
});
function render$22(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.rootClasses)
    },
    [renderSlot(_ctx.$slots, "default")],
    2
    /* CLASS */
  );
}
script$22.render = render$22;
script$22.__file = "src/components/menu/Menu.vue";
var script$15 = defineComponent({
  name: "OMenuList",
  configField: "menu",
  mixins: [BaseComponentMixin],
  props: {
    ariaRole: String,
    label: String,
    icon: String,
    iconPack: String,
    /**
     * Icon size, optional
     * @values small, medium, large
     */
    size: String,
    listClass: [String, Array, Function],
    listLabelClass: [String, Array, Function]
  },
  computed: {
    listClasses() {
      return this.computedClass("listClass", "o-menu-list");
    },
    labelClasses() {
      return this.computedClass("listLabelClass", "o-menu-label");
    },
    computedAriaRole() {
      return this.ariaRole === "menu" ? this.ariaRole : null;
    }
  }
});
var _hoisted_1$12 = {
  key: 1
};
var _hoisted_2$12 = ["role"];
function render$14(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = resolveComponent("o-icon");
  return openBlock(), createElementBlock("div", null, [_ctx.label || _ctx.$slots.label ? (openBlock(), createElementBlock(
    "div",
    {
      key: 0,
      class: normalizeClass(_ctx.labelClasses)
    },
    [_ctx.label && _ctx.icon ? (openBlock(), createBlock(_component_o_icon, {
      key: 0,
      icon: _ctx.icon,
      pack: _ctx.iconPack,
      size: _ctx.size
    }, null, 8, ["icon", "pack", "size"])) : createCommentVNode("v-if", true), _ctx.label ? (openBlock(), createElementBlock(
      "span",
      _hoisted_1$12,
      toDisplayString(_ctx.label),
      1
      /* TEXT */
    )) : renderSlot(_ctx.$slots, "label", {
      key: 2
    })],
    2
    /* CLASS */
  )) : createCommentVNode("v-if", true), createBaseVNode("ul", {
    class: normalizeClass(_ctx.listClasses),
    role: _ctx.computedAriaRole
  }, [renderSlot(_ctx.$slots, "default")], 10, _hoisted_2$12)]);
}
script$15.render = render$14;
script$15.__file = "src/components/menu/MenuList.vue";
var script16 = defineComponent({
  name: "OMenuItem",
  mixins: [BaseComponentMixin],
  configField: "menu",
  inheritAttrs: false,
  props: {
    label: String,
    active: Boolean,
    expanded: Boolean,
    disabled: Boolean,
    iconPack: String,
    icon: String,
    animation: {
      type: String,
      default: "slide"
    },
    tag: {
      type: String,
      default: "a"
    },
    ariaRole: {
      type: String,
      default: ""
    },
    /**
     * Icon size, optional
     * @values small, medium, large
     */
    size: String,
    itemClass: [String, Array, Function],
    itemActiveClass: [String, Array, Function],
    itemDisabledClass: [String, Array, Function],
    itemIconTextClass: [String, Array, Function],
    itemSubmenuClass: [String, Array, Function],
    itemWrapperClass: [String, Array, Function]
  },
  data() {
    return {
      newActive: this.active,
      newExpanded: this.expanded
    };
  },
  computed: {
    ariaRoleMenu() {
      return this.ariaRole === "menuitem" ? this.ariaRole : null;
    },
    itemClasses() {
      return {
        [this.computedClass("itemClass", "o-menu-item")]: true,
        [this.computedClass("itemActiveClass", "o-menu-item--active")]: this.newActive,
        [this.computedClass("itemDisabledClass", "o-menu-item--disabled")]: this.disabled,
        [this.computedClass("itemIconTextClass", "o-menu-item--icon-text")]: this.icon
      };
    },
    submenuClasses() {
      return this.computedClass("itemSubmenuClass", "o-menu-item__submenu");
    },
    wrapperClasses() {
      return this.computedClass("itemWrapperClass", "o-menu-item__wrapper");
    }
  },
  watch: {
    active(value) {
      this.newActive = value;
    },
    expanded(value) {
      this.newExpanded = value;
    }
  },
  methods: {
    handleClick() {
      if (this.disabled)
        return;
      this.triggerReset();
      this.newExpanded = this.$props.expanded || !this.newExpanded;
      this.$emit("update:expanded", this.newExpanded);
      if (this.activable) {
        this.newActive = true;
        this.$emit("update:active", this.newActive);
      }
    },
    triggerReset(child) {
      if (this.triggerParentReset) {
        this.triggerParentReset(this);
      } else if (this.resetMenu) {
        this.resetMenu([this, child]);
      }
    },
    reset() {
      if (!this.$parent.$data.isMenu || this.$parent.$data.isMenu && this.accordion) {
        this.newExpanded = false;
        this.$emit("update:expanded", this.newExpanded);
      }
      if (this.activable) {
        this.newActive = false;
        this.$emit("update:active", this.newActive);
      }
    }
  },
  mounted() {
    if (this.registerMenuItem) {
      this.registerMenuItem(this);
    }
  },
  provide() {
    return {
      triggerParentReset: this.triggerReset
    };
  },
  inject: {
    registerMenuItem: { default: false },
    resetMenu: { default: false },
    triggerParentReset: { default: false },
    accordion: { default: false },
    activable: { default: false }
  }
});
var _hoisted_110 = ["role"];
var _hoisted_29 = {
  key: 1
};
function render16(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = resolveComponent("o-icon");
  return openBlock(), createElementBlock("li", {
    role: _ctx.ariaRoleMenu,
    class: normalizeClass(_ctx.wrapperClasses)
  }, [(openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps(_ctx.$attrs, {
    class: _ctx.itemClasses,
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.handleClick())
  }), {
    default: withCtx(() => [_ctx.icon ? (openBlock(), createBlock(_component_o_icon, {
      key: 0,
      icon: _ctx.icon,
      pack: _ctx.iconPack,
      size: _ctx.size
    }, null, 8, ["icon", "pack", "size"])) : createCommentVNode("v-if", true), _ctx.label ? (openBlock(), createElementBlock(
      "span",
      _hoisted_29,
      toDisplayString(_ctx.label),
      1
      /* TEXT */
    )) : renderSlot(_ctx.$slots, "label", {
      key: 2,
      expanded: _ctx.newExpanded,
      active: _ctx.newActive
    })]),
    _: 3
    /* FORWARDED */
  }, 16, ["class"])), createCommentVNode(" sub menu items "), _ctx.$slots.default ? (openBlock(), createBlock(Transition, {
    key: 0,
    name: _ctx.animation,
    persisted: ""
  }, {
    default: withCtx(() => [withDirectives(createBaseVNode(
      "ul",
      {
        class: normalizeClass(_ctx.submenuClasses)
      },
      [renderSlot(_ctx.$slots, "default")],
      2
      /* CLASS */
    ), [[vShow, _ctx.newExpanded]])]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"])) : createCommentVNode("v-if", true)], 10, _hoisted_110);
}
script16.render = render16;
script16.__file = "src/components/menu/MenuItem.vue";
var index14 = {
  install(app) {
    registerComponent(app, script$22);
    registerComponent(app, script$15);
    registerComponent(app, script16);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/modal.mjs
var script17 = defineComponent({
  name: "OModal",
  components: {
    [script.name]: script
  },
  configField: "modal",
  directives: {
    trapFocus
  },
  mixins: [BaseComponentMixin, MatchMediaMixin],
  emits: ["update:active", "close"],
  props: {
    /** Whether modal is active or not, use v-model:active to make it two-way binding */
    active: Boolean,
    /** Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') */
    component: [Object, Function],
    /** Text content */
    content: String,
    /** @ignore */
    programmatic: Object,
    /** @ignore */
    promise: Promise,
    /** Props to be binded to the injected component */
    props: Object,
    /** Events to be binded to the injected component */
    events: Object,
    /** Width of the Modal */
    width: {
      type: [String, Number],
      default: () => {
        return getValueByPath(getOptions(), "modal.width", 960);
      }
    },
    /** Custom animation (transition name) */
    animation: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "modal.animation", "zoom-out");
      }
    },
    /**
     * Can close Modal by clicking 'X', pressing escape or clicking outside
     * @values escape, x, outside, button
     */
    canCancel: {
      type: [Array, Boolean],
      default: () => {
        return getValueByPath(getOptions(), "modal.canCancel", ["escape", "x", "outside", "button"]);
      }
    },
    /** Callback function to call after user canceled (clicked 'X' / pressed escape / clicked outside) */
    onCancel: {
      type: Function,
      default: () => {
      }
    },
    /** Callback function to call after close (programmatically close or user canceled) */
    onClose: {
      type: Function,
      default: () => {
      }
    },
    /**
     * clip to remove the body scrollbar, keep to have a non scrollable scrollbar to avoid shifting background, but will set body to position fixed, might break some layouts
     * @values keep, clip
     */
    scroll: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "modal.scroll", "keep");
      }
    },
    /** Display modal as full screen */
    fullScreen: Boolean,
    /** Trap focus inside the modal. */
    trapFocus: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "modal.trapFocus", true);
      }
    },
    ariaRole: {
      type: String,
      validator: (value) => {
        return ["dialog", "alertdialog"].indexOf(value) >= 0;
      }
    },
    ariaModal: Boolean,
    ariaLabel: String,
    /** Destroy modal on hide */
    destroyOnHide: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "modal.destroyOnHide", true);
      }
    },
    /** Automatically focus modal when active */
    autoFocus: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "modal.autoFocus", true);
      }
    },
    /** Icon name */
    closeIcon: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "modal.closeIcon", "close");
      }
    },
    closeIconSize: {
      type: String,
      default: "medium"
    },
    rootClass: [String, Function, Array],
    overlayClass: [String, Function, Array],
    contentClass: [String, Function, Array],
    closeClass: [String, Function, Array],
    fullScreenClass: [String, Function, Array],
    mobileClass: [String, Function, Array],
    scrollClipClass: [String, Function, Array],
    noScrollClass: [String, Function, Array]
  },
  data() {
    return {
      isActive: this.active || false,
      savedScrollTop: null,
      newWidth: toCssDimension(this.width),
      animating: !this.active,
      destroyed: !this.active
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-modal"),
        { [this.computedClass("mobileClass", "o-modal--mobile")]: this.isMatchMedia }
      ];
    },
    overlayClasses() {
      return [
        this.computedClass("overlayClass", "o-modal__overlay")
      ];
    },
    contentClasses() {
      return [
        this.computedClass("contentClass", "o-modal__content"),
        { [this.computedClass("fullScreenClass", "o-modal__content--full-screen")]: this.fullScreen }
      ];
    },
    closeClasses() {
      return [
        this.computedClass("closeClass", "o-modal__close")
      ];
    },
    scrollClass() {
      if (this.scroll === "clip") {
        return this.computedClass("scrollClipClass", "o-clipped");
      }
      return this.computedClass("noScrollClass", "o-noscroll");
    },
    cancelOptions() {
      return typeof this.canCancel === "boolean" ? this.canCancel ? getValueByPath(getOptions(), "modal.canCancel", ["escape", "x", "outside", "button"]) : [] : this.canCancel;
    },
    showX() {
      return this.cancelOptions.indexOf("x") >= 0;
    },
    customStyle() {
      if (!this.fullScreen) {
        return { maxWidth: this.newWidth };
      }
      return null;
    }
  },
  watch: {
    active(value) {
      this.isActive = value;
    },
    isActive(value) {
      if (value)
        this.destroyed = false;
      this.handleScroll();
      this.$nextTick(() => {
        if (value && this.$el && this.$el.focus && this.autoFocus) {
          this.$el.focus();
        }
      });
    }
  },
  methods: {
    handleScroll() {
      if (typeof window === "undefined")
        return;
      if (this.scroll === "clip") {
        if (this.scrollClass) {
          if (this.isActive) {
            document.documentElement.classList.add(this.scrollClass);
          } else {
            document.documentElement.classList.remove(this.scrollClass);
          }
          return;
        }
      }
      this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
      if (this.scrollClass) {
        if (this.isActive) {
          document.body.classList.add(this.scrollClass);
        } else {
          document.body.classList.remove(this.scrollClass);
        }
      }
      if (this.isActive) {
        document.body.style.top = `-${this.savedScrollTop}px`;
        return;
      }
      document.documentElement.scrollTop = this.savedScrollTop;
      document.body.style.top = null;
      this.savedScrollTop = null;
    },
    /**
    * Close the Modal if canCancel and call the onCancel prop (function).
    */
    cancel(method) {
      if (this.cancelOptions.indexOf(method) < 0)
        return;
      this.onCancel.apply(null, arguments);
      this.close({ action: "cancel", method });
    },
    /**
    * Emit events, and destroy modal if it's programmatic.
    */
    close() {
      this.isActive = false;
      if (this.destroyOnHide) {
        this.destroyed = true;
      }
      this.$emit("update:active", false);
      this.onClose.apply(null, arguments);
      if (this.programmatic) {
        if (this.programmatic.instances) {
          this.programmatic.instances.remove(this);
        }
        if (this.programmatic.resolve) {
          this.programmatic.resolve.apply(null, arguments);
        }
        window.requestAnimationFrame(() => {
          removeElement(this.$el);
        });
      }
    },
    /**
    * Keypress event that is bound to the document.
    */
    keyPress({ key }) {
      if (this.isActive && (key === "Escape" || key === "Esc"))
        this.cancel("escape");
    },
    /**
    * Transition after-enter hook
    */
    afterEnter() {
      this.animating = false;
    },
    /**
    * Transition before-leave hook
    */
    beforeLeave() {
      this.animating = true;
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
    }
  },
  mounted() {
    if (this.programmatic) {
      if (this.programmatic.instances) {
        this.programmatic.instances.add(this);
      }
      document.body.appendChild(this.$el);
      this.isActive = true;
    } else if (this.isActive)
      this.handleScroll();
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
      const savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
      if (this.scrollClass) {
        document.body.classList.remove(this.scrollClass);
        document.documentElement.classList.remove(this.scrollClass);
      }
      document.documentElement.scrollTop = savedScrollTop;
      document.body.style.top = null;
    }
  }
});
var _hoisted_111 = ["role", "aria-label", "aria-modal"];
var _hoisted_210 = {
  key: 1
};
function render17(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = resolveComponent("o-icon");
  const _directive_trap_focus = resolveDirective("trap-focus");
  return openBlock(), createBlock(Transition, {
    name: _ctx.animation,
    onAfterEnter: _ctx.afterEnter,
    onBeforeLeave: _ctx.beforeLeave
  }, {
    default: withCtx(() => [!_ctx.destroyed ? withDirectives((openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(_ctx.rootClasses),
      tabindex: -1,
      role: _ctx.ariaRole,
      "aria-label": _ctx.ariaLabel,
      "aria-modal": _ctx.ariaModal
    }, [createBaseVNode(
      "div",
      {
        class: normalizeClass(_ctx.overlayClasses),
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.cancel("outside"))
      },
      null,
      2
      /* CLASS */
    ), createBaseVNode(
      "div",
      {
        class: normalizeClass(_ctx.contentClasses),
        style: normalizeStyle(_ctx.customStyle)
      },
      [_ctx.component ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.component), mergeProps({
        key: 0
      }, _ctx.props, toHandlers(_ctx.events || {}), {
        onClose: _ctx.close
      }), null, 16, ["onClose"])) : _ctx.content ? (openBlock(), createElementBlock(
        "div",
        _hoisted_210,
        toDisplayString(_ctx.content),
        1
        /* TEXT */
      )) : renderSlot(_ctx.$slots, "default", {
        key: 2
      }), _ctx.showX ? withDirectives((openBlock(), createBlock(_component_o_icon, {
        key: 3,
        clickable: "",
        both: "",
        class: normalizeClass(_ctx.closeClasses),
        icon: _ctx.closeIcon,
        size: _ctx.closeIconSize,
        onClick: _cache[1] || (_cache[1] = ($event) => _ctx.cancel("x"))
      }, null, 8, ["class", "icon", "size"])), [[vShow, !_ctx.animating]]) : createCommentVNode("v-if", true)],
      6
      /* CLASS, STYLE */
    )], 10, _hoisted_111)), [[vShow, _ctx.isActive], [_directive_trap_focus, _ctx.trapFocus]]) : createCommentVNode("v-if", true)]),
    _: 3
    /* FORWARDED */
  }, 8, ["name", "onAfterEnter", "onBeforeLeave"]);
}
script17.render = render17;
script17.__file = "src/components/modal/Modal.vue";
var localVueInstance2;
var instances2 = new InstanceRegistry();
var ModalProgrammatic = {
  open(params) {
    let newParams;
    if (typeof params === "string") {
      newParams = {
        content: params
      };
    } else {
      newParams = params;
    }
    const defaultParam = {
      programmatic: { instances: instances2 }
    };
    let slot;
    if (Array.isArray(newParams.content)) {
      slot = newParams.content;
      delete newParams.content;
    }
    const propsData = merge(defaultParam, newParams);
    propsData.promise = new Promise((p1, p2) => {
      propsData.programmatic.resolve = p1;
      propsData.programmatic.reject = p2;
    });
    const app = localVueInstance2 || VueInstance;
    const defaultSlot = () => {
      return slot;
    };
    const vnode = createVNode(script17, propsData, defaultSlot);
    vnode.appContext = app._context;
    render(vnode, document.createElement("div"));
    return vnode.component.proxy;
  },
  closeAll() {
    console.log(instances2);
    instances2.walk((entry) => {
      entry.close(...arguments);
    });
  }
};
var index15 = {
  install(app) {
    localVueInstance2 = app;
    registerComponent(app, script17);
    registerComponentProgrammatic(app, "modal", ModalProgrammatic);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/notification.mjs
var MessageMixin = defineComponent({
  components: {
    [script.name]: script
  },
  props: {
    /** Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
    active: {
      type: Boolean,
      default: true
    },
    /** Adds an 'X' button that closes the notification. */
    closable: {
      type: Boolean,
      default: false
    },
    /** Message text (can contain HTML). */
    message: String,
    /** Type (color) of the notification, optional. */
    type: String,
    /** Adds an icon on the left side depending on the type (or the icon prop if defined). */
    hasIcon: Boolean,
    /** Icon name to use with has-icon. */
    icon: String,
    /** Icon pack to use. */
    iconPack: String,
    /** Icon size */
    iconSize: {
      type: String,
      default: "large"
    },
    /** Hide notification after duration only not programmatic. */
    autoClose: {
      type: Boolean,
      default: false
    },
    /** Visibility duration in miliseconds. */
    duration: {
      type: Number,
      default: 2e3
    }
  },
  data() {
    return {
      isActive: this.active
    };
  },
  watch: {
    active(value) {
      this.isActive = value;
    },
    isActive(value) {
      if (value) {
        this.setAutoClose();
      } else {
        if (this.timer) {
          clearTimeout(this.timer);
        }
      }
    }
  },
  computed: {
    /**
     * Icon name (MDI) based on type.
     */
    computedIcon() {
      if (this.icon) {
        return this.icon;
      }
      switch (this.type) {
        case "info":
          return "information";
        case "success":
          return "check-circle";
        case "warning":
          return "alert";
        case "danger":
          return "alert-circle";
        default:
          return null;
      }
    }
  },
  methods: {
    /**
     * Close the Message and emit events.
     */
    close(...args) {
      this.isActive = false;
      this.$emit("close", ...args);
      this.$emit("update:active", false);
    },
    /**
     * Set timer to auto close message
     */
    setAutoClose() {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          if (this.isActive) {
            this.close({ action: "close", method: "timeout" });
          }
        }, this.duration);
      }
    }
  },
  mounted() {
    this.setAutoClose();
  }
});
var script$16 = defineComponent({
  name: "ONotification",
  configField: "notification",
  mixins: [BaseComponentMixin, MessageMixin],
  emits: ["update:active", "close"],
  props: {
    /**
    * Which position the notification will appear when programmatically
    * @values top-right, top, top-left, bottom-right, bottom, bottom-left
    */
    position: String,
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: [String, Object],
    /**
     * Label for the close button, to be read by accessibility screenreaders.
     */
    ariaCloseLabel: String,
    /**
     * Size of close icon
     */
    closeIconSize: {
      type: String,
      default: "small"
    },
    /**
     * Custom animation (transition name).
     */
    animation: {
      type: String,
      default: "fade"
    },
    /** Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') */
    component: [Object, Function],
    /** Props to be binded to the injected component */
    props: Object,
    /** Events to be binded to the injected component */
    events: {
      type: Object,
      default: () => ({})
    },
    /** Close icon name */
    closeIcon: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "notification.closeIcon", "close");
      }
    },
    rootClass: [String, Function, Array],
    closeClass: [String, Function, Array],
    contentClass: [String, Function, Array],
    iconClass: [String, Function, Array],
    positionClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    wrapperClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-notification"),
        { [this.computedClass("variantClass", "o-notification--", this.variant)]: this.variant },
        { [this.computedClass("positionClass", "o-notification--", this.position)]: this.position }
      ];
    },
    wrapperClasses() {
      return [
        this.computedClass("wrapperClass", "o-notification__wrapper")
      ];
    },
    iconClasses() {
      return [
        this.computedClass("iconClass", "o-notification__icon")
      ];
    },
    contentClasses() {
      return [
        this.computedClass("contentClass", "o-notification__content")
      ];
    },
    closeClasses() {
      return [
        this.computedClass("closeClass", "o-notification__close")
      ];
    }
  }
});
var _hoisted_112 = ["aria-label"];
var _hoisted_211 = ["innerHTML"];
function render$15(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = resolveComponent("o-icon");
  return openBlock(), createBlock(Transition, {
    name: _ctx.animation,
    persisted: ""
  }, {
    default: withCtx(() => [withDirectives(createBaseVNode(
      "article",
      {
        class: normalizeClass(_ctx.rootClasses)
      },
      [_ctx.closable ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: normalizeClass(_ctx.closeClasses),
        type: "button",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.close({
          action: "close",
          method: "x"
        })),
        "aria-label": _ctx.ariaCloseLabel
      }, [createVNode(_component_o_icon, {
        clickable: "",
        pack: _ctx.iconPack,
        both: "",
        icon: _ctx.closeIcon,
        size: _ctx.closeIconSize
      }, null, 8, ["pack", "icon", "size"])], 10, _hoisted_112)) : createCommentVNode("v-if", true), _ctx.component ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.component), mergeProps({
        key: 1
      }, _ctx.props, toHandlers(_ctx.events), {
        onClose: _ctx.close
      }), null, 16, ["onClose"])) : createCommentVNode("v-if", true), _ctx.$slots.default || _ctx.message ? (openBlock(), createElementBlock(
        "div",
        {
          key: 2,
          class: normalizeClass(_ctx.wrapperClasses)
        },
        [_ctx.computedIcon ? (openBlock(), createBlock(_component_o_icon, {
          key: 0,
          icon: _ctx.computedIcon,
          pack: _ctx.iconPack,
          class: normalizeClass(_ctx.iconClasses),
          both: "",
          size: _ctx.iconSize,
          "aria-hidden": ""
        }, null, 8, ["icon", "pack", "class", "size"])) : createCommentVNode("v-if", true), createBaseVNode(
          "div",
          {
            class: normalizeClass(_ctx.contentClasses)
          },
          [_ctx.message ? (openBlock(), createElementBlock("span", {
            key: 0,
            innerHTML: _ctx.message
          }, null, 8, _hoisted_211)) : renderSlot(_ctx.$slots, "default", {
            key: 1,
            closeNotification: _ctx.close
          })],
          2
          /* CLASS */
        )],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true)],
      2
      /* CLASS */
    ), [[vShow, _ctx.isActive]])]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
script$16.render = render$15;
script$16.__file = "src/components/notification/Notification.vue";
var NoticeMixin = {
  props: {
    /** Type (color) of the notification, optional. */
    type: {
      type: String
    },
    /** Message text (can contain HTML). */
    message: [String, Array],
    /** Visibility duration in miliseconds. */
    duration: {
      type: Number,
      default: () => {
        return getValueByPath(getOptions(), "notification.duration", 1e3);
      }
    },
    /** If should queue with others notices (snackbar/toast/notification). */
    queue: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "notification.noticeQueue", void 0);
      }
    },
    /** Show the Notification indefinitely until it is dismissed when programmatically. */
    indefinite: {
      type: Boolean,
      default: false
    },
    /** Which position the notification will appear when programmatically. */
    position: {
      type: String,
      default: "top",
      validator(value) {
        return [
          "top-right",
          "top",
          "top-left",
          "bottom-right",
          "bottom",
          "bottom-left"
        ].indexOf(value) > -1;
      }
    },
    /** DOM element the toast will be created on. Note that this also changes the position of the toast from fixed to absolute. Meaning that the container should be fixed. */
    container: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "notification.containerElement", void 0);
      }
    },
    /** @ignore */
    programmatic: Object,
    /** @ignore */
    promise: Promise,
    /** Callback function to call after close (programmatically close or user canceled) */
    onClose: {
      type: Function,
      default: () => {
      }
    }
  },
  data() {
    return {
      isActive: false,
      parentTop: null,
      parentBottom: null,
      newDuration: this.duration,
      newContainer: this.container
    };
  },
  computed: {
    correctParent() {
      switch (this.position) {
        case "top-right":
        case "top":
        case "top-left":
          return this.parentTop;
        case "bottom-right":
        case "bottom":
        case "bottom-left":
          return this.parentBottom;
      }
    },
    transition() {
      switch (this.position) {
        case "top-right":
        case "top":
        case "top-left":
          return {
            enter: "fadeInDown",
            leave: "fadeOut"
          };
        case "bottom-right":
        case "bottom":
        case "bottom-left":
          return {
            enter: "fadeInUp",
            leave: "fadeOut"
          };
      }
    }
  },
  methods: {
    shouldQueue() {
      if (!this.queue)
        return false;
      return this.parentTop.childElementCount > 0 || this.parentBottom.childElementCount > 0;
    },
    close() {
      clearTimeout(this.timer);
      this.$emit("close");
      this.onClose.apply(null, arguments);
      if (this.programmatic) {
        if (this.programmatic.instances) {
          this.programmatic.instances.remove(this);
        }
        if (this.programmatic.resolve) {
          this.programmatic.resolve.apply(null, arguments);
        }
      }
      setTimeout(() => {
        this.isActive = false;
        removeElement(this.$el);
      }, 150);
    },
    showNotice() {
      if (this.shouldQueue())
        this.correctParent.innerHTML = "";
      this.correctParent.insertAdjacentElement("afterbegin", this.$el);
      this.isActive = true;
      if (!this.indefinite) {
        this.timer = setTimeout(() => this.timeoutCallback(), this.newDuration);
      }
    },
    setupContainer() {
      if (this.rootClasses() && this.positionClasses("top") && this.positionClasses("bottom")) {
        this.parentTop = document.querySelector((this.newContainer ? this.newContainer : "body") + `>.${this.rootClasses().join(".")}.${this.positionClasses("top").join(".")}`);
        this.parentBottom = document.querySelector((this.newContainer ? this.newContainer : "body") + `>.${this.rootClasses().join(".")}.${this.positionClasses("bottom").join(".")}`);
        if (this.parentTop && this.parentBottom)
          return;
        if (!this.parentTop) {
          this.parentTop = document.createElement("div");
          this.parentTop.className = `${this.rootClasses().join(" ")} ${this.positionClasses("top").join(" ")}`;
        }
        if (!this.parentBottom) {
          this.parentBottom = document.createElement("div");
          this.parentBottom.className = `${this.rootClasses().join(" ")} ${this.positionClasses("bottom").join(" ")}`;
        }
        const container = document.querySelector(this.newContainer) || document.body;
        container.appendChild(this.parentTop);
        container.appendChild(this.parentBottom);
        if (this.newContainer) {
          const classes = this.noticeCustomContainerClasses();
          if (classes && classes.length) {
            classes.filter((c) => !!c).forEach((c) => {
              this.parentTop.classList.add(c);
              this.parentBottom.classList.add(c);
            });
          }
        }
      }
    },
    timeoutCallback() {
      return this.close({ action: "close", method: "timeout" });
    }
  },
  beforeMount() {
    this.setupContainer();
  },
  mounted() {
    if (this.programmatic && this.programmatic.instances) {
      this.programmatic.instances.add(this);
    }
    this.showNotice();
  }
};
var script18 = defineComponent({
  name: "ONotificationNotice",
  configField: "notification",
  mixins: [BaseComponentMixin, NoticeMixin],
  props: {
    propsNotification: Object,
    noticeClass: [String, Function, Array],
    noticePositionClass: [String, Function, Array],
    noticeCustomContainerClass: [String, Function, Array]
  },
  emits: ["update:active", "close"],
  methods: {
    rootClasses() {
      return [
        this.computedClass("noticeClass", "o-notices")
      ];
    },
    positionClasses(position) {
      return [
        this.computedClass("noticePositionClass", "o-notices--", position)
      ];
    },
    noticeCustomContainerClasses() {
      return [
        this.computedClass("noticeCustomContainerClass", "o-notices__custom-container")
      ];
    },
    timeoutCallback() {
      return this.$refs.notification.close({ action: "close", method: "timeout" });
    }
  }
});
function render18(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_notification = resolveComponent("o-notification");
  return openBlock(), createBlock(_component_o_notification, mergeProps(_ctx.propsNotification, {
    ref: "notification",
    onClose: _ctx.close
  }), {
    default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
    _: 3
    /* FORWARDED */
  }, 16, ["onClose"]);
}
script18.render = render18;
script18.__file = "src/components/notification/NotificationNotice.vue";
var localVueInstance3;
var instances3 = new InstanceRegistry();
var NotificationProgrammatic = {
  open(params) {
    let newParams;
    if (typeof params === "string") {
      newParams = {
        message: params
      };
    } else {
      newParams = params;
    }
    const defaultParam = {
      programmatic: { instances: instances3 },
      position: getValueByPath(getOptions(), "notification.position", "top-right"),
      closable: params.closable || getValueByPath(getOptions(), "notification.closable", false)
    };
    let slot;
    if (Array.isArray(newParams.message)) {
      slot = newParams.message;
      delete newParams.message;
    }
    newParams.active = true;
    const propsData = merge(defaultParam, newParams);
    propsData.promise = new Promise((p1, p2) => {
      propsData.programmatic.resolve = p1;
      propsData.programmatic.reject = p2;
    });
    const app = localVueInstance3 || VueInstance;
    propsData.propsNotification = Object.assign({}, propsData);
    propsData.propsNotification.isActive = true;
    const defaultSlot = () => {
      return slot;
    };
    const vnode = createVNode(script18, propsData, defaultSlot);
    vnode.appContext = app._context;
    render(vnode, document.createElement("div"));
    return vnode.component.proxy;
  },
  closeAll() {
    instances3.walk((entry) => {
      entry.close(...arguments);
    });
  }
};
var index16 = {
  install(app) {
    localVueInstance3 = app;
    registerComponent(app, script$16);
    registerComponentProgrammatic(app, "notification", NotificationProgrammatic);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/Pagination-0ed363fd.mjs
var script$17 = defineComponent({
  name: "OPaginationButton",
  inject: ["$pagination"],
  configField: "pagination",
  props: {
    page: {
      type: Object,
      required: true
    },
    tag: {
      type: String,
      default: "a",
      validator: (value) => getValueByPath(getOptions(), "linkTags", ["a", "button", "input", "router-link", "nuxt-link"]).indexOf(value) >= 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    linkClass: [String, Array, Object],
    linkCurrentClass: [String, Array, Object]
  },
  computed: {
    linkClasses() {
      return [
        this.linkClass || [...this.$pagination.linkClasses],
        this.page.class,
        { [this.linkCurrentClass || this.$pagination.linkCurrentClasses]: this.page.isCurrent }
      ];
    },
    href() {
      if (this.tag === "a") {
        return "#";
      }
      return "";
    },
    isDisabled() {
      if (this.tag === "a")
        return null;
      return this.disabled || this.page.disabled;
    }
  }
});
function render$16(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({
    role: "button",
    href: _ctx.href,
    disabled: _ctx.isDisabled,
    class: _ctx.linkClasses
  }, _ctx.$attrs, {
    onClick: withModifiers(_ctx.page.click, ["prevent"]),
    "aria-label": _ctx.page["aria-label"],
    "aria-current": _ctx.page.isCurrent
  }), {
    default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(
      toDisplayString(_ctx.page.number),
      1
      /* TEXT */
    )])]),
    _: 3
    /* FORWARDED */
  }, 16, ["href", "disabled", "class", "onClick", "aria-label", "aria-current"]);
}
script$17.render = render$16;
script$17.__file = "src/components/pagination/PaginationButton.vue";
var script19 = defineComponent({
  name: "OPagination",
  components: {
    [script.name]: script,
    [script$17.name]: script$17
  },
  configField: "pagination",
  mixins: [BaseComponentMixin, MatchMediaMixin],
  provide() {
    return {
      $pagination: this
    };
  },
  emits: ["update:active", "change", "update:current"],
  props: {
    /** Total count of items */
    total: Number,
    /** Items count for each page */
    perPage: {
      type: Number,
      default: () => {
        return getValueByPath(getOptions(), "pagination.perPage", 20);
      }
    },
    /** Current page number, use v-model:current to make it two-way binding */
    current: {
      type: Number,
      default: 1
    },
    /** Number of pagination items to show before current page */
    rangeBefore: {
      type: Number,
      default: 1
    },
    /** Number of pagination items to show after current page */
    rangeAfter: {
      type: Number,
      default: 1
    },
    /**
     * Pagination size, optional
     * @values small, medium, large
     */
    size: String,
    /** Simple style */
    simple: Boolean,
    /** Rounded button styles */
    rounded: Boolean,
    /**
     * Buttons order, optional
     * @values centered, right, left
     */
    order: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "pagination.order", "right");
      }
    },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: String,
    /** Icon to use for previous button */
    iconPrev: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "pagination.iconPrev", "chevron-left");
      }
    },
    /** Icon to use for next button */
    iconNext: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "pagination.iconNext", "chevron-right");
      }
    },
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String,
    rootClass: [String, Function, Array],
    prevBtnClass: [String, Function, Array],
    nextBtnClass: [String, Function, Array],
    listClass: [String, Function, Array],
    linkClass: [String, Function, Array],
    linkCurrentClass: [String, Function, Array],
    ellipsisClass: [String, Function, Array],
    infoClass: [String, Function, Array],
    orderClass: [String, Function, Array],
    simpleClass: [String, Function, Array],
    roundedClass: [String, Function, Array],
    linkDisabledClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    mobileClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-pag"),
        { [this.computedClass("orderClass", "o-pag--", this.order)]: this.order },
        { [this.computedClass("sizeClass", "o-pag--", this.size)]: this.size },
        { [this.computedClass("simpleClass", "o-pag--simple")]: this.simple },
        { [this.computedClass("mobileClass", "o-pag--mobile")]: this.isMatchMedia }
      ];
    },
    prevBtnClasses() {
      return [
        this.computedClass("prevBtnClass", "o-pag__previous"),
        { [this.computedClass("linkDisabledClass", "o-pag__link--disabled")]: !this.hasPrev }
      ];
    },
    nextBtnClasses() {
      return [
        this.computedClass("nextBtnClass", "o-pag__next"),
        { [this.computedClass("linkDisabledClass", "o-pag__link--disabled")]: !this.hasNext }
      ];
    },
    infoClasses() {
      return [
        this.computedClass("infoClass", "o-pag__info")
      ];
    },
    ellipsisClasses() {
      return [
        this.computedClass("ellipsisClass", "o-pag__ellipsis")
      ];
    },
    listClasses() {
      return [
        this.computedClass("listClass", "o-pag__list")
      ];
    },
    linkClasses() {
      return [
        this.computedClass("linkClass", "o-pag__link"),
        { [this.computedClass("roundedClass", "o-pag__link--rounded")]: this.rounded }
      ];
    },
    linkCurrentClasses() {
      return [
        this.computedClass("linkCurrentClass", "o-pag__link--current")
      ];
    },
    beforeCurrent() {
      return parseInt(this.rangeBefore);
    },
    afterCurrent() {
      return parseInt(this.rangeAfter);
    },
    /**
    * Total page size (count).
    */
    pageCount() {
      return Math.ceil(this.total / this.perPage);
    },
    /**
    * First item of the page (count).
    */
    firstItem() {
      const firstItem = this.current * this.perPage - this.perPage + 1;
      return firstItem >= 0 ? firstItem : 0;
    },
    /**
    * Check if previous button is available.
    */
    hasPrev() {
      return this.current > 1;
    },
    /**
    * Check if first page button should be visible.
    */
    hasFirst() {
      return this.current >= 2 + this.beforeCurrent;
    },
    /**
    * Check if first ellipsis should be visible.
    */
    hasFirstEllipsis() {
      return this.current >= this.beforeCurrent + 4;
    },
    /**
    * Check if last page button should be visible.
    */
    hasLast() {
      return this.current <= this.pageCount - (1 + this.afterCurrent);
    },
    /**
    * Check if last ellipsis should be visible.
    */
    hasLastEllipsis() {
      return this.current < this.pageCount - (2 + this.afterCurrent);
    },
    /**
    * Check if next button is available.
    */
    hasNext() {
      return this.current < this.pageCount;
    },
    /**
    * Get near pages, 1 before and 1 after the current.
    * Also add the click event to the array.
    */
    pagesInRange() {
      if (this.simple)
        return;
      let left = Math.max(1, this.current - this.beforeCurrent);
      if (left - 1 === 2) {
        left--;
      }
      let right = Math.min(this.current + this.afterCurrent, this.pageCount);
      if (this.pageCount - right === 2) {
        right++;
      }
      const pages = [];
      for (let i = left; i <= right; i++) {
        pages.push(this.getPage(i));
      }
      return pages;
    },
    hasDefaultSlot() {
      return this.$slots.default;
    },
    hasPreviousSlot() {
      return this.$slots.previous;
    },
    hasNextSlot() {
      return this.$slots.next;
    }
  },
  watch: {
    /**
    * If current page is trying to be greater than page count, set to last.
    */
    pageCount(value) {
      if (this.current > value)
        this.last();
    }
  },
  methods: {
    /**
    * Previous button click listener.
    */
    prev(event) {
      this.changePage(this.current - 1, event);
    },
    /**
    * Next button click listener.
    */
    next(event) {
      this.changePage(this.current + 1, event);
    },
    /**
    * First button click listener.
    */
    first(event) {
      this.changePage(1, event);
    },
    /**
    * Last button click listener.
    */
    last(event) {
      this.changePage(this.pageCount, event);
    },
    changePage(num, event) {
      if (this.current === num || num < 1 || num > this.pageCount)
        return;
      this.$emit("change", num);
      this.$emit("update:current", num);
      if (event && event.target) {
        this.$nextTick(() => event.target.focus());
      }
    },
    getPage(num, options = {}) {
      return {
        number: num,
        isCurrent: this.current === num,
        click: (event) => this.changePage(num, event),
        disabled: options.disabled || false,
        class: options.class || "",
        "aria-label": options["aria-label"] || this.getAriaPageLabel(num, this.current === num)
      };
    },
    /**
    * Get text for aria-label according to page number.
    */
    getAriaPageLabel(pageNumber, isCurrent) {
      if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
        return this.ariaPageLabel + " " + pageNumber + ".";
      } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
        return this.ariaCurrentLabel + ", " + this.ariaPageLabel + " " + pageNumber + ".";
      }
      return null;
    }
  }
});
var _hoisted_113 = {
  key: 0
};
var _hoisted_212 = {
  key: 1
};
var _hoisted_35 = {
  key: 2
};
var _hoisted_44 = {
  key: 3
};
function render19(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = resolveComponent("o-icon");
  const _component_o_pagination_button = resolveComponent("o-pagination-button");
  return openBlock(), createElementBlock(
    "nav",
    {
      class: normalizeClass(_ctx.rootClasses)
    },
    [_ctx.hasPreviousSlot ? renderSlot(_ctx.$slots, "previous", {
      key: 0,
      linkClass: _ctx.linkClasses,
      linkCurrentClass: _ctx.linkCurrentClasses,
      page: _ctx.getPage(_ctx.current - 1, {
        class: _ctx.prevBtnClasses,
        "aria-label": _ctx.ariaPreviousLabel
      })
    }, () => [createVNode(_component_o_icon, {
      icon: _ctx.iconPrev,
      pack: _ctx.iconPack,
      both: "",
      "aria-hidden": "true"
    }, null, 8, ["icon", "pack"])]) : (openBlock(), createBlock(_component_o_pagination_button, {
      key: 1,
      class: normalizeClass(_ctx.prevBtnClasses),
      linkClass: _ctx.linkClasses,
      linkCurrentClass: _ctx.linkCurrentClasses,
      page: _ctx.getPage(_ctx.current - 1)
    }, {
      default: withCtx(() => [createVNode(_component_o_icon, {
        icon: _ctx.iconPrev,
        pack: _ctx.iconPack,
        both: "",
        "aria-hidden": "true"
      }, null, 8, ["icon", "pack"])]),
      _: 1
      /* STABLE */
    }, 8, ["class", "linkClass", "linkCurrentClass", "page"])), _ctx.hasNextSlot ? renderSlot(_ctx.$slots, "next", {
      key: 2,
      linkClass: _ctx.linkClasses,
      linkCurrentClass: _ctx.linkCurrentClasses,
      page: _ctx.getPage(_ctx.current + 1, {
        class: _ctx.nextBtnClasses,
        "aria-label": _ctx.ariaNextLabel
      })
    }, () => [createVNode(_component_o_icon, {
      icon: _ctx.iconNext,
      pack: _ctx.iconPack,
      both: "",
      "aria-hidden": "true"
    }, null, 8, ["icon", "pack"])]) : (openBlock(), createBlock(_component_o_pagination_button, {
      key: 3,
      class: normalizeClass(_ctx.nextBtnClasses),
      linkClass: _ctx.linkClasses,
      linkCurrentClass: _ctx.linkCurrentClasses,
      page: _ctx.getPage(_ctx.current + 1)
    }, {
      default: withCtx(() => [createVNode(_component_o_icon, {
        icon: _ctx.iconNext,
        pack: _ctx.iconPack,
        both: "",
        "aria-hidden": "true"
      }, null, 8, ["icon", "pack"])]),
      _: 1
      /* STABLE */
    }, 8, ["class", "linkClass", "linkCurrentClass", "page"])), _ctx.simple ? (openBlock(), createElementBlock(
      "small",
      {
        key: 4,
        class: normalizeClass(_ctx.infoClasses)
      },
      [_ctx.perPage == 1 ? (openBlock(), createElementBlock(
        Fragment,
        {
          key: 0
        },
        [createTextVNode(
          toDisplayString(_ctx.firstItem) + " / " + toDisplayString(_ctx.total),
          1
          /* TEXT */
        )],
        64
        /* STABLE_FRAGMENT */
      )) : (openBlock(), createElementBlock(
        Fragment,
        {
          key: 1
        },
        [createTextVNode(
          toDisplayString(_ctx.firstItem) + "-" + toDisplayString(Math.min(_ctx.current * _ctx.perPage, _ctx.total)) + " / " + toDisplayString(_ctx.total),
          1
          /* TEXT */
        )],
        64
        /* STABLE_FRAGMENT */
      ))],
      2
      /* CLASS */
    )) : (openBlock(), createElementBlock(
      "ul",
      {
        key: 5,
        class: normalizeClass(_ctx.listClasses)
      },
      [createCommentVNode("First"), _ctx.hasFirst ? (openBlock(), createElementBlock("li", _hoisted_113, [_ctx.hasDefaultSlot ? renderSlot(_ctx.$slots, "default", {
        key: 0,
        page: _ctx.getPage(1),
        linkClass: _ctx.linkClasses,
        linkCurrentClass: _ctx.linkCurrentClasses
      }) : (openBlock(), createBlock(_component_o_pagination_button, {
        key: 1,
        linkClass: _ctx.linkClasses,
        linkCurrentClass: _ctx.linkCurrentClasses,
        page: _ctx.getPage(1)
      }, null, 8, ["linkClass", "linkCurrentClass", "page"]))])) : createCommentVNode("v-if", true), _ctx.hasFirstEllipsis ? (openBlock(), createElementBlock("li", _hoisted_212, [createBaseVNode(
        "span",
        {
          class: normalizeClass(_ctx.ellipsisClasses)
        },
        "…",
        2
        /* CLASS */
      )])) : createCommentVNode("v-if", true), createCommentVNode("Pages"), (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.pagesInRange, (page) => {
          return openBlock(), createElementBlock("li", {
            key: page.number
          }, [_ctx.hasDefaultSlot ? renderSlot(_ctx.$slots, "default", {
            key: 0,
            page,
            linkClass: _ctx.linkClasses,
            linkCurrentClass: _ctx.linkCurrentClasses
          }) : (openBlock(), createBlock(_component_o_pagination_button, {
            key: 1,
            linkClass: _ctx.linkClasses,
            linkCurrentClass: _ctx.linkCurrentClasses,
            page
          }, null, 8, ["linkClass", "linkCurrentClass", "page"]))]);
        }),
        128
        /* KEYED_FRAGMENT */
      )), createCommentVNode("Last"), _ctx.hasLastEllipsis ? (openBlock(), createElementBlock("li", _hoisted_35, [createBaseVNode(
        "span",
        {
          class: normalizeClass(_ctx.ellipsisClasses)
        },
        "…",
        2
        /* CLASS */
      )])) : createCommentVNode("v-if", true), _ctx.hasLast ? (openBlock(), createElementBlock("li", _hoisted_44, [_ctx.hasDefaultSlot ? renderSlot(_ctx.$slots, "default", {
        key: 0,
        page: _ctx.getPage(_ctx.pageCount),
        linkClass: _ctx.linkClasses,
        linkCurrentClass: _ctx.linkCurrentClasses
      }) : (openBlock(), createBlock(_component_o_pagination_button, {
        key: 1,
        linkClass: _ctx.linkClasses,
        linkCurrentClass: _ctx.linkCurrentClasses,
        page: _ctx.getPage(_ctx.pageCount)
      }, null, 8, ["linkClass", "linkCurrentClass", "page"]))])) : createCommentVNode("v-if", true)],
      2
      /* CLASS */
    ))],
    2
    /* CLASS */
  );
}
script19.render = render19;
script19.__file = "src/components/pagination/Pagination.vue";

// node_modules/@oruga-ui/oruga-next/dist/esm/pagination.mjs
var index17 = {
  install(app) {
    registerComponent(app, script19);
    registerComponent(app, script$17);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/radio.mjs
var script20 = defineComponent({
  name: "ORadio",
  mixins: [BaseComponentMixin, CheckRadioMixin],
  configField: "radio",
  emits: [
    "input"
  ],
  props: {
    rootClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    checkCheckedClass: [String, Function, Array],
    checkClass: [String, Function, Array],
    labelClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },
  computed: {
    getLabel() {
      return this.$refs.label;
    },
    isChecked() {
      return this.modelValue === this.nativeValue;
    },
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-radio"),
        { [this.computedClass("checkedClass", "o-radio--checked")]: this.isChecked },
        { [this.computedClass("sizeClass", "o-radio--", this.size)]: this.size },
        { [this.computedClass("disabledClass", "o-radio--disabled")]: this.disabled },
        { [this.computedClass("variantClass", "o-radio--", this.variant)]: this.variant }
      ];
    },
    checkClasses() {
      return [
        this.computedClass("checkClass", "o-radio__check"),
        { [this.computedClass("checkCheckedClass", "o-radio__check--checked")]: this.isChecked }
      ];
    },
    labelClasses() {
      return [
        this.computedClass("labelClass", "o-radio__label")
      ];
    }
  }
});
var _hoisted_114 = ["disabled", "required", "name", "value"];
function render20(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "label",
    {
      class: normalizeClass(_ctx.rootClasses),
      ref: "label",
      onClick: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.focus && _ctx.focus(...args), ["stop"])),
      onKeydown: _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => _ctx.getLabel.click(), ["prevent"]), ["enter"]))
    },
    [withDirectives(createBaseVNode("input", {
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
      type: "radio",
      ref: "input",
      onClick: _cache[1] || (_cache[1] = withModifiers(() => {
      }, ["stop"])),
      class: normalizeClass(_ctx.checkClasses),
      disabled: _ctx.disabled,
      required: _ctx.required,
      name: _ctx.name,
      value: _ctx.nativeValue
    }, null, 10, _hoisted_114), [[vModelRadio, _ctx.computedValue]]), createBaseVNode(
      "span",
      {
        class: normalizeClass(_ctx.labelClasses)
      },
      [renderSlot(_ctx.$slots, "default")],
      2
      /* CLASS */
    )],
    34
    /* CLASS, HYDRATE_EVENTS */
  );
}
script20.render = render20;
script20.__file = "src/components/radio/Radio.vue";
var index18 = {
  install(app) {
    registerComponent(app, script20);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/select.mjs
var index19 = {
  install(app) {
    registerComponent(app, script10);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/skeleton.mjs
var script21 = defineComponent({
  name: "OSkeleton",
  mixins: [BaseComponentMixin],
  configField: "skeleton",
  props: {
    /** Show or hide loader	 */
    active: {
      type: Boolean,
      default: true
    },
    /** Show a loading animation */
    animated: {
      type: Boolean,
      default: true
    },
    /** Custom width */
    width: [Number, String],
    /** Custom height */
    height: [Number, String],
    /** Show a circle shape */
    circle: Boolean,
    /** Rounded style */
    rounded: {
      type: Boolean,
      default: true
    },
    /** Number of shapes to display */
    count: {
      type: Number,
      default: 1
    },
    /**
     * Skeleton position in relation to the element
     * @values left, centered, right
     */
    position: {
      type: String,
      default: "left",
      validator(value) {
        return [
          "left",
          "centered",
          "right"
        ].indexOf(value) > -1;
      }
    },
    /**
     * Size of skeleton
     * @values small, medium, large
     */
    size: String,
    rootClass: [String, Function, Array],
    animationClass: [String, Function, Array],
    positionClass: [String, Function, Array],
    itemClass: [String, Function, Array],
    itemRoundedClass: [String, Function, Array],
    sizeClass: [String, Function, Array]
  },
  render() {
    if (!this.active)
      return;
    const items2 = [];
    const width = this.width;
    const height = this.height;
    for (let i = 0; i < this.count; i++) {
      items2.push(h("div", {
        class: [
          this.computedClass("itemClass", "o-sklt__item"),
          { [this.computedClass("itemRoundedClass", "o-sklt__item--rounded")]: this.rounded },
          { [this.computedClass("animationClass", "o-sklt__item--animated")]: this.animated },
          { [this.computedClass("sizeClass", "o-sklt__item--", this.size)]: this.size }
        ],
        key: i,
        style: {
          height: toCssDimension(height),
          width: toCssDimension(width),
          borderRadius: this.circle ? "50%" : null
        }
      }));
    }
    return h("div", {
      class: [
        this.computedClass("rootClass", "o-sklt"),
        { [this.computedClass("positionClass", "o-sklt--", this.position)]: this.position }
      ]
    }, items2);
  }
});
script21.__file = "src/components/skeleton/Skeleton.vue";
var index20 = {
  install(app) {
    registerComponent(app, script21);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/sidebar.mjs
var script22 = defineComponent({
  name: "OSidebar",
  mixins: [BaseComponentMixin, MatchMediaMixin],
  configField: "sidebar",
  emits: ["update:open", "close"],
  props: {
    /** To control the behaviour of the sidebar programmatically, use the v-model:open to make it two-way binding */
    open: Boolean,
    /**
    * Color of the sidebar, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: [String, Object],
    /** Show an overlay like modal */
    overlay: Boolean,
    /**
     * Skeleton position in relation to the window
     * @values fixed, absolute, static
     */
    position: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "sidebar.position", "fixed");
      },
      validator: (value) => {
        return [
          "fixed",
          "absolute",
          "static"
        ].indexOf(value) >= 0;
      }
    },
    /** Show sidebar in fullheight */
    fullheight: Boolean,
    /** Show sidebar in fullwidth */
    fullwidth: Boolean,
    /** Show the sidebar on right */
    right: Boolean,
    /**
     * Custom layout on mobile
     * @values fullwidth, reduced, hidden
     */
    mobile: {
      type: String,
      validator: (value) => {
        return [
          "",
          "fullwidth",
          "reduced",
          "hidden"
        ].indexOf(value) >= 0;
      }
    },
    /** Show a small sidebar */
    reduce: Boolean,
    /** Expand sidebar on hover when reduced or mobile is reduce */
    expandOnHover: Boolean,
    /** Expand sidebar on hover with fixed position when reduced or mobile is reduce */
    expandOnHoverFixed: Boolean,
    /**
     * Sidebar cancel options
     * @values true, false, 'escape', 'outside'
     */
    canCancel: {
      type: [Array, Boolean],
      default: () => {
        return getValueByPath(getOptions(), "sidebar.canCancel", ["escape", "outside"]);
      }
    },
    /**
     * Callback on cancel
     */
    onCancel: {
      type: Function,
      default: () => {
      }
    },
    scroll: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "sidebar.scroll", "clip");
      },
      validator: (value) => {
        return [
          "clip",
          "keep"
        ].indexOf(value) >= 0;
      }
    },
    rootClass: [String, Function, Array],
    overlayClass: [String, Function, Array],
    contentClass: [String, Function, Array],
    fixedClass: [String, Function, Array],
    staticClass: [String, Function, Array],
    absoluteClass: [String, Function, Array],
    fullheightClass: [String, Function, Array],
    fullwidthClass: [String, Function, Array],
    rightClass: [String, Function, Array],
    reduceClass: [String, Function, Array],
    expandOnHoverClass: [String, Function, Array],
    expandOnHoverFixedClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    mobileClass: [String, Function, Array],
    scrollClipClass: [String, Function, Array],
    noScrollClass: [String, Function, Array],
    hiddenClass: [String, Function, Array],
    visibleClass: [String, Function, Array]
  },
  data() {
    return {
      isOpen: this.open,
      transitionName: null,
      animating: true,
      savedScrollTop: null
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-side"),
        { [this.computedClass("mobileClass", "o-side--mobile")]: this.isMatchMedia }
      ];
    },
    overlayClasses() {
      return [
        this.computedClass("overlayClass", "o-side__overlay")
      ];
    },
    contentClasses() {
      return [
        this.computedClass("contentClass", "o-side__content"),
        { [this.computedClass("variantClass", "o-side__content--", this.variant)]: this.variant },
        { [this.computedClass("fixedClass", "o-side__content--fixed")]: this.isFixed },
        { [this.computedClass("staticClass", "o-side__content--static")]: this.isStatic },
        { [this.computedClass("absoluteClass", "o-side__content--absolute")]: this.isAbsolute },
        { [this.computedClass("fullheightClass", "o-side__content--fullheight")]: this.fullheight },
        { [this.computedClass("fullwidthClass", "o-side__content--fullwidth")]: this.fullwidth || this.mobile === "fullwidth" && this.isMatchMedia },
        { [this.computedClass("rightClass", "o-side__content--right")]: this.right },
        { [this.computedClass("reduceClass", "o-side__content--mini")]: this.reduce || this.mobile === "reduced" && this.isMatchMedia },
        { [this.computedClass("expandOnHoverClass", "o-side__content--mini-expand")]: this.expandOnHover && this.mobile !== "fullwidth" },
        { [this.computedClass("expandOnHoverFixedClass", "o-side__content--expand-mini-hover-fixed")]: this.expandOnHover && this.expandOnHoverFixed && this.mobile !== "fullwidth" },
        { [this.computedClass("visibleClass", "o-side__content--visible")]: this.isOpen },
        { [this.computedClass("hiddenClass", "o-side__content--hidden")]: !this.isOpen }
      ];
    },
    scrollClass() {
      if (this.scroll === "clip") {
        return this.computedClass("scrollClipClass", "o-clipped");
      }
      return this.computedClass("noScrollClass", "o-noscroll");
    },
    cancelOptions() {
      return typeof this.canCancel === "boolean" ? this.canCancel ? getValueByPath(getOptions(), "sidebar.canCancel", ["escape", "outside"]) : [] : this.canCancel;
    },
    isStatic() {
      return this.position === "static";
    },
    isFixed() {
      return this.position === "fixed";
    },
    isAbsolute() {
      return this.position === "absolute";
    },
    hideOnMobile() {
      return this.mobile === "hidden" && this.isMatchMedia;
    }
  },
  watch: {
    open: {
      handler(value) {
        this.isOpen = value;
        if (this.overlay) {
          this.handleScroll();
        }
        const open = this.right ? !value : value;
        this.transitionName = !open ? "slide-prev" : "slide-next";
      },
      immediate: true
    }
  },
  methods: {
    /**
    * Keypress event that is bound to the document.
    */
    keyPress({ key }) {
      if (this.isFixed) {
        if (this.isOpen && (key === "Escape" || key === "Esc"))
          this.cancel("escape");
      }
    },
    /**
    * Close the Sidebar if canCancel and call the onCancel prop (function).
    */
    cancel(method) {
      if (this.cancelOptions.indexOf(method) < 0)
        return;
      if (this.isStatic)
        return;
      this.onCancel.apply(null, arguments);
      this.close();
    },
    /**
    * Call the onCancel prop (function) and emit events
    */
    close() {
      this.isOpen = false;
      this.$emit("close");
      this.$emit("update:open", false);
    },
    /**
     * Close fixed sidebar if clicked outside.
     */
    clickedOutside(event) {
      if (!this.isFixed || !this.isOpen || this.animating) {
        return;
      }
      if (!event.composedPath().includes(this.$refs.sidebarContent)) {
        this.cancel("outside");
      }
    },
    /**
    * Transition before-enter hook
    */
    beforeEnter() {
      this.animating = true;
    },
    /**
    * Transition after-leave hook
    */
    afterEnter() {
      this.animating = false;
    },
    handleScroll() {
      if (typeof window === "undefined")
        return;
      if (this.scroll === "clip") {
        if (this.scrollClass) {
          if (this.open) {
            document.documentElement.classList.add(this.scrollClass);
          } else {
            document.documentElement.classList.remove(this.scrollClass);
          }
          return;
        }
      }
      this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
      if (this.scrollClass) {
        if (this.open) {
          document.body.classList.add(this.scrollClass);
        } else {
          document.body.classList.remove(this.scrollClass);
        }
      }
      if (this.open) {
        document.body.style.top = `-${this.savedScrollTop}px`;
        return;
      }
      document.documentElement.scrollTop = this.savedScrollTop;
      document.body.style.top = null;
      this.savedScrollTop = null;
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
      document.addEventListener("click", this.clickedOutside);
    }
  },
  mounted() {
    if (typeof window !== "undefined") {
      if (this.isFixed) {
        document.body.appendChild(this.$el);
      }
      if (this.overlay && this.open) {
        this.handleScroll();
      }
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
      document.removeEventListener("click", this.clickedOutside);
      if (this.overlay) {
        const savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
        if (this.scrollClass) {
          document.body.classList.remove(this.scrollClass);
          document.documentElement.classList.remove(this.scrollClass);
        }
        document.documentElement.scrollTop = savedScrollTop;
        document.body.style.top = null;
      }
    }
    if (this.isFixed) {
      removeElement(this.$el);
    }
  }
});
function render21(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.rootClasses)
    },
    [_ctx.overlay && _ctx.isOpen ? (openBlock(), createElementBlock(
      "div",
      {
        key: 0,
        class: normalizeClass(_ctx.overlayClasses)
      },
      null,
      2
      /* CLASS */
    )) : createCommentVNode("v-if", true), createVNode(Transition, {
      name: _ctx.transitionName,
      onBeforeEnter: _ctx.beforeEnter,
      onAfterEnter: _ctx.afterEnter,
      persisted: ""
    }, {
      default: withCtx(() => [withDirectives(createBaseVNode(
        "div",
        {
          ref: "sidebarContent",
          class: normalizeClass(_ctx.contentClasses)
        },
        [renderSlot(_ctx.$slots, "default")],
        2
        /* CLASS */
      ), [[vShow, _ctx.isOpen]])]),
      _: 3
      /* FORWARDED */
    }, 8, ["name", "onBeforeEnter", "onAfterEnter"])],
    2
    /* CLASS */
  )), [[vShow, !_ctx.hideOnMobile]]);
}
script22.render = render21;
script22.__file = "src/components/sidebar/Sidebar.vue";
var index21 = {
  install(app) {
    registerComponent(app, script22);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/Tooltip-c9093c86.mjs
var opposites = {
  top: "bottom",
  bottom: "top",
  right: "left",
  left: "right"
};
function intersectionArea(a, b) {
  const left = Math.max(a.left, b.left);
  const right = Math.min(a.right, b.right);
  const top = Math.max(a.top, b.top);
  const bottom = Math.min(a.bottom, b.bottom);
  return Math.max(right - left, 0) * Math.max(bottom - top, 0);
}
var anchors = (rect) => ({
  top: { x: (rect.left + rect.right) * 0.5, y: rect.top },
  bottom: { x: (rect.left + rect.right) * 0.5, y: rect.bottom },
  left: { x: rect.left, y: (rect.top + rect.bottom) * 0.5 },
  right: { x: rect.right, y: (rect.top + rect.bottom) * 0.5 }
});
var script23 = defineComponent({
  name: "OTooltip",
  mixins: [BaseComponentMixin],
  configField: "tooltip",
  emits: ["open", "close"],
  props: {
    /** Whether tooltip is active or not, use v-model:active to make it two-way binding */
    active: {
      type: Boolean,
      default: true
    },
    /** Tooltip text */
    label: String,
    /** Tooltip delay before it appears (number in ms) */
    delay: Number,
    /**
     * Tooltip position in relation to the element
     * @values top, bottom, left, right,
     */
    position: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "tooltip.position", "top");
      },
      validator: (value) => {
        return [
          "top",
          "bottom",
          "left",
          "right",
          "auto"
        ].indexOf(value) > -1;
      }
    },
    /**
     * Tooltip trigger events
     * @values hover, click, focus, contextmenu
     */
    triggers: {
      type: Array,
      default: () => {
        return getValueByPath(getOptions(), "tooltip.triggers", ["hover"]);
      }
    },
    /** Tooltip will be always active */
    always: Boolean,
    /** Tooltip will have an animation */
    animated: {
      type: Boolean,
      default: true
    },
    /** Tooltip default animation */
    animation: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "tooltip.animation", "fade");
      }
    },
    /**
     * Tooltip auto close options
     * @values true, false, 'inside', 'outside'
     */
    autoClose: {
      type: [Array, Boolean],
      default: true
    },
    /** Tooltip will be multilined */
    multiline: Boolean,
    /** Append tooltip content to body */
    appendToBody: Boolean,
    /**
    * Color of the tooltip
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: [String, Function, Array],
    rootClass: [String, Function, Array],
    contentClass: [String, Function, Array],
    orderClass: [String, Function, Array],
    triggerClass: [String, Function, Array],
    multilineClass: [String, Function, Array],
    alwaysClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    arrowClass: [String, Function, Array],
    arrowOrderClass: [String, Function, Array]
  },
  data() {
    return {
      isActive: false,
      triggerStyle: {},
      bodyEl: void 0,
      metrics: null
      // Used for automatic tooltip positioning
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-tip")
      ];
    },
    triggerClasses() {
      return [
        this.computedClass("triggerClass", "o-tip__trigger")
      ];
    },
    arrowClasses() {
      return [
        this.computedClass("arrowClass", "o-tip__arrow"),
        { [this.computedClass("arrowOrderClass", "o-tip__arrow--", this.newPosition)]: this.newPosition },
        { [this.computedClass("variantArrowClass", "o-tip__arrow--", this.variant)]: this.variant }
      ];
    },
    contentClasses() {
      return [
        this.computedClass("contentClass", "o-tip__content"),
        { [this.computedClass("orderClass", "o-tip__content--", this.newPosition)]: this.newPosition },
        { [this.computedClass("variantClass", "o-tip__content--", this.variant)]: this.variant },
        { [this.computedClass("multilineClass", "o-tip__content--multiline")]: this.multiline },
        { [this.computedClass("alwaysClass", "o-tip__content--always")]: this.always }
      ];
    },
    newAnimation() {
      return this.animated ? this.animation : void 0;
    },
    newPosition() {
      if (this.position !== "auto") {
        return this.position;
      }
      const defaultPosition = getValueByPath(getOptions(), "tooltip.position", "top");
      let bestPosition = defaultPosition;
      if (this.metrics != null) {
        let viewRect;
        const viewport = window.visualViewport;
        if (viewport != void 0) {
          if (isWebKit()) {
            viewRect = new DOMRect(0, 0, viewport.width, viewport.height);
          } else {
            viewRect = new DOMRect(viewport.offsetLeft, viewport.offsetTop, viewport.width, viewport.height);
          }
        } else {
          viewRect = new DOMRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
        }
        const triggerAnchors = anchors(this.metrics.trigger);
        const contentRect = this.metrics.content;
        const contentAnchors = anchors(contentRect);
        const contentRectAtAnchor = (pos) => {
          const triggerAnchor = triggerAnchors[pos];
          const contentAnchor = contentAnchors[opposites[pos]];
          return new DOMRect(contentRect.x + (triggerAnchor.x - contentAnchor.x), contentRect.y + (triggerAnchor.y - contentAnchor.y), contentRect.width, contentRect.height);
        };
        const defaultOpposite = opposites[defaultPosition];
        const crossPosition = defaultPosition === "top" || defaultPosition === "bottom" ? "left" : "top";
        const crossOpposite = opposites[crossPosition];
        const positions = [defaultPosition, defaultOpposite, crossPosition, crossOpposite];
        let maxOverlap = 0;
        for (const position of positions) {
          const overlap = intersectionArea(viewRect, contentRectAtAnchor(position));
          if (overlap > maxOverlap) {
            maxOverlap = overlap;
            bestPosition = position;
          }
        }
      }
      return bestPosition;
    }
  },
  watch: {
    isActive(value) {
      this.$emit(value ? "open" : "close");
      if (value && this.position === "auto") {
        this.$nextTick(() => {
          this.metrics = {
            content: this.$refs.content.getBoundingClientRect(),
            trigger: this.$refs.trigger.getBoundingClientRect()
          };
        });
      }
      if (value && this.appendToBody) {
        this.updateAppendToBody();
      }
    }
  },
  methods: {
    updateAppendToBody() {
      const tooltip = this.$refs.tooltip;
      const trigger = this.$refs.trigger;
      if (tooltip && trigger) {
        const tooltipEl = this.$data.bodyEl.children[0];
        tooltipEl.classList.forEach((item) => tooltipEl.classList.remove(...item.split(" ")));
        if (this.$vnode && this.$vnode.data && this.$vnode.data.staticClass) {
          tooltipEl.classList.add(this.$vnode.data.staticClass);
        }
        this.rootClasses.forEach((item) => {
          if (typeof item === "object") {
            Object.keys(item).filter((key) => key && item[key]).forEach((key) => tooltipEl.classList.add(key));
          } else {
            tooltipEl.classList.add(...item.split(" "));
          }
        });
        tooltipEl.style.width = `${trigger.clientWidth}px`;
        tooltipEl.style.height = `${trigger.clientHeight}px`;
        const rect = trigger.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const left = rect.left + window.scrollX;
        const wrapper = this.$data.bodyEl;
        wrapper.style.position = "absolute";
        wrapper.style.top = `${top}px`;
        wrapper.style.left = `${left}px`;
        wrapper.style.zIndex = this.isActive || this.always ? "99" : "-1";
        this.triggerStyle = { zIndex: this.isActive || this.always ? "100" : void 0 };
      }
    },
    onClick() {
      if (this.triggers.indexOf("click") < 0)
        return;
      this.$nextTick(() => {
        setTimeout(() => this.open());
      });
    },
    onHover() {
      if (this.triggers.indexOf("hover") < 0)
        return;
      this.open();
    },
    onFocus() {
      if (this.triggers.indexOf("focus") < 0)
        return;
      this.open();
    },
    onContextMenu(event) {
      if (this.triggers.indexOf("contextmenu") < 0)
        return;
      event.preventDefault();
      this.open();
    },
    open() {
      if (this.delay) {
        this.timer = setTimeout(() => {
          this.isActive = true;
          this.timer = null;
        }, this.delay);
      } else {
        this.isActive = true;
      }
    },
    close() {
      if (typeof this.autoClose === "boolean") {
        this.isActive = !this.autoClose;
      }
      if (this.autoClose && this.timer)
        clearTimeout(this.timer);
    },
    /**
    * Close tooltip if clicked outside.
    */
    clickedOutside(event) {
      if (this.isActive) {
        if (Array.isArray(this.autoClose)) {
          if (this.autoClose.indexOf("outside") >= 0) {
            if (!this.isInWhiteList(event.target))
              this.isActive = false;
          }
          if (this.autoClose.indexOf("inside") >= 0) {
            if (this.isInWhiteList(event.target))
              this.isActive = false;
          }
        }
      }
    },
    /**
     * Keypress event that is bound to the document
     */
    keyPress({ key }) {
      if (this.isActive && (key === "Escape" || key === "Esc")) {
        if (Array.isArray(this.autoClose)) {
          if (this.autoClose.indexOf("escape") >= 0)
            this.isActive = false;
        }
      }
    },
    /**
    * White-listed items to not close when clicked.
    */
    isInWhiteList(el) {
      if (el === this.$refs.content)
        return true;
      if (this.$refs.content !== void 0) {
        const children = this.$refs.content.querySelectorAll("*");
        for (const child of children) {
          if (el === child) {
            return true;
          }
        }
      }
      return false;
    }
  },
  mounted() {
    if (this.appendToBody) {
      this.$data.bodyEl = createAbsoluteElement(this.$refs.content);
      this.updateAppendToBody();
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("click", this.clickedOutside);
      document.addEventListener("keyup", this.keyPress);
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("click", this.clickedOutside);
      document.removeEventListener("keyup", this.keyPress);
    }
    if (this.appendToBody) {
      removeElement(this.$data.bodyEl);
    }
  }
});
function render22(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      ref: "tooltip",
      class: normalizeClass(_ctx.rootClasses)
    },
    [createVNode(Transition, {
      name: _ctx.newAnimation,
      onAfterLeave: _cache[0] || (_cache[0] = ($event) => _ctx.metrics = null),
      onEnterCancelled: _cache[1] || (_cache[1] = ($event) => _ctx.metrics = null),
      persisted: ""
    }, {
      default: withCtx(() => [withDirectives(createBaseVNode(
        "div",
        {
          ref: "content",
          class: normalizeClass(_ctx.contentClasses)
        },
        [createBaseVNode(
          "span",
          {
            class: normalizeClass(_ctx.arrowClasses)
          },
          null,
          2
          /* CLASS */
        ), _ctx.label ? (openBlock(), createElementBlock(
          Fragment,
          {
            key: 0
          },
          [createTextVNode(
            toDisplayString(_ctx.label),
            1
            /* TEXT */
          )],
          64
          /* STABLE_FRAGMENT */
        )) : _ctx.$slots.default ? renderSlot(_ctx.$slots, "content", {
          key: 1
        }) : createCommentVNode("v-if", true)],
        2
        /* CLASS */
      ), [[vShow, _ctx.active && (_ctx.isActive || _ctx.always)]])]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"]), createBaseVNode(
      "div",
      {
        ref: "trigger",
        class: normalizeClass(_ctx.triggerClasses),
        style: normalizeStyle(_ctx.triggerStyle),
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
        onContextmenu: _cache[3] || (_cache[3] = (...args) => _ctx.onContextMenu && _ctx.onContextMenu(...args)),
        onMouseenter: _cache[4] || (_cache[4] = (...args) => _ctx.onHover && _ctx.onHover(...args)),
        onFocusCapture: _cache[5] || (_cache[5] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
        onBlurCapture: _cache[6] || (_cache[6] = (...args) => _ctx.close && _ctx.close(...args)),
        onMouseleave: _cache[7] || (_cache[7] = (...args) => _ctx.close && _ctx.close(...args))
      },
      [renderSlot(_ctx.$slots, "default", {
        ref: "slot"
      })],
      38
      /* CLASS, STYLE, HYDRATE_EVENTS */
    )],
    2
    /* CLASS */
  );
}
script23.render = render22;
script23.__file = "src/components/tooltip/Tooltip.vue";

// node_modules/@oruga-ui/oruga-next/dist/esm/slider.mjs
var script$23 = defineComponent({
  name: "OSliderThumb",
  components: {
    [script23.name]: script23
  },
  configField: "slider",
  inheritAttrs: false,
  inject: ["$slider"],
  emits: ["update:modelValue", "dragstart", "dragend"],
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    variant: {
      type: String,
      default: ""
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    indicator: {
      type: Boolean,
      default: false
    },
    customFormatter: Function,
    format: {
      type: String,
      default: "raw",
      validator: (value) => {
        return [
          "raw",
          "percent"
        ].indexOf(value) >= 0;
      }
    },
    locale: {
      type: [String, Array],
      default: () => {
        return getValueByPath(getOptions(), "locale");
      }
    },
    tooltipAlways: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFocused: false,
      dragging: false,
      startX: 0,
      startPosition: 0,
      newPosition: null,
      oldValue: this.modelValue
    };
  },
  computed: {
    getSlider() {
      return this.$slider;
    },
    disabled() {
      return this.$parent.disabled;
    },
    max() {
      return this.$parent.max;
    },
    min() {
      return this.$parent.min;
    },
    step() {
      return this.$parent.step;
    },
    precision() {
      return this.$parent.precision;
    },
    currentPosition() {
      return `${(this.modelValue - this.min) / (this.max - this.min) * 100}%`;
    },
    wrapperStyle() {
      return { left: this.currentPosition };
    },
    formattedValue() {
      if (typeof this.customFormatter !== "undefined") {
        return this.customFormatter(this.modelValue);
      }
      if (this.format === "percent") {
        return new Intl.NumberFormat(this.locale, {
          style: "percent"
        }).format((this.modelValue - this.min) / (this.max - this.min));
      }
      return new Intl.NumberFormat(this.locale).format(this.modelValue);
    }
  },
  methods: {
    onFocus() {
      this.isFocused = true;
    },
    onBlur() {
      this.isFocused = false;
    },
    onButtonDown(event) {
      if (this.disabled)
        return;
      event.preventDefault();
      this.onDragStart(event);
      if (typeof window !== "undefined") {
        document.addEventListener("mousemove", this.onDragging);
        document.addEventListener("touchmove", this.onDragging);
        document.addEventListener("mouseup", this.onDragEnd);
        document.addEventListener("touchend", this.onDragEnd);
        document.addEventListener("contextmenu", this.onDragEnd);
      }
    },
    onLeftKeyDown() {
      if (this.disabled || this.modelvalue === this.min)
        return;
      this.newPosition = parseFloat(this.currentPosition) - this.step / (this.max - this.min) * 100;
      this.setPosition(this.newPosition);
      this.$parent.emitValue("change");
    },
    onRightKeyDown() {
      if (this.disabled || this.modelvalue === this.max)
        return;
      this.newPosition = parseFloat(this.currentPosition) + this.step / (this.max - this.min) * 100;
      this.setPosition(this.newPosition);
      this.$parent.emitValue("change");
    },
    onHomeKeyDown() {
      if (this.disabled || this.modelvalue === this.min)
        return;
      this.newPosition = 0;
      this.setPosition(this.newPosition);
      this.$parent.emitValue("change");
    },
    onEndKeyDown() {
      if (this.disabled || this.modelvalue === this.max)
        return;
      this.newPosition = 100;
      this.setPosition(this.newPosition);
      this.$parent.emitValue("change");
    },
    onDragStart(event) {
      this.dragging = true;
      this.$emit("dragstart");
      if (event.type === "touchstart") {
        event.clientX = event.touches[0].clientX;
      }
      this.startX = event.clientX;
      this.startPosition = parseFloat(this.currentPosition);
      this.newPosition = this.startPosition;
    },
    onDragging(event) {
      if (this.dragging) {
        if (event.type === "touchmove") {
          event.clientX = event.touches[0].clientX;
        }
        const diff = (event.clientX - this.startX) / this.$parent.sliderSize() * 100;
        this.newPosition = this.startPosition + diff;
        this.setPosition(this.newPosition);
      }
    },
    onDragEnd() {
      this.dragging = false;
      this.$emit("dragend");
      if (this.modelvalue !== this.oldValue) {
        this.$parent.emitValue("change");
      }
      this.setPosition(this.newPosition);
      if (typeof window !== "undefined") {
        document.removeEventListener("mousemove", this.onDragging);
        document.removeEventListener("touchmove", this.onDragging);
        document.removeEventListener("mouseup", this.onDragEnd);
        document.removeEventListener("touchend", this.onDragEnd);
        document.removeEventListener("contextmenu", this.onDragEnd);
      }
    },
    setPosition(percent) {
      if (percent === null || isNaN(percent))
        return;
      if (percent < 0) {
        percent = 0;
      } else if (percent > 100) {
        percent = 100;
      }
      const stepLength = 100 / ((this.max - this.min) / this.step);
      const steps = Math.round(percent / stepLength);
      let value = steps * stepLength / 100 * (this.max - this.min) + this.min;
      value = parseFloat(value.toFixed(this.precision));
      this.$emit("update:modelValue", value);
      if (!this.dragging && value !== this.oldValue) {
        this.oldValue = value;
      }
    }
  }
});
var _hoisted_115 = ["tabindex"];
var _hoisted_213 = {
  key: 0
};
function render$23(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_tooltip = resolveComponent("o-tooltip");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.getSlider.thumbWrapperClasses),
      style: normalizeStyle(_ctx.wrapperStyle)
    },
    [createVNode(_component_o_tooltip, {
      label: _ctx.formattedValue,
      variant: _ctx.variant,
      always: _ctx.dragging || _ctx.isFocused || _ctx.tooltipAlways,
      active: !_ctx.disabled && _ctx.tooltip
    }, {
      default: withCtx(() => [createBaseVNode("div", mergeProps(_ctx.$attrs, {
        class: _ctx.getSlider.thumbClasses,
        tabindex: _ctx.disabled ? null : 0,
        onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.onButtonDown && _ctx.onButtonDown(...args)),
        onTouchstart: _cache[1] || (_cache[1] = (...args) => _ctx.onButtonDown && _ctx.onButtonDown(...args)),
        onFocus: _cache[2] || (_cache[2] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
        onBlur: _cache[3] || (_cache[3] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
        onKeydown: [_cache[4] || (_cache[4] = withKeys(withModifiers((...args) => _ctx.onLeftKeyDown && _ctx.onLeftKeyDown(...args), ["prevent"]), ["left"])), _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => _ctx.onRightKeyDown && _ctx.onRightKeyDown(...args), ["prevent"]), ["right"])), _cache[6] || (_cache[6] = withKeys(withModifiers((...args) => _ctx.onLeftKeyDown && _ctx.onLeftKeyDown(...args), ["prevent"]), ["down"])), _cache[7] || (_cache[7] = withKeys(withModifiers((...args) => _ctx.onRightKeyDown && _ctx.onRightKeyDown(...args), ["prevent"]), ["up"])), _cache[8] || (_cache[8] = withKeys(withModifiers((...args) => _ctx.onHomeKeyDown && _ctx.onHomeKeyDown(...args), ["prevent"]), ["home"])), _cache[9] || (_cache[9] = withKeys(withModifiers((...args) => _ctx.onEndKeyDown && _ctx.onEndKeyDown(...args), ["prevent"]), ["end"]))]
      }), [_ctx.indicator ? (openBlock(), createElementBlock(
        "span",
        _hoisted_213,
        toDisplayString(_ctx.formattedValue),
        1
        /* TEXT */
      )) : createCommentVNode("v-if", true)], 16, _hoisted_115)]),
      _: 1
      /* STABLE */
    }, 8, ["label", "variant", "always", "active"])],
    6
    /* CLASS, STYLE */
  );
}
script$23.render = render$23;
script$23.__file = "src/components/slider/SliderThumb.vue";
var script$18 = defineComponent({
  name: "OSliderTick",
  mixins: [BaseComponentMixin],
  configField: "slider",
  inject: ["$slider"],
  props: {
    /** Value of single tick */
    value: {
      variant: Number,
      default: 0
    },
    tickClass: [String, Function, Array],
    tickHiddenClass: [String, Function, Array],
    tickLabelClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("tickClass", "o-slide__tick"),
        { [this.computedClass("tickHiddenClass", "o-slide__tick--hidden")]: this.hidden }
      ];
    },
    tickLabelClasses() {
      return [
        this.computedClass("tickLabelClass", "o-slide__tick-label")
      ];
    },
    position() {
      const pos = (this.value - this.$parent.min) / (this.$parent.max - this.$parent.min) * 100;
      return pos >= 0 && pos <= 100 ? pos : 0;
    },
    hidden() {
      return this.value === this.$parent.min || this.value === this.$parent.max;
    },
    tickStyle() {
      return { "left": this.position + "%" };
    }
  },
  created() {
    if (!this.$slider) {
      throw new Error("You should wrap oSliderTick on a oSlider");
    }
  }
});
function render$17(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.rootClasses),
      style: normalizeStyle(_ctx.tickStyle)
    },
    [_ctx.$slots.default ? (openBlock(), createElementBlock(
      "span",
      {
        key: 0,
        class: normalizeClass(_ctx.tickLabelClasses)
      },
      [renderSlot(_ctx.$slots, "default")],
      2
      /* CLASS */
    )) : createCommentVNode("v-if", true)],
    6
    /* CLASS, STYLE */
  );
}
script$18.render = render$17;
script$18.__file = "src/components/slider/SliderTick.vue";
var script24 = defineComponent({
  name: "OSlider",
  components: {
    [script$23.name]: script$23,
    [script$18.name]: script$18
  },
  configField: "slider",
  mixins: [BaseComponentMixin],
  provide() {
    return {
      $slider: this
    };
  },
  emits: ["update:modelValue", "change", "dragging", "dragstart", "dragend"],
  props: {
    /** @model */
    modelValue: {
      type: [Number, Array],
      default: 0
    },
    /** Minimum value */
    min: {
      type: Number,
      default: 0
    },
    /** Maximum  value */
    max: {
      type: Number,
      default: 100
    },
    /** Step interval of ticks */
    step: {
      type: Number,
      default: 1
    },
    /**
     * Color of the slider
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
      type: String
    },
    /**
     * Vertical size of slider, optional
     * @values small, medium, large
     */
    size: String,
    /** Show tick marks */
    ticks: {
      type: Boolean,
      default: false
    },
    /** Show tooltip when thumb is being dragged */
    tooltip: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "slider.tooltip", true);
      }
    },
    /**
     * Color of the tooltip
     * @values primary, info, success, warning, danger, and any other custom color
     */
    tooltipVariant: String,
    /** Rounded thumb */
    rounded: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "slider.rounded", false);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    /** Update v-model only when dragging is finished */
    lazy: {
      type: Boolean,
      default: false
    },
    /** Function to format the tooltip label for display */
    customFormatter: Function,
    ariaLabel: [String, Array],
    /** Increases slider size on focus */
    biggerSliderFocus: {
      type: Boolean,
      default: false
    },
    indicator: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: "raw",
      validator: (value) => {
        return [
          "raw",
          "percent"
        ].indexOf(value) >= 0;
      }
    },
    locale: {
      type: [String, Array],
      default: () => {
        return getValueByPath(getOptions(), "locale");
      }
    },
    /** Tooltip displays always */
    tooltipAlways: {
      type: Boolean,
      default: false
    },
    rootClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    trackClass: [String, Function, Array],
    fillClass: [String, Function, Array],
    thumbRoundedClass: [String, Function, Array],
    thumbDraggingClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    thumbWrapperClass: [String, Function, Array],
    thumbClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },
  data() {
    return {
      value1: null,
      value2: null,
      dragging: false,
      isRange: false
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-slide"),
        { [this.computedClass("sizeClass", "o-slide--", this.size)]: this.size },
        { [this.computedClass("disabledClass", "o-slide--disabled")]: this.disabled }
      ];
    },
    trackClasses() {
      return [
        this.computedClass("trackClass", "o-slide__track")
      ];
    },
    fillClasses() {
      return [
        this.computedClass("fillClass", "o-slide__fill"),
        { [this.computedClass("variantClass", "o-slide__fill--", this.variant)]: this.variant }
      ];
    },
    thumbClasses() {
      return [
        this.computedClass("thumbClass", "o-slide__thumb"),
        { [this.computedClass("thumbDraggingClass", "o-slide__thumb--dragging")]: this.dragging },
        { [this.computedClass("thumbRoundedClass", "o-slide__thumb--rounded")]: this.rounded }
      ];
    },
    thumbWrapperClasses() {
      return [
        this.computedClass("thumbWrapperClass", "o-slide__thumb-wrapper")
      ];
    },
    newTooltipVariant() {
      return this.tooltipVariant ? this.tooltipVariant : this.variant;
    },
    tickValues() {
      if (!this.ticks || this.min > this.max || this.step === 0)
        return [];
      const result = [];
      for (let i = this.min + this.step; i < this.max; i = i + this.step) {
        result.push(i);
      }
      return result;
    },
    minValue() {
      return Math.min(this.value1, this.value2);
    },
    maxValue() {
      return Math.max(this.value1, this.value2);
    },
    barSize() {
      return this.isRange ? `${100 * (this.maxValue - this.minValue) / (this.max - this.min)}%` : `${100 * (this.value1 - this.min) / (this.max - this.min)}%`;
    },
    barStart() {
      return this.isRange ? `${100 * (this.minValue - this.min) / (this.max - this.min)}%` : "0%";
    },
    precision() {
      const precisions = [this.min, this.max, this.step].map((item) => {
        const decimal = ("" + item).split(".")[1];
        return decimal ? decimal.length : 0;
      });
      return Math.max(...precisions);
    },
    barStyle() {
      return {
        width: this.barSize,
        left: this.barStart
      };
    }
  },
  watch: {
    value1() {
      this.onInternalValueUpdate();
    },
    value2() {
      this.onInternalValueUpdate();
    },
    min() {
      this.setValues(this.value);
    },
    max() {
      this.setValues(this.value);
    },
    /**
    * When v-model is changed set the new active step.
    */
    modelValue(value) {
      this.setValues(value);
    }
  },
  methods: {
    setValues(newValue) {
      if (this.min > this.max) {
        return;
      }
      if (Array.isArray(newValue)) {
        this.isRange = true;
        const smallValue = typeof newValue[0] !== "number" || isNaN(newValue[0]) ? this.min : Math.min(Math.max(this.min, newValue[0]), this.max);
        const largeValue = typeof newValue[1] !== "number" || isNaN(newValue[1]) ? this.max : Math.max(Math.min(this.max, newValue[1]), this.min);
        this.value1 = this.isThumbReversed ? largeValue : smallValue;
        this.value2 = this.isThumbReversed ? smallValue : largeValue;
      } else {
        this.isRange = false;
        this.value1 = isNaN(newValue) ? this.min : Math.min(this.max, Math.max(this.min, newValue));
        this.value2 = null;
      }
    },
    onInternalValueUpdate() {
      if (this.isRange) {
        this.isThumbReversed = this.value1 > this.value2;
      }
      if (!this.lazy || !this.dragging) {
        this.emitValue("update:modelValue");
      }
      if (this.dragging) {
        this.emitValue("dragging");
      }
    },
    sliderSize() {
      return this.$refs.slider.getBoundingClientRect().width;
    },
    onSliderClick(event) {
      if (this.disabled || this.isTrackClickDisabled)
        return;
      const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
      const percent = (event.clientX - sliderOffsetLeft) / this.sliderSize() * 100;
      const targetValue = this.min + percent * (this.max - this.min) / 100;
      const diffFirst = Math.abs(targetValue - this.value1);
      if (!this.isRange) {
        if (diffFirst < this.step / 2)
          return;
        this.$refs.button1.setPosition(percent);
      } else {
        const diffSecond = Math.abs(targetValue - this.value2);
        if (diffFirst <= diffSecond) {
          if (diffFirst < this.step / 2)
            return;
          this.$refs["button1"].setPosition(percent);
        } else {
          if (diffSecond < this.step / 2)
            return;
          this.$refs["button2"].setPosition(percent);
        }
      }
      this.emitValue("change");
    },
    onDragStart() {
      this.dragging = true;
      this.$emit("dragstart");
    },
    onDragEnd() {
      this.isTrackClickDisabled = true;
      setTimeout(() => {
        this.isTrackClickDisabled = false;
      }, 0);
      this.dragging = false;
      this.$emit("dragend");
      if (this.lazy) {
        this.emitValue("update:modelValue");
      }
    },
    emitValue(event) {
      const val = this.isRange ? [this.minValue, this.maxValue] : this.value1;
      this.$emit(event, val);
    }
  },
  created() {
    this.isThumbReversed = false;
    this.isTrackClickDisabled = false;
    this.setValues(this.modelValue);
  }
});
function render23(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_slider_tick = resolveComponent("o-slider-tick");
  const _component_o_slider_thumb = resolveComponent("o-slider-thumb");
  return openBlock(), createElementBlock(
    "div",
    {
      onClick: _cache[2] || (_cache[2] = (...args) => _ctx.onSliderClick && _ctx.onSliderClick(...args)),
      class: normalizeClass(_ctx.rootClasses)
    },
    [createBaseVNode(
      "div",
      {
        class: normalizeClass(_ctx.trackClasses),
        ref: "slider"
      },
      [createBaseVNode(
        "div",
        {
          class: normalizeClass(_ctx.fillClasses),
          style: normalizeStyle(_ctx.barStyle)
        },
        null,
        6
        /* CLASS, STYLE */
      ), _ctx.ticks ? (openBlock(true), createElementBlock(
        Fragment,
        {
          key: 0
        },
        renderList(_ctx.tickValues, (val, key) => {
          return openBlock(), createBlock(_component_o_slider_tick, {
            key,
            value: val
          }, null, 8, ["value"]);
        }),
        128
        /* KEYED_FRAGMENT */
      )) : createCommentVNode("v-if", true), renderSlot(_ctx.$slots, "default"), createVNode(_component_o_slider_thumb, {
        modelValue: _ctx.value1,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.value1 = $event),
        variant: _ctx.newTooltipVariant,
        tooltip: _ctx.tooltip,
        "custom-formatter": _ctx.customFormatter,
        indicator: _ctx.indicator,
        ref: "button1",
        role: "slider",
        format: _ctx.format,
        locale: _ctx.locale,
        "tooltip-always": _ctx.tooltipAlways,
        "aria-valuenow": _ctx.value1,
        "aria-valuemin": _ctx.min,
        "aria-valuemax": _ctx.max,
        "aria-orientation": "horizontal",
        "aria-label": Array.isArray(_ctx.ariaLabel) ? _ctx.ariaLabel[0] : _ctx.ariaLabel,
        "aria-disabled": _ctx.disabled,
        onDragstart: _ctx.onDragStart,
        onDragend: _ctx.onDragEnd
      }, null, 8, ["modelValue", "variant", "tooltip", "custom-formatter", "indicator", "format", "locale", "tooltip-always", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-label", "aria-disabled", "onDragstart", "onDragend"]), _ctx.isRange ? (openBlock(), createBlock(_component_o_slider_thumb, {
        key: 1,
        modelValue: _ctx.value2,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.value2 = $event),
        variant: _ctx.newTooltipVariant,
        tooltip: _ctx.tooltip,
        "custom-formatter": _ctx.customFormatter,
        indicator: _ctx.indicator,
        ref: "button2",
        role: "slider",
        format: _ctx.format,
        locale: _ctx.locale,
        "tooltip-always": _ctx.tooltipAlways,
        "aria-valuenow": _ctx.value2,
        "aria-valuemin": _ctx.min,
        "aria-valuemax": _ctx.max,
        "aria-orientation": "horizontal",
        "aria-label": Array.isArray(_ctx.ariaLabel) ? _ctx.ariaLabel[1] : "",
        "aria-disabled": _ctx.disabled,
        onDragstart: _ctx.onDragStart,
        onDragend: _ctx.onDragEnd
      }, null, 8, ["modelValue", "variant", "tooltip", "custom-formatter", "indicator", "format", "locale", "tooltip-always", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-label", "aria-disabled", "onDragstart", "onDragend"])) : createCommentVNode("v-if", true)],
      2
      /* CLASS */
    )],
    2
    /* CLASS */
  );
}
script24.render = render23;
script24.__file = "src/components/slider/Slider.vue";
var index22 = {
  install(app) {
    registerComponent(app, script24);
    registerComponent(app, script$18);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/SlotComponent-11a269f3.mjs
var SlotComponent = defineComponent({
  name: "OSlotComponent",
  props: {
    component: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      default: "default"
    },
    props: {
      type: Object
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  render() {
    const slot = this.component.$slots[this.name](this.props);
    return h(this.tag, {}, slot);
  }
});

// node_modules/@oruga-ui/oruga-next/dist/esm/TabbedChildMixin-274f470d.mjs
var TabbedMixin = (cmp) => defineComponent({
  mixins: [ProviderParentMixin(cmp, Sorted$1)],
  components: {
    [script.name]: script,
    [SlotComponent.name]: SlotComponent
  },
  emits: ["update:modelValue"],
  props: {
    /** @model */
    modelValue: [String, Number],
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: [String, Object],
    /**
     * Tab size, optional
     * @values small, medium, large
     */
    size: String,
    animated: {
      type: Boolean,
      default: true
    },
    /** Show tab in vertical layout */
    vertical: {
      type: Boolean,
      default: false
    },
    /**
     * Position of the tab, optional
     * @values centered, right
     */
    position: String,
    /** Destroy tab on hide */
    destroyOnHide: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeId: this.modelValue,
      contentHeight: 0,
      isTransitioning: false
    };
  },
  computed: {
    activeItem() {
      return this.activeId !== void 0 && this.activeId !== null ? this.childItems.filter((i) => i.newValue === this.activeId)[0] : this.items[0];
    },
    activeIndex() {
      return this.childItems.findIndex((item) => item.newValue === this.activeId);
    },
    items() {
      return this.sortedItems;
    }
  },
  watch: {
    /**
     * When v-model is changed set the new active tab.
     */
    modelValue(value) {
      if (this.activeId !== value) {
        this.performAction(value);
      }
    }
  },
  methods: {
    /**
    * Child click listener, emit input event and change active child.
    */
    childClick(child) {
      if (this.activeId !== child.newValue) {
        this.performAction(child.newValue);
        this.$emit("update:modelValue", this.activeId);
      }
    },
    /**
     * Select the first 'viable' child, starting at startingIndex and in the direction specified
     * by the boolean parameter forward. In other words, first try to select the child at index
     * startingIndex, and if it is not visible or it is disabled, then go to the index in the
     * specified direction until either returning to startIndex or finding a viable child item.
    */
    clickFirstViableChild(startingIndex, forward) {
      let direction = forward ? 1 : -1;
      let newIndex = startingIndex;
      for (; newIndex !== this.activeIndex; newIndex = mod(newIndex + direction, this.childItems.length)) {
        if (this.childItems[newIndex].visible && !this.childItems[newIndex].disabled) {
          break;
        }
      }
      this.childClick(this.childItems[newIndex]);
    },
    /**
     * Go to the next item or wrap around
    */
    next() {
      let newIndex = mod(this.activeIndex + 1, this.childItems.length);
      this.clickFirstViableChild(newIndex, true);
    },
    /**
     * Go to the previous item or wrap around
    */
    prev() {
      let newIndex = mod(this.activeIndex - 1, this.childItems.length);
      this.clickFirstViableChild(newIndex, false);
    },
    /**
     * Go to the first viable item
    */
    homePressed() {
      if (this.childItems.length < 1) {
        return;
      }
      this.clickFirstViableChild(0, true);
    },
    /**
     * Go to the last viable item
    */
    endPressed() {
      if (this.childItems.length < 1) {
        return;
      }
      this.clickFirstViableChild(this.childItems.length - 1, false);
    },
    /**
    * Activate next child and deactivate prev child
    */
    performAction(newId) {
      const oldValue = this.activeId;
      const oldTab = oldValue !== void 0 && oldValue !== null ? this.childItems.filter((i) => i.newValue === oldValue)[0] : this.items[0];
      this.activeId = newId;
      if (oldTab && this.activeItem) {
        oldTab.deactivate(this.activeItem.index);
        this.activeItem.activate(oldTab.index);
      }
    }
  }
});
var TabbedChildMixin = (parentCmp) => defineComponent({
  mixins: [InjectedChildMixin(parentCmp, Sorted)],
  props: {
    /**
     * Item value (it will be used as v-model of wrapper component)
     */
    value: [String, Number],
    /**
     * Item label
     */
    label: String,
    /**
     * Icon on the left
     */
    icon: String,
    /**
     * Icon pack
     */
    iconPack: String,
    /**
     * Show/hide item
     */
    visible: {
      type: Boolean,
      default: true
    },
    /**
     * Header class of the item
     */
    headerClass: [String, Array, Object]
  },
  data() {
    return {
      transitionName: void 0,
      newValue: this.value
    };
  },
  computed: {
    isActive() {
      return this.parent.activeItem === this;
    },
    elementClasses() {
      return [];
    }
  },
  methods: {
    /**
     * Activate element, alter animation name based on the index.
     */
    activate(oldIndex) {
      this.transitionName = this.index < oldIndex ? this.parent.vertical ? "slide-down" : "slide-next" : this.parent.vertical ? "slide-up" : "slide-prev";
      this.$emit("activate");
    },
    /**
     * Deactivate element, alter animation name based on the index.
     */
    deactivate(newIndex) {
      this.transitionName = newIndex < this.index ? this.parent.vertical ? "slide-down" : "slide-next" : this.parent.vertical ? "slide-up" : "slide-prev";
    }
  },
  render() {
    if (this.parent.destroyOnHide) {
      if (!this.isActive || !this.visible)
        return;
    }
    const content = this.$slots.default ? this.$slots.default() : [];
    const vnode = withDirectives(h("div", {
      class: this.elementClasses,
      "data-id": `${parentCmp}-${this.newValue}`,
      "tabindex": this.isActive ? 0 : -1
    }, content), [[vShow, this.isActive && this.visible]]);
    if (this.parent.animated) {
      return h(Transition, {
        "name": this.transitionName,
        "onBeforeEnter": () => {
          this.parent.isTransitioning = true;
        },
        "onAfterEnter": () => {
          this.parent.isTransitioning = false;
        }
      }, () => [vnode]);
    }
    return vnode;
  }
});

// node_modules/@oruga-ui/oruga-next/dist/esm/steps.mjs
var script$19 = defineComponent({
  name: "OSteps",
  components: {
    [script4.name]: script4,
    [script.name]: script
  },
  configField: "steps",
  mixins: [BaseComponentMixin, MatchMediaMixin, TabbedMixin("step")],
  props: {
    /**
     * Icon pack to use for the navigation
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: String,
    /** Icon to use for navigation button */
    iconPrev: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "steps.iconPrev", "chevron-left");
      }
    },
    /** Icon to use for navigation button */
    iconNext: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "steps.iconNext", "chevron-right");
      }
    },
    /**
     * Next and previous buttons below the component. You can use this property if you want to use your own custom navigation items.
     */
    hasNavigation: {
      type: Boolean,
      default: true
    },
    /**
     * Step navigation is animated
     */
    animated: {
      type: Boolean,
      default: true
    },
    /**
     * Position of the marker label, optional
     * @values bottom, right, left
     */
    labelPosition: {
      type: String,
      validator(value) {
        return [
          "bottom",
          "right",
          "left"
        ].indexOf(value) > -1;
      },
      default: "bottom"
    },
    /** Rounded step markers */
    rounded: {
      type: Boolean,
      default: true
    },
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    rootClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    verticalClass: [String, Function, Array],
    positionClass: [String, Function, Array],
    stepsClass: [String, Function, Array],
    animatedClass: [String, Function, Array],
    stepMarkerRoundedClass: [String, Function, Array],
    stepDividerClass: [String, Function, Array],
    stepMarkerClass: [String, Function, Array],
    stepContentClass: [String, Function, Array],
    stepContentTransitioningClass: [String, Function, Array],
    stepNavigationClass: [String, Function, Array],
    stepLinkClass: [String, Function, Array],
    stepLinkClickableClass: [String, Function, Array],
    stepLinkLabelClass: [String, Function, Array],
    stepLinkLabelPositionClass: [String, Function, Array],
    mobileClass: [String, Function, Array]
  },
  computed: {
    wrapperClasses() {
      return [
        this.computedClass("rootClass", "o-steps__wrapper"),
        { [this.computedClass("sizeClass", "o-steps--", this.size)]: this.size },
        { [this.computedClass("verticalClass", "o-steps__wrapper-vertical")]: this.vertical },
        { [this.computedClass("positionClass", "o-steps__wrapper-position-", this.position)]: this.position && this.vertical },
        { [this.computedClass("mobileClass", "o-steps--mobile")]: this.isMatchMedia }
      ];
    },
    mainClasses() {
      return [
        this.computedClass("stepsClass", "o-steps"),
        { [this.computedClass("animatedClass", "o-steps--animated")]: this.animated }
      ];
    },
    stepDividerClasses() {
      return [
        this.computedClass("stepDividerClass", "o-steps__divider")
      ];
    },
    stepMarkerClasses() {
      return [
        this.computedClass("stepMarkerClass", "o-steps__marker"),
        { [this.computedClass("stepMarkerRoundedClass", "o-steps__marker--rounded")]: this.rounded }
      ];
    },
    stepContentClasses() {
      return [
        this.computedClass("stepContentClass", "o-steps__content"),
        { [this.computedClass("stepContentTransitioningClass", "o-steps__content-transitioning")]: this.isTransitioning }
      ];
    },
    stepNavigationClasses() {
      return [
        this.computedClass("stepNavigationClass", "o-steps__navigation")
      ];
    },
    stepLinkLabelClasses() {
      return [
        this.computedClass("stepLinkLabelClass", "o-steps__title")
      ];
    },
    // Override mixin implementation to always have a value
    activeItem() {
      return this.childItems.filter((i) => i.newValue === this.activeId)[0] || this.items[0];
    },
    /**
     * Check if previous button is available.
     */
    hasPrev() {
      return !!this.prevItem;
    },
    /**
     * Retrieves the next visible item
     */
    nextItem() {
      let nextItem = null;
      let idx = this.activeItem ? this.items.indexOf(this.activeItem) + 1 : 0;
      for (; idx < this.items.length; idx++) {
        if (this.items[idx].visible) {
          nextItem = this.items[idx];
          break;
        }
      }
      return nextItem;
    },
    /**
     * Retrieves the previous visible item
     */
    prevItem() {
      if (!this.activeItem) {
        return null;
      }
      let prevItem = null;
      for (let idx = this.items.indexOf(this.activeItem) - 1; idx >= 0; idx--) {
        if (this.items[idx].visible) {
          prevItem = this.items[idx];
          break;
        }
      }
      return prevItem;
    },
    /**
     * Check if next button is available.
     */
    hasNext() {
      return !!this.nextItem;
    },
    navigationProps() {
      return {
        previous: {
          disabled: !this.hasPrev,
          action: this.prev
        },
        next: {
          disabled: !this.hasNext,
          action: this.next
        }
      };
    }
  },
  methods: {
    stepLinkClasses(childItem) {
      return [
        this.computedClass("stepLinkClass", "o-steps__link"),
        { [this.computedClass("stepLinkLabelPositionClass", "o-steps__link-label-", this.labelPosition)]: this.labelPosition },
        { [this.computedClass("stepLinkClickableClass", "o-steps__link-clickable")]: this.isItemClickable(childItem) }
      ];
    },
    /**
     * Return if the step should be clickable or not.
     */
    isItemClickable(stepItem) {
      if (stepItem.clickable === void 0) {
        return stepItem.index < this.activeItem.index;
      }
      return stepItem.clickable;
    },
    /**
     * Previous button click listener.
     */
    prev() {
      if (this.hasPrev) {
        this.childClick(this.prevItem);
      }
    },
    /**
     * Previous button click listener.
     */
    next() {
      if (this.hasNext) {
        this.childClick(this.nextItem);
      }
    }
  }
});
var _hoisted_116 = ["onClick"];
var _hoisted_214 = {
  key: 1
};
function render24(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = resolveComponent("o-icon");
  const _component_o_button = resolveComponent("o-button");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.wrapperClasses)
    },
    [createBaseVNode(
      "nav",
      {
        class: normalizeClass(_ctx.mainClasses)
      },
      [(openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.items, (childItem, index30) => {
          return withDirectives((openBlock(), createElementBlock(
            "div",
            {
              key: childItem.newValue,
              class: normalizeClass(childItem.itemClasses)
            },
            [index30 > 0 ? (openBlock(), createElementBlock(
              "span",
              {
                key: 0,
                class: normalizeClass(_ctx.stepDividerClasses)
              },
              null,
              2
              /* CLASS */
            )) : createCommentVNode("v-if", true), createBaseVNode("a", {
              class: normalizeClass(_ctx.stepLinkClasses(childItem)),
              onClick: ($event) => _ctx.isItemClickable(childItem) && _ctx.childClick(childItem)
            }, [createBaseVNode(
              "div",
              {
                class: normalizeClass(_ctx.stepMarkerClasses)
              },
              [childItem.icon ? (openBlock(), createBlock(_component_o_icon, {
                key: 0,
                icon: childItem.icon,
                pack: childItem.iconPack,
                size: _ctx.size
              }, null, 8, ["icon", "pack", "size"])) : childItem.step ? (openBlock(), createElementBlock(
                "span",
                _hoisted_214,
                toDisplayString(childItem.step),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true)],
              2
              /* CLASS */
            ), createBaseVNode(
              "div",
              {
                class: normalizeClass(_ctx.stepLinkLabelClasses)
              },
              toDisplayString(childItem.label),
              3
              /* TEXT, CLASS */
            )], 10, _hoisted_116)],
            2
            /* CLASS */
          )), [[vShow, childItem.visible]]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))],
      2
      /* CLASS */
    ), createBaseVNode(
      "section",
      {
        class: normalizeClass(_ctx.stepContentClasses)
      },
      [renderSlot(_ctx.$slots, "default")],
      2
      /* CLASS */
    ), renderSlot(_ctx.$slots, "navigation", {
      previous: _ctx.navigationProps.previous,
      next: _ctx.navigationProps.next
    }, () => [_ctx.hasNavigation ? (openBlock(), createElementBlock(
      "nav",
      {
        key: 0,
        class: normalizeClass(_ctx.stepNavigationClasses)
      },
      [createVNode(_component_o_button, {
        role: "button",
        "icon-left": _ctx.iconPrev,
        "icon-pack": _ctx.iconPack,
        "icon-both": "",
        disabled: _ctx.navigationProps.previous.disabled,
        onClick: withModifiers(_ctx.navigationProps.previous.action, ["prevent"]),
        "aria-label": _ctx.ariaPreviousLabel
      }, null, 8, ["icon-left", "icon-pack", "disabled", "onClick", "aria-label"]), createVNode(_component_o_button, {
        role: "button",
        "icon-left": _ctx.iconNext,
        "icon-pack": _ctx.iconPack,
        "icon-both": "",
        disabled: _ctx.navigationProps.next.disabled,
        onClick: withModifiers(_ctx.navigationProps.next.action, ["prevent"]),
        "aria-label": _ctx.ariaNextLabel
      }, null, 8, ["icon-left", "icon-pack", "disabled", "onClick", "aria-label"])],
      2
      /* CLASS */
    )) : createCommentVNode("v-if", true)])],
    2
    /* CLASS */
  );
}
script$19.render = render24;
script$19.__file = "src/components/steps/Steps.vue";
var script25 = defineComponent({
  name: "OStepItem",
  mixins: [BaseComponentMixin, TabbedChildMixin("step")],
  configField: "steps",
  props: {
    /** Step marker content (when there is no icon) */
    step: [String, Number],
    /** Default style for the step, optional This will override parent type. Could be used to set a completed step to "success" for example */
    variant: [String, Object],
    /** Item can be used directly to navigate. If undefined, previous steps are clickable while the others are not */
    clickable: {
      type: Boolean,
      default: void 0
    },
    itemClass: [String, Function, Array],
    itemHeaderClass: [String, Function, Array],
    itemHeaderActiveClass: [String, Function, Array],
    itemHeaderPreviousClass: [String, Function, Array],
    itemHeaderVariantClass: [String, Function, Array]
  },
  computed: {
    elementClasses() {
      return [
        this.computedClass("itemClass", "o-steps__item")
      ];
    },
    itemClasses() {
      return [
        this.headerClass,
        this.computedClass("itemHeaderClass", "o-steps__nav-item"),
        { [this.computedClass("itemHeaderVariantClass", "o-steps__nav-item--", this.variant || this.parent.variant)]: this.variant || this.parent.variant },
        { [this.computedClass("itemHeaderActiveClass", "o-steps__nav-item-active")]: this.isActive },
        { [this.computedClass("itemHeaderPreviousClass", "o-steps__nav-item-previous")]: this.parent.activeItem.index > this.index }
      ];
    }
  }
});
script25.__file = "src/components/steps/StepItem.vue";
var index23 = {
  install(app) {
    registerComponent(app, script$19);
    registerComponent(app, script25);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/switch.mjs
var script26 = defineComponent({
  name: "OSwitch",
  mixins: [BaseComponentMixin],
  configField: "switch",
  emits: ["update:modelValue"],
  props: {
    /** @model */
    modelValue: [String, Number, Boolean],
    /**
     * Same as native value
     */
    nativeValue: [String, Number, Boolean],
    disabled: Boolean,
    /**
     * Color of the switch, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: String,
    /**
    * Color of the switch when is passive, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    passiveVariant: String,
    /** Name attribute on native checkbox */
    name: String,
    required: Boolean,
    /**
     * Vertical size of switch, optional
     * @values small, medium, large
     */
    size: String,
    /**
     * Overrides the returned value when it's checked
     */
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    /**
     * Overrides the returned value when it's not checked
     */
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    /** Rounded style */
    rounded: {
      type: Boolean,
      default: true
    },
    /** Label position */
    position: {
      type: String,
      default: "right"
    },
    /** Accessibility label to establish relationship between the switch and control label' */
    ariaLabelledby: String,
    rootClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    checkClass: [String, Function, Array],
    checkCheckedClass: [String, Function, Array],
    checkSwitchClass: [String, Function, Array],
    roundedClass: [String, Function, Array],
    labelClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    elementsWrapperClass: [String, Function, Array],
    passiveVariantClass: [String, Function, Array],
    positionClass: [String, Function, Array],
    inputClass: [String, Function, Array]
  },
  data() {
    return {
      newValue: this.modelValue,
      isMouseDown: false
    };
  },
  computed: {
    getLabel() {
      return this.$refs.label;
    },
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-switch"),
        { [this.computedClass("sizeClass", "o-switch--", this.size)]: this.size },
        { [this.computedClass("disabledClass", "o-switch--disabled")]: this.disabled },
        { [this.computedClass("variantClass", "o-switch--", this.variant)]: this.variant },
        { [this.computedClass("positionClass", "o-switch--", this.position)]: this.position },
        { [this.computedClass("passiveVariantClass", "o-switch--", this.passiveVariant + "-passive")]: this.passiveVariant }
      ];
    },
    inputClasses() {
      return [
        this.computedClass("inputClass", "o-switch__input")
      ];
    },
    checkClasses() {
      return [
        this.computedClass("checkClass", "o-switch__check"),
        { [this.computedClass("checkCheckedClass", "o-switch__check--checked")]: this.newValue === this.trueValue },
        { [this.computedClass("roundedClass", "o-switch--rounded")]: this.rounded }
      ];
    },
    checkSwitchClasses() {
      return [
        this.computedClass("checkSwitchClass", "o-switch__check-switch"),
        { [this.computedClass("roundedClass", "o-switch--rounded")]: this.rounded }
      ];
    },
    labelClasses() {
      return [
        this.computedClass("labelClass", "o-switch__label")
      ];
    },
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        this.newValue = value;
        this.$emit("update:modelValue", this.newValue);
      }
    }
  },
  watch: {
    /**
    * When v-model change, set internal value.
    */
    modelValue(value) {
      this.newValue = value;
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    }
  }
});
var _hoisted_117 = ["disabled", "name", "required", "value", "true-value", "false-value", "aria-labelledby"];
var _hoisted_215 = ["id"];
function render25(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "label",
    {
      class: normalizeClass(_ctx.rootClasses),
      ref: "label",
      onClick: _cache[2] || (_cache[2] = (...args) => _ctx.focus && _ctx.focus(...args)),
      onKeydown: _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => _ctx.getLabel.click(), ["prevent"]), ["enter"])),
      onMousedown: _cache[4] || (_cache[4] = ($event) => _ctx.isMouseDown = true),
      onMouseup: _cache[5] || (_cache[5] = ($event) => _ctx.isMouseDown = false),
      onMouseout: _cache[6] || (_cache[6] = ($event) => _ctx.isMouseDown = false),
      onBlur: _cache[7] || (_cache[7] = ($event) => _ctx.isMouseDown = false)
    },
    [withDirectives(createBaseVNode("input", {
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
      type: "checkbox",
      ref: "input",
      role: "switch",
      class: normalizeClass(_ctx.inputClasses),
      onClick: _cache[1] || (_cache[1] = withModifiers(() => {
      }, ["stop"])),
      disabled: _ctx.disabled,
      name: _ctx.name,
      required: _ctx.required,
      value: _ctx.nativeValue,
      "true-value": _ctx.trueValue,
      "false-value": _ctx.falseValue,
      "aria-labelledby": _ctx.ariaLabelledby
    }, null, 10, _hoisted_117), [[vModelCheckbox, _ctx.computedValue]]), createBaseVNode(
      "span",
      {
        class: normalizeClass(_ctx.checkClasses)
      },
      [createBaseVNode(
        "span",
        {
          class: normalizeClass(_ctx.checkSwitchClasses)
        },
        null,
        2
        /* CLASS */
      )],
      2
      /* CLASS */
    ), createBaseVNode("span", {
      id: _ctx.ariaLabelledby,
      class: normalizeClass(_ctx.labelClasses)
    }, [renderSlot(_ctx.$slots, "default")], 10, _hoisted_215)],
    34
    /* CLASS, HYDRATE_EVENTS */
  );
}
script26.render = render25;
script26.__file = "src/components/switch/Switch.vue";
var index24 = {
  install(app) {
    registerComponent(app, script26);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/table.mjs
var script$32 = defineComponent({
  name: "OTableMobileSort",
  components: {
    [script4.name]: script4,
    [script10.name]: script10,
    [script.name]: script,
    [script9.name]: script9
  },
  inject: ["$table"],
  emits: ["sort"],
  props: {
    currentSortColumn: Object,
    columns: Array,
    placeholder: String,
    iconPack: String,
    sortIcon: {
      type: String,
      default: "arrow-up"
    },
    sortIconSize: {
      type: String,
      default: "small"
    },
    isAsc: Boolean
  },
  data() {
    return {
      mobileSort: getValueByPath(this.currentSortColumn, "newKey"),
      defaultEvent: {
        shiftKey: true,
        altKey: true,
        ctrlKey: true
      },
      ignoreSort: false
    };
  },
  computed: {
    getTable() {
      return this.$table;
    },
    showPlaceholder() {
      return !this.columns || !this.columns.some((column) => getValueByPath(column, "newKey") === this.mobileSort);
    },
    sortableColumns() {
      if (!this.columns)
        return [];
      return this.columns.filter((c) => c.sortable);
    },
    isCurrentSort() {
      return getValueByPath(this.currentSortColumn, "newKey") === this.mobileSort;
    }
  },
  watch: {
    mobileSort(value) {
      if (this.currentSortColumn.newKey === value)
        return;
      const column = this.sortableColumns.filter((c) => getValueByPath(c, "newKey") === value)[0];
      this.$emit("sort", column, this.defaultEvent);
    },
    currentSortColumn(column) {
      this.mobileSort = getValueByPath(column, "newKey");
    }
  },
  methods: {
    sort() {
      const column = this.sortableColumns.filter((c) => getValueByPath(c, "newKey") === this.mobileSort)[0];
      this.$emit("sort", column, this.defaultEvent);
    }
  }
});
var _hoisted_1$22 = ["value"];
function render$24(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_select = resolveComponent("o-select");
  const _component_o_icon = resolveComponent("o-icon");
  const _component_o_button = resolveComponent("o-button");
  const _component_o_field = resolveComponent("o-field");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.getTable.mobileSortClasses)
    },
    [createVNode(_component_o_field, null, {
      default: withCtx(() => [createVNode(_component_o_select, {
        modelValue: _ctx.mobileSort,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.mobileSort = $event),
        expanded: ""
      }, {
        default: withCtx(() => [_ctx.placeholder ? withDirectives((openBlock(), createElementBlock(
          "option",
          {
            key: 0,
            value: {},
            selected: "",
            disabled: "",
            hidden: ""
          },
          toDisplayString(_ctx.placeholder),
          513
          /* TEXT, NEED_PATCH */
        )), [[vShow, _ctx.showPlaceholder]]) : createCommentVNode("v-if", true), (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(_ctx.sortableColumns, (column, index30) => {
            return openBlock(), createElementBlock("option", {
              key: index30,
              value: column.newKey
            }, toDisplayString(column.label), 9, _hoisted_1$22);
          }),
          128
          /* KEYED_FRAGMENT */
        ))]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"]), createVNode(_component_o_button, {
        onClick: _ctx.sort
      }, {
        default: withCtx(() => [withDirectives(createVNode(_component_o_icon, {
          icon: _ctx.sortIcon,
          pack: _ctx.iconPack,
          size: _ctx.sortIconSize,
          both: "",
          rotation: !_ctx.isAsc ? 180 : 0
        }, null, 8, ["icon", "pack", "size", "rotation"]), [[vShow, _ctx.isCurrentSort]])]),
        _: 1
        /* STABLE */
      }, 8, ["onClick"])]),
      _: 1
      /* STABLE */
    })],
    2
    /* CLASS */
  );
}
script$32.render = render$24;
script$32.__file = "src/components/table/TableMobileSort.vue";
var script$24 = defineComponent({
  name: "OTableColumn",
  inject: ["$table"],
  props: {
    label: String,
    customKey: [String, Number],
    field: String,
    meta: [String, Number, Boolean, Function, Object, Array],
    width: [Number, String],
    numeric: Boolean,
    /**
     * Optional, position of column content
     * @values left, centered, right
     */
    position: {
      type: String,
      validator(value) {
        return [
          "left",
          "centered",
          "right"
        ].indexOf(value) > -1;
      }
    },
    searchable: Boolean,
    sortable: Boolean,
    visible: {
      type: Boolean,
      default: true
    },
    customSort: Function,
    customSearch: Function,
    sticky: Boolean,
    headerSelectable: Boolean,
    /** Adds native attributes to th :th-attrs="(column)" => ({})" */
    thAttrs: {
      type: Function,
      default: () => ({})
    },
    /** Adds native attributes to td :td-attrs="(row, column)" => ({})" */
    tdAttrs: {
      type: Function,
      default: () => ({})
    },
    subheading: String
  },
  data() {
    return {
      newKey: void 0,
      thAttrsData: {},
      tdAttrsData: []
    };
  },
  computed: {
    style() {
      return {
        width: toCssDimension(this.width)
      };
    },
    hasDefaultSlot() {
      return this.$slots.default;
    },
    hasSearchableSlot() {
      return this.$slots.searchable;
    },
    hasHeaderSlot() {
      return this.$slots.header;
    },
    isHeaderUnselectable() {
      return !this.headerSelectable && this.sortable;
    }
  },
  created() {
    if (!this.$table) {
      throw new Error("You should wrap oTableColumn on a oTable");
    }
    this.newKey = this.$table._nextSequence();
    this.$table._addColumn(this);
  },
  beforeMount() {
    if (typeof this.thAttrs !== "undefined") {
      this.thAttrsData = this.thAttrs(this);
    }
  },
  beforeUnmount() {
    this.$table._removeColumn(this);
  },
  render() {
    return h("span", { "data-id": this.newKey }, this.label);
  }
});
script$24.__file = "src/components/table/TableColumn.vue";
var script$110 = defineComponent({
  name: "OTablePagination",
  components: {
    [script19.name]: script19
  },
  emits: ["update:currentPage", "page-change"],
  props: {
    paginated: Boolean,
    total: Number,
    perPage: Number,
    currentPage: Number,
    paginationSimple: Boolean,
    paginationSize: String,
    rounded: Boolean,
    iconPack: String,
    rootClass: [String, Array, Object],
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String
  },
  data() {
    return {
      newCurrentPage: this.currentPage
    };
  },
  watch: {
    currentPage(newVal) {
      this.newCurrentPage = newVal;
    }
  },
  methods: {
    /**
    * Paginator change listener.
    */
    pageChanged(page) {
      this.newCurrentPage = page > 0 ? page : 1;
      this.$emit("update:currentPage", this.newCurrentPage);
      this.$emit("page-change", this.newCurrentPage);
    }
  }
});
var _hoisted_1$13 = {
  key: 0
};
function render$18(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_pagination = resolveComponent("o-pagination");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.rootClass)
    },
    [createBaseVNode("div", null, [renderSlot(_ctx.$slots, "default")]), createBaseVNode("div", null, [_ctx.paginated ? (openBlock(), createElementBlock("div", _hoisted_1$13, [createVNode(_component_o_pagination, {
      "icon-pack": _ctx.iconPack,
      total: _ctx.total,
      "per-page": _ctx.perPage,
      simple: _ctx.paginationSimple,
      size: _ctx.paginationSize,
      current: _ctx.newCurrentPage,
      rounded: _ctx.rounded,
      onChange: _ctx.pageChanged,
      "aria-next-label": _ctx.ariaNextLabel,
      "aria-previous-label": _ctx.ariaPreviousLabel,
      "aria-page-label": _ctx.ariaPageLabel,
      "aria-current-label": _ctx.ariaCurrentLabel
    }, null, 8, ["icon-pack", "total", "per-page", "simple", "size", "current", "rounded", "onChange", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label"])])) : createCommentVNode("v-if", true)])],
    2
    /* CLASS */
  );
}
script$110.render = render$18;
script$110.__file = "src/components/table/TablePagination.vue";
var script27 = defineComponent({
  name: "OTable",
  components: {
    [script4.name]: script4,
    [script6.name]: script6,
    [script.name]: script,
    [script2.name]: script2,
    [script15.name]: script15,
    [SlotComponent.name]: SlotComponent,
    [script$32.name]: script$32,
    [script$24.name]: script$24,
    [script$110.name]: script$110
  },
  mixins: [BaseComponentMixin, MatchMediaMixin],
  configField: "table",
  inheritAttrs: false,
  provide() {
    return {
      $table: this
    };
  },
  emits: [
    "page-change",
    "click",
    "dblclick",
    "contextmenu",
    "check",
    "check-all",
    "update:checkedRows",
    "select",
    "update:selected",
    "filters-change",
    "details-open",
    "details-close",
    "update:openedDetailed",
    "mouseenter",
    "mouseleave",
    "sort",
    "sorting-priority-removed",
    "dragstart",
    "dragend",
    "drop",
    "dragleave",
    "dragover",
    "cell-click",
    "columndragstart",
    "columndragend",
    "columndrop",
    "columndragleave",
    "columndragover",
    "update:currentPage"
  ],
  props: {
    /** Table data */
    data: {
      type: Array,
      default: () => []
    },
    /** Table columns */
    columns: {
      type: Array,
      default: () => []
    },
    /** Border to all cells */
    bordered: Boolean,
    /** Whether table is striped */
    striped: Boolean,
    /** Makes the cells narrower */
    narrowed: Boolean,
    /** Rows are highlighted when hovering */
    hoverable: Boolean,
    /** Loading state */
    loading: Boolean,
    /** Allow row details  */
    detailed: Boolean,
    /** Rows can be checked (multiple) */
    checkable: Boolean,
    /** Show check/uncheck all checkbox in table header when checkable */
    headerCheckable: {
      type: Boolean,
      default: true
    },
    /**
     * Position of the checkbox (if checkable is true)
     * @values left, right
     */
    checkboxPosition: {
      type: String,
      default: "left",
      validator: (value) => {
        return [
          "left",
          "right"
        ].indexOf(value) >= 0;
      }
    },
    /** Set which row is selected, use v-model:selected to make it two-way binding */
    selected: Object,
    /** Custom method to verify if a row is selectable, works when is selected. */
    isRowSelectable: {
      type: Function,
      default: () => true
    },
    /** Table can be focused and user can navigate with keyboard arrows (require selected) and rows are highlighted when hovering */
    focusable: Boolean,
    /** Custom method to verify if row is checked, works when is checkable. Useful for backend pagination */
    customIsChecked: Function,
    /** Custom method to verify if a row is checkable, works when is checkable */
    isRowCheckable: {
      type: Function,
      default: () => true
    },
    /** Set which rows are checked, use v-model:checkedRows to make it two-way binding */
    checkedRows: {
      type: Array,
      default: () => []
    },
    /** Rows appears as cards on mobile (collapse rows) */
    mobileCards: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "table.mobileCards", true);
      }
    },
    /** Sets the default sort column and order — e.g. ['first_name', 'desc']	 */
    defaultSort: [String, Array],
    /**
     * Sets the default sort column direction on the first click
     * @values asc, desc
     */
    defaultSortDirection: {
      type: String,
      default: "asc"
    },
    /** Sets the header sorting icon */
    sortIcon: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "table.sortIcon", "arrow-up");
      }
    },
    /**
     * Sets the size of the sorting icon
     * @values small, medium, large
     */
    sortIconSize: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "table.sortIconSize", "small");
      }
    },
    /** Adds pagination to the table */
    paginated: Boolean,
    /** Current page of table data (if paginated), use v-model:currentPage to make it two-way binding */
    currentPage: {
      type: Number,
      default: 1
    },
    /** How many rows per page (if paginated) */
    perPage: {
      type: [Number, String],
      default: () => {
        return getValueByPath(getOptions(), "table.perPage", 20);
      }
    },
    /** Allow chevron icon and column to be visible */
    showDetailIcon: {
      type: Boolean,
      default: true
    },
    /** Icon name of detail action */
    detailIcon: {
      type: String,
      default: "chevron-right"
    },
    /**
     * Pagination position (if paginated)
     * @values bottom, top, bot
     */
    paginationPosition: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "table.paginationPosition", "bottom");
      },
      validator: (value) => {
        return [
          "bottom",
          "top",
          "both"
        ].indexOf(value) >= 0;
      }
    },
    /** Columns won't be sorted with Javascript, use with sort event to sort in your backend */
    backendSorting: Boolean,
    /** Columns won't be filtered with Javascript, use with searchable prop to the columns to filter in your backend */
    backendFiltering: Boolean,
    /** Add a class to row based on the return */
    rowClass: {
      type: Function,
      default: () => ""
    },
    /** Allow pre-defined opened details. Ideal to open details via vue-router. (A unique key is required; check detail-key prop) */
    openedDetailed: {
      type: Array,
      default: () => []
    },
    /** Controls the visibility of the trigger that toggles the detailed rows. */
    hasDetailedVisible: {
      type: Function,
      default: () => true
    },
    /** Use a unique key of your data Object when use detailed or opened detailed. (id recommended) */
    detailKey: {
      type: String,
      default: ""
    },
    /** Custom style on details */
    customDetailRow: {
      type: Boolean,
      default: false
    },
    /* Transition name to use when toggling row details. */
    detailTransition: {
      type: String,
      default: ""
    },
    /** Rows won't be paginated with Javascript, use with page-change event to paginate in your backend */
    backendPagination: Boolean,
    /** Total number of table data if backend-pagination is enabled */
    total: {
      type: [Number, String],
      default: 0
    },
    /** Icon pack to use */
    iconPack: String,
    /** Text when nothing is selected */
    mobileSortPlaceholder: String,
    /** Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended) */
    customRowKey: String,
    /** Allows rows to be draggable */
    draggable: {
      type: Boolean,
      default: false
    },
    /** Allows columns to be draggable */
    draggableColumn: {
      type: Boolean,
      default: false
    },
    /** Add a horizontal scrollbar when table is too wide */
    scrollable: Boolean,
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String,
    /** Show a sticky table header */
    stickyHeader: Boolean,
    /** Table fixed height */
    height: [Number, String],
    /** Add a native event to filter */
    filtersEvent: {
      type: String,
      default: ""
    },
    /** Filtering debounce time (in milliseconds) */
    debounceSearch: Number,
    /** Show header */
    showHeader: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "table.showHeader", true);
      }
    },
    /** Make the checkbox column sticky when checkable */
    stickyCheckbox: {
      type: Boolean,
      default: false
    },
    /** Rounded pagination if paginated */
    paginationRounded: Boolean,
    /** Size of pagination if paginated */
    paginationSize: String,
    rootClass: [String, Function, Array],
    tableClass: [String, Function, Array],
    wrapperClass: [String, Function, Array],
    footerClass: [String, Function, Array],
    emptyClass: [String, Function, Array],
    detailedClass: [String, Function, Array],
    borderedClass: [String, Function, Array],
    stripedClass: [String, Function, Array],
    narrowedClass: [String, Function, Array],
    hoverableClass: [String, Function, Array],
    thClass: [String, Function, Array],
    tdClass: [String, Function, Array],
    thPositionClass: [String, Function, Array],
    thStickyClass: [String, Function, Array],
    thCheckboxClass: [String, Function, Array],
    thCurrentSortClass: [String, Function, Array],
    thSortableClass: [String, Function, Array],
    thUnselectableClass: [String, Function, Array],
    thSortIconClass: [String, Function, Array],
    thDetailedClass: [String, Function, Array],
    tdPositionClass: [String, Function, Array],
    tdStickyClass: [String, Function, Array],
    tdCheckboxClass: [String, Function, Array],
    tdDetailedChevronClass: [String, Function, Array],
    trSelectedClass: [String, Function, Array],
    trCheckedClass: [String, Function, Array],
    stickyHeaderClass: [String, Function, Array],
    scrollableClass: [String, Function, Array],
    mobileSortClass: [String, Function, Array],
    paginationWrapperClass: [String, Function, Array],
    mobileClass: [String, Function, Array],
    thSubheadingClass: [String, Function, Array]
  },
  data() {
    return {
      visibleDetailRows: this.openedDetailed,
      newData: this.data,
      newDataTotal: this.backendPagination ? this.total : this.data.length,
      newCheckedRows: [...this.checkedRows],
      lastCheckedRowIndex: null,
      newCurrentPage: this.currentPage,
      currentSortColumn: {},
      isAsc: true,
      filters: {},
      defaultSlots: [],
      firstTimeSort: true,
      sequence: 1,
      isDraggingRow: false,
      isDraggingColumn: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.checkSort();
    });
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-table__root"),
        { [this.computedClass("mobileClass", "o-table__wrapper--mobile")]: this.isMobile }
      ];
    },
    tableClasses() {
      return [
        this.computedClass("tableClass", "o-table"),
        { [this.computedClass("borderedClass", "o-table--bordered")]: this.bordered },
        { [this.computedClass("stripedClass", "o-table--striped")]: this.striped },
        { [this.computedClass("narrowedClass", "o-table--narrowed")]: this.narrowed },
        { [this.computedClass("hoverableClass", "o-table--hoverable")]: (this.hoverable || this.focusable) && this.visibleData.length },
        { [this.computedClass("emptyClass", "o-table--table__empty")]: !this.visibleData.length }
      ];
    },
    tableWrapperClasses() {
      return [
        this.computedClass("wrapperClass", "o-table__wrapper"),
        { [this.computedClass("stickyHeaderClass", "o-table__wrapper--sticky-header")]: this.stickyHeader },
        { [this.computedClass("scrollableClass", "o-table__wrapper--scrollable")]: this.isScrollable },
        { [this.computedClass("mobileClass", "o-table__wrapper--mobile")]: this.isMobile }
      ];
    },
    footerClasses() {
      return [
        this.computedClass("footerClass", "o-table__footer")
      ];
    },
    thBaseClasses() {
      return [
        this.computedClass("thClass", "o-table__th")
      ];
    },
    tdBaseClasses() {
      return [
        this.computedClass("tdClass", "o-table__td")
      ];
    },
    thCheckboxClasses() {
      return [
        ...this.thBaseClasses,
        this.computedClass("thCheckboxClass", "o-table__th-checkbox")
      ];
    },
    thDetailedClasses() {
      return [
        ...this.thBaseClasses,
        this.computedClass("thDetailedClass", "o-table__th--detailed")
      ];
    },
    thSubheadingClasses() {
      return [
        ...this.thBaseClasses,
        this.computedClass("thSubheadingClass", "o-table__th")
      ];
    },
    tdCheckboxClasses() {
      return [
        ...this.tdBaseClasses,
        this.computedClass("tdCheckboxClass", "o-table__td-checkbox"),
        ...this.thStickyClasses({ sticky: this.stickyCheckbox })
      ];
    },
    detailedClasses() {
      return [
        this.computedClass("detailedClass", "o-table__detail")
      ];
    },
    tdDetailedChevronClasses() {
      return [
        ...this.tdBaseClasses,
        this.computedClass("tdDetailedChevronClass", "o-table__td-chevron")
      ];
    },
    mobileSortClasses() {
      return [
        this.computedClass("mobileSortClass", "o-table__mobile-sort")
      ];
    },
    paginationWrapperClasses() {
      return [
        this.computedClass("paginationWrapperClass", "o-table__pagination")
      ];
    },
    tableWrapperStyle() {
      return {
        height: toCssDimension(this.height)
      };
    },
    /**
    * Splitted data based on the pagination.
    */
    visibleData() {
      if (!this.paginated)
        return this.newData;
      const currentPage = this.newCurrentPage;
      const perPage = this.perPage;
      if (this.newData.length <= perPage) {
        return this.newData;
      } else {
        const start = (currentPage - 1) * perPage;
        const end = start + parseInt(perPage, 10);
        return this.newData.slice(start, end);
      }
    },
    visibleColumns() {
      if (!this.newColumns)
        return this.newColumns;
      return this.newColumns.filter((column) => {
        return column.visible || column.visible === void 0;
      });
    },
    /**
    * Check if all rows in the page are checked.
    */
    isAllChecked() {
      const validVisibleData = this.visibleData.filter((row) => this.isRowCheckable(row));
      if (validVisibleData.length === 0)
        return false;
      const isAllChecked = validVisibleData.some((currentVisibleRow) => {
        return indexOf(this.newCheckedRows, currentVisibleRow, this.customIsChecked) < 0;
      });
      return !isAllChecked;
    },
    /**
    * Check if all rows in the page are checkable.
    */
    isAllUncheckable() {
      const validVisibleData = this.visibleData.filter((row) => this.isRowCheckable(row));
      return validVisibleData.length === 0;
    },
    /**
    * Check if has any sortable column.
    */
    hasSortablenewColumns() {
      return this.newColumns.some((column) => {
        return column.sortable;
      });
    },
    /**
    * Check if has any searchable column.
    */
    hasSearchablenewColumns() {
      return this.newColumns.some((column) => {
        return column.searchable;
      });
    },
    /**
    * Return total column count based if it's checkable or expanded
    */
    columnCount() {
      let count = this.visibleColumns.length;
      count += this.checkable ? 1 : 0;
      count += this.detailed && this.showDetailIcon ? 1 : 0;
      return count;
    },
    /**
    * return if detailed row tabled
    * will be with chevron column & icon or not
    */
    showDetailRowIcon() {
      return this.detailed && this.showDetailIcon;
    },
    /**
    * return if scrollable table
    */
    isScrollable() {
      if (this.scrollable)
        return true;
      if (!this.newColumns)
        return false;
      return this.newColumns.some((column) => {
        return column.sticky;
      });
    },
    newColumns() {
      if (this.columns && this.columns.length) {
        return this.columns.map((column) => {
          const vnode = createVNode(script$24, column, (props) => {
            const vnode2 = h("span", {}, getValueByPath(props.row, column.field));
            return [vnode2];
          });
          return createApp(vnode).provide("$table", this).mount(document.createElement("div"));
        });
      }
      return this.defaultSlots;
    },
    isMobile() {
      return this.mobileCards && this.isMatchMedia;
    },
    hasCustomSubheadings() {
      if (this.$slots.subheading)
        return true;
      return this.newColumns.some((column) => {
        return column.subheading || column.$slots.subheading;
      });
    },
    canDragRow() {
      return this.draggable && !this.isDraggingColumn;
    },
    canDragColumn() {
      return this.draggableColumn && !this.isDraggingRow;
    }
  },
  watch: {
    /**
    * When data prop change:
    *   1. Update internal value.
    *   2. Filter data if it's not backend-filtered.
    *   3. Sort again if it's not backend-sorted.
    *   4. Set new total if it's not backend-paginated.
    */
    data: {
      handler(value) {
        if (!this.backendFiltering) {
          this.newData = value.filter((row) => this.isRowFiltered(row));
        } else {
          this.newData = [...value];
        }
        if (!this.backendSorting) {
          this.sort(this.currentSortColumn, true);
        }
        if (!this.backendPagination) {
          this.newDataTotal = this.newData.length;
        }
      },
      deep: true
    },
    visibleColumns: {
      handler() {
        this.processTdAttrs();
      }
    },
    visibleData: {
      handler() {
        this.processTdAttrs();
      }
    },
    /**
    * When Pagination total change, update internal total
    * only if it's backend-paginated.
    */
    total(newTotal) {
      if (!this.backendPagination)
        return;
      this.newDataTotal = newTotal;
    },
    currentPage(newValue) {
      this.newCurrentPage = newValue;
    },
    /**
    * When checkedRows prop change, update internal value without
    * mutating original data.
    */
    checkedRows: {
      handler(rows) {
        this.newCheckedRows = [...rows];
      },
      deep: true
    },
    debounceSearch: {
      handler(value) {
        this.debouncedHandleFiltersChange = debounce(this.handleFiltersChange, value);
      },
      immediate: true
    },
    filters: {
      handler(value) {
        if (this.debounceSearch) {
          this.debouncedHandleFiltersChange(value);
        } else {
          this.handleFiltersChange(value);
        }
      },
      deep: true
    },
    /**
    * When the user wants to control the detailed rows via props.
    * Or wants to open the details of certain row with the router for example.
    */
    openedDetailed(expandedRows) {
      this.visibleDetailRows = expandedRows;
    },
    newCurrentPage(newVal) {
      this.$emit("update:currentPage", newVal);
    }
  },
  methods: {
    thClasses(column) {
      return [
        ...this.thBaseClasses,
        ...this.thStickyClasses(column),
        { [this.computedClass("thCurrentSortClass", "o-table__th-current-sort")]: this.currentSortColumn === column },
        { [this.computedClass("thSortableClass", "o-table__th--sortable")]: column.sortable },
        { [this.computedClass("thUnselectableClass", "o-table__th--unselectable")]: column.isHeaderUnselectable },
        { [this.computedClass("thPositionClass", "o-table__th--", column.position)]: column.position }
      ];
    },
    thStickyClasses(column) {
      return [
        { [this.computedClass("thStickyClass", "o-table__th--sticky")]: column.sticky }
      ];
    },
    rowClasses(row, index30) {
      return [
        this.rowClass(row, index30),
        { [this.computedClass("trSelectedClass", "o-table__tr--selected")]: this.isRowSelected(row, this.selected) },
        { [this.computedClass("trCheckedClass", "o-table__tr--checked")]: this.isRowChecked(row) }
      ];
    },
    thSortIconClasses() {
      return [
        this.computedClass("thSortIconClass", "o-table__th__sort-icon")
      ];
    },
    tdClasses(row, column) {
      return [
        ...this.tdBaseClasses,
        { [this.computedClass("tdPositionClass", "o-table__td--", column.position)]: column.position },
        { [this.computedClass("tdStickyClass", "o-table__td--sticky")]: column.sticky }
      ];
    },
    onFiltersEvent(event) {
      this.$emit(`filters-event-${this.filtersEvent}`, { event, filters: this.filters });
    },
    handleFiltersChange(value) {
      if (this.backendFiltering) {
        this.$emit("filters-change", value);
      } else {
        this.newData = this.data.filter((row) => this.isRowFiltered(row));
        if (!this.backendPagination) {
          this.newDataTotal = this.newData.length;
        }
        if (!this.backendSorting) {
          if (Object.keys(this.currentSortColumn).length > 0) {
            this.doSortSingleColumn(this.currentSortColumn);
          }
        }
      }
    },
    /**
    * Sort an array by key without mutating original data.
    * Call the user sort function if it was passed.
    */
    sortBy(array, key, fn, isAsc) {
      let sorted2 = [];
      if (fn && typeof fn === "function") {
        sorted2 = [...array].sort((a, b) => fn(a, b, isAsc));
      } else {
        sorted2 = [...array].sort((a, b) => {
          let newA = getValueByPath(a, key);
          let newB = getValueByPath(b, key);
          if (typeof newA === "boolean" && typeof newB === "boolean") {
            return isAsc ? newA > newB ? 1 : -1 : newA > newB ? -1 : 1;
          }
          if (!newA && newA !== 0)
            return 1;
          if (!newB && newB !== 0)
            return -1;
          if (newA === newB)
            return 0;
          newA = typeof newA === "string" ? newA.toUpperCase() : newA;
          newB = typeof newB === "string" ? newB.toUpperCase() : newB;
          return isAsc ? newA > newB ? 1 : -1 : newA > newB ? -1 : 1;
        });
      }
      return sorted2;
    },
    /**
    * Sort the column.
    * Toggle current direction on column if it's sortable
    * and not just updating the prop.
    */
    sort(column, updatingData = false, event = null) {
      if (!column || !column.sortable)
        return;
      if (!updatingData) {
        this.isAsc = column === this.currentSortColumn ? !this.isAsc : this.defaultSortDirection.toLowerCase() !== "desc";
      }
      if (!this.firstTimeSort) {
        this.$emit("sort", column.field, this.isAsc ? "asc" : "desc", event);
      }
      if (!this.backendSorting) {
        this.doSortSingleColumn(column);
      }
      this.currentSortColumn = column;
    },
    doSortSingleColumn(column) {
      this.newData = this.sortBy(this.newData, column.field, column.customSort, this.isAsc);
    },
    isRowSelected(row, selected) {
      if (!selected) {
        return false;
      }
      if (this.customRowKey) {
        return row[this.customRowKey] === selected[this.customRowKey];
      }
      return row === selected;
    },
    /**
    * Check if the row is checked (is added to the array).
    */
    isRowChecked(row) {
      return indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0;
    },
    /**
    * Remove a checked row from the array.
    */
    removeCheckedRow(row) {
      const index30 = indexOf(this.newCheckedRows, row, this.customIsChecked);
      if (index30 >= 0) {
        this.newCheckedRows.splice(index30, 1);
      }
    },
    /**
    * Header checkbox click listener.
    * Add or remove all rows in current page.
    */
    checkAll() {
      const isAllChecked = this.isAllChecked;
      this.visibleData.forEach((currentRow) => {
        if (this.isRowCheckable(currentRow)) {
          this.removeCheckedRow(currentRow);
        }
        if (!isAllChecked) {
          if (this.isRowCheckable(currentRow)) {
            this.newCheckedRows.push(currentRow);
          }
        }
      });
      this.$emit("check", this.newCheckedRows);
      this.$emit("check-all", this.newCheckedRows);
      this.$emit("update:checkedRows", this.newCheckedRows);
    },
    /**
    * Row checkbox click listener.
    */
    checkRow(row, index30, event) {
      if (!this.isRowCheckable(row))
        return;
      const lastIndex = this.lastCheckedRowIndex;
      this.lastCheckedRowIndex = index30;
      if (event.shiftKey && lastIndex !== null && index30 !== lastIndex) {
        this.shiftCheckRow(row, index30, lastIndex);
      } else if (!this.isRowChecked(row)) {
        this.newCheckedRows.push(row);
      } else {
        this.removeCheckedRow(row);
      }
      this.$emit("check", this.newCheckedRows, row);
      this.$emit("update:checkedRows", this.newCheckedRows);
    },
    /**
     * Check row when shift is pressed.
     */
    shiftCheckRow(row, index30, lastCheckedRowIndex) {
      const subset = this.visibleData.slice(Math.min(index30, lastCheckedRowIndex), Math.max(index30, lastCheckedRowIndex) + 1);
      const shouldCheck = !this.isRowChecked(row);
      subset.forEach((item) => {
        this.removeCheckedRow(item);
        if (shouldCheck && this.isRowCheckable(item)) {
          this.newCheckedRows.push(item);
        }
      });
    },
    /**
    * Row click listener.
    * Emit all necessary events.
    */
    selectRow(row, index30) {
      this.$emit("click", row, index30);
      if (this.selected === row)
        return;
      if (!this.isRowSelectable(row))
        return;
      this.$emit("select", row, this.selected);
      this.$emit("update:selected", row);
    },
    /**
    * Toggle to show/hide details slot
    */
    toggleDetails(obj) {
      const found = this.isVisibleDetailRow(obj);
      if (found) {
        this.closeDetailRow(obj);
        this.$emit("details-close", obj);
      } else {
        this.openDetailRow(obj);
        this.$emit("details-open", obj);
      }
      this.$emit("update:openedDetailed", this.visibleDetailRows);
    },
    openDetailRow(obj) {
      const index30 = this.handleDetailKey(obj);
      this.visibleDetailRows.push(index30);
    },
    closeDetailRow(obj) {
      const index30 = this.handleDetailKey(obj);
      const i = this.visibleDetailRows.indexOf(index30);
      if (i >= 0) {
        this.visibleDetailRows.splice(i, 1);
      }
    },
    isVisibleDetailRow(obj) {
      const index30 = this.handleDetailKey(obj);
      return this.visibleDetailRows.indexOf(index30) >= 0;
    },
    isActiveDetailRow(row) {
      return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row);
    },
    isActiveCustomDetailRow(row) {
      return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row);
    },
    isRowFiltered(row) {
      for (const key in this.filters) {
        if (!this.filters[key])
          continue;
        const input = this.filters[key];
        const column = this.newColumns.filter((c) => c.field === key)[0];
        if (column && column.customSearch && typeof column.customSearch === "function") {
          if (!column.customSearch(row, input))
            return false;
        } else {
          const value = getValueByPath(row, key);
          if (value == null)
            return false;
          if (Number.isInteger(value)) {
            if (value !== Number(input))
              return false;
          } else {
            const re = new RegExp(escapeRegExpChars(input), "i");
            if (Array.isArray(value)) {
              const valid = value.some((val) => re.test(removeDiacriticsFromString(val)) || re.test(val));
              if (!valid)
                return false;
            } else {
              if (!re.test(removeDiacriticsFromString(value)) && !re.test(value)) {
                return false;
              }
            }
          }
        }
      }
      return true;
    },
    /**
    * When the detailKey is defined we use the object[detailKey] as index.
    * If not, use the object reference by default.
    */
    handleDetailKey(index30) {
      const key = this.detailKey;
      return !key.length || !index30 ? index30 : index30[key];
    },
    /**
    * Call initSort only first time (For example async data).
    */
    checkSort() {
      if (this.newColumns.length && this.firstTimeSort) {
        this.initSort();
        this.firstTimeSort = false;
      } else if (this.newColumns.length) {
        if (Object.keys(this.currentSortColumn).length > 0) {
          for (let i = 0; i < this.newColumns.length; i++) {
            if (this.newColumns[i].field === this.currentSortColumn.field) {
              this.currentSortColumn = this.newColumns[i];
              break;
            }
          }
        }
      }
    },
    /**
    * Check if footer slot has custom content.
    */
    hasCustomFooterSlot() {
      if (this.$slots.footer) {
        const footer = this.$slots.footer();
        if (footer.length > 1)
          return true;
        const tag = footer[0].tag;
        if (tag !== "th" && tag !== "td")
          return false;
      }
      return true;
    },
    /**
    * Table arrow keys listener, change selection.
    */
    pressedArrow(pos) {
      if (!this.visibleData.length)
        return;
      let index30 = this.visibleData.indexOf(this.selected) + pos;
      index30 = index30 < 0 ? 0 : index30 > this.visibleData.length - 1 ? this.visibleData.length - 1 : index30;
      const row = this.visibleData[index30];
      if (!this.isRowSelectable(row)) {
        let newIndex = null;
        if (pos > 0) {
          for (let i = index30; i < this.visibleData.length && newIndex === null; i++) {
            if (this.isRowSelectable(this.visibleData[i]))
              newIndex = i;
          }
        } else {
          for (let i = index30; i >= 0 && newIndex === null; i--) {
            if (this.isRowSelectable(this.visibleData[i]))
              newIndex = i;
          }
        }
        if (newIndex >= 0) {
          this.selectRow(this.visibleData[newIndex]);
        }
      } else {
        this.selectRow(row);
      }
    },
    /**
    * Focus table element if has selected prop.
    */
    focus() {
      if (!this.focusable)
        return;
      this.$el.querySelector("table").focus();
    },
    /**
    * Initial sorted column based on the default-sort prop.
    */
    initSort() {
      if (!this.defaultSort)
        return;
      let sortField = "";
      let sortDirection = this.defaultSortDirection;
      if (Array.isArray(this.defaultSort)) {
        sortField = this.defaultSort[0];
        if (this.defaultSort[1]) {
          sortDirection = this.defaultSort[1];
        }
      } else {
        sortField = this.defaultSort;
      }
      const sortColumn = this.newColumns.filter((column) => column.field === sortField)[0];
      if (sortColumn) {
        this.isAsc = sortDirection.toLowerCase() !== "desc";
        this.sort(sortColumn, true);
      }
    },
    /**
    * Emits drag start event
    */
    handleDragStart(event, row, index30) {
      if (!this.draggable)
        return;
      this.$emit("dragstart", { event, row, index: index30 });
    },
    /**
    * Emits drag leave event
    */
    handleDragEnd(event, row, index30) {
      if (!this.draggable)
        return;
      this.$emit("dragend", { event, row, index: index30 });
    },
    /**
    * Emits drop event
    */
    handleDrop(event, row, index30) {
      if (!this.draggable)
        return;
      this.$emit("drop", { event, row, index: index30 });
    },
    /**
    * Emits drag over event
    */
    handleDragOver(event, row, index30) {
      if (!this.draggable)
        return;
      this.$emit("dragover", { event, row, index: index30 });
    },
    /**
    * Emits drag leave event
    */
    handleDragLeave(event, row, index30) {
      if (!this.draggable)
        return;
      this.$emit("dragleave", { event, row, index: index30 });
    },
    /**
    * Emits drag start event (column)
    */
    handleColumnDragStart(event, column, index30) {
      if (!this.canDragColumn)
        return;
      this.isDraggingColumn = true;
      this.$emit("columndragstart", { event, column, index: index30 });
    },
    /**
    * Emits drag leave event (column)
    */
    handleColumnDragEnd(event, column, index30) {
      if (!this.canDragColumn)
        return;
      this.isDraggingColumn = false;
      this.$emit("columndragend", { event, column, index: index30 });
    },
    /**
    * Emits drop event (column)
    */
    handleColumnDrop(event, column, index30) {
      if (!this.canDragColumn)
        return;
      this.$emit("columndrop", { event, column, index: index30 });
    },
    /**
    * Emits drag over event (column)
    */
    handleColumnDragOver(event, column, index30) {
      if (!this.canDragColumn)
        return;
      this.$emit("columndragover", { event, column, index: index30 });
    },
    /**
    * Emits drag leave event (column)
    */
    handleColumnDragLeave(event, column, index30) {
      if (!this.canDragColumn)
        return;
      this.$emit("columndragleave", { event, column, index: index30 });
    },
    emitEventForRow(eventName, event, row) {
      return this.$attrs[eventName] ? this.$emit(eventName, row, event) : null;
    },
    processTdAttrs() {
      if (this.visibleColumns.length && this.visibleData.length) {
        for (let i = 0; i < this.visibleColumns.length; i++) {
          const col = this.visibleColumns[i];
          if (typeof col.tdAttrs !== "undefined") {
            this.visibleData.forEach((data, index30) => {
              col.tdAttrsData[index30] = col.tdAttrs(data, col);
            });
          }
        }
      }
    },
    _addColumn(column) {
      this.defaultSlots.push(column);
      const slot = this.$refs["slot"];
      if (slot && slot.children) {
        this.$nextTick(() => {
          const ids = this.defaultSlots.map((it) => `[data-id="${it.newKey}"]`).join(",");
          const sortedIds = Array.from(slot.querySelectorAll(ids)).map((el) => el.getAttribute("data-id"));
          this.defaultSlots = this.defaultSlots.sort((a, b) => sortedIds.indexOf(`${a.newKey}`) - sortedIds.indexOf(`${b.newKey}`));
        });
      }
    },
    _removeColumn(column) {
      this.defaultSlots = this.defaultSlots.filter((d) => d.newKey !== column.newKey);
    },
    _nextSequence() {
      return this.sequence++;
    }
  }
});
var _hoisted_118 = {
  ref: "slot",
  style: {
    "display": "none"
  }
};
var _hoisted_216 = ["tabindex"];
var _hoisted_36 = {
  key: 0
};
var _hoisted_45 = {
  key: 1
};
var _hoisted_52 = ["onClick", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave"];
var _hoisted_62 = {
  key: 1
};
var _hoisted_72 = {
  key: 0
};
var _hoisted_82 = {
  key: 1
};
var _hoisted_9 = {
  key: 2
};
var _hoisted_10 = {
  key: 1
};
var _hoisted_11 = {
  key: 1
};
var _hoisted_122 = {
  key: 2
};
var _hoisted_132 = ["onClick", "onDblclick", "onMouseenter", "onMouseleave", "onContextmenu", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave"];
var _hoisted_142 = ["colspan"];
var _hoisted_152 = {
  key: 0
};
var _hoisted_162 = ["colspan"];
var _hoisted_172 = {
  key: 2
};
var _hoisted_182 = ["colspan"];
function render26(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_table_mobile_sort = resolveComponent("o-table-mobile-sort");
  const _component_o_table_pagination = resolveComponent("o-table-pagination");
  const _component_o_checkbox = resolveComponent("o-checkbox");
  const _component_o_slot_component = resolveComponent("o-slot-component");
  const _component_o_icon = resolveComponent("o-icon");
  const _component_o_input = resolveComponent("o-input");
  const _component_o_loading = resolveComponent("o-loading");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.rootClasses)
    },
    [createBaseVNode(
      "div",
      _hoisted_118,
      [renderSlot(_ctx.$slots, "default")],
      512
      /* NEED_PATCH */
    ), _ctx.isMobile && _ctx.hasSortablenewColumns ? (openBlock(), createBlock(_component_o_table_mobile_sort, {
      key: 0,
      "current-sort-column": _ctx.currentSortColumn,
      columns: _ctx.newColumns,
      placeholder: _ctx.mobileSortPlaceholder,
      "icon-pack": _ctx.iconPack,
      "sort-icon": _ctx.sortIcon,
      "sort-icon-size": _ctx.sortIconSize,
      "is-asc": _ctx.isAsc,
      onSort: _cache[0] || (_cache[0] = (column, event) => _ctx.sort(column, null, event))
    }, null, 8, ["current-sort-column", "columns", "placeholder", "icon-pack", "sort-icon", "sort-icon-size", "is-asc"])) : createCommentVNode("v-if", true), _ctx.paginated && (_ctx.paginationPosition === "top" || _ctx.paginationPosition === "both") ? renderSlot(_ctx.$slots, "pagination", {
      key: 1
    }, () => [createVNode(_component_o_table_pagination, mergeProps(_ctx.$attrs, {
      "per-page": _ctx.perPage,
      paginated: _ctx.paginated,
      total: _ctx.newDataTotal,
      "current-page": _ctx.newCurrentPage,
      "onUpdate:currentPage": _cache[1] || (_cache[1] = ($event) => _ctx.newCurrentPage = $event),
      "root-class": _ctx.paginationWrapperClasses,
      "icon-pack": _ctx.iconPack,
      rounded: _ctx.paginationRounded,
      size: _ctx.paginationSize,
      onPageChange: _cache[2] || (_cache[2] = (event) => _ctx.$emit("page-change", event)),
      "aria-next-label": _ctx.ariaNextLabel,
      "aria-previous-label": _ctx.ariaPreviousLabel,
      "aria-page-label": _ctx.ariaPageLabel,
      "aria-current-label": _ctx.ariaCurrentLabel
    }), {
      default: withCtx(() => [renderSlot(_ctx.$slots, "top-left")]),
      _: 3
      /* FORWARDED */
    }, 16, ["per-page", "paginated", "total", "current-page", "root-class", "icon-pack", "rounded", "size", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label"])]) : createCommentVNode("v-if", true), createBaseVNode(
      "div",
      {
        class: normalizeClass(_ctx.tableWrapperClasses),
        style: normalizeStyle(_ctx.tableWrapperStyle)
      },
      [createBaseVNode("table", {
        class: normalizeClass(_ctx.tableClasses),
        tabindex: !_ctx.focusable ? null : 0,
        onKeydown: [_cache[3] || (_cache[3] = withKeys(withModifiers(($event) => _ctx.pressedArrow(-1), ["self", "prevent"]), ["up"])), _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => _ctx.pressedArrow(1), ["self", "prevent"]), ["down"]))]
      }, [_ctx.$slots.caption ? (openBlock(), createElementBlock("caption", _hoisted_36, [renderSlot(_ctx.$slots, "caption")])) : createCommentVNode("v-if", true), _ctx.newColumns.length && _ctx.showHeader ? (openBlock(), createElementBlock("thead", _hoisted_45, [renderSlot(_ctx.$slots, "preheader"), createBaseVNode("tr", null, [_ctx.showDetailRowIcon ? (openBlock(), createElementBlock(
        "th",
        {
          key: 0,
          class: normalizeClass(_ctx.thDetailedClasses)
        },
        null,
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true), _ctx.checkable && _ctx.checkboxPosition === "left" ? (openBlock(), createElementBlock(
        "th",
        {
          key: 1,
          class: normalizeClass(_ctx.thCheckboxClasses)
        },
        [_ctx.headerCheckable ? (openBlock(), createBlock(_component_o_checkbox, {
          key: 0,
          autocomplete: "off",
          modelValue: _ctx.isAllChecked,
          disabled: _ctx.isAllUncheckable,
          "onUpdate:modelValue": _ctx.checkAll
        }, null, 8, ["modelValue", "disabled", "onUpdate:modelValue"])) : createCommentVNode("v-if", true)],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true), (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.visibleColumns, (column, index30) => {
          return openBlock(), createElementBlock("th", mergeProps({
            key: column.newKey + ":" + index30 + "header"
          }, column.thAttrsData, {
            class: _ctx.thClasses(column),
            style: _ctx.isMobile ? {} : column.style,
            onClick: withModifiers(($event) => _ctx.sort(column, null, $event), ["stop"]),
            draggable: _ctx.canDragColumn,
            onDragstart: ($event) => _ctx.handleColumnDragStart($event, column, index30),
            onDragend: ($event) => _ctx.handleColumnDragEnd($event, column, index30),
            onDrop: ($event) => _ctx.handleColumnDrop($event, column, index30),
            onDragover: ($event) => _ctx.handleColumnDragOver($event, column, index30),
            onDragleave: ($event) => _ctx.handleColumnDragLeave($event, column, index30)
          }), [column.hasHeaderSlot ? (openBlock(), createBlock(_component_o_slot_component, {
            key: 0,
            component: column,
            name: "header",
            tag: "span",
            props: {
              column,
              index: index30
            }
          }, null, 8, ["component", "props"])) : (openBlock(), createElementBlock("span", _hoisted_62, [createTextVNode(
            toDisplayString(column.label) + " ",
            1
            /* TEXT */
          ), withDirectives(createBaseVNode(
            "span",
            {
              class: normalizeClass(_ctx.thSortIconClasses())
            },
            [createVNode(_component_o_icon, {
              icon: _ctx.sortIcon,
              pack: _ctx.iconPack,
              both: "",
              size: _ctx.sortIconSize,
              rotation: !_ctx.isAsc ? 180 : 0
            }, null, 8, ["icon", "pack", "size", "rotation"])],
            2
            /* CLASS */
          ), [[vShow, column.sortable && _ctx.currentSortColumn === column]])]))], 16, _hoisted_52);
        }),
        128
        /* KEYED_FRAGMENT */
      )), _ctx.checkable && _ctx.checkboxPosition === "right" ? (openBlock(), createElementBlock(
        "th",
        {
          key: 2,
          class: normalizeClass(_ctx.thCheckboxClasses)
        },
        [_ctx.headerCheckable ? (openBlock(), createBlock(_component_o_checkbox, {
          key: 0,
          autocomplete: "off",
          modelValue: _ctx.isAllChecked,
          disabled: _ctx.isAllUncheckable,
          "onUpdate:modelValue": _ctx.checkAll
        }, null, 8, ["modelValue", "disabled", "onUpdate:modelValue"])) : createCommentVNode("v-if", true)],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true)]), _ctx.hasSearchablenewColumns ? (openBlock(), createElementBlock("tr", _hoisted_72, [_ctx.showDetailRowIcon ? (openBlock(), createElementBlock(
        "th",
        {
          key: 0,
          class: normalizeClass(_ctx.thDetailedClasses)
        },
        null,
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true), _ctx.checkable && _ctx.checkboxPosition === "left" ? (openBlock(), createElementBlock("th", _hoisted_82)) : createCommentVNode("v-if", true), (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.visibleColumns, (column, index30) => {
          return openBlock(), createElementBlock(
            "th",
            mergeProps({
              key: column.newKey + ":" + index30 + "searchable"
            }, column.thAttrsData, {
              class: _ctx.thClasses(column),
              style: _ctx.isMobile ? {} : column.style
            }),
            [column.searchable ? (openBlock(), createElementBlock(
              Fragment,
              {
                key: 0
              },
              [column.hasSearchableSlot ? (openBlock(), createBlock(_component_o_slot_component, {
                key: 0,
                component: column,
                name: "searchable",
                tag: "span",
                props: {
                  column,
                  filters: _ctx.filters
                }
              }, null, 8, ["component", "props"])) : (openBlock(), createBlock(_component_o_input, mergeProps({
                key: 1,
                [toHandlerKey(_ctx.filtersEvent)]: _ctx.onFiltersEvent
              }, {
                modelValue: _ctx.filters[column.field],
                "onUpdate:modelValue": ($event) => _ctx.filters[column.field] = $event,
                type: column.numeric ? "number" : "text"
              }), null, 16, ["modelValue", "onUpdate:modelValue", "type"]))],
              64
              /* STABLE_FRAGMENT */
            )) : createCommentVNode("v-if", true)],
            16
            /* FULL_PROPS */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )), _ctx.checkable && _ctx.checkboxPosition === "right" ? (openBlock(), createElementBlock("th", _hoisted_9)) : createCommentVNode("v-if", true)])) : createCommentVNode("v-if", true), _ctx.hasCustomSubheadings ? (openBlock(), createElementBlock("tr", _hoisted_10, [_ctx.showDetailRowIcon ? (openBlock(), createElementBlock(
        "th",
        {
          key: 0,
          class: normalizeClass(_ctx.thDetailedClasses)
        },
        null,
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true), _ctx.checkable && _ctx.checkboxPosition === "left" ? (openBlock(), createElementBlock("th", _hoisted_11)) : createCommentVNode("v-if", true), (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.visibleColumns, (column, index30) => {
          return openBlock(), createElementBlock(
            "th",
            {
              key: column.newKey + ":" + index30 + "subheading",
              style: normalizeStyle(_ctx.isMobile ? {} : column.style),
              class: normalizeClass(_ctx.thSubheadingClasses)
            },
            [column.$slots && column.$slots.subheading ? (openBlock(), createBlock(_component_o_slot_component, {
              key: 0,
              component: column,
              name: "subheading",
              tag: "span",
              props: {
                column,
                index: index30
              }
            }, null, 8, ["component", "props"])) : (openBlock(), createElementBlock(
              Fragment,
              {
                key: 1
              },
              [createTextVNode(
                toDisplayString(column.subheading),
                1
                /* TEXT */
              )],
              64
              /* STABLE_FRAGMENT */
            ))],
            6
            /* CLASS, STYLE */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )), _ctx.checkable && _ctx.checkboxPosition === "right" ? (openBlock(), createElementBlock("th", _hoisted_122)) : createCommentVNode("v-if", true)])) : createCommentVNode("v-if", true)])) : createCommentVNode("v-if", true), createBaseVNode("tbody", null, [(openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.visibleData, (row, index30) => {
          return openBlock(), createElementBlock(
            Fragment,
            {
              key: this.customRowKey ? row[this.customRowKey] : index30
            },
            [createBaseVNode("tr", {
              class: normalizeClass(_ctx.rowClasses(row, index30)),
              onClick: ($event) => _ctx.selectRow(row, index30),
              onDblclick: ($event) => _ctx.$emit("dblclick", row),
              onMouseenter: ($event) => _ctx.emitEventForRow("mouseenter", $event, row),
              onMouseleave: ($event) => _ctx.emitEventForRow("mouseleave", $event, row),
              onContextmenu: ($event) => _ctx.$emit("contextmenu", row, $event),
              draggable: _ctx.canDragRow,
              onDragstart: ($event) => _ctx.handleDragStart($event, row, index30),
              onDragend: ($event) => _ctx.handleDragEnd($event, row, index30),
              onDrop: ($event) => _ctx.handleDrop($event, row, index30),
              onDragover: ($event) => _ctx.handleDragOver($event, row, index30),
              onDragleave: ($event) => _ctx.handleDragLeave($event, row, index30)
            }, [_ctx.showDetailRowIcon ? (openBlock(), createElementBlock(
              "td",
              {
                key: 0,
                class: normalizeClass(_ctx.tdDetailedChevronClasses)
              },
              [_ctx.hasDetailedVisible(row) ? (openBlock(), createBlock(_component_o_icon, {
                key: 0,
                icon: _ctx.detailIcon,
                pack: _ctx.iconPack,
                rotation: _ctx.isVisibleDetailRow(row) ? 90 : 0,
                role: "button",
                onClick: withModifiers(($event) => _ctx.toggleDetails(row), ["stop"]),
                clickable: "",
                both: ""
              }, null, 8, ["icon", "pack", "rotation", "onClick"])) : createCommentVNode("v-if", true)],
              2
              /* CLASS */
            )) : createCommentVNode("v-if", true), _ctx.checkable && _ctx.checkboxPosition === "left" ? (openBlock(), createElementBlock(
              "td",
              {
                key: 1,
                class: normalizeClass(_ctx.tdCheckboxClasses)
              },
              [createVNode(_component_o_checkbox, {
                autocomplete: "off",
                disabled: !_ctx.isRowCheckable(row),
                modelValue: _ctx.isRowChecked(row),
                "onUpdate:modelValue": ($event) => _ctx.checkRow(row, index30, $event)
              }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue"])],
              2
              /* CLASS */
            )) : createCommentVNode("v-if", true), (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(_ctx.visibleColumns, (column, colindex) => {
                return openBlock(), createBlock(_component_o_slot_component, mergeProps({
                  key: column.newKey + index30 + ":" + colindex
                }, column.tdAttrsData[index30], {
                  component: column,
                  name: "default",
                  tag: "td",
                  class: _ctx.tdClasses(row, column),
                  style: _ctx.isMobile ? {} : column.style,
                  "data-label": column.label,
                  props: {
                    row,
                    column,
                    index: index30,
                    colindex,
                    toggleDetails: _ctx.toggleDetails
                  },
                  onClick: ($event) => _ctx.$emit("cell-click", row, column, index30, colindex, $event)
                }), null, 16, ["component", "class", "style", "data-label", "props", "onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            )), _ctx.checkable && _ctx.checkboxPosition === "right" ? (openBlock(), createElementBlock(
              "td",
              {
                key: 2,
                class: normalizeClass(_ctx.tdCheckboxClasses)
              },
              [createVNode(_component_o_checkbox, {
                autocomplete: "off",
                disabled: !_ctx.isRowCheckable(row),
                modelValue: _ctx.isRowChecked(row),
                "onUpdate:modelValue": ($event) => _ctx.checkRow(row, index30, $event)
              }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue"])],
              2
              /* CLASS */
            )) : createCommentVNode("v-if", true)], 42, _hoisted_132), createVNode(Transition, {
              name: _ctx.detailTransition
            }, {
              default: withCtx(() => [_ctx.isActiveDetailRow(row) ? (openBlock(), createElementBlock(
                "tr",
                {
                  key: (_ctx.customRowKey ? row[_ctx.customRowKey] : index30) + "detail",
                  class: normalizeClass(_ctx.detailedClasses)
                },
                [createBaseVNode("td", {
                  colspan: _ctx.columnCount
                }, [renderSlot(_ctx.$slots, "detail", {
                  row,
                  index: index30
                })], 8, _hoisted_142)],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true)]),
              _: 2
              /* DYNAMIC */
            }, 1032, ["name"]), _ctx.isActiveCustomDetailRow(row) ? renderSlot(_ctx.$slots, "detail", {
              key: 0,
              row,
              index: index30
            }) : createCommentVNode("v-if", true)],
            64
            /* STABLE_FRAGMENT */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )), !_ctx.visibleData.length ? (openBlock(), createElementBlock("tr", _hoisted_152, [createBaseVNode("td", {
        colspan: _ctx.columnCount
      }, [renderSlot(_ctx.$slots, "empty")], 8, _hoisted_162)])) : createCommentVNode("v-if", true)]), _ctx.$slots.footer ? (openBlock(), createElementBlock("tfoot", _hoisted_172, [createBaseVNode(
        "tr",
        {
          class: normalizeClass(_ctx.footerClasses)
        },
        [_ctx.hasCustomFooterSlot() ? renderSlot(_ctx.$slots, "footer", {
          key: 0
        }) : (openBlock(), createElementBlock("th", {
          key: 1,
          colspan: _ctx.columnCount
        }, [renderSlot(_ctx.$slots, "footer")], 8, _hoisted_182))],
        2
        /* CLASS */
      )])) : createCommentVNode("v-if", true)], 42, _hoisted_216), renderSlot(_ctx.$slots, "loading", {}, () => [createVNode(_component_o_loading, {
        "full-page": false,
        active: _ctx.loading
      }, null, 8, ["active"])])],
      6
      /* CLASS, STYLE */
    ), _ctx.checkable && _ctx.$slots["bottom-left"] || _ctx.paginated && (_ctx.paginationPosition === "bottom" || _ctx.paginationPosition === "both") ? renderSlot(_ctx.$slots, "pagination", {
      key: 2
    }, () => [createVNode(_component_o_table_pagination, mergeProps(_ctx.$attrs, {
      "per-page": _ctx.perPage,
      paginated: _ctx.paginated,
      total: _ctx.newDataTotal,
      "current-page": _ctx.newCurrentPage,
      "onUpdate:currentPage": _cache[5] || (_cache[5] = ($event) => _ctx.newCurrentPage = $event),
      "root-class": _ctx.paginationWrapperClasses,
      "icon-pack": _ctx.iconPack,
      rounded: _ctx.paginationRounded,
      size: _ctx.paginationSize,
      onPageChange: _cache[6] || (_cache[6] = (event) => _ctx.$emit("page-change", event)),
      "aria-next-label": _ctx.ariaNextLabel,
      "aria-previous-label": _ctx.ariaPreviousLabel,
      "aria-page-label": _ctx.ariaPageLabel,
      "aria-current-label": _ctx.ariaCurrentLabel
    }), {
      default: withCtx(() => [renderSlot(_ctx.$slots, "bottom-left")]),
      _: 3
      /* FORWARDED */
    }, 16, ["per-page", "paginated", "total", "current-page", "root-class", "icon-pack", "rounded", "size", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label"])]) : createCommentVNode("v-if", true)],
    2
    /* CLASS */
  );
}
script27.render = render26;
script27.__file = "src/components/table/Table.vue";
var index25 = {
  install(app) {
    registerComponent(app, script27);
    registerComponent(app, script$24);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/tabs.mjs
var script$111 = defineComponent({
  name: "OTabs",
  mixins: [BaseComponentMixin, TabbedMixin("tab")],
  configField: "tabs",
  props: {
    /**
     * Tab type
     * @values boxed, toggle
     */
    type: {
      type: String,
      default: "default"
    },
    /**
    * Tabs will be expanded (full-width)
    */
    expanded: Boolean,
    /** Tab will have an animation */
    animated: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), "tabs.animated", true);
      }
    },
    /** Show tab items multiline when there is no space */
    multiline: Boolean,
    rootClass: [String, Function, Array],
    positionClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    verticalClass: [String, Function, Array],
    multilineClass: [String, Function, Array],
    navTabsClass: [String, Function, Array],
    navSizeClass: [String, Function, Array],
    navPositionClass: [String, Function, Array],
    navTypeClass: [String, Function, Array],
    contentClass: [String, Function, Array],
    transitioningClass: [String, Function, Array],
    tabItemWrapperClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-tabs"),
        { [this.computedClass("positionClass", "o-tabs--", this.position)]: this.position && this.vertical },
        { [this.computedClass("expandedClass", "o-tabs--fullwidth")]: this.expanded },
        { [this.computedClass("verticalClass", "o-tabs--vertical")]: this.vertical },
        { [this.computedClass("multilineClass", "o-tabs--multiline")]: this.multiline }
      ];
    },
    itemWrapperClasses() {
      return [
        this.computedClass("tabItemWrapperClass", "o-tabs__nav-item-wrapper")
      ];
    },
    navClasses() {
      return [
        this.computedClass("navTabsClass", "o-tabs__nav"),
        { [this.computedClass("navSizeClass", "o-tabs__nav--", this.size)]: this.size },
        { [this.computedClass("navPositionClass", "o-tabs__nav--", this.position)]: this.position && !this.vertical },
        { [this.computedClass("navTypeClass", "o-tabs__nav--", this.type)]: this.type }
      ];
    },
    contentClasses() {
      return [
        this.computedClass("contentClass", "o-tabs__content"),
        { [this.computedClass("transitioningClass", "o-tabs__content--transitioning")]: this.isTransitioning }
      ];
    }
  }
});
var _hoisted_119 = ["aria-orientation"];
var _hoisted_217 = ["aria-controls", "aria-selected"];
function render27(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_slot_component = resolveComponent("o-slot-component");
  const _component_o_icon = resolveComponent("o-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.rootClasses)
    },
    [createBaseVNode("nav", {
      class: normalizeClass(_ctx.navClasses),
      role: "tablist",
      "aria-orientation": _ctx.vertical ? "vertical" : "horizontal"
    }, [renderSlot(_ctx.$slots, "start"), (openBlock(true), createElementBlock(
      Fragment,
      null,
      renderList(_ctx.items, (childItem) => {
        return withDirectives((openBlock(), createElementBlock("div", {
          key: childItem.newValue,
          onKeydown: [_cache[0] || (_cache[0] = withKeys(withModifiers((...args) => _ctx.prev && _ctx.prev(...args), ["prevent"]), ["left"])), _cache[1] || (_cache[1] = withKeys(withModifiers((...args) => _ctx.next && _ctx.next(...args), ["prevent"]), ["right"])), _cache[2] || (_cache[2] = withKeys(withModifiers((...args) => _ctx.prev && _ctx.prev(...args), ["prevent"]), ["up"])), _cache[3] || (_cache[3] = withKeys(withModifiers((...args) => _ctx.next && _ctx.next(...args), ["prevent"]), ["down"])), _cache[4] || (_cache[4] = withKeys(withModifiers((...args) => _ctx.homePressed && _ctx.homePressed(...args), ["prevent"]), ["home"])), _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => _ctx.endPressed && _ctx.endPressed(...args), ["prevent"]), ["end"]))],
          class: normalizeClass(_ctx.itemWrapperClasses),
          role: "tab",
          "aria-controls": `${childItem.value}-content`,
          "aria-selected": childItem.isActive ? "true" : "false"
        }, [childItem.$slots.header ? (openBlock(), createBlock(_component_o_slot_component, {
          key: 0,
          component: childItem,
          tag: childItem.tag,
          name: "header",
          onClick: ($event) => _ctx.childClick(childItem),
          onKeydown: [withKeys(withModifiers(_ctx.prev, ["prevent"]), ["left"]), withKeys(withModifiers(_ctx.next, ["prevent"]), ["right"]), withKeys(withModifiers(_ctx.prev, ["prevent"]), ["up"]), withKeys(withModifiers(_ctx.next, ["prevent"]), ["down"]), withKeys(withModifiers(_ctx.homePressed, ["prevent"]), ["home"]), withKeys(withModifiers(_ctx.endPressed, ["prevent"]), ["end"])],
          class: normalizeClass(childItem.headerClasses)
        }, null, 8, ["component", "tag", "onClick", "onKeydown", "class"])) : (openBlock(), createBlock(resolveDynamicComponent(childItem.tag), {
          key: 1,
          onClick: ($event) => _ctx.childClick(childItem),
          class: normalizeClass(childItem.headerClasses)
        }, {
          default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_component_o_icon, {
            key: 0,
            rootClass: childItem.headerIconClasses,
            icon: childItem.icon,
            pack: childItem.iconPack,
            size: _ctx.size
          }, null, 8, ["rootClass", "icon", "pack", "size"])) : createCommentVNode("v-if", true), createBaseVNode(
            "span",
            {
              class: normalizeClass(childItem.headerTextClasses)
            },
            toDisplayString(childItem.label),
            3
            /* TEXT, CLASS */
          )]),
          _: 2
          /* DYNAMIC */
        }, 1032, ["onClick", "class"]))], 42, _hoisted_217)), [[vShow, childItem.visible]]);
      }),
      128
      /* KEYED_FRAGMENT */
    )), renderSlot(_ctx.$slots, "end")], 10, _hoisted_119), createBaseVNode(
      "section",
      {
        class: normalizeClass(_ctx.contentClasses)
      },
      [renderSlot(_ctx.$slots, "default")],
      2
      /* CLASS */
    )],
    2
    /* CLASS */
  );
}
script$111.render = render27;
script$111.__file = "src/components/tabs/Tabs.vue";
var script28 = defineComponent({
  name: "OTabItem",
  mixins: [BaseComponentMixin, TabbedChildMixin("tab")],
  configField: "tabs",
  props: {
    /** Item will be disabled */
    disabled: Boolean,
    /**
     * Tabs item tag name
     */
    tag: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), "tabs.itemTag", "button");
      }
    },
    itemClass: [String, Function, Array],
    itemHeaderClass: [String, Function, Array],
    itemHeaderActiveClass: [String, Function, Array],
    itemHeaderDisabledClass: [String, Function, Array],
    itemHeaderTypeClass: [String, Function, Array],
    itemHeaderIconClass: [String, Function, Array],
    itemHeaderTextClass: [String, Function, Array]
  },
  computed: {
    elementClasses() {
      return [
        this.computedClass("itemClass", "o-tab-item__content")
      ];
    },
    headerClasses() {
      return [
        this.computedClass("itemHeaderClass", "o-tabs__nav-item"),
        { [this.computedClass("itemHeaderActiveClass", "o-tabs__nav-item-{*}--active", this.parent.type)]: this.isActive },
        { [this.computedClass("itemHeaderDisabledClass", "o-tabs__nav-item-{*}--disabled", this.parent.type)]: this.disabled },
        { [this.computedClass("itemHeaderTypeClass", "o-tabs__nav-item-", this.parent.type)]: this.parent.type }
      ];
    },
    headerIconClasses() {
      return [
        this.computedClass("itemHeaderIconClass", "o-tabs__nav-item-icon")
      ];
    },
    headerTextClasses() {
      return [
        this.computedClass("itemHeaderTextClass", "o-tabs__nav-item-text")
      ];
    }
  }
});
script28.__file = "src/components/tabs/TabItem.vue";
var index26 = {
  install(app) {
    registerComponent(app, script$111);
    registerComponent(app, script28);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/timepicker.mjs
var index27 = {
  install(app) {
    registerComponent(app, script12);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/tooltip.mjs
var index28 = {
  install(app) {
    registerComponent(app, script23);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/upload.mjs
var script29 = defineComponent({
  name: "OUpload",
  mixins: [BaseComponentMixin, FormElementMixin],
  configField: "upload",
  inheritAttrs: false,
  emits: ["update:modelValue"],
  props: {
    /** @model */
    modelValue: [Object, File, Array],
    /** Same as native, also push new item to v-model instead of replacing */
    multiple: Boolean,
    /** Same as native disabled */
    disabled: Boolean,
    /** Same as native accept */
    accept: String,
    /** Accepts drag & drop and change its style */
    dragDrop: Boolean,
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: {
      type: String
    },
    /** Replace last chosen files every time (like native file input element) */
    native: {
      type: Boolean,
      default: false
    },
    /** Upload will be expanded (full-width) */
    expanded: {
      type: Boolean,
      default: false
    },
    rootClass: [String, Function, Array],
    draggableClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    hoveredClass: [String, Function, Array]
  },
  data() {
    return {
      newValue: this.modelValue,
      dragDropFocus: false
    };
  },
  computed: {
    rootClasses() {
      return [
        this.computedClass("rootClass", "o-upl"),
        { [this.computedClass("expandedClass", "o-upl--expanded")]: this.expanded },
        { [this.computedClass("disabledClass", "o-upl--disabled")]: this.disabled }
      ];
    },
    draggableClasses() {
      return [
        this.computedClass("draggableClass", "o-upl__draggable"),
        { [this.computedClass("hoveredClass", "o-upl__draggable--hovered")]: !this.variant && this.dragDropFocus },
        { [this.computedClass("variantClass", "o-upl__draggable--hovered-", this.variant)]: this.variant && this.dragDropFocus }
      ];
    },
    $elementRef() {
      return "input";
    }
  },
  watch: {
    /**
     *   When v-model is changed:
     *   1. Set internal value.
     *   2. Reset interna input file value
     *   3. If it's invalid, validate again.
     */
    modelValue(value) {
      this.newValue = value;
      if (!value || Array.isArray(value) && value.length === 0) {
        this.$refs.input.value = null;
      }
      !this.isValid && !this.dragDrop && this.checkHtml5Validity();
    }
  },
  methods: {
    /**
    * Listen change event on input type 'file',
    * emit 'input' event and validate
    */
    onFileChange(event) {
      if (this.disabled)
        return;
      if (this.dragDrop)
        this.updateDragDropFocus(false);
      const value = event.target.files || event.dataTransfer.files;
      if (value.length === 0) {
        if (!this.newValue)
          return;
        if (this.native)
          this.newValue = null;
      } else if (!this.multiple) {
        if (this.dragDrop && value.length !== 1)
          return;
        else {
          const file = value[0];
          if (this.checkType(file))
            this.newValue = file;
          else if (this.newValue) {
            this.newValue = null;
            this.clearInput();
          } else {
            this.clearInput();
            this.checkHtml5Validity();
            return;
          }
        }
      } else {
        let newValues = false;
        if (this.native || !this.newValue) {
          this.newValue = [];
          newValues = true;
        }
        for (let i = 0; i < value.length; i++) {
          const file = value[i];
          if (this.checkType(file)) {
            this.newValue.push(file);
            newValues = true;
          }
        }
        if (!newValues)
          return;
      }
      this.$emit("update:modelValue", this.newValue);
      !this.dragDrop && this.checkHtml5Validity();
    },
    /*
    * Reset file input value
    */
    clearInput() {
      this.$refs.input.value = null;
    },
    /**
    * Listen drag-drop to update internal variable
    */
    updateDragDropFocus(focus) {
      if (!this.disabled) {
        this.dragDropFocus = focus;
      }
    },
    /**
    * Check mime type of file
    */
    checkType(file) {
      if (!this.accept)
        return true;
      const types = this.accept.split(",");
      if (types.length === 0)
        return true;
      for (let i = 0; i < types.length; i++) {
        const type = types[i].trim();
        if (type) {
          if (type.substring(0, 1) === ".") {
            const extension = file.name.toLowerCase().slice(-type.length);
            if (extension === type.toLowerCase()) {
              return true;
            }
          } else {
            if (file.type.match(type))
              return true;
          }
        }
      }
      return false;
    }
  }
});
var _hoisted_120 = ["multiple", "accept", "disabled"];
function render28(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "label",
    {
      class: normalizeClass(_ctx.rootClasses)
    },
    [!_ctx.dragDrop ? renderSlot(_ctx.$slots, "default", {
      key: 0
    }) : (openBlock(), createElementBlock(
      "div",
      {
        key: 1,
        class: normalizeClass(_ctx.draggableClasses),
        onMouseenter: _cache[0] || (_cache[0] = ($event) => _ctx.updateDragDropFocus(true)),
        onMouseleave: _cache[1] || (_cache[1] = ($event) => _ctx.updateDragDropFocus(false)),
        onDragover: _cache[2] || (_cache[2] = withModifiers(($event) => _ctx.updateDragDropFocus(true), ["prevent"])),
        onDragleave: _cache[3] || (_cache[3] = withModifiers(($event) => _ctx.updateDragDropFocus(false), ["prevent"])),
        onDragenter: _cache[4] || (_cache[4] = withModifiers(($event) => _ctx.updateDragDropFocus(true), ["prevent"])),
        onDrop: _cache[5] || (_cache[5] = withModifiers((...args) => _ctx.onFileChange && _ctx.onFileChange(...args), ["prevent"]))
      },
      [renderSlot(_ctx.$slots, "default")],
      34
      /* CLASS, HYDRATE_EVENTS */
    )), createBaseVNode("input", mergeProps({
      ref: "input",
      type: "file"
    }, _ctx.$attrs, {
      multiple: _ctx.multiple,
      accept: _ctx.accept,
      disabled: _ctx.disabled,
      onChange: _cache[6] || (_cache[6] = (...args) => _ctx.onFileChange && _ctx.onFileChange(...args))
    }), null, 16, _hoisted_120)],
    2
    /* CLASS */
  );
}
script29.render = render28;
script29.__file = "src/components/upload/Upload.vue";
var index29 = {
  install(app) {
    registerComponent(app, script29);
  }
};

// node_modules/@oruga-ui/oruga-next/dist/esm/index.mjs
var plugins = Object.freeze({
  __proto__: null,
  Autocomplete: index,
  Button: index2,
  Carousel: index3,
  Checkbox: index4,
  Collapse: index5,
  Datepicker: index6,
  Datetimepicker: index7,
  Dropdown: index8,
  Field: index9,
  Icon: index10,
  Input: index11,
  Inputitems: index12,
  Loading: index13,
  Menu: index14,
  Modal: index15,
  Notification: index16,
  Pagination: index17,
  Radio: index18,
  Select: index19,
  Skeleton: index20,
  Sidebar: index21,
  Slider: index22,
  Steps: index23,
  Switch: index24,
  Table: index25,
  Tabs: index26,
  Timepicker: index27,
  Tooltip: index28,
  Upload: index29
});
var Oruga = {
  install(app, options = {}) {
    setVueInstance(app);
    const defaultConfig = getOptions();
    setOptions(merge(defaultConfig, options, true));
    for (const componentKey in plugins) {
      registerPlugin(app, plugins[componentKey]);
    }
    registerComponentProgrammatic(app, "config", Programmatic);
  }
};

export {
  Programmatic,
  Plugin,
  useProgrammatic,
  script,
  script2,
  script3,
  index,
  script4,
  index2,
  script$1,
  script5,
  index3,
  script6,
  index4,
  script7,
  index5,
  script$12,
  script8,
  script9,
  script10,
  script11,
  index6,
  script12,
  script13,
  index7,
  index8,
  index9,
  index10,
  index11,
  script14,
  index12,
  script15,
  LoadingProgrammatic,
  index13,
  script$22 as script$2,
  script$15 as script$13,
  script16,
  index14,
  script17,
  ModalProgrammatic,
  index15,
  script$16 as script$14,
  NotificationProgrammatic,
  index16,
  script$17 as script$15,
  script19 as script18,
  index17,
  script20 as script19,
  index18,
  index19,
  script21 as script20,
  index20,
  script22 as script21,
  index21,
  script23 as script22,
  script$18 as script$16,
  script24 as script23,
  index22,
  script$19 as script$17,
  script25 as script24,
  index23,
  script26 as script25,
  index24,
  script$24 as script$22,
  script27 as script26,
  index25,
  script$111 as script$18,
  script28 as script27,
  index26,
  index27,
  index28,
  script29 as script28,
  index29,
  Oruga
};
//# sourceMappingURL=chunk-5ITWY74L.js.map
