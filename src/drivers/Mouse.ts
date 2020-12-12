class MouseClickState {
  private isClicked = false;

  constructor() {
    this.addEventListeners();
  }

  private addEventListeners() {
    document.addEventListener("mousedown", this.eventHandlers["mousedown"]);
    document.addEventListener("mouseup", this.eventHandlers["mouseup"]);
  }

  private eventHandlers = {
    mousedown: () => this.handleDragStart(),
    mouseup: () => this.handleDragEnd(),
  };

  private handleDragStart = () => (this.isClicked = true);
  private handleDragEnd = () => (this.isClicked = false);

  getIsClicked(): boolean {
    return this.isClicked;
  }

  reset(): void {
    this.clearEventListeners();
  }

  private clearEventListeners() {
    document.removeEventListener("mousedown", this.eventHandlers["mousedown"]);
    document.removeEventListener("mouseup", this.eventHandlers["mouseup"]);
  }
}

class MousePosition {
  private position: [number, number];

  constructor() {
    this.position = [0, 0];
    this.addEventListeners();
  }

  private addEventListeners() {
    document.addEventListener("mousemove", this.eventHandlers["mousemove"]);
    document.addEventListener("touchmove", this.eventHandlers["touchmove"]);
  }

  private eventHandlers = {
    mousemove: (event: MouseEvent) => this.handleMove(event),
    touchmove: (event: TouchEvent) => this.handleMove(event),
  };

  private handleMove(event: TouchEvent | MouseEvent) {
    this.position = this.getPositionFromEvent(event);
  }

  private getPositionFromEvent(
    event: TouchEvent | MouseEvent
  ): [number, number] {
    if (this.isTouchEvent(event))
      return [event.touches[0].clientX, event.touches[0].clientY];

    return [event.clientX, event.clientY];
  }

  private isTouchEvent = (
    event: TouchEvent | MouseEvent
  ): event is TouchEvent => (event as TouchEvent).touches !== undefined;

  getPosition(): [number, number] {
    return this.position;
  }

  reset(): void {
    this.clearEventListeners();
  }

  private clearEventListeners() {
    document.removeEventListener("mousemove", this.eventHandlers["mousemove"]);
    document.removeEventListener("touchmove", this.eventHandlers["touchmove"]);
  }
}

class MouseTouchState {
  private numberOfTouches = 0;
  private isSingleTouched = false;
  private isDoubleTouched = false;

  constructor() {
    this.addEventListeners();
  }

  private addEventListeners() {
    document.addEventListener("touchstart", this.eventHandlers["touchstart"]);
    document.addEventListener("touchend", this.eventHandlers["touchend"]);
  }

  private eventHandlers = {
    touchstart: (touchEvent: TouchEvent) => this.handleTouchStart(touchEvent),
    touchend: (touchEvent: TouchEvent) => this.handleTouchEnd(touchEvent),
  };

  private handleTouchStart = (touchEvent: TouchEvent) => {
    this.numberOfTouches = touchEvent.touches.length;
    if (this.numberOfTouches === 1) this.isSingleTouched = true;
    if (this.numberOfTouches === 2) {
      this.isDoubleTouched = true;
      this.isSingleTouched = false;
    }
  };
  private handleTouchEnd = (touchEvent: TouchEvent) => {
    this.numberOfTouches = touchEvent.touches.length;
    if (this.numberOfTouches !== 2) {
      this.isDoubleTouched = false;
      if (this.numberOfTouches === 1) this.isSingleTouched = true;
    }
    if (this.numberOfTouches !== 1) this.isSingleTouched = false;
  };

  getIsSingleTouched(): boolean {
    return this.isSingleTouched;
  }

  getIsDoubleTouched(): boolean {
    return this.isDoubleTouched;
  }

  getNumberOfTouches(): number {
    return this.numberOfTouches;
  }

  reset(): void {
    this.clearEventListeners();
  }

  private clearEventListeners() {
    document.removeEventListener(
      "touchstart",
      this.eventHandlers["touchstart"]
    );
    document.removeEventListener("touchend", this.eventHandlers["touchend"]);
  }
}

export class Mouse {
  static instance = new Mouse();

  private position: MousePosition = new MousePosition();
  private clickState: MouseClickState = new MouseClickState();
  private touchState: MouseTouchState = new MouseTouchState();

  static getPosition(): [number, number] {
    return this.instance.position.getPosition();
  }

  static isClicked(): boolean {
    return this.instance.clickState.getIsClicked();
  }

  static isSingleTouched(): boolean {
    return this.instance.touchState.getIsSingleTouched();
  }

  static isDoubleTouched(): boolean {
    return this.instance.touchState.getIsDoubleTouched();
  }
}
