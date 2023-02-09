"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
class ClockFace {
    constructor(obj) {
        this.clean = () => {
            var _a, _b;
            const spanHours = (_a = this.tipsWrapper) === null || _a === void 0 ? void 0 : _a.querySelectorAll('span.timepicker-ui-hour-time-12');
            const spanMinutes = (_b = this.tipsWrapper) === null || _b === void 0 ? void 0 : _b.querySelectorAll('span.timepicker-ui-minutes-time');
            this._removeClasses(spanHours);
            this._removeClasses(spanMinutes);
        };
        this.create = () => {
            var _a;
            if (!this.clockFace || !this.array || !this.classToAdd || !this.tipsWrapper)
                return;
            const clockWidth = (this.clockFace.offsetWidth - 32) / 2;
            const clockHeight = (this.clockFace.offsetHeight - 32) / 2;
            const radius = clockWidth - 9;
            this.tipsWrapper.innerHTML = '';
            (_a = this.array) === null || _a === void 0 ? void 0 : _a.forEach((num, index) => {
                var _a, _b, _c, _d, _e, _f;
                // @ts-ignore
                const angle = utils_1.getRadians(index * (360 / this.array.length));
                const span = document.createElement('span');
                const spanTips = document.createElement('span');
                spanTips.innerHTML = num;
                if (this.disabledTime) {
                    if (Array.isArray(this.disabledTime) && ((_a = this.disabledTime) === null || _a === void 0 ? void 0 : _a.includes(num))) {
                        spanTips.classList.add('timepicker-ui-tips-disabled');
                        span.classList.add('timepicker-ui-tips-disabled');
                    }
                    if (this.hour === this.disabledTime.removedStartedHour && ((_c = (_b = this.disabledTime) === null || _b === void 0 ? void 0 : _b.startMinutes) === null || _c === void 0 ? void 0 : _c.includes(num))) {
                        spanTips.classList.add('timepicker-ui-tips-disabled');
                        span.classList.add('timepicker-ui-tips-disabled');
                        spanTips.tabIndex = -1;
                    }
                    if (this.hour === this.disabledTime.removedEndHour && ((_e = (_d = this.disabledTime) === null || _d === void 0 ? void 0 : _d.endMinutes) === null || _e === void 0 ? void 0 : _e.includes(num))) {
                        spanTips.classList.add('timepicker-ui-tips-disabled');
                        span.classList.add('timepicker-ui-tips-disabled');
                        spanTips.tabIndex = -1;
                    }
                }
                if (this.clockType === '24h') {
                    spanTips.classList.add('timepicker-ui-value-tips-24h');
                    if (!utils_1.hasClass(spanTips, 'timepicker-ui-tips-disabled')) {
                        spanTips.tabIndex = 0;
                    }
                }
                else {
                    spanTips.classList.add('timepicker-ui-value-tips');
                    if (!utils_1.hasClass(spanTips, 'timepicker-ui-tips-disabled')) {
                        spanTips.tabIndex = 0;
                    }
                }
                span.classList.add(this.classToAdd);
                if (this.theme === 'crane-straight') {
                    span.classList.add('crane-straight');
                    spanTips.classList.add('crane-straight');
                }
                span.style.left = `${clockWidth + Math.sin(angle) * radius - span.offsetWidth}px`;
                span.style.bottom = `${clockHeight + Math.cos(angle) * radius - span.offsetHeight}px`;
                span.appendChild(spanTips);
                (_f = this.tipsWrapper) === null || _f === void 0 ? void 0 : _f.appendChild(span);
            });
        };
        this.updateDisable = (obj) => {
            var _a, _b;
            const spanHours = (_a = this.tipsWrapper) === null || _a === void 0 ? void 0 : _a.querySelectorAll('span.timepicker-ui-hour-time-12');
            const spanMinutes = (_b = this.tipsWrapper) === null || _b === void 0 ? void 0 : _b.querySelectorAll('span.timepicker-ui-minutes-time');
            this._removeClasses(spanHours);
            this._removeClasses(spanMinutes);
            if ((obj === null || obj === void 0 ? void 0 : obj.hoursToUpdate) && spanHours) {
                this._addClassesWithIncludes(spanHours, obj.hoursToUpdate);
            }
            if ((obj === null || obj === void 0 ? void 0 : obj.minutesToUpdate) && spanMinutes) {
                const { actualHour, removedEndHour, removedStartedHour, startMinutes, endMinutes } = obj.minutesToUpdate;
                if (removedEndHour === actualHour && endMinutes.length > 0) {
                    this._addClassesWithIncludes(spanMinutes, endMinutes);
                }
                else if (Number(actualHour) > Number(removedStartedHour) &&
                    Number(actualHour) < Number(removedEndHour)) {
                    this._addClasses(spanMinutes);
                }
                if (removedStartedHour === actualHour && startMinutes.length > 0) {
                    this._addClassesWithIncludes(spanMinutes, startMinutes);
                }
                else if (Number(actualHour) > Number(removedStartedHour) &&
                    Number(actualHour) < Number(removedEndHour)) {
                    this._addClasses(spanMinutes);
                }
            }
            if (obj) {
                const { amHours, pmHours, activeMode, startMinutes, endMinutes, removedAmHour, removedPmHour, actualHour, } = obj.minutesToUpdate;
                if (!amHours || !pmHours)
                    return;
                if (spanHours) {
                    if (amHours && activeMode === 'AM') {
                        this._addClassesWithIncludes(spanHours, amHours);
                    }
                    if (pmHours && activeMode === 'PM') {
                        this._addClassesWithIncludes(spanHours, pmHours);
                    }
                }
                if (spanMinutes && startMinutes && endMinutes) {
                    if (activeMode === 'AM') {
                        if (endMinutes[0] === '00' && endMinutes.length === 1 && startMinutes.length === 0) {
                            if (Number(actualHour) >= Number(amHours[0])) {
                                this._addClasses(spanMinutes);
                            }
                        }
                        if (startMinutes.length === 0 && endMinutes.length > 1) {
                            if (Number(actualHour) >= Number(removedAmHour)) {
                                this._addClasses(spanMinutes);
                            }
                        }
                        if (startMinutes.length > 0 && endMinutes.length > 1 && endMinutes[0] === '00') {
                            if (Number(removedAmHour) === Number(actualHour)) {
                                this._addClassesWithIncludes(spanMinutes, startMinutes);
                            }
                            else if (Number(actualHour) > Number(removedAmHour)) {
                                this._addClasses(spanMinutes);
                            }
                        }
                        if (endMinutes[0] === '00' && endMinutes.length === 1 && startMinutes.length > 0) {
                            if (Number(removedAmHour) === Number(actualHour)) {
                                this._addClassesWithIncludes(spanMinutes, startMinutes);
                            }
                            else if (Number(actualHour) > Number(removedAmHour)) {
                                this._addClasses(spanMinutes);
                            }
                        }
                    }
                    if (activeMode === 'PM') {
                        if (actualHour < Number(removedPmHour)) {
                            this._addClasses(spanMinutes);
                        }
                        if (actualHour === removedPmHour) {
                            this._addClassesWithIncludes(spanMinutes, endMinutes);
                        }
                        if (endMinutes.length > 0 && Number(actualHour) === removedPmHour - 1) {
                            this._addClassesWithIncludes(spanMinutes, endMinutes);
                        }
                    }
                }
            }
        };
        this._removeClasses = (list) => {
            list === null || list === void 0 ? void 0 : list.forEach(({ classList, children }) => {
                classList.remove('timepicker-ui-tips-disabled');
                children[0].classList.remove('timepicker-ui-tips-disabled');
                children[0].tabIndex = 0;
            });
        };
        this._addClasses = (nodeList) => {
            nodeList === null || nodeList === void 0 ? void 0 : nodeList.forEach(({ classList, children }) => {
                classList.add('timepicker-ui-tips-disabled');
                children[0].classList.add('timepicker-ui-tips-disabled');
                children[0].tabIndex = -1;
            });
        };
        this._addClassesWithIncludes = (nodeList, includesArr) => {
            nodeList === null || nodeList === void 0 ? void 0 : nodeList.forEach(({ classList, children, textContent }) => {
                if (includesArr === null || includesArr === void 0 ? void 0 : includesArr.includes(textContent)) {
                    classList.add('timepicker-ui-tips-disabled');
                    children[0].classList.add('timepicker-ui-tips-disabled');
                    children[0].tabIndex = -1;
                }
            });
        };
        this.array = obj === null || obj === void 0 ? void 0 : obj.array;
        this.classToAdd = obj === null || obj === void 0 ? void 0 : obj.classToAdd;
        this.clockFace = obj === null || obj === void 0 ? void 0 : obj.clockFace;
        this.tipsWrapper = obj === null || obj === void 0 ? void 0 : obj.tipsWrapper;
        this.theme = obj === null || obj === void 0 ? void 0 : obj.theme;
        this.clockType = obj === null || obj === void 0 ? void 0 : obj.clockType;
        this.disabledTime = obj === null || obj === void 0 ? void 0 : obj.disabledTime;
        this.hour = obj === null || obj === void 0 ? void 0 : obj.hour;
    }
}
exports.default = ClockFace;
