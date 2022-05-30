(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@popperjs/core')) :
    typeof define === 'function' && define.amd ? define(['@popperjs/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.shoe = factory(global.Popper));
})(this, (function (Popper) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
        if (e) {
            for (const k in e) {
                if (k !== 'default') {
                    const d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: () => e[k]
                    });
                }
            }
        }
        n.default = e;
        return Object.freeze(n);
    }

    const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);

    const NAME$3 = "backdrop";
    class Backdrop {
        constructor(config) {
            this.elem = null;
            this.isAppended = false;
            this.config = config;
        }
        static get NAME() {
            return NAME$3;
        }
        show() {
            this.append();
        }
        hide() {
            this.dispose();
        }
        dispose() {
            if (!this.isAppended) {
                return;
            }
            this.elem.removeEventListener("click", this.handleClick, true);
            this.elem.remove();
            this.isAppended = false;
        }
        append() {
            if (this.isAppended) {
                return;
            }
            const elem = this.getElement();
            document.body.append(elem);
            elem.addEventListener("click", this.handleClick.bind(this), true);
            this.isAppended = true;
        }
        getElement() {
            if (!this.elem) {
                const backdrop = document.createElement("div");
                if (this.config.className) {
                    backdrop.className = this.config.className;
                }
                this.elem = backdrop;
            }
            return this.elem;
        }
        handleClick() {
            if (this.config.clickCallback) {
                this.config.clickCallback();
            }
        }
    }

    const NAME$2 = "offcanvas";
    const defaultConfig = {
        backdrop: true,
    };
    class Offcanvas {
        constructor(element, config) {
            this.isShown = false;
            this.elem = element;
            this.config = Object.assign(config || {}, defaultConfig);
            this.oriTransformVal = this.elem.style.transform;
            this.backdrop = this.initializeBackDrop();
        }
        static get NAME() {
            return NAME$2;
        }
        toggle() {
            return this.isShown ? this.hide() : this.show();
        }
        show() {
            var _a;
            this.elem.style.transform = "none";
            this.isShown = true;
            (_a = this.backdrop) === null || _a === void 0 ? void 0 : _a.show();
        }
        hide() {
            var _a;
            if (!this.isShown) {
                return;
            }
            this.elem.style.transform = this.oriTransformVal;
            this.isShown = false;
            (_a = this.backdrop) === null || _a === void 0 ? void 0 : _a.hide();
        }
        initializeBackDrop() {
            if (!this.config.backdrop)
                return undefined;
            const clickCallback = () => {
                this.hide();
            };
            return new Backdrop({
                className: this.config.backdropClassName,
                clickCallback,
            });
        }
    }

    const NAME$1 = "scrollspy";
    class Scrollspy {
        constructor(elements, scrollElement = document.body, config = {}) {
            this.targets = [];
            this.activeTarget = null;
            this.config = {};
            this.scrollElement =
                scrollElement.tagName === "BODY" ? window : scrollElement;
            this.scrollElement.addEventListener("scroll", () => {
                this.process();
            });
            Object.assign(this.config, config);
            this.refresh(elements);
            this.process();
        }
        static get NAME() {
            return NAME$1;
        }
        refresh(elements) {
            const offsetBase = this.scrollElement === window ? 0 : this.getScrollTop();
            const targetStack = [];
            let currTarget;
            const getTarget = (elem) => {
                const selector = Scrollspy.getSelector(elem);
                const trigger = selector
                    ? Scrollspy.find(selector, (this.scrollElement === window
                        ? document.body
                        : this.scrollElement))
                    : null;
                if (!trigger)
                    return null;
                const triggerBCR = trigger.getBoundingClientRect();
                return triggerBCR.width || triggerBCR.height
                    ? {
                        parent: targetStack[targetStack.length - 1],
                        element: elem,
                        offset: this.scrollElement === window
                            ? triggerBCR.top + window.pageYOffset + offsetBase
                            : trigger.offsetTop + offsetBase,
                    }
                    : null;
            };
            const parse = (elems) => {
                if (elems.length === 0 || Array.isArray(elements[0])) {
                    throw new Error("Invalid tree structure");
                }
                const target = getTarget(elems[0]);
                if (target !== null) {
                    this.targets.push(target);
                }
                currTarget = target;
                for (let i = 1; i < elems.length; i += 1) {
                    const ele = elems[i];
                    if (Array.isArray(ele)) {
                        targetStack.push(currTarget);
                        parse(ele);
                    }
                    else {
                        const t = getTarget(ele);
                        if (t !== null) {
                            this.targets.push(t);
                        }
                        currTarget = t;
                    }
                }
                targetStack.pop();
            };
            parse(elements);
            this.targets = this.targets.sort((a, b) => a.offset - b.offset);
        }
        getScrollTop() {
            return this.scrollElement === window
                ? this.scrollElement.pageYOffset
                : this.scrollElement.scrollTop;
        }
        getScrollHeight() {
            return (this.scrollElement.scrollHeight ||
                Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
        }
        getOffsetHeight() {
            return this.scrollElement === window
                ? window.innerHeight
                : this.scrollElement.getBoundingClientRect().height;
        }
        process() {
            const scrollTop = this.getScrollTop();
            const scrollHeight = this.getScrollHeight();
            const maxScroll = scrollHeight - this.getOffsetHeight();
            if (scrollTop >= maxScroll) {
                const target = this.targets[this.targets.length - 1];
                if (this.activeTarget !== target) {
                    this.activate(target);
                }
                return;
            }
            if (this.activeTarget &&
                scrollTop < this.targets[0].offset &&
                this.targets[0].offset > 0) {
                this.activeTarget = null;
                this.clear();
                return;
            }
            for (let i = 0; i < this.targets.length; i += 1) {
                const isActiveTarget = this.activeTarget !== this.targets[i] &&
                    scrollTop >= this.targets[i].offset &&
                    (typeof this.targets[i + 1] === "undefined" ||
                        scrollTop < this.targets[i + 1].offset);
                if (isActiveTarget) {
                    this.activate(this.targets[i]);
                }
            }
        }
        activate(target) {
            this.activeTarget = target;
            this.clear();
            if (this.config.activeClassName) {
                const tokens = this.config.activeClassName.split(" ");
                this.activeTarget.element.classList.add(...tokens);
                let { parent } = target;
                while (parent) {
                    parent.element.classList.add(...tokens);
                    parent = parent.parent;
                }
            }
        }
        clear() {
            if (this.config.activeClassName) {
                const tokens = this.config.activeClassName.split(" ");
                this.targets.forEach((target) => target.element.classList.remove(...tokens));
            }
        }
        static getSelector(ele) {
            let selector = null;
            let hrefAttr = ele.getAttribute("href");
            if (!hrefAttr || (!hrefAttr.includes("#") && !hrefAttr.startsWith("."))) {
                return null;
            }
            if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
                hrefAttr = `#${hrefAttr.split("#")[1]}`;
            }
            selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
            return selector;
        }
        static find(selector, element = document.body) {
            return Element.prototype.querySelector.call(element, selector);
        }
    }

    const NAME = "dropdown";
    const DefaultConfig = {
        placement: "bottom",
    };
    class Dropdown {
        constructor(triggerElement, targetElement, config) {
            this.isShown = false;
            this.popper = null;
            this.targetElem = targetElement;
            this.triggerElem = triggerElement;
            this.config = Object.assign(Object.assign({}, DefaultConfig), (config || {}));
            this.triggerElem.addEventListener("click", () => {
                this.toggle();
            });
        }
        static get NAME() {
            return NAME;
        }
        handleClickOutside(ev) {
            const clickedElem = ev.target;
            if (clickedElem !== this.targetElem &&
                !this.targetElem.contains(clickedElem) &&
                !this.triggerElem.contains(clickedElem) &&
                this.isShown) {
                this.hide();
            }
            document.body.removeEventListener("click", this.handleClickOutside, true);
        }
        toggle() {
            if (this.isShown) {
                this.hide();
                document.body.removeEventListener("click", this.handleClickOutside, true);
            }
            else {
                this.show();
            }
        }
        show() {
            this.targetElem.style.display = "block";
            document.body.addEventListener("click", (ev) => {
                this.handleClickOutside(ev);
            }, true);
            this.popper = Popper__namespace.createPopper(this.triggerElem, this.targetElem, {
                placement: this.config.placement,
                modifiers: [
                    {
                        name: "offset",
                        options: {
                            offset: [0, 10],
                        },
                    },
                ],
            });
            this.popper.update();
            this.isShown = true;
        }
        hide() {
            this.targetElem.style.display = "none";
            if (this.popper) {
                this.popper.destroy();
            }
            this.isShown = false;
        }
    }

    const index_umd = {
        Offcanvas,
        Scrollspy,
        Dropdown,
    };

    return index_umd;

}));
