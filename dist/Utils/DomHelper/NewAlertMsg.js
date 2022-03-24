"use strict";
/*
 * Copyright 2022 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewAlertMsg = void 0;
const loadingGif_1 = require("./loadingGif");
const newDomElement_1 = require("./newDomElement");
/**
 * make msg popup
 * @export
 * @class NewAlertMsg
 */
class NewAlertMsg {
    constructor(params = {}) {
        this.params = params;
        this.hideBtn = this.hide_btn.bind(this);
        this.showBtn = this.show_btn.bind(this);
        this.createBackground();
        this.createPopup();
        this.createContent();
        this.createFooter();
    }
    hide_btn() {
        this.footer.style.display = 'none';
        this.img.style.display = 'inline';
    }
    show_btn() {
        this.footer.style.display = 'block';
        this.img.style.display = 'none';
    }
    hide() {
        this.background.style.display = 'none';
    }
    show() {
        this.background.style.display = 'block';
    }
    setMsg(msg) {
        this.msg.innerHTML = msg;
    }
    createBackground() {
        this.background = (0, newDomElement_1.newDomElement)({
            nodeName: 'div',
            style: {
                position: 'fixed',
                height: '100%',
                width: '100%',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(36, 42, 48, 0.38)',
                zIndex: 100000,
                textAlign: 'center',
            },
            onclick: (evt) => {
                if (evt.target != this.background)
                    return;
                if (evt.target !== this.background) {
                    return;
                }
                if (typeof this.params.onclose === 'function')
                    this.params.onclose();
                // this.hide();
                if (typeof evt.stopPropagation === 'function')
                    evt.stopPropagation();
                if (typeof evt.preventDefault === 'function')
                    evt.preventDefault();
                if (typeof evt.stopImmediatePropagation === 'function')
                    evt.stopImmediatePropagation();
                return false;
            },
        });
        if (this.params.parent != null) {
            this.params.parent.appendChild(this.background);
        }
    }
    createPopup() {
        this.popup = (0, newDomElement_1.newDomElement)({
            nodeName: 'div',
            style: {
                marginTop: '30px',
                display: 'inline-block',
                width: '80%',
                backgroundColor: '#FFF',
                zIndex: 100001,
                borderRadius: '30px',
            },
        });
        this.background.appendChild(this.popup);
    }
    createContent() {
        const content = (0, newDomElement_1.newDomElement)({
            style: {
                width: '100%',
                color: '#000',
                position: 'relative',
                padding: '15px',
                fontSize: 'xx-large',
            },
        });
        this.popup.appendChild(content);
        this.img = (0, newDomElement_1.newDomElement)({
            nodeName: 'img',
            src: loadingGif_1.loadingGif,
            style: {
                height: '35px',
                marginRight: '20px',
            },
        });
        content.appendChild(this.img);
        this.msg = (0, newDomElement_1.newDomElement)({
            nodeName: 'span',
        });
        content.appendChild(this.msg);
    }
    createFooter() {
        this.footer = (0, newDomElement_1.newDomElement)({
            style: {
                width: '100%',
                color: '#000',
                position: 'relative',
                padding: '15px',
                height: '100px',
            },
        });
        this.popup.appendChild(this.footer);
        for (const btn of this.params.btn) {
            const d = (0, newDomElement_1.newDomElement)({
                style: {
                    width: `${100 / this.params.btn.length}%`,
                    paddingRight: '5px',
                    paddingLeft: '5px',
                    float: 'left',
                },
            });
            const b = (0, newDomElement_1.newDomElement)({
                nodeName: 'button',
                innerHTML: btn.txt,
                onclick: btn.click,
                style: {
                    display: 'inline-block',
                    padding: '6px 12px',
                    marginBottom: '0',
                    fontSize: 'x-large',
                    fontWeight: '400',
                    height: '70px',
                    lineHeight: '1.42857143',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    verticalAlign: 'middle',
                    touchAction: 'manipulation',
                    cursor: 'pointer',
                    userSelect: 'none',
                    border: '1px solid transparent',
                    borderRadius: '4px',
                    width: '100%',
                    backgroundColor: btn.backgroundColor,
                    color: '#fff',
                },
            });
            this.footer.appendChild(d);
            d.appendChild(b);
        }
    }
}
exports.NewAlertMsg = NewAlertMsg;
NewAlertMsg._constructorName = 'NewAlertMsg';
// export type NewAlertMsgType = typeof NewAlertMsg;
const NewAlertMsgType = NewAlertMsg;
globalThis.NewAlertMsg = NewAlertMsg;
globalThis.new_alert_msg = NewAlertMsg;
//# sourceMappingURL=NewAlertMsg.js.map