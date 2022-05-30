import * as Popper from "@popperjs/core";

const NAME = "dropdown";

type Config = {
  placement: "top" | "right" | "bottom" | "left";
};

const DefaultConfig: Config = {
  placement: "bottom",
};

class Dropdown {
  private targetElem: HTMLElement;

  private triggerElem: HTMLElement;

  private isShown = false;

  private popper: any = null;

  private config: Config;

  constructor(
    triggerElement: HTMLElement,
    targetElement: HTMLElement,
    config?: Config
  ) {
    this.targetElem = targetElement;
    this.triggerElem = triggerElement;
    this.config = { ...DefaultConfig, ...(config || {}) };
    this.triggerElem.addEventListener("click", () => {
      this.toggle();
    });
  }

  static get NAME() {
    return NAME;
  }

  private handleClickOutside(ev: MouseEvent): any {
    const clickedElem = ev.target as Node;
    if (
      clickedElem !== this.targetElem &&
      !this.targetElem.contains(clickedElem) &&
      !this.triggerElem.contains(clickedElem) &&
      this.isShown
    ) {
      this.hide();
    }
    document.body.removeEventListener("click", this.handleClickOutside, true);
  }

  toggle() {
    if (this.isShown) {
      this.hide();
      document.body.removeEventListener("click", this.handleClickOutside, true);
    } else {
      this.show();
    }
  }

  show() {
    this.targetElem.style.display = "block";

    document.body.addEventListener(
      "click",
      (ev) => {
        this.handleClickOutside(ev);
      },
      true
    );

    this.popper = Popper.createPopper(this.triggerElem, this.targetElem, {
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

export default Dropdown;
