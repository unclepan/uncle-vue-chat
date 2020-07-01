import moment from 'moment';

//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: 'Header',
  components: {
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.$style.header }, [
    _c("p", [_vm._v("明日青年")]),
    _vm._v(" "),
    _vm._m(0)
  ])
};
var __vue_staticRenderFns__ = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [
      _c("span", { staticClass: "icon iconfont icon-minus" }),
      _vm._v(" "),
      _c("span", { staticClass: "icon iconfont icon-fullscreen-exit" }),
      _vm._v(" "),
      _c("span", { staticClass: "icon iconfont icon-close" })
    ])
  }
];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-7cbe9737_0", { source: ".src-components-header-2s5Y {\n  padding: 16px 10px;\n  background: #39509d;\n  color: #ffffff;\n  display: flex;\n  justify-content: space-between;\n}", map: {"version":3,"sources":["/Volumes/Transcend/FE/uncle-vue-chat/src/components/header-item.vue","header-item.vue"],"names":[],"mappings":"AAoBA;EACA,kBAAA;EACA,mBAAA;EACA,cAAA;EACA,aAAA;EACA,8BAAA;ACnBA","file":"header-item.vue","sourcesContent":["<template>\n  <div :class=\"$style.header\">\n    <p>明日青年</p>\n    <div>\n      <span class=\"icon iconfont icon-minus\"></span>\n      <span class=\"icon iconfont icon-fullscreen-exit\"></span>\n      <span class=\"icon iconfont icon-close\"></span>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'Header',\n  components: {\n  },\n};\n</script>\n\n<style lang=\"scss\" module>\n  .header{\n    padding: 16px 10px;\n    background: #39509d;\n    color: #ffffff;\n    display: flex;\n    justify-content: space-between;\n  }\n</style>\n",".header {\n  padding: 16px 10px;\n  background: #39509d;\n  color: #ffffff;\n  display: flex;\n  justify-content: space-between;\n}\n\n/*# sourceMappingURL=header-item.vue.map */"]}, media: undefined });
Object.defineProperty(this, "$style", { value: {"header":"src-components-header-2s5Y"} });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$1 = {
  name: 'MessageOwn',
  components: {
  },
  props: {
    message: {
      type: Object,
      default: function default$1() {
        return {};
      },
    },
  },
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.$style["message-own"] }, [
    _vm.message.type === "file"
      ? _c(
          "a",
          {
            class: _vm.$style.file,
            attrs: {
              href: _vm.message.contents.url,
              download: _vm.message.contents.name
            }
          },
          [
            _c("span", { staticClass: "icon iconfont icon-attachment" }),
            _vm._v("\n    " + _vm._s(_vm.message.contents.name) + "\n  ")
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.message.type === "image"
      ? _c("img", {
          class: _vm.$style.image,
          attrs: { src: _vm.message.contents }
        })
      : _vm._e(),
    _vm._v(" "),
    _vm.message.type === "emoji"
      ? _c("span", { class: _vm.$style.emoji }, [
          _vm._v("\n    " + _vm._s(_vm.message.contents) + "\n  ")
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.message.type === "message"
      ? _c("span", { class: _vm.$style.message }, [
          _vm._v("\n    " + _vm._s(_vm.message.contents) + "\n  ")
        ])
      : _vm._e(),
    _vm._v(" "),
    _c("div", { class: _vm.$style.head }, [
      _vm._v("\n    " + _vm._s(_vm.message.author[0]) + "\n  ")
    ])
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-5bcff348_0", { source: ".src-components-messages-message-own-1XZZ {\n  display: flex;\n  justify-content: flex-end;\n}\n.src-components-messages-message-own-1XZZ .src-components-messages-file-26d8 {\n  text-decoration: none;\n  line-height: 20px;\n  border-radius: 12px 4px;\n  background-color: #efefef;\n  padding: 10px;\n  max-width: 60%;\n}\n.src-components-messages-message-own-1XZZ .src-components-messages-image-WW9H {\n  max-width: 30%;\n}\n.src-components-messages-message-own-1XZZ .src-components-messages-emoji-dycK {\n  font-size: 42px;\n  line-height: 46px;\n}\n.src-components-messages-message-own-1XZZ .src-components-messages-message-1-w2 {\n  color: #556d7a;\n  line-height: 20px;\n  border-radius: 12px 4px;\n  background-color: #d8faf5;\n  padding: 10px;\n  max-width: 60%;\n}\n.src-components-messages-message-own-1XZZ .src-components-messages-head-2k20 {\n  height: 40px;\n  width: 40px;\n  text-align: center;\n  line-height: 40px;\n  border-radius: 50%;\n  background: #eeeeee;\n  margin-left: 10px;\n}", map: {"version":3,"sources":["/Volumes/Transcend/FE/uncle-vue-chat/src/components/messages/message-own.vue","message-own.vue"],"names":[],"mappings":"AAgDA;EACA,aAAA;EACA,yBAAA;AC/CA;ADgDA;EACA,qBAAA;EACA,iBAAA;EACA,uBAAA;EACA,yBAAA;EACA,aAAA;EACA,cAAA;AC9CA;ADgDA;EACA,cAAA;AC9CA;ADgDA;EACA,eAAA;EACA,iBAAA;AC9CA;ADgDA;EACA,cAAA;EACA,iBAAA;EACA,uBAAA;EACA,yBAAA;EACA,aAAA;EACA,cAAA;AC9CA;ADgDA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,iBAAA;EACA,kBAAA;EACA,mBAAA;EACA,iBAAA;AC9CA","file":"message-own.vue","sourcesContent":["<template>\n  <div :class=\"$style['message-own']\">\n    <a\n      v-if=\"message.type === 'file'\"\n      :href=\"message.contents.url\"\n      :download=\"message.contents.name\"\n      :class=\"$style.file\">\n      <span class=\"icon iconfont icon-attachment\"></span>\n      {{message.contents.name}}\n    </a>\n    <img\n      v-if=\"message.type === 'image'\"\n      :src=\"message.contents\"\n      :class=\"$style.image\">\n    <span\n      v-if=\"message.type === 'emoji'\"\n      :class=\"$style.emoji\">\n      {{ message.contents }}\n    </span>\n    <span\n      v-if=\"message.type === 'message'\"\n      :class=\"$style.message\">\n      {{ message.contents }}\n    </span>\n\n    <div :class=\"$style.head\">\n      {{message.author[0]}}\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'MessageOwn',\n  components: {\n  },\n  props: {\n    message: {\n      type: Object,\n      default() {\n        return {};\n      },\n    },\n  },\n};\n</script>\n\n<style lang=\"scss\" module>\n.message-own{\n  display: flex;\n  justify-content: flex-end;\n  .file{\n    text-decoration: none;\n    line-height: 20px;\n    border-radius: 12px 4px;\n    background-color: #efefef;\n    padding: 10px;\n    max-width: 60%;\n  }\n  .image{\n    max-width: 30%;\n  }\n  .emoji{\n    font-size: 42px;\n    line-height: 46px;\n  }\n  .message{\n    color: #556d7a;\n    line-height: 20px;\n    border-radius: 12px 4px;\n    background-color: #d8faf5;\n    padding: 10px;\n    max-width: 60%;\n  }\n  .head{\n    height: 40px;\n    width: 40px;\n    text-align: center;\n    line-height: 40px;\n    border-radius: 50%;\n    background: #eeeeee;\n    margin-left: 10px;\n  }\n}\n</style>\n",".message-own {\n  display: flex;\n  justify-content: flex-end;\n}\n.message-own .file {\n  text-decoration: none;\n  line-height: 20px;\n  border-radius: 12px 4px;\n  background-color: #efefef;\n  padding: 10px;\n  max-width: 60%;\n}\n.message-own .image {\n  max-width: 30%;\n}\n.message-own .emoji {\n  font-size: 42px;\n  line-height: 46px;\n}\n.message-own .message {\n  color: #556d7a;\n  line-height: 20px;\n  border-radius: 12px 4px;\n  background-color: #d8faf5;\n  padding: 10px;\n  max-width: 60%;\n}\n.message-own .head {\n  height: 40px;\n  width: 40px;\n  text-align: center;\n  line-height: 40px;\n  border-radius: 50%;\n  background: #eeeeee;\n  margin-left: 10px;\n}\n\n/*# sourceMappingURL=message-own.vue.map */"]}, media: undefined });
Object.defineProperty(this, "$style", { value: {"message-own":"src-components-messages-message-own-1XZZ","file":"src-components-messages-file-26d8","image":"src-components-messages-image-WW9H","emoji":"src-components-messages-emoji-dycK","message":"src-components-messages-message-1-w2","head":"src-components-messages-head-2k20"} });

  };
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$2 = {
  name: 'MessageForeign',
  props: {
    message: {
      type: Object,
      default: function default$1() {
        return {};
      },
    },
  },
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.$style["message-foreign"] }, [
    _c("div", { class: _vm.$style.head }, [
      _vm._v("\n    " + _vm._s(_vm.message.author[0]) + "\n  ")
    ]),
    _vm._v(" "),
    _vm.message.type === "image"
      ? _c("img", {
          staticStyle: { width: "100%" },
          attrs: { src: _vm.message.imageUrl, alt: "" }
        })
      : _vm._e(),
    _vm._v(" "),
    _vm.message.type === "emoji"
      ? _c("span", { class: _vm.$style.emoji }, [
          _vm._v("\n    " + _vm._s(_vm.message.contents) + "\n  ")
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.message.type === "message"
      ? _c("span", { class: _vm.$style.message }, [
          _vm._v("\n    " + _vm._s(_vm.message.contents) + "\n  ")
        ])
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-73e1b651_0", { source: ".src-components-messages-message-foreign-2Vhi {\n  display: flex;\n  justify-content: flex-start;\n}\n.src-components-messages-message-foreign-2Vhi .src-components-messages-head-1qG3 {\n  height: 40px;\n  width: 40px;\n  text-align: center;\n  line-height: 40px;\n  border-radius: 50%;\n  background: #eeeeee;\n  margin-right: 10px;\n}\n.src-components-messages-message-foreign-2Vhi .src-components-messages-emoji-3XNE {\n  font-size: 42px;\n  line-height: 46px;\n}\n.src-components-messages-message-foreign-2Vhi .src-components-messages-message-3FEG {\n  color: #556d7a;\n  line-height: 21px;\n  border-radius: 12px 4px;\n  background-color: #e3ebfb;\n  padding: 10px;\n  max-width: 60%;\n}", map: {"version":3,"sources":["/Volumes/Transcend/FE/uncle-vue-chat/src/components/messages/message-foreign.vue","message-foreign.vue"],"names":[],"mappings":"AAuCA;EACA,aAAA;EACA,2BAAA;ACtCA;ADuCA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,iBAAA;EACA,kBAAA;EACA,mBAAA;EACA,kBAAA;ACrCA;ADuCA;EACA,eAAA;EACA,iBAAA;ACrCA;ADuCA;EACA,cAAA;EACA,iBAAA;EACA,uBAAA;EACA,yBAAA;EACA,aAAA;EACA,cAAA;ACrCA","file":"message-foreign.vue","sourcesContent":["<template>\n  <div\n    :class=\"$style['message-foreign']\">\n    <div :class=\"$style.head\">\n      {{message.author[0]}}\n    </div>\n    <img\n      v-if=\"message.type === 'image'\"\n      :src=\"message.imageUrl\"\n      alt=\"\"\n      style=\"width: 100%\">\n    <span\n      v-if=\"message.type === 'emoji'\"\n      :class=\"$style.emoji\">\n      {{ message.contents }}\n    </span>\n    <span\n      v-if=\"message.type === 'message'\"\n      :class=\"$style.message\">\n      {{ message.contents }}\n    </span>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'MessageForeign',\n  props: {\n    message: {\n      type: Object,\n      default() {\n        return {};\n      },\n    },\n  },\n};\n</script>\n\n<style lang=\"scss\" module>\n.message-foreign{\n  display: flex;\n  justify-content: flex-start;\n  .head{\n    height: 40px;\n    width: 40px;\n    text-align: center;\n    line-height: 40px;\n    border-radius: 50%;\n    background: #eeeeee;\n    margin-right: 10px;\n  }\n  .emoji{\n    font-size: 42px;\n    line-height: 46px;\n  }\n  .message{\n    color: #556d7a;\n    line-height: 21px;\n    border-radius: 12px 4px;\n    background-color: #e3ebfb;\n    padding: 10px;\n    max-width: 60%;\n  }\n\n}\n</style>\n",".message-foreign {\n  display: flex;\n  justify-content: flex-start;\n}\n.message-foreign .head {\n  height: 40px;\n  width: 40px;\n  text-align: center;\n  line-height: 40px;\n  border-radius: 50%;\n  background: #eeeeee;\n  margin-right: 10px;\n}\n.message-foreign .emoji {\n  font-size: 42px;\n  line-height: 46px;\n}\n.message-foreign .message {\n  color: #556d7a;\n  line-height: 21px;\n  border-radius: 12px 4px;\n  background-color: #e3ebfb;\n  padding: 10px;\n  max-width: 60%;\n}\n\n/*# sourceMappingURL=message-foreign.vue.map */"]}, media: undefined });
Object.defineProperty(this, "$style", { value: {"message-foreign":"src-components-messages-message-foreign-2Vhi","head":"src-components-messages-head-1qG3","emoji":"src-components-messages-emoji-3XNE","message":"src-components-messages-message-3FEG"} });

  };
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$3 = {
  name: 'MessagesList',
  components: {
    messageOwn: __vue_component__$1,
    messageForeign: __vue_component__$2,
  },
  props: {
    feed: {
      type: Array,
      default: function default$1() {
        return [];
      },
      required: false,
    },
    authorId: {
      type: Number,
      default: 0,
      required: false,
    },
  },
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "transition-group",
    { attrs: { name: "messages-list", tag: "div" } },
    _vm._l(_vm.feed, function(item) {
      return _c(
        "div",
        {
          key: item.key,
          staticClass: "messages-list-item",
          class: _vm.$style["messages-item"]
        },
        [
          item.id === _vm.authorId
            ? _c("message-own", { attrs: { message: item } })
            : _c("message-foreign", { attrs: { message: item } })
        ],
        1
      )
    }),
    0
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-41beb71d_0", { source: "\n.messages-list-item {\n  transition: all 0.2s;\n}\n.messages-list-enter, .messages-list-leave-to\n/* .messages-list-leave-active below version 2.1.8 */ {\n  opacity: 0;\n  transform: translateY(30px);\n}\n.messages-list-leave-active {\n  position: absolute;\n}\n", map: {"version":3,"sources":["/Volumes/Transcend/FE/uncle-vue-chat/src/components/messages/messages-list.vue"],"names":[],"mappings":";AAyCA;EACA,oBAAA;AACA;AACA;;EAEA,UAAA;EACA,2BAAA;AACA;AACA;EACA,kBAAA;AACA","file":"messages-list.vue","sourcesContent":["<template>\n  <transition-group name=\"messages-list\" tag=\"div\">\n    <div\n      v-for=\"(item) in feed\"\n      :key=\"item.key\"\n      class=\"messages-list-item\"\n      :class=\"$style['messages-item']\">\n        <message-own v-if=\"item.id === authorId\" :message=\"item\" />\n        <message-foreign v-else :message=\"item\"/>\n    </div>\n  </transition-group>\n</template>\n\n<script>\nimport messageOwn from './message-own.vue';\nimport messageForeign from './message-foreign.vue';\n\nexport default {\n  name: 'MessagesList',\n  components: {\n    messageOwn,\n    messageForeign,\n  },\n  props: {\n    feed: {\n      type: Array,\n      default() {\n        return [];\n      },\n      required: false,\n    },\n    authorId: {\n      type: Number,\n      default: 0,\n      required: false,\n    },\n  },\n};\n</script>\n\n<style>\n.messages-list-item {\n  transition: all 0.2s;\n}\n.messages-list-enter, .messages-list-leave-to\n/* .messages-list-leave-active below version 2.1.8 */ {\n  opacity: 0;\n  transform: translateY(30px);\n}\n.messages-list-leave-active {\n  position: absolute;\n}\n</style>\n<style lang=\"scss\" module>\n  .messages-item{\n    margin: 20px 0;\n  }\n</style>\n"]}, media: undefined })
,inject("data-v-41beb71d_1", { source: ".src-components-messages-messages-item-2mMX {\n  margin: 20px 0;\n}", map: {"version":3,"sources":["/Volumes/Transcend/FE/uncle-vue-chat/src/components/messages/messages-list.vue","messages-list.vue"],"names":[],"mappings":"AAsDA;EACA,cAAA;ACrDA","file":"messages-list.vue","sourcesContent":["<template>\n  <transition-group name=\"messages-list\" tag=\"div\">\n    <div\n      v-for=\"(item) in feed\"\n      :key=\"item.key\"\n      class=\"messages-list-item\"\n      :class=\"$style['messages-item']\">\n        <message-own v-if=\"item.id === authorId\" :message=\"item\" />\n        <message-foreign v-else :message=\"item\"/>\n    </div>\n  </transition-group>\n</template>\n\n<script>\nimport messageOwn from './message-own.vue';\nimport messageForeign from './message-foreign.vue';\n\nexport default {\n  name: 'MessagesList',\n  components: {\n    messageOwn,\n    messageForeign,\n  },\n  props: {\n    feed: {\n      type: Array,\n      default() {\n        return [];\n      },\n      required: false,\n    },\n    authorId: {\n      type: Number,\n      default: 0,\n      required: false,\n    },\n  },\n};\n</script>\n\n<style>\n.messages-list-item {\n  transition: all 0.2s;\n}\n.messages-list-enter, .messages-list-leave-to\n/* .messages-list-leave-active below version 2.1.8 */ {\n  opacity: 0;\n  transform: translateY(30px);\n}\n.messages-list-leave-active {\n  position: absolute;\n}\n</style>\n<style lang=\"scss\" module>\n  .messages-item{\n    margin: 20px 0;\n  }\n</style>\n",".messages-item {\n  margin: 20px 0;\n}\n\n/*# sourceMappingURL=messages-list.vue.map */"]}, media: undefined });
Object.defineProperty(this, "$style", { value: {"messages-item":"src-components-messages-messages-item-2mMX"} });

  };
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    createInjector,
    undefined,
    undefined
  );

var emojiData = [
  {
    name: 'People',
    emojis: [
      '😄',
      '😃',
      '😀',
      '😊',
      '😉',
      '😍',
      '😘',
      '😚',
      '😗',
      '😙',
      '😜',
      '😝',
      '😛',
      '😳',
      '😁',
      '😔',
      '😌',
      '😒',
      '😞',
      '😣',
      '😢',
      '😂',
      '😭',
      '😪',
      '😥',
      '😰',
      '😅',
      '😓',
      '😩',
      '😫',
      '😨',
      '😱',
      '😠',
      '😡',
      '😤',
      '😖',
      '😆',
      '😋',
      '😷',
      '😎',
      '😴',
      '😵',
      '😲',
      '😟',
      '😦',
      '😧',
      '👿',
      '😮',
      '😬',
      '😐',
      '😕',
      '😯',
      '😏',
      '😑',
      '👲',
      '👳',
      '👮',
      '👷',
      '💂',
      '👶',
      '👦',
      '👧',
      '👨',
      '👩',
      '👴',
      '👵',
      '👱',
      '👼',
      '👸',
      '😺',
      '😸',
      '😻',
      '😽',
      '😼',
      '🙀',
      '😿',
      '😹',
      '😾',
      '👹',
      '👺',
      '🙈',
      '🙉',
      '🙊',
      '💀',
      '👽',
      '💩',
      '🔥',
      '✨',
      '🌟',
      '💫',
      '💥',
      '💢',
      '💦',
      '💧',
      '💤',
      '💨',
      '👂',
      '👀',
      '👃',
      '👅',
      '👄',
      '👍',
      '👎',
      '👌',
      '👊',
      '✊',
      '👋',
      '✋',
      '👐',
      '👆',
      '👇',
      '👉',
      '👈',
      '🙌',
      '🙏',
      '👏',
      '💪',
      '🚶',
      '🏃',
      '💃',
      '👫',
      '👪',
      '💏',
      '💑',
      '👯',
      '🙆',
      '🙅',
      '💁',
      '🙋',
      '💆',
      '💇',
      '💅',
      '👰',
      '🙎',
      '🙍',
      '🙇',
      '🎩',
      '👑',
      '👒',
      '👟',
      '👞',
      '👡',
      '👠',
      '👢',
      '👕',
      '👔',
      '👚',
      '👗',
      '🎽',
      '👖',
      '👘',
      '👙',
      '💼',
      '👜',
      '👝',
      '👛',
      '👓',
      '🎀',
      '🌂',
      '💄',
      '💛',
      '💙',
      '💜',
      '💚',
      '💔',
      '💗',
      '💓',
      '💕',
      '💖',
      '💞',
      '💘',
      '💌',
      '💋',
      '💍',
      '💎',
      '👤',
      '💬',
      '👣' ],
  },
  {
    name: 'Nature',
    emojis: [
      '🐶',
      '🐺',
      '🐱',
      '🐭',
      '🐹',
      '🐰',
      '🐸',
      '🐯',
      '🐨',
      '🐻',
      '🐷',
      '🐽',
      '🐮',
      '🐗',
      '🐵',
      '🐒',
      '🐴',
      '🐑',
      '🐘',
      '🐼',
      '🐧',
      '🐦',
      '🐤',
      '🐥',
      '🐣',
      '🐔',
      '🐍',
      '🐢',
      '🐛',
      '🐝',
      '🐜',
      '🐞',
      '🐌',
      '🐙',
      '🐚',
      '🐠',
      '🐟',
      '🐬',
      '🐳',
      '🐎',
      '🐲',
      '🐡',
      '🐫',
      '🐩',
      '🐾',
      '💐',
      '🌸',
      '🌷',
      '🍀',
      '🌹',
      '🌻',
      '🌺',
      '🍁',
      '🍃',
      '🍂',
      '🌿',
      '🌾',
      '🍄',
      '🌵',
      '🌴',
      '🌰',
      '🌱',
      '🌼',
      '🌑',
      '🌓',
      '🌔',
      '🌕',
      '🌛',
      '🌙',
      '🌏',
      '🌋',
      '🌌',
      '🌠',
      '⛅',
      '⛄',
      '🌀',
      '🌁',
      '🌈',
      '🌊' ],
  },
  {
    name: 'Objects',
    emojis: [
      '🎍',
      '💝',
      '🎎',
      '🎒',
      '🎓',
      '🎏',
      '🎆',
      '🎇',
      '🎐',
      '🎑',
      '🎃',
      '👻',
      '🎅',
      '🎄',
      '🎁',
      '🎋',
      '🎉',
      '🎊',
      '🎈',
      '🎌',
      '🔮',
      '🎥',
      '📷',
      '📹',
      '📼',
      '💿',
      '📀',
      '💽',
      '💾',
      '💻',
      '📱',
      '📞',
      '📟',
      '📠',
      '📡',
      '📺',
      '📻',
      '🔊',
      '🔔',
      '📢',
      '📣',
      '⏳',
      '⌛',
      '⏰',
      '⌚',
      '🔓',
      '🔒',
      '🔏',
      '🔐',
      '🔑',
      '🔎',
      '💡',
      '🔦',
      '🔌',
      '🔋',
      '🔍',
      '🛀',
      '🚽',
      '🔧',
      '🔩',
      '🔨',
      '🚪',
      '🚬',
      '💣',
      '🔫',
      '🔪',
      '💊',
      '💉',
      '💰',
      '💴',
      '💵',
      '💳',
      '💸',
      '📲',
      '📧',
      '📥',
      '📤',
      '📩',
      '📨',
      '📫',
      '📪',
      '📮',
      '📦',
      '📝',
      '📄',
      '📃',
      '📑',
      '📊',
      '📈',
      '📉',
      '📜',
      '📋',
      '📅',
      '📆',
      '📇',
      '📁',
      '📂',
      '📌',
      '📎',
      '📏',
      '📐',
      '📕',
      '📗',
      '📘',
      '📙',
      '📓',
      '📔',
      '📒',
      '📚',
      '📖',
      '🔖',
      '📛',
      '📰',
      '🎨',
      '🎬',
      '🎤',
      '🎧',
      '🎼',
      '🎵',
      '🎶',
      '🎹',
      '🎻',
      '🎺',
      '🎷',
      '🎸',
      '👾',
      '🎮',
      '🃏',
      '🎴',
      '🀄',
      '🎲',
      '🎯',
      '🏈',
      '🏀',
      '⚽',
      '⚾',
      '🎾',
      '🎱',
      '🎳',
      '⛳',
      '🏁',
      '🏆',
      '🎿',
      '🏂',
      '🏊',
      '🏄',
      '🎣',
      '🍵',
      '🍶',
      '🍺',
      '🍻',
      '🍸',
      '🍹',
      '🍷',
      '🍴',
      '🍕',
      '🍔',
      '🍟',
      '🍗',
      '🍖',
      '🍝',
      '🍛',
      '🍤',
      '🍱',
      '🍣',
      '🍥',
      '🍙',
      '🍘',
      '🍚',
      '🍜',
      '🍲',
      '🍢',
      '🍡',
      '🍳',
      '🍞',
      '🍩',
      '🍮',
      '🍦',
      '🍨',
      '🍧',
      '🎂',
      '🍰',
      '🍪',
      '🍫',
      '🍬',
      '🍭',
      '🍯',
      '🍎',
      '🍏',
      '🍊',
      '🍒',
      '🍇',
      '🍉',
      '🍓',
      '🍑',
      '🍈',
      '🍌',
      '🍍',
      '🍠',
      '🍆',
      '🍅',
      '🌽' ],
  },
  {
    name: 'Places',
    emojis: [
      '🏠',
      '🏡',
      '🏫',
      '🏢',
      '🏣',
      '🏥',
      '🏦',
      '🏪',
      '🏩',
      '🏨',
      '💒',
      '⛪',
      '🏬',
      '🌇',
      '🌆',
      '🏯',
      '🏰',
      '⛺',
      '🏭',
      '🗼',
      '🗾',
      '🗻',
      '🌄',
      '🌅',
      '🌃',
      '🗽',
      '🌉',
      '🎠',
      '🎡',
      '⛲',
      '🎢',
      '🚢',
      '⛵',
      '🚤',
      '🚀',
      '💺',
      '🚉',
      '🚄',
      '🚅',
      '🚇',
      '🚃',
      '🚌',
      '🚙',
      '🚗',
      '🚕',
      '🚚',
      '🚨',
      '🚓',
      '🚒',
      '🚑',
      '🚲',
      '💈',
      '🚏',
      '🎫',
      '🚥',
      '🚧',
      '🔰',
      '⛽',
      '🏮',
      '🎰',
      '🗿',
      '🎪',
      '🎭',
      '📍',
      '🚩' ],
  },
  {
    name: 'Symbols',
    emojis: [
      '🔟',
      '🔢',
      '🔣',
      '🔠',
      '🔡',
      '🔤',
      '🔼',
      '🔽',
      '⏪',
      '⏩',
      '⏫',
      '⏬',
      '🆗',
      '🆕',
      '🆙',
      '🆒',
      '🆓',
      '🆖',
      '📶',
      '🎦',
      '🈁',
      '🈯',
      '🈳',
      '🈵',
      '🈴',
      '🈲',
      '🉐',
      '🈹',
      '🈺',
      '🈶',
      '🈚',
      '🚻',
      '🚹',
      '🚺',
      '🚼',
      '🚾',
      '🚭',
      '🈸',
      '🉑',
      '🆑',
      '🆘',
      '🆔',
      '🚫',
      '🔞',
      '⛔',
      '❎',
      '✅',
      '💟',
      '🆚',
      '📳',
      '📴',
      '🆎',
      '💠',
      '⛎',
      '🔯',
      '🏧',
      '💹',
      '💲',
      '💱',
      '❌',
      '❗',
      '❓',
      '❕',
      '❔',
      '⭕',
      '🔝',
      '🔚',
      '🔙',
      '🔛',
      '🔜',
      '🔃',
      '🕛',
      '🕐',
      '🕑',
      '🕒',
      '🕓',
      '🕔',
      '🕕',
      '🕖',
      '🕗',
      '🕘',
      '🕙',
      '🕚',
      '➕',
      '➖',
      '➗',
      '💮',
      '💯',
      '🔘',
      '🔗',
      '➰',
      '🔱',
      '🔺',
      '🔲',
      '🔳',
      '🔴',
      '🔵',
      '🔻',
      '⬜',
      '⬛',
      '🔶',
      '🔷',
      '🔸',
      '🔹' ],
  } ];

//

var script$4 = {
  props: {
    onBlur: {
      type: Function,
      required: true,
    },
    onEmojiPicked: {
      type: Function,
      required: true,
    },
  },
  data: function data() {
    return {
      emojiData: emojiData,
    };
  },
  mounted: function mounted() {
    var elem = this.$refs.domNode;
    elem.style.opacity = 0;
    window.requestAnimationFrame(function () {
      elem.style.transition = 'opacity 350ms';
      elem.style.opacity = 1;
    });
    this.$refs.domNode.focus();
  },
  methods: {
    emojiClicked: function emojiClicked(emoji) {
      this.onEmojiPicked(emoji);
      this.$refs.domNode.blur();
    },
  },
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      ref: "domNode",
      class: _vm.$style["picker"],
      attrs: { tabIndex: "0" },
      on: { blur: _vm.onBlur }
    },
    [
      _c(
        "div",
        { class: _vm.$style["picker-content"] },
        _vm._l(_vm.emojiData, function(category) {
          return _c(
            "div",
            { key: category.name, class: _vm.$style["picker-category"] },
            [
              _c("div", { class: _vm.$style["picker-category-title"] }, [
                _vm._v(_vm._s(category.name))
              ]),
              _vm._v(" "),
              _vm._l(category.emojis, function(emoji) {
                return _c(
                  "span",
                  {
                    key: emoji,
                    class: _vm.$style["picker-emoji"],
                    on: {
                      click: function($event) {
                        return _vm.emojiClicked(emoji)
                      }
                    }
                  },
                  [_vm._v("\n        " + _vm._s(emoji) + "\n      ")]
                )
              })
            ],
            2
          )
        }),
        0
      )
    ]
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-b0c978a0_0", { source: ".src-components-emoji-picker-2A5z {\n  position: absolute;\n  bottom: 50px;\n  left: 0px;\n  width: 340px;\n  max-height: 220px;\n  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);\n  background: white;\n  border-radius: 10px;\n  outline: none;\n}\n.src-components-emoji-picker-2A5z:after {\n  content: \"\";\n  width: 14px;\n  height: 14px;\n  background: white;\n  position: absolute;\n  bottom: -6px;\n  left: 10px;\n  transform: rotate(45deg);\n  border-radius: 2px;\n}\n.src-components-emoji-picker-2A5z .src-components-emoji-picker-content-2RCU {\n  padding: 10px;\n  overflow: auto;\n  width: 100%;\n  max-height: 200px;\n  box-sizing: border-box;\n}\n.src-components-emoji-picker-2A5z .src-components-emoji-picker-category-Jota {\n  display: flex;\n  flex-wrap: wrap;\n}\n.src-components-emoji-picker-2A5z .src-components-emoji-picker-category-title-2AWd {\n  min-width: 100%;\n  color: #b8c3ca;\n  font-weight: 200;\n  font-size: 13px;\n  margin: 10px;\n  letter-spacing: 1px;\n}\n.src-components-emoji-picker-2A5z .src-components-emoji-picker-emoji-N_tN {\n  margin: 5px;\n  width: 30px;\n  line-height: 30px;\n  text-align: center;\n  cursor: pointer;\n  vertical-align: middle;\n  font-size: 26px;\n  transition: transform 60ms ease-out;\n}\n.src-components-emoji-picker-2A5z .src-components-emoji-picker-emoji-N_tN:hover {\n  transform: scale(1.4);\n}", map: {"version":3,"sources":["/Volumes/Transcend/FE/uncle-vue-chat/src/components/emoji/picker.vue","picker.vue"],"names":[],"mappings":"AAuDA;EACA,kBAAA;EACA,YAAA;EACA,SAAA;EACA,YAAA;EACA,iBAAA;EACA,qDAAA;EACA,iBAAA;EACA,mBAAA;EACA,aAAA;ACtDA;ADuDA;EACA,WAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,kBAAA;EACA,YAAA;EACA,UAAA;EACA,wBAAA;EACA,kBAAA;ACrDA;ADuDA;EACA,aAAA;EACA,cAAA;EACA,WAAA;EACA,iBAAA;EACA,sBAAA;ACrDA;ADuDA;EACA,aAAA;EACA,eAAA;ACrDA;ADuDA;EACA,eAAA;EACA,cAAA;EACA,gBAAA;EACA,eAAA;EACA,YAAA;EACA,mBAAA;ACrDA;ADuDA;EACA,WAAA;EACA,WAAA;EACA,iBAAA;EACA,kBAAA;EACA,eAAA;EACA,sBAAA;EACA,eAAA;EACA,mCAAA;ACrDA;ADsDA;EACA,qBAAA;ACpDA","file":"picker.vue","sourcesContent":["<template>\n  <div ref=\"domNode\" tabIndex=\"0\" :class=\"$style['picker']\" @blur=\"onBlur\">\n    <div :class=\"$style['picker-content']\">\n      <div v-for=\"category in emojiData\" :key=\"category.name\" :class=\"$style['picker-category']\">\n        <div :class=\"$style['picker-category-title']\">{{ category.name }}</div>\n        <span\n          v-for=\"emoji in category.emojis\"\n          :key=\"emoji\"\n          :class=\"$style['picker-emoji']\"\n          @click=\"emojiClicked(emoji)\">\n          {{ emoji }}\n        </span>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nimport emojiData from './data';\n\nexport default {\n  props: {\n    onBlur: {\n      type: Function,\n      required: true,\n    },\n    onEmojiPicked: {\n      type: Function,\n      required: true,\n    },\n  },\n  data() {\n    return {\n      emojiData,\n    };\n  },\n  mounted() {\n    const elem = this.$refs.domNode;\n    elem.style.opacity = 0;\n    window.requestAnimationFrame(() => {\n      elem.style.transition = 'opacity 350ms';\n      elem.style.opacity = 1;\n    });\n    this.$refs.domNode.focus();\n  },\n  methods: {\n    emojiClicked(emoji) {\n      this.onEmojiPicked(emoji);\n      this.$refs.domNode.blur();\n    },\n  },\n};\n</script>\n\n<style lang=\"scss\" module>\n  .picker {\n    position: absolute;\n    bottom: 50px;\n    left: 0px;\n    width: 340px;\n    max-height: 220px;\n    box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);\n    background: white;\n    border-radius: 10px;\n    outline: none;\n    &:after {\n      content: '';\n      width: 14px;\n      height: 14px;\n      background: white;\n      position: absolute;\n      bottom: -6px;\n      left: 10px;\n      transform: rotate(45deg);\n      border-radius: 2px;\n    }\n    .picker-content {\n      padding: 10px;\n      overflow: auto;\n      width: 100%;\n      max-height: 200px;\n      box-sizing: border-box;\n    }\n    .picker-category {\n      display: flex;\n      flex-wrap: wrap;\n    }\n    .picker-category-title {\n      min-width: 100%;\n      color: #b8c3ca;\n      font-weight: 200;\n      font-size: 13px;\n      margin: 10px;\n      letter-spacing: 1px;\n    }\n    .picker-emoji {\n      margin: 5px;\n      width: 30px;\n      line-height: 30px;\n      text-align: center;\n      cursor: pointer;\n      vertical-align: middle;\n      font-size: 26px;\n      transition: transform 60ms ease-out;\n      &:hover {\n        transform: scale(1.4);\n      }\n    }\n  }\n</style>\n",".picker {\n  position: absolute;\n  bottom: 50px;\n  left: 0px;\n  width: 340px;\n  max-height: 220px;\n  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);\n  background: white;\n  border-radius: 10px;\n  outline: none;\n}\n.picker:after {\n  content: \"\";\n  width: 14px;\n  height: 14px;\n  background: white;\n  position: absolute;\n  bottom: -6px;\n  left: 10px;\n  transform: rotate(45deg);\n  border-radius: 2px;\n}\n.picker .picker-content {\n  padding: 10px;\n  overflow: auto;\n  width: 100%;\n  max-height: 200px;\n  box-sizing: border-box;\n}\n.picker .picker-category {\n  display: flex;\n  flex-wrap: wrap;\n}\n.picker .picker-category-title {\n  min-width: 100%;\n  color: #b8c3ca;\n  font-weight: 200;\n  font-size: 13px;\n  margin: 10px;\n  letter-spacing: 1px;\n}\n.picker .picker-emoji {\n  margin: 5px;\n  width: 30px;\n  line-height: 30px;\n  text-align: center;\n  cursor: pointer;\n  vertical-align: middle;\n  font-size: 26px;\n  transition: transform 60ms ease-out;\n}\n.picker .picker-emoji:hover {\n  transform: scale(1.4);\n}\n\n/*# sourceMappingURL=picker.vue.map */"]}, media: undefined });
Object.defineProperty(this, "$style", { value: {"picker":"src-components-emoji-picker-2A5z","picker-content":"src-components-emoji-picker-content-2RCU","picker-category":"src-components-emoji-picker-category-Jota","picker-category-title":"src-components-emoji-picker-category-title-2AWd","picker-emoji":"src-components-emoji-picker-emoji-N_tN"} });

  };
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$5 = {
  components: {
    picker: __vue_component__$4,
  },
  props: {
    onEmojiPicked: {
      type: Function,
      required: true,
      default: function () {},
    },
  },
  data: function data() {
    return {
      isActive: false,
    };
  },
  methods: {
    openPicker: function openPicker() {
      this.isActive = true;
    },
    handlePickerBlur: function handlePickerBlur() {
      this.isActive = false;
    },
  },
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.$style.emoji },
    [
      _vm.isActive
        ? _c("picker", {
            attrs: {
              "on-emoji-picked": _vm.onEmojiPicked,
              "on-blur": _vm.handlePickerBlur
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("span", {
        staticClass: "icon iconfont icon-smile",
        on: {
          click: function($event) {
            $event.preventDefault();
            return _vm.openPicker($event)
          }
        }
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  var __vue_inject_styles__$5 = function (inject) {
    if (!inject) { return }
    inject("data-v-0fa50c08_0", { source: ".src-components-emoji-emoji-6vA2 {\n  position: relative;\n  width: 22px;\n  height: 22px;\n  line-height: 22px;\n  text-align: center;\n}\n.src-components-emoji-emoji-6vA2 .icon {\n  color: #949596;\n  font-size: 20px;\n}", map: {"version":3,"sources":["/Volumes/Transcend/FE/uncle-vue-chat/src/components/emoji/index.vue","index.vue"],"names":[],"mappings":"AA8CA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,kBAAA;AC7CA;AD8CA;EACA,cAAA;EACA,eAAA;AC5CA","file":"index.vue","sourcesContent":["<template>\n  <div :class=\"$style.emoji\">\n    <picker\n      v-if=\"isActive\"\n      :on-emoji-picked=\"onEmojiPicked\"\n      :on-blur=\"handlePickerBlur\"\n      />\n\n    <span\n      class=\"icon iconfont icon-smile\"\n      @click.prevent=\"openPicker\">\n    </span>\n  </div>\n</template>\n\n<script>\nimport picker from './picker.vue';\n\nexport default {\n  components: {\n    picker,\n  },\n  props: {\n    onEmojiPicked: {\n      type: Function,\n      required: true,\n      default: () => {},\n    },\n  },\n  data() {\n    return {\n      isActive: false,\n    };\n  },\n  methods: {\n    openPicker() {\n      this.isActive = true;\n    },\n    handlePickerBlur() {\n      this.isActive = false;\n    },\n  },\n};\n</script>\n\n<style lang=\"scss\" module>\n.emoji{\n  position: relative;\n  width: 22px;\n  height: 22px;\n  line-height: 22px;\n  text-align: center;\n  :global(.icon){\n    color: #949596;\n    font-size: 20px;\n  }\n}\n</style>\n",".emoji {\n  position: relative;\n  width: 22px;\n  height: 22px;\n  line-height: 22px;\n  text-align: center;\n}\n.emoji :global(.icon) {\n  color: #949596;\n  font-size: 20px;\n}\n\n/*# sourceMappingURL=index.vue.map */"]}, media: undefined });
Object.defineProperty(this, "$style", { value: {"emoji":"src-components-emoji-emoji-6vA2"} });

  };
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//

var script$6 = {
  props: {
    onFileUpload: {
      type: Function,
      required: true,
      default: function () {},
    },
  },
  methods: {
    handleClick: function handleClick(e) {
      e.target.value = null;
    },
    handleFileUpload: function handleFileUpload(e) {
      this.onFileUpload(e.target.files[0]);
    },
  },
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.$style.file }, [
    _c("input", {
      attrs: { type: "file" },
      on: { change: _vm.handleFileUpload, click: _vm.handleClick }
    }),
    _vm._v(" "),
    _c("span", { staticClass: "icon iconfont icon-attachment" })
  ])
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  var __vue_inject_styles__$6 = function (inject) {
    if (!inject) { return }
    inject("data-v-1968ff24_0", { source: ".src-components-file-file-36Q- {\n  position: relative;\n  width: 22px;\n  height: 22px;\n  line-height: 22px;\n  text-align: center;\n  overflow: hidden;\n}\n.src-components-file-file-36Q- .icon {\n  color: #949596;\n  font-size: 20px;\n}\n.src-components-file-file-36Q- input {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  z-index: 1;\n  height: 100%;\n  opacity: 0;\n}", map: {"version":3,"sources":["/Volumes/Transcend/FE/uncle-vue-chat/src/components/file/index.vue","index.vue"],"names":[],"mappings":"AA4BA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,kBAAA;EACA,gBAAA;AC3BA;AD4BA;EACA,cAAA;EACA,eAAA;AC1BA;AD4BA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,UAAA;EACA,YAAA;EACA,UAAA;AC1BA","file":"index.vue","sourcesContent":["<template>\n  <div :class=\"$style.file\">\n    <input type=\"file\" @change=\"handleFileUpload\" @click=\"handleClick\" />\n    <span class=\"icon iconfont icon-attachment\"></span>\n  </div>\n</template>\n\n<script>\nexport default {\n  props: {\n    onFileUpload: {\n      type: Function,\n      required: true,\n      default: () => {},\n    },\n  },\n  methods: {\n    handleClick(e) {\n      e.target.value = null;\n    },\n    handleFileUpload(e) {\n      this.onFileUpload(e.target.files[0]);\n    },\n  },\n};\n</script>\n\n<style lang=\"scss\" module>\n.file{\n  position: relative;\n  width: 22px;\n  height: 22px;\n  line-height: 22px;\n  text-align: center;\n  overflow: hidden;\n  :global(.icon){\n    color: #949596;\n    font-size: 20px;\n  }\n  input{\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    z-index: 1;\n    height: 100%;\n    opacity: 0;\n  }\n}\n</style>\n",".file {\n  position: relative;\n  width: 22px;\n  height: 22px;\n  line-height: 22px;\n  text-align: center;\n  overflow: hidden;\n}\n.file :global(.icon) {\n  color: #949596;\n  font-size: 20px;\n}\n.file input {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  z-index: 1;\n  height: 100%;\n  opacity: 0;\n}\n\n/*# sourceMappingURL=index.vue.map */"]}, media: undefined });
Object.defineProperty(this, "$style", { value: {"file":"src-components-file-file-36Q-"} });

  };
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$7 = {
  name: 'InputField',
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
  },
  methods: {
    send: function send() {
      this.$emit('newOwnMessage');
    },
  },
};

/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.$style["input-field"] }, [
    _c("input", {
      attrs: {
        type: "text",
        name: "message",
        "aria-placeholder": "请输入消息...",
        placeholder: "请输入消息...",
        autofocus: ""
      },
      domProps: { value: _vm.value },
      on: {
        input: function($event) {
          return _vm.$emit("input", $event.target.value)
        },
        keyup: function($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
          ) {
            return null
          }
          $event.preventDefault();
          return _vm.send($event)
        }
      }
    }),
    _c("br")
  ])
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  var __vue_inject_styles__$7 = function (inject) {
    if (!inject) { return }
    inject("data-v-56dc5df2_0", { source: ".src-components-input-input-field-3KNw {\n  padding: 10px 0;\n  margin-right: 5px;\n  border-radius: 12px;\n  background-color: #ffffff;\n}\n.src-components-input-input-field-3KNw input {\n  font-size: 14px;\n  line-height: 21px;\n  border: none;\n  background-color: inherit;\n  color: #666666;\n  width: 100%;\n}\n.src-components-input-input-field-3KNw input:focus {\n  outline: none;\n}", map: {"version":3,"sources":["/Volumes/Transcend/FE/uncle-vue-chat/src/components/input/input-field.vue","input-field.vue"],"names":[],"mappings":"AAkCA;EACA,eAAA;EACA,iBAAA;EACA,mBAAA;EACA,yBAAA;ACjCA;ADkCA;EACA,eAAA;EACA,iBAAA;EACA,YAAA;EACA,yBAAA;EACA,cAAA;EACA,WAAA;AChCA;ADiCA;EACA,aAAA;AC/BA","file":"input-field.vue","sourcesContent":["<template>\n  <div :class=\"$style['input-field']\">\n    <input\n      :value=\"value\"\n      type=\"text\"\n      name=\"message\"\n      aria-placeholder=\"请输入消息...\"\n      placeholder=\"请输入消息...\"\n      autofocus\n      @input=\"$emit('input', $event.target.value)\"\n      @keyup.enter.prevent=\"send\"><br>\n  </div>\n\n</template>\n\n<script>\nexport default {\n  name: 'InputField',\n  props: {\n    value: {\n      type: String,\n      default: '',\n      required: false,\n    },\n  },\n  methods: {\n    send() {\n      this.$emit('newOwnMessage');\n    },\n  },\n};\n</script>\n\n<style lang=\"scss\" module>\n  .input-field{\n    padding: 10px 0;\n    margin-right: 5px;\n    border-radius: 12px;\n    background-color: #ffffff;\n    input {\n      font-size: 14px;\n      line-height: 21px;\n      border: none;\n      background-color: inherit;\n      color: #666666;\n      width: 100%;\n      &:focus {\n        outline: none;\n      }\n    }\n  }\n</style>\n",".input-field {\n  padding: 10px 0;\n  margin-right: 5px;\n  border-radius: 12px;\n  background-color: #ffffff;\n}\n.input-field input {\n  font-size: 14px;\n  line-height: 21px;\n  border: none;\n  background-color: inherit;\n  color: #666666;\n  width: 100%;\n}\n.input-field input:focus {\n  outline: none;\n}\n\n/*# sourceMappingURL=input-field.vue.map */"]}, media: undefined });
Object.defineProperty(this, "$style", { value: {"input-field":"src-components-input-input-field-3KNw"} });

  };
  /* scoped */
  var __vue_scope_id__$7 = undefined;
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//


var script$8 = {
  name: 'InputButton',
  methods: {
    send: function send() {
      this.$emit('newOwnMessage');
    },
  },
};

/* script */
var __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.$style["send-button"], on: { click: _vm.send } },
    [_c("span", { staticClass: "icon iconfont icon-send" })]
  )
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  var __vue_inject_styles__$8 = function (inject) {
    if (!inject) { return }
    inject("data-v-3b6e9b4d_0", { source: ".src-components-input-send-button-3Ehe {\n  cursor: pointer;\n  background: #5680fa;\n  width: 50px;\n  height: 50px;\n  border-radius: 10px;\n  line-height: 50px;\n  text-align: center;\n  color: #ffffff;\n  box-shadow: 0px 0px 7px 2px rgba(148, 149, 150, 0.2);\n}", map: {"version":3,"sources":["/Volumes/Transcend/FE/uncle-vue-chat/src/components/input/send-button.vue","send-button.vue"],"names":[],"mappings":"AAqBA;EACA,eAAA;EACA,mBAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,iBAAA;EACA,kBAAA;EACA,cAAA;EACA,oDAAA;ACpBA","file":"send-button.vue","sourcesContent":["<template>\n  <div\n    :class=\"$style['send-button']\"\n    @click=\"send\">\n    <span class=\"icon iconfont icon-send\"></span>\n  </div>\n</template>\n\n<script>\n\nexport default {\n  name: 'InputButton',\n  methods: {\n    send() {\n      this.$emit('newOwnMessage');\n    },\n  },\n};\n</script>\n\n<style lang=\"scss\" module>\n.send-button{\n  cursor: pointer;\n  background:#5680fa;\n  width: 50px;\n  height: 50px;\n  border-radius: 10px;\n  line-height: 50px;\n  text-align: center;\n  color: #ffffff;\n  box-shadow: 0px 0px 7px 2px rgba(148, 149, 150, 0.2);\n}\n</style>\n",".send-button {\n  cursor: pointer;\n  background: #5680fa;\n  width: 50px;\n  height: 50px;\n  border-radius: 10px;\n  line-height: 50px;\n  text-align: center;\n  color: #ffffff;\n  box-shadow: 0px 0px 7px 2px rgba(148, 149, 150, 0.2);\n}\n\n/*# sourceMappingURL=send-button.vue.map */"]}, media: undefined });
Object.defineProperty(this, "$style", { value: {"send-button":"src-components-input-send-button-3Ehe"} });

  };
  /* scoped */
  var __vue_scope_id__$8 = undefined;
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$9 = {
  name: 'InputContainer',
  components: {
    emoji: __vue_component__$5,
    file: __vue_component__$6,
    inputField: __vue_component__$7,
    sendButton: __vue_component__$8,
  },
  data: function data() {
    return {
      message: '',
    };
  },
  methods: {
    handleFileUpload: function handleFileUpload(val) {
      var this$1 = this;

      var reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          if (typeof reader.result === 'string') {
            this$1.$emit('newOwnMessage', reader.result, 'image');
          } else {
            var blob = new Blob([reader.result]);
            var url = window.URL.createObjectURL(blob);
            this$1.$emit('newOwnMessage', { url: url, name: val.name }, 'file');
          }
        },
        false
      );
      if (val) {
        if (/\.(jpe?g|png|gif)$/i.test(val.name)) {
          reader.readAsDataURL(val);
        } else {
          reader.readAsArrayBuffer(val);
        }
      }
    },
    handleEmojiPicked: function handleEmojiPicked(val) {
      this.$emit('newOwnMessage', val, 'emoji');
    },
    onNewOwnMessage: function onNewOwnMessage() {
      if (!this.message) { return; }
      this.$emit('newOwnMessage', this.message);
      this.message = '';
    },
  },
};

