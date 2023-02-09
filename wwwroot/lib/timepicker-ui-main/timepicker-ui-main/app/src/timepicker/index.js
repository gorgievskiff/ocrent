"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-useless-return */
const utils_1 = require("./utils");
const input_1 = require("./utils/input");
const disable_1 = require("./utils/disable");
require("./styles/main.scss");
require("./styles/theme.scss");
const variables_scss_1 = __importDefault(require("./styles/variables.scss"));
const options_1 = require("./utils/options");
const variables_1 = require("./utils/variables");
const templates_1 = require("./utils/templates");
const ClockFace_1 = __importDefault(require("./components/ClockFace"));
const debounce = (callback, timeout) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args);
        }, timeout);
    };
};
class TimepickerUI {
    constructor(element, options) {
        var _a, _b, _c;
        /**
         * @description The create method that init timepicker
         */
        this.create = () => {
            this._updateInputValueWithCurrentTimeOnStart();
            this._checkDisabledValuesOnStart();
            this._setTimepickerClassToElement();
            this._setInputClassToInputElement();
            this._setDataOpenToInputIfDosentExistInWrapper();
            this._setClassTopOpenElement();
            this._handleOpenOnEnterFocus();
            this._handleOpenOnClick();
            this._getDisableTime();
        };
        /**
         * @description The open method opens immediately timepicker after init
         * @param callback - The callback function triggered when timepicker is open by this method
         */
        this.open = (callback) => {
            this.create();
            this._eventsBundle();
            utils_1.initCallback(callback);
        };
        /**
         * @description Closure method closes the timepicker
         * @param args - These parameters in this method are optional and order is any. You can set callback function first or boolean,
         * or just boolean or just callback. If the boolean is set to true the input will be updating with the current value on picker.
         * The callback function start immediately after close, if is invoke. The max parameters length is set to 2
         */
        this.close = debounce((...args) => {
            var _a;
            if (args.length > 2 || !this.modalElement)
                return;
            const [update] = args.filter((e) => typeof e === 'boolean');
            const [callback] = args.filter((e) => typeof e === 'function');
            if (update) {
                this._handleOkButton();
                (_a = this.okButton) === null || _a === void 0 ? void 0 : _a.click();
            }
            this._isTouchMouseMove = false;
            variables_1.allEvents
                .split(' ')
                .map((event) => document.removeEventListener(event, this._mutliEventsMoveHandler, false));
            document.removeEventListener('mousedown', this._eventsClickMobileHandler);
            document.removeEventListener('touchstart', this._eventsClickMobileHandler);
            document.removeEventListener('keypress', this._handleEscClick);
            this.wrapper.removeEventListener('keydown', this._focusTrapHandler);
            if (this._options.enableSwitchIcon) {
                this.keyboardClockIcon.removeEventListener('touchstart', this._handlerViewChange);
                this.keyboardClockIcon.removeEventListener('mousedown', this._handlerViewChange);
            }
            this._removeAnimationToClose();
            this.openElement.forEach((openEl) => openEl === null || openEl === void 0 ? void 0 : openEl.classList.remove('disabled'));
            setTimeout(() => {
                document.body.style.overflowY = '';
                document.body.style.paddingRight = '';
            }, 400);
            this.openElement.forEach((openEl) => openEl === null || openEl === void 0 ? void 0 : openEl.classList.remove('disabled'));
            setTimeout(() => {
                var _a;
                if (this._options.focusInputAfterCloseModal)
                    (_a = this.input) === null || _a === void 0 ? void 0 : _a.focus();
                if (this.modalElement === null)
                    return;
                this.modalElement.remove();
                this._isModalRemove = true;
            }, 300);
            utils_1.initCallback(callback);
        }, 300);
        /**
         * @description The destroy method destroy actual instance of picker by cloning element.
         * @param callback - The callback function is started after destroyed method. This parameter is optional.
         */
        this.destroy = (callback) => {
            variables_1.allEvents
                .split(' ')
                .map((event) => document.removeEventListener(event, this._mutliEventsMoveHandler, false));
            document.removeEventListener('mousedown', this._eventsClickMobileHandler);
            document.removeEventListener('touchstart', this._eventsClickMobileHandler);
            if (this._options.enableSwitchIcon && this.keyboardClockIcon) {
                this.keyboardClockIcon.removeEventListener('touchstart', this._handlerViewChange);
                this.keyboardClockIcon.removeEventListener('mousedown', this._handlerViewChange);
            }
            this._cloned = this._element.cloneNode(true);
            this._element.after(this._cloned);
            this._element.remove();
            // @ts-ignore
            this._element = null;
            if (this._element === null) {
                utils_1.initCallback(callback);
            }
            this._element = this._cloned;
        };
        /**
         * @description The update method which update timepicker with new options and can create a new instance.
         * @param value - The first parameter is a object with key options which is timepicker options and it will be updated to current
         * instance and is `required`. The `create` key is a boolean which if is set to true it starting the create() method after invoke update
         * function and is optional. The `create` option is useful if you are using destroy and update methods together.
         * @param callback - The `callback` function is started after update method. This parameter is optional.
         */
        this.update = (value, callback) => {
            this._options = Object.assign(Object.assign({}, this._options), value.options);
            this._checkMobileOption();
            if (value.create) {
                this.create();
            }
            utils_1.initCallback(callback);
        };
        this._preventClockTypeByCurrentTime = () => {
            var _a, _b, _c, _d, _e;
            if ((typeof ((_a = this._options) === null || _a === void 0 ? void 0 : _a.currentTime) !== 'boolean' && ((_c = (_b = this._options) === null || _b === void 0 ? void 0 : _b.currentTime) === null || _c === void 0 ? void 0 : _c.preventClockType)) ||
                (typeof ((_d = this._options) === null || _d === void 0 ? void 0 : _d.currentTime) === 'boolean' && ((_e = this._options) === null || _e === void 0 ? void 0 : _e.currentTime))) {
                const { currentTime, clockType } = this._options;
                const { type } = input_1.getInputValue(this.input, clockType, currentTime, true);
                this._options.clockType = type ? '12h' : '24h';
            }
        };
        this._updateInputValueWithCurrentTimeOnStart = () => {
            var _a, _b, _c, _d, _e;
            if ((typeof ((_a = this._options) === null || _a === void 0 ? void 0 : _a.currentTime) !== 'boolean' && ((_c = (_b = this._options) === null || _b === void 0 ? void 0 : _b.currentTime) === null || _c === void 0 ? void 0 : _c.updateInput)) ||
                (typeof ((_d = this._options) === null || _d === void 0 ? void 0 : _d.currentTime) === 'boolean' && ((_e = this._options) === null || _e === void 0 ? void 0 : _e.currentTime))) {
                const { hour, minutes, type } = input_1.getInputValue(this.input, this._options.clockType, this._options.currentTime);
                this.input.value = type ? `${hour}:${minutes} ${type}` : `${hour}:${minutes}`;
            }
        };
        this._setTheme = () => {
            var _a, _b;
            const allDiv = (_a = this.modalElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll('div');
            const allInput = (_b = this.modalElement) === null || _b === void 0 ? void 0 : _b.querySelectorAll('input');
            const allElements = [...allInput, ...allDiv];
            const { theme } = this._options;
            if (theme === 'crane-straight') {
                allElements.forEach((el) => el.classList.add('crane-straight'));
            }
            else if (theme === 'crane-radius') {
                allElements.forEach((el) => el.classList.add('crane-straight', 'radius'));
            }
        };
        this._setInputClassToInputElement = () => {
            var _a;
            if (!utils_1.hasClass(this.input, 'timepicker-ui-input')) {
                (_a = this.input) === null || _a === void 0 ? void 0 : _a.classList.add('timepicker-ui-input');
            }
        };
        this._setDataOpenToInputIfDosentExistInWrapper = () => {
            var _a;
            if (this.openElementData === null) {
                (_a = this.input) === null || _a === void 0 ? void 0 : _a.setAttribute('data-open', 'timepicker-ui-input');
            }
        };
        this._setClassTopOpenElement = () => {
            this.openElement.forEach((openEl) => openEl === null || openEl === void 0 ? void 0 : openEl.classList.add('timepicker-ui-open-element'));
        };
        this._removeBackdrop = () => {
            var _a;
            if (this._options.backdrop)
                return;
            (_a = this.modalElement) === null || _a === void 0 ? void 0 : _a.classList.add('removed');
            this.openElement.forEach((openEl) => openEl === null || openEl === void 0 ? void 0 : openEl.classList.add('disabled'));
        };
        this._setNormalizeClass = () => {
            var _a, _b;
            const allElement = (_a = this.modalElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll('div');
            (_b = this.modalElement) === null || _b === void 0 ? void 0 : _b.classList.add('timepicker-ui-normalize');
            allElement === null || allElement === void 0 ? void 0 : allElement.forEach((div) => div.classList.add('timepicker-ui-normalize'));
        };
        this._setFlexEndToFooterIfNoKeyboardIcon = () => {
            if (!this._options.enableSwitchIcon && this.footer) {
                this.footer.style.justifyContent = 'flex-end';
            }
        };
        this._eventsBundle = () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            if (!this._isModalRemove) {
                return;
            }
            this._handleEscClick();
            this._setErrorHandler();
            this._removeErrorHandler();
            this.openElement.forEach((openEl) => openEl === null || openEl === void 0 ? void 0 : openEl.classList.add('disabled'));
            (_a = this.input) === null || _a === void 0 ? void 0 : _a.blur();
            this._setScrollbarOrNot();
            this._setModalTemplate();
            this._setNormalizeClass();
            this._removeBackdrop();
            this._setBgColorToCirleWithHourTips();
            this._setOnStartCSSClassesIfClockType24h();
            this._setClassActiveToHourOnOpen();
            if (this.clockFace !== null) {
                const initClockFace = new ClockFace_1.default({
                    array: templates_1.getNumberOfHours12,
                    classToAdd: 'timepicker-ui-hour-time-12',
                    clockFace: this.clockFace,
                    tipsWrapper: this.tipsWrapper,
                    theme: this._options.theme,
                    disabledTime: ((_c = (_b = this._disabledTime) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.isInterval) ? (_d = this._disabledTime) === null || _d === void 0 ? void 0 : _d.value.rangeArrHour : (_f = (_e = this._disabledTime) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.hours,
                    clockType: '12h',
                    hour: this.hour.value,
                });
                initClockFace.create();
                if (this._options.clockType === '24h') {
                    const initClockFace24h = new ClockFace_1.default({
                        array: templates_1.getNumberOfHours24,
                        classToAdd: 'timepicker-ui-hour-time-24',
                        clockFace: this.tipsWrapperFor24h,
                        tipsWrapper: this.tipsWrapperFor24h,
                        theme: this._options.theme,
                        clockType: '24h',
                        disabledTime: ((_h = (_g = this._disabledTime) === null || _g === void 0 ? void 0 : _g.value) === null || _h === void 0 ? void 0 : _h.isInterval) ? (_j = this._disabledTime) === null || _j === void 0 ? void 0 : _j.value.rangeArrHour : (_l = (_k = this._disabledTime) === null || _k === void 0 ? void 0 : _k.value) === null || _l === void 0 ? void 0 : _l.hours,
                        hour: this.hour.value,
                    });
                    initClockFace24h.create();
                }
                else {
                    if (((_m = this._disabledTime) === null || _m === void 0 ? void 0 : _m.value.startType) === ((_o = this._disabledTime) === null || _o === void 0 ? void 0 : _o.value.endType)) {
                        setTimeout(() => {
                            var _a, _b, _c, _d, _e, _f, _g, _h;
                            if (((_a = this._disabledTime) === null || _a === void 0 ? void 0 : _a.value.startType) === ((_b = this.activeTypeMode) === null || _b === void 0 ? void 0 : _b.textContent)) {
                                initClockFace.updateDisable({
                                    hoursToUpdate: (_d = (_c = this._disabledTime) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.rangeArrHour,
                                    minutesToUpdate: {
                                        endMinutes: (_e = this._disabledTime) === null || _e === void 0 ? void 0 : _e.value.endMinutes,
                                        removedEndHour: (_f = this._disabledTime) === null || _f === void 0 ? void 0 : _f.value.removedEndHour,
                                        removedStartedHour: (_g = this._disabledTime) === null || _g === void 0 ? void 0 : _g.value.removedStartedHour,
                                        actualHour: this.hour.value,
                                        startMinutes: (_h = this._disabledTime) === null || _h === void 0 ? void 0 : _h.value.startMinutes,
                                    },
                                });
                            }
                        }, 300);
                    }
                    else {
                        setTimeout(() => {
                            var _a, _b, _c;
                            initClockFace.updateDisable({
                                minutesToUpdate: {
                                    actualHour: this.hour.value,
                                    pmHours: (_a = this._disabledTime) === null || _a === void 0 ? void 0 : _a.value.pmHours,
                                    amHours: (_b = this._disabledTime) === null || _b === void 0 ? void 0 : _b.value.amHours,
                                    activeMode: (_c = this.activeTypeMode) === null || _c === void 0 ? void 0 : _c.textContent,
                                },
                            });
                        }, 300);
                    }
                    initClockFace.updateDisable();
                }
            }
            this._setFlexEndToFooterIfNoKeyboardIcon();
            setTimeout(() => {
                this._setTheme();
            }, 0);
            this._setAnimationToOpen();
            this._getInputValueOnOpenAndSet();
            this._toggleClassActiveToValueTips(this.hour.value);
            if (!this._isMobileView) {
                this._setTransformToCircleWithSwitchesHour(this.hour.value);
                this._handleAnimationClock();
            }
            this._handleMinutesEvents();
            this._handleHourEvents();
            if (this._options.clockType !== '24h') {
                this._handleAmClick();
                this._handlePmClick();
            }
            if (this.clockFace) {
                this._handleMoveHand();
            }
            this._handleCancelButton();
            this._handleOkButton();
            if (this.modalElement) {
                this._setShowClassToBackdrop();
                this._handleBackdropClick();
            }
            this._handleIconChangeView();
            this._handleClickOnHourMobile();
            if (this._options.focusTrap) {
                this._focusTrapHandler();
            }
        };
        this._handleOpenOnClick = () => {
            this.openElement.forEach((openEl) => this._clickTouchEvents.forEach((el) => openEl === null || openEl === void 0 ? void 0 : openEl.addEventListener(el, () => this._eventsBundle())));
        };
        this._getInputValueOnOpenAndSet = () => {
            var _a, _b;
            const value = input_1.getInputValue(this.input, this._options.clockType, this._options.currentTime);
            if (value === undefined) {
                this.hour.value = '12';
                this.minutes.value = '00';
                utils_1.createNewEvent(this._element, 'show', {
                    hour: this.hour.value,
                    minutes: this.minutes.value,
                    type: (_a = this.activeTypeMode) === null || _a === void 0 ? void 0 : _a.dataset.type,
                    degreesHours: this._degreesHours,
                    degreesMinutes: this._degreesMinutes,
                });
                if (this._options.clockType !== '24h') {
                    this.AM.classList.add(variables_1.selectorActive);
                }
                return;
            }
            let [hour, minutes, type] = this.input.value.split(':').join(' ').split(' ');
            if (this.input.value.length === 0) {
                hour = value.hour;
                minutes = value.minutes;
                type = value.type;
            }
            this.hour.value = hour;
            this.minutes.value = minutes;
            const typeMode = document.querySelector(`[data-type='${type}']`);
            if (this._options.clockType !== '24h' && typeMode) {
                typeMode.classList.add(variables_1.selectorActive);
            }
            utils_1.createNewEvent(this._element, 'show', Object.assign(Object.assign({}, value), { type: (_b = this.activeTypeMode) === null || _b === void 0 ? void 0 : _b.dataset.type, degreesHours: this._degreesHours, degreesMinutes: this._degreesMinutes }));
        };
        this._handleCancelButton = () => {
            this._clickTouchEvents.forEach((el) => {
                this.cancelButton.addEventListener(el, () => {
                    var _a;
                    const value = input_1.getInputValue(this.input, this._options.clockType);
                    utils_1.createNewEvent(this._element, 'cancel', Object.assign(Object.assign({}, value), { hourNotAccepted: this.hour.value, minutesNotAccepted: this.minutes.value, type: (_a = this.activeTypeMode) === null || _a === void 0 ? void 0 : _a.dataset.type, degreesHours: this._degreesHours, degreesMinutes: this._degreesMinutes }));
                    this.close();
                });
            });
        };
        this._handleOkButton = () => {
            this._clickTouchEvents.forEach((el) => {
                var _a;
                (_a = this.okButton) === null || _a === void 0 ? void 0 : _a.addEventListener(el, () => {
                    var _a, _b, _c;
                    const { clockType, disabledTime } = this._options;
                    const validHours = input_1.handleValueAndCheck(this.hour.value, 'hour', clockType);
                    const validMinutes = input_1.handleValueAndCheck(this.minutes.value, 'minutes', clockType);
                    let checkDisable;
                    const validHoursDisabled = disable_1.checkDisabledHoursAndMinutes(this.hour.value, 'hour', clockType, disabledTime === null || disabledTime === void 0 ? void 0 : disabledTime.hours);
                    const validMinutesDisabled = disable_1.checkDisabledHoursAndMinutes(this.minutes.value, 'minutes', clockType, disabledTime === null || disabledTime === void 0 ? void 0 : disabledTime.minutes);
                    if (disabledTime === null || disabledTime === void 0 ? void 0 : disabledTime.interval) {
                        checkDisable = disable_1.checkedDisabledValuesInterval(this.hour.value, this.minutes.value, (_a = this.activeTypeMode) === null || _a === void 0 ? void 0 : _a.textContent, disabledTime.interval);
                    }
                    if (checkDisable === false ||
                        validHours === false ||
                        validMinutes === false ||
                        validHoursDisabled === false ||
                        validMinutesDisabled === false) {
                        if (checkDisable === false || !validMinutes || !validMinutesDisabled) {
                            this.minutes.classList.add('invalid-value');
                        }
                        if (checkDisable === false || !validHours || !validHoursDisabled) {
                            this.hour.classList.add('invalid-value');
                        }
                        return;
                    }
                    this.input.value = `${this.hour.value}:${this.minutes.value} ${this._options.clockType === '24h' ? '' : (_b = this.activeTypeMode) === null || _b === void 0 ? void 0 : _b.dataset.type}`.trimEnd();
                    utils_1.createNewEvent(this._element, 'accept', {
                        hour: this.hour.value,
                        minutes: this.minutes.value,
                        type: (_c = this.activeTypeMode) === null || _c === void 0 ? void 0 : _c.dataset.type,
                        degreesHours: this._degreesHours,
                        degreesMinutes: this._degreesMinutes,
                    });
                    this.close();
                });
            });
        };
        this._setShowClassToBackdrop = () => {
            if (this._options.backdrop) {
                setTimeout(() => {
                    this.modalElement.classList.add('show');
                }, 300);
            }
        };
        this._handleBackdropClick = () => {
            var _a;
            (_a = this.modalElement) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (ev) => {
                var _a;
                const target = ev.target;
                if (!utils_1.hasClass(target, 'timepicker-ui-modal'))
                    return;
                const value = input_1.getInputValue(this.input, this._options.clockType);
                utils_1.createNewEvent(this._element, 'cancel', Object.assign(Object.assign({}, value), { hourNotAccepted: this.hour.value, minutesNotAccepted: this.minutes.value, type: (_a = this.activeTypeMode) === null || _a === void 0 ? void 0 : _a.dataset.type, degreesHours: this._degreesHours, degreesMinutes: this._degreesMinutes }));
                this.close();
            });
        };
        this._setBgColorToCirleWithHourTips = () => {
            if (!this._options)
                return;
            const { mobile, theme } = this._options;
            if (mobile || this.circle === null)
                return;
            if (theme === 'crane-straight' || theme === 'crane-radius') {
                this.circle.style.backgroundColor = variables_scss_1.default.cranered400;
            }
            else {
                this.circle.style.backgroundColor = variables_scss_1.default.purple;
            }
        };
        this._setBgColorToCircleWithMinutesTips = () => {
            const { theme } = this._options;
            if (this.minutes.value && templates_1.getNumberOfMinutes.includes(this.minutes.value)) {
                if (theme === 'crane-straight' || theme === 'crane-radius') {
                    this.circle.style.backgroundColor = variables_scss_1.default.cranered400;
                }
                else {
                    this.circle.style.backgroundColor = variables_scss_1.default.purple;
                }
                this.circle.classList.remove('small-circle');
            }
        };
        this._removeBgColorToCirleWithMinutesTips = () => {
            if (this.minutes.value && templates_1.getNumberOfMinutes.includes(this.minutes.value))
                return;
            this.circle.style.backgroundColor = '';
            this.circle.classList.add('small-circle');
        };
        this._setTimepickerClassToElement = () => {
            var _a;
            (_a = this._element) === null || _a === void 0 ? void 0 : _a.classList.add(variables_1.name);
        };
        this._setClassActiveToHourOnOpen = () => {
            var _a;
            if (this._options.mobile || this._isMobileView)
                return;
            (_a = this.hour) === null || _a === void 0 ? void 0 : _a.classList.add(variables_1.selectorActive);
        };
        this._setMinutesToClock = (value) => {
            var _a, _b, _c, _d, _e;
            if (this.clockFace !== null)
                this._setTransformToCircleWithSwitchesMinutes(value);
            this._removeBgColorToCirleWithMinutesTips();
            const getDisabledMinutes = ((_b = (_a = this._disabledTime) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.minutes) ? (_d = (_c = this._disabledTime) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.minutes : (_e = this._disabledTime) === null || _e === void 0 ? void 0 : _e.value;
            const initClockFace = new ClockFace_1.default({
                array: templates_1.getNumberOfMinutes,
                classToAdd: 'timepicker-ui-minutes-time',
                clockFace: this.clockFace,
                tipsWrapper: this.tipsWrapper,
                theme: this._options.theme,
                disabledTime: getDisabledMinutes,
                hour: this.hour.value,
                clockType: this._options.clockType,
            });
            initClockFace.create();
            if (this._options.clockType === '12h') {
                initClockFace.updateDisable();
            }
            this._toggleClassActiveToValueTips(value);
            if (this._options.clockType === '24h') {
                this.tipsWrapperFor24h.innerHTML = '';
            }
        };
        this._setHoursToClock = (value) => {
            var _a, _b, _c, _d, _e;
            if (this.clockFace !== null) {
                this._setTransformToCircleWithSwitchesHour(value);
                this._setBgColorToCirleWithHourTips();
                const disabledTime = ((_b = (_a = this._disabledTime) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.isInterval) ? (_c = this._disabledTime) === null || _c === void 0 ? void 0 : _c.value.rangeArrHour : (_e = (_d = this._disabledTime) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.hours;
                const init12h = new ClockFace_1.default({
                    array: templates_1.getNumberOfHours12,
                    classToAdd: 'timepicker-ui-hour-time-12',
                    clockFace: this.clockFace,
                    tipsWrapper: this.tipsWrapper,
                    theme: this._options.theme,
                    disabledTime,
                    clockType: '12h',
                    hour: this.hour.value,
                });
                init12h.create();
                if (this._options.clockType === '24h') {
                    new ClockFace_1.default({
                        array: templates_1.getNumberOfHours24,
                        classToAdd: 'timepicker-ui-hour-time-24',
                        clockFace: this.tipsWrapperFor24h,
                        tipsWrapper: this.tipsWrapperFor24h,
                        theme: this._options.theme,
                        clockType: '24h',
                        disabledTime,
                        hour: this.hour.value,
                    }).create();
                }
                else {
                    init12h.updateDisable();
                }
                this._toggleClassActiveToValueTips(value);
            }
        };
        this._setTransformToCircleWithSwitchesHour = (val) => {
            const value = Number(val);
            let degrees = value > 12 ? value * 30 - 360 : value * 30;
            if (degrees === 360) {
                degrees = 0;
            }
            if (degrees > 360)
                return;
            this.clockHand.style.transform = `rotateZ(${degrees}deg)`;
        };
        this._setTransformToCircleWithSwitchesMinutes = (val) => {
            const degrees = Number(val) * 6;
            if (degrees > 360)
                return;
            this.clockHand.style.transform = `rotateZ(${degrees}deg)`;
        };
        this._handleAmClick = () => {
            this._clickTouchEvents.forEach((e) => {
                this.AM.addEventListener(e, (ev) => {
                    var _a, _b, _c, _d;
                    const target = ev.target;
                    target.classList.add(variables_1.selectorActive);
                    this.PM.classList.remove(variables_1.selectorActive);
                    if (this._options.clockType === '12h' && ((_a = this._options.disabledTime) === null || _a === void 0 ? void 0 : _a.interval)) {
                        const initClockFace = new ClockFace_1.default({
                            clockFace: this.clockFace,
                            tipsWrapper: this.tipsWrapper,
                            array: utils_1.hasClass(this.hour, variables_1.selectorActive) ? templates_1.getNumberOfHours12 : templates_1.getNumberOfMinutes,
                        });
                        if (((_b = this._disabledTime) === null || _b === void 0 ? void 0 : _b.value.startType) === ((_c = this._disabledTime) === null || _c === void 0 ? void 0 : _c.value.endType)) {
                            setTimeout(() => {
                                var _a, _b, _c, _d;
                                if (((_a = this._disabledTime) === null || _a === void 0 ? void 0 : _a.value.startType) === ((_b = this.activeTypeMode) === null || _b === void 0 ? void 0 : _b.textContent)) {
                                    initClockFace.updateDisable(Object.assign({ hoursToUpdate: (_d = (_c = this._disabledTime) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.rangeArrHour }, this._getDestructuringObj()));
                                }
                                else {
                                    initClockFace.clean();
                                }
                            }, 300);
                        }
                        else {
                            setTimeout(() => {
                                initClockFace.updateDisable(Object.assign({}, this._getDestructuringObj(true)));
                            }, 300);
                        }
                        initClockFace.updateDisable();
                    }
                    utils_1.createNewEvent(this._element, 'selectamtypemode', {
                        hour: this.hour.value,
                        minutes: this.minutes.value,
                        type: (_d = this.activeTypeMode) === null || _d === void 0 ? void 0 : _d.dataset.type,
                        degreesHours: this._degreesHours,
                        degreesMinutes: this._degreesMinutes,
                    });
                });
            });
        };
        this._handlePmClick = () => {
            this._clickTouchEvents.forEach((el) => {
                this.PM.addEventListener(el, (ev) => {
                    var _a, _b, _c, _d;
                    const target = ev.target;
                    target.classList.add(variables_1.selectorActive);
                    this.AM.classList.remove(variables_1.selectorActive);
                    if (this._options.clockType === '12h' && ((_a = this._options.disabledTime) === null || _a === void 0 ? void 0 : _a.interval)) {
                        const initClockFace = new ClockFace_1.default({
                            clockFace: this.clockFace,
                            tipsWrapper: this.tipsWrapper,
                            array: utils_1.hasClass(this.hour, variables_1.selectorActive) ? templates_1.getNumberOfHours12 : templates_1.getNumberOfMinutes,
                        });
                        if (((_b = this._disabledTime) === null || _b === void 0 ? void 0 : _b.value.startType) === ((_c = this._disabledTime) === null || _c === void 0 ? void 0 : _c.value.endType)) {
                            setTimeout(() => {
                                var _a, _b, _c, _d;
                                if (((_a = this._disabledTime) === null || _a === void 0 ? void 0 : _a.value.startType) === ((_b = this.activeTypeMode) === null || _b === void 0 ? void 0 : _b.textContent)) {
                                    initClockFace.updateDisable(Object.assign({ hoursToUpdate: (_d = (_c = this._disabledTime) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.rangeArrHour }, this._getDestructuringObj()));
                                }
                                else {
                                    initClockFace.clean();
                                }
                            }, 300);
                        }
                        else {
                            setTimeout(() => {
                                initClockFace.updateDisable(Object.assign({}, this._getDestructuringObj(true)));
                            }, 300);
                        }
                    }
                    utils_1.createNewEvent(this._element, 'selectpmtypemode', {
                        hour: this.hour.value,
                        minutes: this.minutes.value,
                        type: (_d = this.activeTypeMode) === null || _d === void 0 ? void 0 : _d.dataset.type,
                        degreesHours: this._degreesHours,
                        degreesMinutes: this._degreesMinutes,
                    });
                });
            });
        };
        this._handleAnimationClock = () => {
            if (this._options.animation) {
                setTimeout(() => {
                    var _a;
                    (_a = this.clockFace) === null || _a === void 0 ? void 0 : _a.classList.add('timepicker-ui-clock-animation');
                    setTimeout(() => {
                        var _a;
                        (_a = this.clockFace) === null || _a === void 0 ? void 0 : _a.classList.remove('timepicker-ui-clock-animation');
                    }, 600);
                }, 150);
            }
        };
        this._handleAnimationSwitchTipsMode = () => {
            this.clockHand.classList.add('timepicker-ui-tips-animation');
            setTimeout(() => {
                var _a;
                (_a = this.clockHand) === null || _a === void 0 ? void 0 : _a.classList.remove('timepicker-ui-tips-animation');
            }, 401);
        };
        this._handleClasses24h = (ev, element) => {
            var _a;
            const target = ev.target;
            if (this.hourTips) {
                if (this._options.clockType === '24h') {
                    if (Number(target.textContent) > 12 || Number(target.textContent) === 0) {
                        this._setCircleClockClasses24h();
                    }
                    else {
                        this._removeCircleClockClasses24h();
                    }
                    if (!this._options.mobile) {
                        (_a = this.tipsWrapperFor24h) === null || _a === void 0 ? void 0 : _a.classList.remove('timepicker-ui-tips-wrapper-24h-disabled');
                    }
                }
            }
            if (!target || !element)
                return;
            element.value = target.value.replace(/\D+/g, '');
            element.click();
        };
        this._handleHourEvents = () => {
            var _a, _b;
            this._inputEvents.forEach((el) => {
                var _a;
                (_a = this.hour) === null || _a === void 0 ? void 0 : _a.addEventListener(el, (ev) => {
                    var _a, _b, _c, _d, _e;
                    const target = ev.target;
                    if (this.clockFace !== null)
                        this._handleAnimationSwitchTipsMode();
                    if (this._options.clockType === '24h') {
                        if (Number(target.value) > 12 || Number(target.value) === 0) {
                            this._setCircleClockClasses24h();
                        }
                        else {
                            this._removeCircleClockClasses24h();
                        }
                        if (!this._options.mobile) {
                            (_a = this.tipsWrapperFor24h) === null || _a === void 0 ? void 0 : _a.classList.remove('timepicker-ui-tips-wrapper-24h-disabled');
                        }
                    }
                    this._setHoursToClock(target.value);
                    target.classList.add(variables_1.selectorActive);
                    this.minutes.classList.remove(variables_1.selectorActive);
                    if (this._options.clockType === '12h' && ((_b = this._options.disabledTime) === null || _b === void 0 ? void 0 : _b.interval)) {
                        const initClockFace = new ClockFace_1.default({
                            clockFace: this.clockFace,
                            tipsWrapper: this.tipsWrapper,
                            array: utils_1.hasClass(this.hour, variables_1.selectorActive) ? templates_1.getNumberOfHours12 : templates_1.getNumberOfMinutes,
                        });
                        if (((_c = this._disabledTime) === null || _c === void 0 ? void 0 : _c.value.startType) === ((_d = this._disabledTime) === null || _d === void 0 ? void 0 : _d.value.endType)) {
                            setTimeout(() => {
                                var _a, _b, _c, _d;
                                if (((_a = this._disabledTime) === null || _a === void 0 ? void 0 : _a.value.startType) === ((_b = this.activeTypeMode) === null || _b === void 0 ? void 0 : _b.textContent)) {
                                    initClockFace.updateDisable(Object.assign({ hoursToUpdate: (_d = (_c = this._disabledTime) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.rangeArrHour }, this._getDestructuringObj()));
                                }
                                else {
                                    initClockFace.clean();
                                }
                            }, 300);
                        }
                        else {
                            setTimeout(() => {
                                initClockFace.updateDisable(Object.assign({}, this._getDestructuringObj(true)));
                            }, 300);
                        }
                    }
                    utils_1.createNewEvent(this._element, 'selecthourmode', {
                        hour: this.hour.value,
                        minutes: this.minutes.value,
                        type: (_e = this.activeTypeMode) === null || _e === void 0 ? void 0 : _e.dataset.type,
                        degreesHours: this._degreesHours,
                        degreesMinutes: this._degreesMinutes,
                    });
                    if (this.clockFace !== null)
                        this.circle.classList.remove('small-circle');
                });
            });
            (_a = this.hour) === null || _a === void 0 ? void 0 : _a.addEventListener('blur', (e) => this._handleClasses24h(e, this.hour));
            (_b = this.hour) === null || _b === void 0 ? void 0 : _b.addEventListener('focus', (e) => this._handleClasses24h(e, this.hour));
        };
        this._handleMinutesEvents = () => {
            var _a, _b;
            this._inputEvents.forEach((el) => {
                this.minutes.addEventListener(el, (ev) => {
                    var _a, _b, _c, _d, _e, _f;
                    const target = ev.target;
                    if (this.clockFace !== null) {
                        this._handleAnimationSwitchTipsMode();
                        this._setMinutesToClock(target.value);
                    }
                    if (this._options.clockType === '24h') {
                        this._removeCircleClockClasses24h();
                        if (!this._options.mobile) {
                            (_a = this.tipsWrapperFor24h) === null || _a === void 0 ? void 0 : _a.classList.add('timepicker-ui-tips-wrapper-24h-disabled');
                        }
                    }
                    target.classList.add(variables_1.selectorActive);
                    (_b = this.hour) === null || _b === void 0 ? void 0 : _b.classList.remove(variables_1.selectorActive);
                    if (this._options.clockType === '12h' && ((_c = this._options.disabledTime) === null || _c === void 0 ? void 0 : _c.interval)) {
                        const initClockFace = new ClockFace_1.default({
                            clockFace: this.clockFace,
                            tipsWrapper: this.tipsWrapper,
                            array: utils_1.hasClass(this.hour, variables_1.selectorActive) ? templates_1.getNumberOfHours12 : templates_1.getNumberOfMinutes,
                        });
                        if (((_d = this._disabledTime) === null || _d === void 0 ? void 0 : _d.value.startType) === ((_e = this._disabledTime) === null || _e === void 0 ? void 0 : _e.value.endType)) {
                            setTimeout(() => {
                                var _a, _b, _c;
                                if (((_a = this._disabledTime) === null || _a === void 0 ? void 0 : _a.value.startType) === ((_b = this.activeTypeMode) === null || _b === void 0 ? void 0 : _b.textContent)) {
                                    initClockFace.updateDisable(Object.assign({ hoursToUpdate: (_c = this._disabledTime) === null || _c === void 0 ? void 0 : _c.value.rangeArrHour }, this._getDestructuringObj()));
                                }
                                else {
                                    initClockFace.clean();
                                }
                            }, 300);
                        }
                        else {
                            setTimeout(() => {
                                initClockFace.updateDisable(Object.assign({}, this._getDestructuringObj(true)));
                            }, 300);
                        }
                    }
                    utils_1.createNewEvent(this._element, 'selectminutemode', {
                        hour: this.hour.value,
                        minutes: this.minutes.value,
                        type: (_f = this.activeTypeMode) === null || _f === void 0 ? void 0 : _f.dataset.type,
                        degreesHours: this._degreesHours,
                        degreesMinutes: this._degreesMinutes,
                    });
                });
            });
            (_a = this.minutes) === null || _a === void 0 ? void 0 : _a.addEventListener('blur', (e) => this._handleClasses24h(e, this.minutes));
            (_b = this.minutes) === null || _b === void 0 ? void 0 : _b.addEventListener('focus', (e) => this._handleClasses24h(e, this.minutes));
        };
        this._handleEventToMoveHand = (event) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37;
            const { target: t, type, touches } = event;
            const target = t;
            const { incrementMinutes, incrementHours, switchToMinutesAfterSelectHour } = this._options;
            if (!utils_1.getClickTouchPosition(event, this.clockFace))
                return;
            const obj = utils_1.getClickTouchPosition(event, this.clockFace);
            const clockFaceRadius = this.clockFace.offsetWidth / 2;
            const rtangens = obj && Math.atan2(obj.y - clockFaceRadius, obj.x - clockFaceRadius);
            if (type === 'mouseup' || type === 'touchend') {
                this._isTouchMouseMove = false;
                if (switchToMinutesAfterSelectHour &&
                    (utils_1.hasClass(target, 'timepicker-ui-value-tips') ||
                        utils_1.hasClass(target, 'timepicker-ui-value-tips-24h') ||
                        utils_1.hasClass(target, 'timepicker-ui-tips-wrapper'))) {
                    this.minutes.click();
                }
                return;
            }
            if (type === 'mousedown' || type === 'mousemove' || type === 'touchmove' || type === 'touchstart') {
                if (type === 'mousedown' || type === 'touchstart' || type === 'touchmove') {
                    if ((utils_1.hasClass(target, 'timepicker-ui-clock-face') ||
                        utils_1.hasClass(target, 'timepicker-ui-circle-hand') ||
                        utils_1.hasClass(target, 'timepicker-ui-hour-time-12') ||
                        utils_1.hasClass(target, 'timepicker-ui-minutes-time') ||
                        utils_1.hasClass(target, 'timepicker-ui-clock-hand') ||
                        utils_1.hasClass(target, 'timepicker-ui-value-tips') ||
                        utils_1.hasClass(target, 'timepicker-ui-value-tips-24h') ||
                        utils_1.hasClass(target, 'timepicker-ui-tips-wrapper') ||
                        utils_1.hasClass(target, 'timepicker-ui-tips-wrapper-24h')) &&
                        !utils_1.hasClass(target, 'timepicker-ui-tips-disabled')) {
                        event.preventDefault();
                        this._isTouchMouseMove = true;
                    }
                    else {
                        this._isTouchMouseMove = false;
                    }
                }
            }
            if (!this._isTouchMouseMove)
                return;
            if (this.minutesTips !== null) {
                this.minutes.classList.add(variables_1.selectorActive);
                let deg = rtangens && utils_1.getIncrementTimes(Math.trunc((rtangens * 180) / Math.PI) + 90, incrementMinutes, 6);
                if (deg === undefined)
                    return;
                let minute;
                if (deg < 0) {
                    minute = Math.round(360 + deg / 6) % 60;
                    deg = 360 + Math.round(deg / 6) * 6;
                }
                else {
                    minute = Math.round(deg / 6) % 60;
                    deg = Math.round(deg / 6) * 6;
                }
                if (!((_a = this._disabledTime) === null || _a === void 0 ? void 0 : _a.value.isInterval)) {
                    if ((_d = (_c = (_b = this._disabledTime) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.minutes) === null || _d === void 0 ? void 0 : _d.includes(minute <= 9 ? `0${minute}` : `${minute}`)) {
                        return;
                    }
                }
                else {
                    // eslint-disable-next-line no-lonely-if
                    if (((_e = this._disabledTime) === null || _e === void 0 ? void 0 : _e.value.endType) === ((_f = this._disabledTime) === null || _f === void 0 ? void 0 : _f.value.startType)) {
                        if (((_j = (_h = (_g = this._disabledTime) === null || _g === void 0 ? void 0 : _g.value) === null || _h === void 0 ? void 0 : _h.endMinutes) === null || _j === void 0 ? void 0 : _j.includes(minute <= 9 ? `0${minute}` : `${minute}`)) &&
                            this.hour.value === ((_l = (_k = this._disabledTime) === null || _k === void 0 ? void 0 : _k.value) === null || _l === void 0 ? void 0 : _l.removedEndHour) &&
                            ((_m = this._disabledTime) === null || _m === void 0 ? void 0 : _m.value.endType) === ((_o = this.activeTypeMode) === null || _o === void 0 ? void 0 : _o.textContent)) {
                            return;
                        }
                        if (((_r = (_q = (_p = this._disabledTime) === null || _p === void 0 ? void 0 : _p.value) === null || _q === void 0 ? void 0 : _q.startMinutes) === null || _r === void 0 ? void 0 : _r.includes(minute <= 9 ? `0${minute}` : `${minute}`)) &&
                            this.hour.value === ((_t = (_s = this._disabledTime) === null || _s === void 0 ? void 0 : _s.value) === null || _t === void 0 ? void 0 : _t.removedStartedHour) &&
                            ((_u = this._disabledTime) === null || _u === void 0 ? void 0 : _u.value.startType) === ((_v = this.activeTypeMode) === null || _v === void 0 ? void 0 : _v.textContent)) {
                            return;
                        }
                    }
                    else {
                        if (((_w = this.activeTypeMode) === null || _w === void 0 ? void 0 : _w.textContent) === ((_x = this._disabledTime) === null || _x === void 0 ? void 0 : _x.value.endType)) {
                            if ((((_0 = (_z = (_y = this._disabledTime) === null || _y === void 0 ? void 0 : _y.value) === null || _z === void 0 ? void 0 : _z.endMinutes) === null || _0 === void 0 ? void 0 : _0.includes(minute <= 9 ? `0${minute}` : `${minute}`)) &&
                                ((_1 = this._disabledTime) === null || _1 === void 0 ? void 0 : _1.value.removedPmHour) === this.hour.value) || ((_2 = this._disabledTime) === null || _2 === void 0 ? void 0 : _2.value.pmHours.map(Number).includes(Number(this.hour.value)))) {
                                return;
                            }
                        }
                        if (((_3 = this.activeTypeMode) === null || _3 === void 0 ? void 0 : _3.textContent) === ((_4 = this._disabledTime) === null || _4 === void 0 ? void 0 : _4.value.startType)) {
                            if ((((_7 = (_6 = (_5 = this._disabledTime) === null || _5 === void 0 ? void 0 : _5.value) === null || _6 === void 0 ? void 0 : _6.startMinutes) === null || _7 === void 0 ? void 0 : _7.includes(minute <= 9 ? `0${minute}` : `${minute}`)) &&
                                ((_8 = this._disabledTime) === null || _8 === void 0 ? void 0 : _8.value.removedAmHour) === this.hour.value) || ((_9 = this._disabledTime) === null || _9 === void 0 ? void 0 : _9.value.amHours.map(Number).includes(Number(this.hour.value)))) {
                                return;
                            }
                        }
                    }
                }
                this.minutes.value = minute >= 10 ? `${minute}` : `0${minute}`;
                this.clockHand.style.transform = `rotateZ(${deg}deg)`;
                this._degreesMinutes = deg;
                this._toggleClassActiveToValueTips(this.minutes.value);
                this._removeBgColorToCirleWithMinutesTips();
                this._setBgColorToCircleWithMinutesTips();
                utils_1.createNewEvent(this._element, 'update', Object.assign(Object.assign({}, input_1.getInputValue(this.input, this._options.clockType)), { degreesHours: this._degreesHours, degreesMinutes: this._degreesMinutes, eventType: type, type: (_10 = this.activeTypeMode) === null || _10 === void 0 ? void 0 : _10.dataset.type }));
            }
            const myLocation = touches ? touches[0] : undefined;
            const realTarget = touches && myLocation
                ? document.elementFromPoint(myLocation.clientX, myLocation.clientY)
                : null;
            if (this.hourTips !== null) {
                (_11 = this.hour) === null || _11 === void 0 ? void 0 : _11.classList.add(variables_1.selectorActive);
                if (!utils_1.hasClass(realTarget || target, 'timepicker-ui-value-tips-24h') &&
                    !utils_1.hasClass(realTarget || target, 'timepicker-ui-tips-disabled') &&
                    (utils_1.hasClass(realTarget || target, 'timepicker-ui-value-tips') ||
                        utils_1.hasClass(realTarget || target, 'timepicker-ui-tips-wrapper'))) {
                    let deg = rtangens && utils_1.getIncrementTimes(Math.trunc((rtangens * 180) / Math.PI) + 90, incrementHours, 30);
                    this._degreesHours = deg;
                    if (deg === undefined)
                        return;
                    let hour;
                    if (deg < 0) {
                        hour = Math.round(360 + deg / 30) % 12;
                        deg = 360 + deg;
                    }
                    else {
                        hour = Math.round(deg / 30) % 12;
                        if (hour === 0 || hour > 12)
                            hour = 12;
                    }
                    const isInterval = ((_12 = this._disabledTime) === null || _12 === void 0 ? void 0 : _12.value.isInterval) ? 'rangeArrHour' : 'hours';
                    if (((_13 = this._disabledTime) === null || _13 === void 0 ? void 0 : _13.value.endType) === ((_15 = (_14 = this._disabledTime) === null || _14 === void 0 ? void 0 : _14.value) === null || _15 === void 0 ? void 0 : _15.startType)) {
                        if (typeof ((_17 = (_16 = this._disabledTime) === null || _16 === void 0 ? void 0 : _16.value) === null || _17 === void 0 ? void 0 : _17.endType) === 'string') {
                            if (((_19 = (_18 = this._disabledTime) === null || _18 === void 0 ? void 0 : _18.value) === null || _19 === void 0 ? void 0 : _19.endType) === ((_20 = this.activeTypeMode) === null || _20 === void 0 ? void 0 : _20.textContent) &&
                                ((_22 = (_21 = this._disabledTime) === null || _21 === void 0 ? void 0 : _21.value) === null || _22 === void 0 ? void 0 : _22.startType) === ((_23 = this.activeTypeMode) === null || _23 === void 0 ? void 0 : _23.textContent)) {
                                if ((_25 = (_24 = this._disabledTime) === null || _24 === void 0 ? void 0 : _24.value[isInterval]) === null || _25 === void 0 ? void 0 : _25.includes(hour.toString())) {
                                    return;
                                }
                            }
                        }
                        else if ((_27 = (_26 = this._disabledTime) === null || _26 === void 0 ? void 0 : _26.value[isInterval]) === null || _27 === void 0 ? void 0 : _27.includes(hour.toString())) {
                            return;
                        }
                    }
                    else {
                        if (((_28 = this._disabledTime) === null || _28 === void 0 ? void 0 : _28.value.startType) === ((_29 = this.activeTypeMode) === null || _29 === void 0 ? void 0 : _29.textContent)) {
                            if ((_30 = this._disabledTime) === null || _30 === void 0 ? void 0 : _30.value.amHours.includes(hour.toString())) {
                                return;
                            }
                        }
                        if (((_31 = this._disabledTime) === null || _31 === void 0 ? void 0 : _31.value.endType) === ((_32 = this.activeTypeMode) === null || _32 === void 0 ? void 0 : _32.textContent)) {
                            if ((_33 = this._disabledTime) === null || _33 === void 0 ? void 0 : _33.value.pmHours.includes(hour.toString())) {
                                return;
                            }
                        }
                    }
                    this.clockHand.style.transform = `rotateZ(${deg}deg)`;
                    this.hour.value = hour > 9 ? `${hour}` : `0${hour}`;
                    this._removeCircleClockClasses24h();
                    this._toggleClassActiveToValueTips(hour);
                }
                if ((utils_1.hasClass(realTarget || target, 'timepicker-ui-value-tips-24h') ||
                    utils_1.hasClass(realTarget || target, 'timepicker-ui-tips-wrapper-24h')) &&
                    !utils_1.hasClass(realTarget || target, 'timepicker-ui-tips-disabled')) {
                    let deg = rtangens && utils_1.getIncrementTimes(Math.trunc((rtangens * 180) / Math.PI) + 90, incrementHours, 30);
                    this._degreesHours = deg;
                    let hour;
                    if (deg === undefined)
                        return;
                    if (deg < 0) {
                        hour = Math.round(360 + deg / 30) % 24;
                        deg = 360 + deg;
                    }
                    else {
                        hour = Math.round(deg / 30) + 12;
                        if (hour === 12) {
                            hour = '00';
                        }
                    }
                    const isInterval = ((_34 = this._disabledTime) === null || _34 === void 0 ? void 0 : _34.value.isInterval) ? 'rangeArrHour' : 'hours';
                    if ((_36 = (_35 = this._disabledTime) === null || _35 === void 0 ? void 0 : _35.value[isInterval]) === null || _36 === void 0 ? void 0 : _36.includes(hour.toString())) {
                        return;
                    }
                    this._setCircleClockClasses24h();
                    this.clockHand.style.transform = `rotateZ(${deg}deg)`;
                    this.hour.value = `${hour}`;
                    this._toggleClassActiveToValueTips(hour);
                }
                utils_1.createNewEvent(this._element, 'update', Object.assign(Object.assign({}, input_1.getInputValue(this.input, this._options.clockType)), { degreesHours: this._degreesHours, degreesMinutes: this._degreesMinutes, eventType: type, type: (_37 = this.activeTypeMode) === null || _37 === void 0 ? void 0 : _37.dataset.type }));
            }
        };
        this._toggleClassActiveToValueTips = (value) => {
            const element = this.allValueTips.find((tip) => Number(tip.innerText) === Number(value));
            this.allValueTips.map((el) => el.classList.remove(variables_1.selectorActive));
            if (element === undefined)
                return;
            element.classList.add(variables_1.selectorActive);
        };
        this._handleMoveHand = () => {
            if (this._options.mobile || this._isMobileView)
                return;
            variables_1.allEvents.split(' ').forEach((event) => {
                if (event === 'touchstart' || event === 'touchmove' || event === 'touchend') {
                    document.addEventListener(event, this._mutliEventsMoveHandler, {
                        passive: false,
                    });
                }
                else {
                    document.addEventListener(event, this._mutliEventsMoveHandler, false);
                }
            });
        };
        this._setModalTemplate = () => {
            if (!this._options)
                return;
            const { appendModalSelector } = this._options;
            if (appendModalSelector === '' || !appendModalSelector) {
                document.body.insertAdjacentHTML('afterend', this.modalTemplate);
            }
            else {
                const element = document === null || document === void 0 ? void 0 : document.querySelector(appendModalSelector);
                element === null || element === void 0 ? void 0 : element.insertAdjacentHTML('beforeend', this.modalTemplate);
            }
        };
        this._setScrollbarOrNot = () => {
            if (!this._options.enableScrollbar) {
                document.body.style.paddingRight = `${utils_1.getScrollbarWidth()}px`;
                document.body.style.overflowY = 'hidden';
            }
            else {
                setTimeout(() => {
                    document.body.style.overflowY = '';
                    document.body.style.paddingRight = '';
                }, 400);
            }
        };
        this._setAnimationToOpen = () => {
            var _a, _b;
            (_a = this.modalElement) === null || _a === void 0 ? void 0 : _a.classList.add('opacity');
            if (this._options.animation) {
                setTimeout(() => {
                    var _a;
                    (_a = this.modalElement) === null || _a === void 0 ? void 0 : _a.classList.add('show');
                }, 150);
            }
            else {
                (_b = this.modalElement) === null || _b === void 0 ? void 0 : _b.classList.add('show');
            }
        };
        this._removeAnimationToClose = () => {
            var _a;
            if (this.modalElement) {
                if (this._options.animation) {
                    setTimeout(() => {
                        var _a;
                        (_a = this.modalElement) === null || _a === void 0 ? void 0 : _a.classList.remove('show');
                    }, 150);
                }
                else {
                    (_a = this.modalElement) === null || _a === void 0 ? void 0 : _a.classList.remove('show');
                }
            }
        };
        this._handlerViewChange = debounce(() => {
            var _a, _b, _c, _d;
            const { clockType } = this._options;
            if (!utils_1.hasClass(this.modalElement, 'mobile')) {
                this.close();
                this._isMobileView = true;
                this._options.mobile = true;
                const beforeHourContent = this.hour.value;
                const beforeMinutesContent = this.minutes.value;
                const beforeTypeModeContent = (_a = this.activeTypeMode) === null || _a === void 0 ? void 0 : _a.dataset.type;
                setTimeout(() => {
                    this.destroy();
                    this.update({
                        options: { mobile: true },
                    });
                    setTimeout(() => {
                        this.open();
                        this.hour.value = beforeHourContent;
                        this.minutes.value = beforeMinutesContent;
                        if (this._options.clockType === '12h') {
                            const toAddType = beforeTypeModeContent === 'PM' ? 'PM' : 'AM';
                            const toRemoveType = beforeTypeModeContent === 'PM' ? 'AM' : 'PM';
                            // @ts-ignore
                            this[toAddType].classList.add(variables_1.selectorActive);
                            // @ts-ignore
                            this[toRemoveType].classList.remove(variables_1.selectorActive);
                        }
                    }, 300);
                }, 300);
            }
            else {
                const validHours = input_1.handleValueAndCheck(this.hour.value, 'hour', clockType);
                const validMinutes = input_1.handleValueAndCheck(this.minutes.value, 'minutes', clockType);
                if (validHours === false || validMinutes === false) {
                    if (!validMinutes) {
                        this.minutes.classList.add('invalid-value');
                    }
                    if (!validHours) {
                        (_b = this.hour) === null || _b === void 0 ? void 0 : _b.classList.add('invalid-value');
                    }
                    return;
                }
                if (validHours === true && validMinutes === true) {
                    if (validMinutes) {
                        this.minutes.classList.remove('invalid-value');
                    }
                    if (validHours) {
                        (_c = this.hour) === null || _c === void 0 ? void 0 : _c.classList.remove('invalid-value');
                    }
                }
                this.close();
                this._isMobileView = false;
                this._options.mobile = false;
                const beforeHourContent = this.hour.value;
                const beforeMinutesContent = this.minutes.value;
                const beforeTypeModeContent = (_d = this.activeTypeMode) === null || _d === void 0 ? void 0 : _d.dataset.type;
                setTimeout(() => {
                    this.destroy();
                    this.update({
                        options: { mobile: false },
                    });
                    setTimeout(() => {
                        this.open();
                        this.hour.value = beforeHourContent;
                        this.minutes.value = beforeMinutesContent;
                        if (this._options.clockType === '12h') {
                            const toAddType = beforeTypeModeContent === 'PM' ? 'PM' : 'AM';
                            const toRemoveType = beforeTypeModeContent === 'PM' ? 'AM' : 'PM';
                            // @ts-ignore
                            this[toAddType].classList.add(variables_1.selectorActive);
                            // @ts-ignore
                            this[toRemoveType].classList.remove(variables_1.selectorActive);
                        }
                        this._setTransformToCircleWithSwitchesHour(this.hour.value);
                        this._toggleClassActiveToValueTips(this.hour.value);
                        if (Number(this.hour.value) > 12 || Number(this.hour.value) === 0) {
                            this._setCircleClockClasses24h();
                        }
                        else {
                            this._removeCircleClockClasses24h();
                        }
                    }, 300);
                }, 300);
            }
        }, 400);
        this._handleIconChangeView = () => __awaiter(this, void 0, void 0, function* () {
            if (this._options.enableSwitchIcon) {
                if (utils_1.getBrowser()) {
                    this.keyboardClockIcon.addEventListener('touchstart', this._handlerViewChange);
                }
                else {
                    this.keyboardClockIcon.addEventListener('click', this._handlerViewChange);
                }
            }
        });
        this._handlerClickHourMinutes = (event) => __awaiter(this, void 0, void 0, function* () {
            var _d, _e;
            if (!this.modalElement)
                return;
            const { clockType, editable } = this._options;
            const target = event.target;
            const validHours = input_1.handleValueAndCheck(this.hour.value, 'hour', clockType);
            const validMinutes = input_1.handleValueAndCheck(this.minutes.value, 'minutes', clockType);
            if (!editable)
                return;
            if (!utils_1.hasClass(target, 'timepicker-ui-hour') && !utils_1.hasClass(target, 'timepicker-ui-minutes')) {
                if (validHours === true && validMinutes === true) {
                    if (validMinutes)
                        this.minutes.classList.remove('invalid-value');
                    if (validHours)
                        (_d = this.hour) === null || _d === void 0 ? void 0 : _d.classList.remove('invalid-value');
                }
            }
            else if (validHours === false || validMinutes === false) {
                if (!validMinutes)
                    this.minutes.classList.add('invalid-value');
                if (!validHours)
                    (_e = this.hour) === null || _e === void 0 ? void 0 : _e.classList.add('invalid-value');
            }
        });
        this._handleClickOnHourMobile = () => {
            document.addEventListener('mousedown', this._eventsClickMobileHandler);
            document.addEventListener('touchstart', this._eventsClickMobileHandler);
        };
        this._handleKeyPress = (e) => {
            if (e.key === 'Escape' && this.modalElement) {
                this.close();
            }
        };
        this._handleEscClick = () => {
            document.addEventListener('keydown', this._handleKeyPress);
        };
        this._focusTrapHandler = () => {
            setTimeout(() => {
                var _a, _b;
                const focusableEls = (_a = this.wrapper) === null || _a === void 0 ? void 0 : _a.querySelectorAll('div[tabindex="0"]:not([disabled])');
                const focusableInputs = (_b = this.wrapper) === null || _b === void 0 ? void 0 : _b.querySelectorAll('input[tabindex="0"]:not([disabled])');
                if (!focusableEls || focusableEls.length <= 0 || focusableInputs.length <= 0)
                    return;
                const allFcousablElements = [...focusableInputs, ...focusableEls];
                const firstFocusableEl = allFcousablElements[0];
                const lastFocusableEl = allFcousablElements[allFcousablElements.length - 1];
                this.wrapper.focus();
                this.wrapper.addEventListener('keydown', ({ key, shiftKey, target: t }) => {
                    const target = t;
                    if (key === 'Tab') {
                        if (shiftKey) {
                            if (document.activeElement === firstFocusableEl) {
                                lastFocusableEl.focus();
                            }
                        }
                        else if (document.activeElement === lastFocusableEl) {
                            firstFocusableEl.focus();
                        }
                    }
                    if (key === 'Enter') {
                        if (utils_1.hasClass(target, 'timepicker-ui-minutes')) {
                            this.minutes.click();
                        }
                        if (utils_1.hasClass(target, 'timepicker-ui-hour')) {
                            this.hour.click();
                        }
                        if (utils_1.hasClass(target, 'timepicker-ui-cancel-btn')) {
                            this.cancelButton.click();
                        }
                        if (utils_1.hasClass(target, 'timepicker-ui-ok-btn')) {
                            this.okButton.click();
                        }
                        if (utils_1.hasClass(target, 'timepicker-ui-keyboard-icon-wrapper')) {
                            this.keyboardClockIcon.click();
                        }
                        if (utils_1.hasClass(target, 'timepicker-ui-am')) {
                            this.AM.click();
                        }
                        if (utils_1.hasClass(target, 'timepicker-ui-pm')) {
                            this.PM.click();
                        }
                        if (utils_1.hasClass(target, 'timepicker-ui-value-tips') ||
                            utils_1.hasClass(target, 'timepicker-ui-value-tips-24h')) {
                            const { left, top, x, y, width, height } = target.getBoundingClientRect();
                            const tabIndexElement = document.elementFromPoint(x, y);
                            // eslint-disable-next-line no-inner-declarations
                            const simulateMousedownEvent = () => {
                                var _a;
                                const ev = new MouseEvent('mousedown', {
                                    clientX: left + width / 2,
                                    clientY: top + height / 2,
                                    cancelable: true,
                                    bubbles: true,
                                });
                                if (utils_1.hasClass(tabIndexElement, 'timepicker-ui-value-tips-24h')) {
                                    tabIndexElement === null || tabIndexElement === void 0 ? void 0 : tabIndexElement.dispatchEvent(ev);
                                }
                                else {
                                    (_a = tabIndexElement === null || tabIndexElement === void 0 ? void 0 : tabIndexElement.childNodes[0]) === null || _a === void 0 ? void 0 : _a.dispatchEvent(ev);
                                }
                                this._isTouchMouseMove = false;
                            };
                            simulateMousedownEvent();
                        }
                    }
                    setTimeout(() => {
                        this.wrapper.addEventListener('mousedown', () => document.activeElement.blur());
                    }, 100);
                });
            }, 301);
        };
        this._handleOpenOnEnterFocus = () => {
            this.input.addEventListener('keydown', ({ target, key }) => {
                if (target.disabled)
                    return;
                if (key === 'Enter') {
                    this.open();
                }
            });
        };
        this._element = element;
        this._cloned = null;
        this._options = utils_1.getConfig(Object.assign(Object.assign({}, options), utils_1.createObjectFromData((_a = this._element) === null || _a === void 0 ? void 0 : _a.dataset)), options_1.options);
        this._isTouchMouseMove = false;
        this._degreesHours =
            Number(input_1.getInputValue((_b = this._element) === null || _b === void 0 ? void 0 : _b.querySelector('input'), this._options.clockType)
                .hour) * 30;
        this._degreesMinutes =
            Number(input_1.getInputValue((_c = this._element) === null || _c === void 0 ? void 0 : _c.querySelector('input'), this._options.clockType)
                .minutes) * 6;
        this._isMobileView = false;
        this._mutliEventsMove = (event) => this._handleEventToMoveHand(event);
        this._mutliEventsMoveHandler = this._mutliEventsMove.bind(this);
        this._eventsClickMobile = (event) => this._handlerClickHourMinutes(event);
        this._eventsClickMobileHandler = this._eventsClickMobile.bind(this);
        this._checkMobileOption();
        this._clickTouchEvents = ['click', 'mousedown', 'touchstart'];
        this._inputEvents = ['change', ...this._clickTouchEvents];
        this._disabledTime = null;
        this._preventClockTypeByCurrentTime();
        this._isModalRemove = true;
    }
    get modalTemplate() {
        if (!this._options.mobile || !this._isMobileView) {
            return templates_1.getModalTemplate(this._options);
        }
        return templates_1.getMobileModalTemplate(this._options);
    }
    get modalElement() {
        return document.querySelector('.timepicker-ui-modal');
    }
    get clockFace() {
        return document.querySelector('.timepicker-ui-clock-face');
    }
    get input() {
        var _a;
        return (_a = this._element) === null || _a === void 0 ? void 0 : _a.querySelector('input');
    }
    get clockHand() {
        return document.querySelector('.timepicker-ui-clock-hand');
    }
    get circle() {
        return document.querySelector('.timepicker-ui-circle-hand');
    }
    get tipsWrapper() {
        return document.querySelector('.timepicker-ui-tips-wrapper');
    }
    get tipsWrapperFor24h() {
        return document.querySelector('.timepicker-ui-tips-wrapper-24h');
    }
    get minutes() {
        return document.querySelector('.timepicker-ui-minutes');
    }
    get hour() {
        return document.querySelector('.timepicker-ui-hour');
    }
    get AM() {
        return document.querySelector('.timepicker-ui-am');
    }
    get PM() {
        return document.querySelector('.timepicker-ui-pm');
    }
    get minutesTips() {
        return document.querySelector('.timepicker-ui-minutes-time');
    }
    get hourTips() {
        return document.querySelector('.timepicker-ui-hour-time-12');
    }
    get allValueTips() {
        return [
            ...document.querySelectorAll('.timepicker-ui-value-tips'),
            ...document.querySelectorAll('.timepicker-ui-value-tips-24h'),
        ];
    }
    get openElementData() {
        var _a;
        const data = (_a = this._element) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[data-open]');
        if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
            const arr = [];
            data.forEach(({ dataset }) => { var _a; return arr.push((_a = dataset.open) !== null && _a !== void 0 ? _a : ''); });
            return [...new Set(arr)];
        }
        return null;
    }
    get openElement() {
        var _a, _b;
        if (this.openElementData === null) {
            (_a = this.input) === null || _a === void 0 ? void 0 : _a.setAttribute('data-open', 'timepicker-ui-input');
            return [this.input];
        }
        return ((_b = this.openElementData.map((open) => { var _a; return (_a = this._element) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`[data-open='${open}']`); })[0]) !== null && _b !== void 0 ? _b : '');
    }
    get cancelButton() {
        return document.querySelector('.timepicker-ui-cancel-btn');
    }
    get okButton() {
        return document.querySelector('.timepicker-ui-ok-btn');
    }
    get activeTypeMode() {
        return document.querySelector('.timepicker-ui-type-mode.active');
    }
    get keyboardClockIcon() {
        return document.querySelector('.timepicker-ui-keyboard-icon-wrapper');
    }
    get footer() {
        return document.querySelector('.timepicker-ui-footer');
    }
    get wrapper() {
        return document.querySelector('.timepicker-ui-wrapper');
    }
    _checkDisabledValuesOnStart() {
        if (!this._options.disabledTime || this._options.disabledTime.interval)
            return;
        const { disabledTime: { hours, minutes }, clockType, } = this._options;
        const isValidHours = hours ? disable_1.checkDisabledHoursAndMinutes(hours, 'hour', clockType) : true;
        const isValidMinutes = minutes ? disable_1.checkDisabledHoursAndMinutes(minutes, 'minutes', clockType) : true;
        if (!isValidHours || !isValidMinutes) {
            throw new Error('You set wrong hours or minutes in disabled option');
        }
    }
    _checkMobileOption() {
        this._isMobileView = !!this._options.mobile;
        if (this._options.mobile) {
            this._options.editable = true;
        }
    }
    _getDisableTime() {
        this._disabledTime = disable_1.createDisabledTime(this._options);
    }
    _removeCircleClockClasses24h() {
        var _a, _b;
        (_a = this.circle) === null || _a === void 0 ? void 0 : _a.classList.remove('timepicker-ui-circle-hand-24h');
        (_b = this.clockHand) === null || _b === void 0 ? void 0 : _b.classList.remove('timepicker-ui-clock-hand-24h');
    }
    _setCircleClockClasses24h() {
        var _a, _b;
        if (this.circle) {
            (_a = this.circle) === null || _a === void 0 ? void 0 : _a.classList.add('timepicker-ui-circle-hand-24h');
        }
        if (this.clockHand) {
            (_b = this.clockHand) === null || _b === void 0 ? void 0 : _b.classList.add('timepicker-ui-clock-hand-24h');
        }
    }
    _setErrorHandler() {
        var _a, _b, _c, _d;
        const { error, currentHour, currentMin, currentType, currentLength } = input_1.getInputValue(this.input, this._options.clockType);
        if (error) {
            const newEl = document.createElement('div');
            (_a = this.input) === null || _a === void 0 ? void 0 : _a.classList.add('timepicker-ui-invalid-format');
            newEl.classList.add('timepicker-ui-invalid-text');
            newEl.innerHTML = '<b>Invalid Time Format</b>';
            if (((_b = this.input) === null || _b === void 0 ? void 0 : _b.parentElement) &&
                ((_c = this.input) === null || _c === void 0 ? void 0 : _c.parentElement.querySelector('.timepicker-ui-invalid-text')) === null) {
                (_d = this.input) === null || _d === void 0 ? void 0 : _d.after(newEl);
            }
            utils_1.createNewEvent(this._element, 'geterror', {
                error,
                currentHour,
                currentMin,
                currentType,
                currentLength,
            });
            throw new Error(`Invalid Time Format: ${error}`);
        }
        // eslint-disable-next-line no-useless-return
        return;
    }
    _removeErrorHandler() {
        var _a, _b;
        (_a = this.input) === null || _a === void 0 ? void 0 : _a.classList.remove('timepicker-ui-invalid-format');
        const divToRemove = (_b = this._element) === null || _b === void 0 ? void 0 : _b.querySelector('.timepicker-ui-invalid-text');
        if (divToRemove) {
            divToRemove.remove();
        }
    }
    _setOnStartCSSClassesIfClockType24h() {
        if (this._options.clockType === '24h') {
            let { hour } = input_1.getInputValue(this.input, this._options.clockType, this._options.currentTime);
            if (this.input.value.length > 0) {
                // eslint-disable-next-line prefer-destructuring
                hour = this.input.value.split(':')[0];
            }
            if (Number(hour) > 12 || Number(hour) === 0) {
                this._setCircleClockClasses24h();
            }
        }
    }
    _getDestructuringObj(isAmPm) {
        var _a;
        const { endMinutes, removedEndHour, removedStartedHour, startMinutes, pmHours, amHours, removedAmHour, removedPmHour, } = this._disabledTime.value;
        if (isAmPm) {
            return {
                minutesToUpdate: {
                    actualHour: this.hour.value,
                    pmHours,
                    amHours,
                    activeMode: (_a = this.activeTypeMode) === null || _a === void 0 ? void 0 : _a.textContent,
                    startMinutes,
                    endMinutes,
                    removedAmHour,
                    removedPmHour,
                },
            };
        }
        return {
            minutesToUpdate: {
                endMinutes,
                removedEndHour,
                removedStartedHour,
                actualHour: this.hour.value,
                startMinutes,
            },
        };
    }
}
exports.default = TimepickerUI;
