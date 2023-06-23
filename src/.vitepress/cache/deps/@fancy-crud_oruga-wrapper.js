import {
  Fn,
  _n,
  bn,
  dn,
  fn,
  gn,
  mn,
  un,
  vn,
  yn
} from "./chunk-ZADJDYWD.js";
import {
  script,
  script$22 as script$2,
  script10 as script6,
  script11 as script7,
  script17 as script8,
  script19 as script9,
  script2,
  script26 as script10,
  script28 as script11,
  script4 as script3,
  script6 as script4,
  script9 as script5
} from "./chunk-5ITWY74L.js";
import {
  Fragment,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  defineComponent,
  getCurrentInstance,
  h,
  isRef,
  mergeProps,
  normalizeClass,
  openBlock,
  popScopeId,
  pushScopeId,
  ref,
  renderList,
  renderSlot,
  resolveComponent,
  toDisplayString,
  unref,
  watch,
  withCtx
} from "./chunk-ODOPCOSX.js";
import "./chunk-GKWPUQBP.js";

// node_modules/@fancy-crud/oruga-wrapper/dist/fancy-crud-oruga-wrapper.mjs
var we = (e) => (pushScopeId("data-v-e2c0b7b9"), e = e(), popScopeId(), e);
var he = {
  key: 0,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
var Oe = we(() => createBaseVNode("path", {
  d: "M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z",
  class: "button__loading"
}, null, -1));
var xe = [
  Oe
];
var ke = defineComponent({
  __name: "LoadingIcon",
  props: {
    isLoading: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (a, l) => t.isLoading ? (openBlock(), createElementBlock("svg", he, xe)) : createCommentVNode("", true);
  }
});
var Ie = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [l, o] of t)
    a[l] = o;
  return a;
};
var Ce = Ie(ke, [["__scopeId", "data-v-e2c0b7b9"]]);
var Se = defineComponent({
  props: {
    icon: { type: String, default: () => "" },
    borderless: { type: Boolean, default: () => false },
    isLoading: { type: Boolean, default: () => false }
  },
  setup(e, { attrs: t, slots: a }) {
    const l = computed(() => t.pack ? t.pack : "mdi"), o = computed(() => e.isLoading ? {
      default: () => h(Ce, { isLoading: e.isLoading })
    } : {});
    return () => h(script3, { ...t, pack: l, iconRight: e.icon, inverted: e.borderless }, {
      ...o.value,
      ...a
    });
  }
});
var U;
var T = typeof window < "u";
var Ve = (e) => typeof e < "u";
var Fe = (e) => typeof e == "function";
T && ((U = window == null ? void 0 : window.navigator) == null ? void 0 : U.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Te(e) {
  return e;
}
T && window.document;
T && window.navigator;
T && window.location;
function Ee(e) {
  return JSON.parse(JSON.stringify(e));
}
var $ = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var B = "__vueuse_ssr_handlers__";
$[B] = $[B] || {};
$[B];
var z;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(z || (z = {}));
var $e = Object.defineProperty;
var J = Object.getOwnPropertySymbols;
var Be = Object.prototype.hasOwnProperty;
var Ne = Object.prototype.propertyIsEnumerable;
var K = (e, t, a) => t in e ? $e(e, t, { enumerable: true, configurable: true, writable: true, value: a }) : e[t] = a;
var Pe = (e, t) => {
  for (var a in t || (t = {}))
    Be.call(t, a) && K(e, a, t[a]);
  if (J)
    for (var a of J(t))
      Ne.call(t, a) && K(e, a, t[a]);
  return e;
};
var qe = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
Pe({
  linear: Te
}, qe);
function Le(e, t, a, l = {}) {
  var o, r, n;
  const {
    clone: i = false,
    passive: v = false,
    eventName: u,
    deep: c = false,
    defaultValue: f
  } = l, p = getCurrentInstance(), O = a || (p == null ? void 0 : p.emit) || ((o = p == null ? void 0 : p.$emit) == null ? void 0 : o.bind(p)) || ((n = (r = p == null ? void 0 : p.proxy) == null ? void 0 : r.$emit) == null ? void 0 : n.bind(p == null ? void 0 : p.proxy));
  let g = u;
  t || (t = "modelValue"), g = u || g || `update:${t.toString()}`;
  const x = (y) => i ? Fe(i) ? i(y) : Ee(y) : y, k = () => Ve(e[t]) ? x(e[t]) : f;
  if (v) {
    const y = k(), E = ref(y);
    return watch(() => e[t], (V) => E.value = x(V)), watch(E, (V) => {
      (V !== e[t] || c) && O(g, V);
    }, { deep: c }), E;
  } else
    return computed({
      get() {
        return k();
      },
      set(y) {
        O(g, y);
      }
    });
}
var Re = defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: () => false
    }
  },
  emits: {
    "update:modelValue": (e) => true
  },
  setup(e, { attrs: t, slots: a, emit: l }) {
    const o = Le(e, "modelValue", l);
    return () => h(script8, { ...t, active: o.value, "onUpdate:active": (r) => o.value = r, width: "960", scroll: "clip" }, a);
  }
});
var Ze = un({
  button: Se,
  modal: Re
});
var je = defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true
    },
    field: {
      type: Object,
      required: true
    }
  },
  setup(e, { attrs: t, slots: a }) {
    const { hasFieldErrors: l, hintText: o, vmodel: r } = dn(e), n = computed(() => l.value ? "danger" : "");
    return () => h(script5, { ...e.field.wrapper, label: e.field.label, message: o.value, variant: n.value }, {
      default: () => h(script2, { ...t, ...e.field, ...r }),
      ...a
    });
  }
});
var De = defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true
    },
    field: {
      type: Object,
      required: true
    }
  },
  setup(e, { attrs: t, slots: a }) {
    const { hasFieldErrors: l, hintText: o, vmodel: r } = gn(e), n = computed(() => l.value ? "danger" : "");
    return () => h(script5, { ...e.field.wrapper, label: e.field.label, message: o.value, variant: n.value }, {
      default: () => h(script2, { ...t, ...e.field, ...r }, a)
    });
  }
});
var Qe = defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true
    },
    field: {
      type: Object,
      required: true
    }
  },
  setup(e, { attrs: t, slots: a }) {
    const { vmodel: l, hasFieldErrors: o, hintText: r } = mn(e), n = computed(() => o.value ? "danger" : "");
    return () => h(script5, { ...e.field.wrapper, label: e.field.label, message: r.value, variant: n.value }, {
      default: () => h(script2, { ...t, ...e.field, ...l }, a)
    });
  }
});
var Ae = defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true
    },
    field: {
      type: Object,
      required: true
    }
  },
  setup(e, { attrs: t, slots: a }) {
    const { vmodel: l, hasFieldErrors: o, hintText: r, options: n, attrs: i } = yn(e), v = computed(() => o.value ? "danger" : "");
    function u() {
      return n.value.map(
        ([c, f]) => h(
          "option",
          { value: f },
          {
            default: () => String(c),
            ...a
          }
        )
      );
    }
    return () => h(script5, { ...e.field.wrapper, label: e.field.label, message: r.value, variant: v.value }, {
      default: () => h(script6, { ...t, attrs: i, ...l, expanded: true }, {
        default: () => u()
      })
    });
  }
});
var Ue = defineComponent({
  __name: "Radio",
  props: {
    formId: {},
    field: {}
  },
  setup(e) {
    const t = e, a = Symbol(t.field.modelKey).toString(), { modelValue: l, hasFieldErrors: o, hintText: r, inRowDisplay: n, options: i } = fn(t), v = computed(() => n.value ? n.value : "radio-group--cascade"), u = computed(() => o.value ? "danger" : "");
    return (c, f) => {
      const p = resolveComponent("o-field");
      return openBlock(), createBlock(p, mergeProps(t.field.wrapper, {
        label: t.field.label,
        variant: unref(u),
        message: unref(r)
      }), {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(unref(v))
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(i), ([O, g], x) => (openBlock(), createBlock(unref(script9), mergeProps({ key: x }, t.field, {
              modelValue: unref(l),
              "onUpdate:modelValue": f[0] || (f[0] = (k) => isRef(l) ? l.value = k : null),
              name: unref(a),
              "native-value": g
            }), {
              default: withCtx(() => [
                createTextVNode(toDisplayString(O), 1)
              ]),
              _: 2
            }, 1040, ["modelValue", "name", "native-value"]))), 128))
          ], 2)
        ]),
        _: 1
      }, 16, ["label", "variant", "message"]);
    };
  }
});
var ze = defineComponent({
  __name: "Checkbox",
  props: {
    formId: {},
    field: {}
  },
  setup(e) {
    const t = e, { modelValue: a, hasFieldErrors: l, hintText: o, inRowDisplay: r, options: n } = _n(t), i = Symbol(t.field.modelKey).toString(), v = computed(() => l.value ? "danger" : "");
    function u(c) {
      let f = {};
      return t.field.multiple ? f = {
        nativeValue: c,
        ...t.field
      } : f = {
        trueValue: c,
        falseValue: null,
        ...t.field
      }, f;
    }
    return (c, f) => {
      const p = resolveComponent("o-field");
      return openBlock(), createBlock(p, mergeProps(t.field.wrapper, {
        label: t.field.label,
        variant: unref(v),
        message: unref(o)
      }), {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(unref(r))
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(n), ([O, g], x) => (openBlock(), createBlock(unref(script4), mergeProps({
              key: x,
              modelValue: unref(a),
              "onUpdate:modelValue": f[0] || (f[0] = (k) => isRef(a) ? a.value = k : null)
            }, u(g), { name: unref(i) }), {
              default: withCtx(() => [
                renderSlot(c.$slots, "default", {}, () => [
                  createTextVNode(toDisplayString(O), 1)
                ])
              ]),
              _: 2
            }, 1040, ["modelValue", "name"]))), 128))
          ], 2)
        ]),
        _: 3
      }, 16, ["label", "variant", "message"]);
    };
  }
});
var Je = defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true
    },
    field: {
      type: Object,
      required: true
    }
  },
  setup(e, { attrs: t, slots: a }) {
    const { vmodel: l, hasFieldErrors: o, hintText: r, fileNames: n } = bn(e), i = computed(() => o.value ? "danger" : "");
    return () => h(script5, { ...e.field.wrapper, label: e.field.label, variant: i.value, message: r.value }, {
      default: () => [
        h(script11, { ...t, ...e.field, ...l }, {
          default: () => h(script3, { tag: "a", variant: "primary", labelClass: "flex items-center" }, {
            default: () => [
              h(script, { icon: "upload" }),
              h("span", { class: "pl-4" }, { default: () => e.field.label })
            ]
          }),
          ...a
        }),
        h("span", { class: "file-name pl-4 flex items-center" }, {
          default: () => n.value.join(", ")
        })
      ]
    });
  }
});
var Ke = defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true
    },
    field: {
      type: Object,
      required: true
    }
  },
  setup(e, { attrs: t, slots: a }) {
    const { vmodel: l, hasFieldErrors: o, hintText: r } = vn(e), n = computed(() => o.value ? "danger" : ""), i = computed(() => {
      const { type: v, ...u } = e.field;
      return u;
    });
    return () => h(script5, { ...e.field.wrapper, label: e.field.label, message: r.value, variant: n.value }, {
      default: () => h(script7, { ...t, ...i.value, ...l }, a)
    });
  }
});
var Xe = un({
  text: je,
  password: Qe,
  color: De,
  select: Ae,
  radio: Ue,
  checkbox: ze,
  file: Je,
  datepicker: Ke
});
var Me = defineComponent({
  __name: "TableBody",
  props: {
    items: {},
    headers: {}
  },
  emits: ["edit", "delete"],
  setup(e, { emit: t }) {
    const a = e, { getValue: l } = Fn();
    return (o, r) => {
      const n = resolveComponent("f-table-row-actions");
      return openBlock(), createBlock(unref(script10), mergeProps(o.$attrs, {
        data: a.items,
        "pagination-position": "bottom",
        "backend-pagination": "",
        paginated: ""
      }), {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(o.headers, (i, v) => (openBlock(), createElementBlock(Fragment, { key: v }, [
            i.value === "actions" ? (openBlock(), createBlock(unref(script$2), { key: 0 }, {
              default: withCtx(({ row: u }) => [
                createVNode(n, {
                  onEdit: (c) => t("edit", u),
                  onDelete: (c) => t("delete", u)
                }, null, 8, ["onEdit", "onDelete"])
              ]),
              _: 1
            })) : (openBlock(), createBlock(unref(script$2), mergeProps({ key: 1 }, i, {
              label: i.label,
              field: i.value
            }), {
              default: withCtx(({ row: u, index: c }) => [
                createTextVNode(toDisplayString(unref(l)(u, i, c)), 1)
              ]),
              _: 2
            }, 1040, ["label", "field"]))
          ], 64))), 128))
        ]),
        _: 1
      }, 16, ["data"]);
    };
  }
});
var Ye = un({
  body: Me
});
var et = {
  text: {
    wrapper: { class: "col-span-12" },
    class: ""
  },
  date: {
    wrapper: { class: "col-span-12" },
    class: ""
  },
  password: {
    wrapper: { class: "col-span-12" },
    class: ""
  },
  select: {
    wrapper: { class: "col-span-12" },
    class: "w-full"
  },
  checkbox: {
    wrapper: { class: "col-span-12" },
    class: "f-field__checkbox"
  },
  radio: {
    wrapper: { class: "col-span-12" },
    class: "f-field__radio"
  },
  textarea: {
    wrapper: { class: "col-span-12" },
    class: ""
  },
  color: {
    wrapper: { class: "col-span-12" },
    class: ""
  },
  file: {
    wrapper: { class: "col-span-12" },
    class: ""
  },
  image: {
    wrapper: { class: "col-span-12" },
    class: ""
  },
  mainButton: {
    class: "f-form-footer__button f-form-footer__button--main",
    outlined: true
  },
  auxButton: {
    class: "f-form-footer__button f-form-footer__button--aux",
    outlined: true
  }
};
var tt = {
  field: {
    labelClass: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  },
  input: {
    inputClass: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
  },
  checkbox: {
    checkClass: "w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
  },
  radio: {
    checkClass: "w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
  }
};
export {
  ze as Checkbox,
  De as Color,
  Ke as Datepicker,
  Je as File,
  Qe as Password,
  Ue as Radio,
  Ae as Select,
  Me as TableBody,
  je as Text,
  et as defaultCustomization,
  Xe as fields,
  tt as orugaDefaultCustomization,
  Ye as table,
  Ze as utils
};
//# sourceMappingURL=@fancy-crud_oruga-wrapper.js.map