/* script */
var __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.$style["input-container"] },
    [
      _c(
        "div",
        { class: _vm.$style.bar },
        [
          _c("emoji", { attrs: { "on-emoji-picked": _vm.handleEmojiPicked } }),
          _vm._v(" "),
          _c("file", { attrs: { "on-file-upload": _vm.handleFileUpload } })
        ],
        1
      ),
      _vm._v(" "),
      _c("input-field", {
        on: { newOwnMessage: _vm.onNewOwnMessage },
        model: {
          value: _vm.message,
          callback: function($$v) {
            _vm.message = $$v;
          },
          expression: "message"
        }
      }),
      _vm._v(" "),
      _c(
        "div",
        { class: _vm.$style.send },
        [_c("send-button", { on: { newOwnMessage: _vm.onNewOwnMessage } })],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  var __vue_inject_styles__$9 = function (inject) {
    if (!inject) { return }
    inject("data-v-75b79854_0", { source: ".src-components-input-input-container-FiN2 {\n  border-top: 1px solid #e9e9e9;\n  padding: 10px;\n}\n.src-components-input-input-container-FiN2 .src-components-input-bar-MtfB {\n  display: flex;\n}\n.src-components-input-input-container-FiN2 .src-components-input-send-yYsZ {\n  display: flex;\n  justify-content: flex-end;\n}", map: {"version":3,"sources":["/Volumes/Transcend/FE/uncle-vue-chat/src/components/input/input-container.vue","input-container.vue"],"names":[],"mappings":"AAsEA;EACA,6BAAA;EACA,aAAA;ACrEA;ADsEA;EACA,aAAA;ACpEA;ADuEA;EACA,aAAA;EACA,yBAAA;ACrEA","file":"input-container.vue","sourcesContent":["<template>\n  <div :class=\"$style['input-container']\">\n    <div :class=\"$style.bar\">\n      <emoji :on-emoji-picked=\"handleEmojiPicked\"/>\n      <file :on-file-upload=\"handleFileUpload\"/>\n    </div>\n    <input-field v-model=\"message\" @newOwnMessage=\"onNewOwnMessage\" />\n    <div :class=\"$style.send\">\n      <send-button @newOwnMessage=\"onNewOwnMessage\" />\n    </div>\n\n  </div>\n</template>\n\n<script>\nimport emoji from '../emoji/index.vue';\nimport file from '../file/index.vue';\nimport inputField from './input-field.vue';\nimport sendButton from './send-button.vue';\n\nexport default {\n  name: 'InputContainer',\n  components: {\n    emoji,\n    file,\n    inputField,\n    sendButton,\n  },\n  data() {\n    return {\n      message: '',\n    };\n  },\n  methods: {\n    handleFileUpload(val) {\n      const reader = new FileReader();\n      reader.addEventListener(\n        'load',\n        () => {\n          if (typeof reader.result === 'string') {\n            this.$emit('newOwnMessage', reader.result, 'image');\n          } else {\n            const blob = new Blob([reader.result]);\n            const url = window.URL.createObjectURL(blob);\n            this.$emit('newOwnMessage', { url, name: val.name }, 'file');\n          }\n        },\n        false,\n      );\n      if (val) {\n        if (/\\.(jpe?g|png|gif)$/i.test(val.name)) {\n          reader.readAsDataURL(val);\n        } else {\n          reader.readAsArrayBuffer(val);\n        }\n      }\n    },\n    handleEmojiPicked(val) {\n      this.$emit('newOwnMessage', val, 'emoji');\n    },\n    onNewOwnMessage() {\n      if (!this.message) return;\n      this.$emit('newOwnMessage', this.message);\n      this.message = '';\n    },\n  },\n};\n</script>\n\n<style lang=\"scss\" module>\n.input-container{\n  border-top: 1px solid #e9e9e9;\n  padding: 10px;\n  .bar{\n    display: flex;\n\n  }\n  .send{\n    display: flex;\n    justify-content: flex-end;\n  }\n}\n</style>\n",".input-container {\n  border-top: 1px solid #e9e9e9;\n  padding: 10px;\n}\n.input-container .bar {\n  display: flex;\n}\n.input-container .send {\n  display: flex;\n  justify-content: flex-end;\n}\n\n/*# sourceMappingURL=input-container.vue.map */"]}, media: undefined });
Object.defineProperty(this, "$style", { value: {"input-container":"src-components-input-input-container-FiN2","bar":"src-components-input-bar-MtfB","send":"src-components-input-send-yYsZ"} });

  };
  /* scoped */
  var __vue_scope_id__$9 = undefined;
  /* module identifier */
  var __vue_module_identifier__$9 = undefined;
  /* functional template */
  var __vue_is_functional_template__$9 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$9 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$a = {
  name: 'VueChat',
  data: function data() {
    return {
      feed: [{
        key: 0,
        id: 0,
        author: 'Person',
        contents: 'hi there',
        date: '16:30',
        type: 'message',
      }],
      authorId: 1,
    };
  },
  components: {
    headerItem: __vue_component__,
    messagesList: __vue_component__$3,
    inputContainer: __vue_component__$9,
  },
  methods: {
    scrollToBottom: function scrollToBottom() {
      var this$1 = this;

      setTimeout(function () {
        var scrollContainer = this$1.$refs.messages;
        var isScrolledToBottom = scrollContainer.scrollHeight - scrollContainer.clientHeight <= scrollContainer.scrollTop + 1;
        if (!isScrolledToBottom) { scrollContainer.scrollTop = scrollContainer.scrollHeight; }
      }, 201);
    },
    onNewOwnMessage: function onNewOwnMessage(message, type) {
      if ( type === void 0 ) type = 'message';

      var newOwnMessage = {
        key: this.feed.length,
        id: this.authorId,
        author: 'Me',
        contents: message,
        date: moment().format('HH:mm:ss'),
        type: type,
      };
      this.feed.push(newOwnMessage);
      this.scrollToBottom();
    },
  },
};

/* script */
var __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.$style["uncle-vue-chat"] },
    [
      _c("header-item"),
      _vm._v(" "),
      _c("div", { class: _vm.$style.main }, [
        _c(
          "div",
          { ref: "messages", class: _vm.$style.messages },
          [
            _c("messages-list", {
              attrs: { feed: _vm.feed, "author-id": _vm.authorId }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { class: _vm.$style.container },
          [
            _c("input-container", {
              on: { newOwnMessage: _vm.onNewOwnMessage }
            })
          ],
          1
        )
      ])
    ],
    1
  )
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  var __vue_inject_styles__$a = function (inject) {
    if (!inject) { return }
    inject("data-v-bf5da1da_0", { source: ".src-uncle-vue-chat-20Pk {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-size: 14px;\n  width: 50%;\n  margin: 0 auto;\n}\n.src-uncle-vue-chat-20Pk .src-main-1XJk {\n  border: 1px solid #e9e9e9;\n}\n.src-uncle-vue-chat-20Pk .src-main-1XJk .src-messages-3V2p {\n  padding: 0 10px;\n  transition: all 0.5s;\n  overflow: scroll;\n  overflow-x: hidden;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  height: 360px;\n}", map: {"version":3,"sources":["/Volumes/Transcend/FE/uncle-vue-chat/src/vue-chat.vue","vue-chat.vue"],"names":[],"mappings":"AAgEA;EACA,iDAAA;EACA,mCAAA;EACA,kCAAA;EACA,eAAA;EACA,UAAA;EACA,cAAA;AC/DA;ADgEA;EACA,yBAAA;AC9DA;AD+DA;EACA,eAAA;EACA,oBAAA;EACA,gBAAA;EACA,kBAAA;EACA,4BAAA;EACA,6BAAA;EACA,aAAA;AC7DA","file":"vue-chat.vue","sourcesContent":["<template>\n  <div :class=\"$style['uncle-vue-chat']\">\n    <header-item/>\n    <div :class=\"$style.main\">\n      <div :class=\"$style.messages\" ref=\"messages\">\n        <messages-list :feed=\"feed\" :author-id=\"authorId\"/>\n      </div>\n      <div :class=\"$style.container\">\n        <input-container @newOwnMessage=\"onNewOwnMessage\"/>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nimport moment from 'moment';\nimport headerItem from './components/header-item.vue';\nimport messagesList from './components/messages/messages-list.vue';\nimport inputContainer from './components/input/input-container.vue';\n\nexport default {\n  name: 'VueChat',\n  data() {\n    return {\n      feed: [{\n        key: 0,\n        id: 0,\n        author: 'Person',\n        contents: 'hi there',\n        date: '16:30',\n        type: 'message',\n      }],\n      authorId: 1,\n    };\n  },\n  components: {\n    headerItem,\n    messagesList,\n    inputContainer,\n  },\n  methods: {\n    scrollToBottom() {\n      setTimeout(() => {\n        const scrollContainer = this.$refs.messages;\n        const isScrolledToBottom = scrollContainer.scrollHeight - scrollContainer.clientHeight <= scrollContainer.scrollTop + 1;\n        if (!isScrolledToBottom) { scrollContainer.scrollTop = scrollContainer.scrollHeight; }\n      }, 201);\n    },\n    onNewOwnMessage(message, type = 'message') {\n      const newOwnMessage = {\n        key: this.feed.length,\n        id: this.authorId,\n        author: 'Me',\n        contents: message,\n        date: moment().format('HH:mm:ss'),\n        type,\n      };\n      this.feed.push(newOwnMessage);\n      this.scrollToBottom();\n    },\n  },\n};\n</script>\n<style lang=\"scss\" module>\n.uncle-vue-chat{\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-size: 14px;\n  width: 50%;\n  margin: 0 auto;\n  .main{\n    border: 1px solid #e9e9e9;\n    .messages{\n      padding: 0 10px;\n      transition: all 0.5s;\n      overflow: scroll;\n      overflow-x: hidden;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      height: 360px;\n    }\n  }\n}\n</style>\n",".uncle-vue-chat {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-size: 14px;\n  width: 50%;\n  margin: 0 auto;\n}\n.uncle-vue-chat .main {\n  border: 1px solid #e9e9e9;\n}\n.uncle-vue-chat .main .messages {\n  padding: 0 10px;\n  transition: all 0.5s;\n  overflow: scroll;\n  overflow-x: hidden;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  height: 360px;\n}\n\n/*# sourceMappingURL=vue-chat.vue.map */"]}, media: undefined });
Object.defineProperty(this, "$style", { value: {"uncle-vue-chat":"src-uncle-vue-chat-20Pk","main":"src-main-1XJk","messages":"src-messages-3V2p"} });

  };
  /* scoped */
  var __vue_scope_id__$a = undefined;
  /* module identifier */
  var __vue_module_identifier__$a = undefined;
  /* functional template */
  var __vue_is_functional_template__$a = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$a = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    createInjector,
    undefined,
    undefined
  );

function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component('UncleVueChat', __vue_component__$a);
}

var plugin = {
  install: install,
};

var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default __vue_component__$a;
export { install };
