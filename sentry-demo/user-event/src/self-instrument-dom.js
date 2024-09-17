export class SelfDomInstrument {
    constructor() {
        this.userActions = [];
        this.DEBOUNCE_DURATION = 1000;
    }

    captureEvent(event) {
        if (event.type != 'click') return;

        const target = event.target;

        // const targetId = this._addUniqueId(target);

        // TODO:檢查是否和上次catch的事件相似
        if (true) {
            const path = this._getElementPath(target);
            this.userActions.push({
                type: 'UI Click',
                time: new Date().toISOString(),
                path,
            });
        }
    }

    _getElementPath = (element) => {
        if (!element) return '';

        let path = [];

        while (element) {
            let name = element.nodeName.toLowerCase();
            if (element.id) {
                name += `#${element.id}`;
            } else if (element.className) {
                name += `.${element.className.split(' ').join('.')}`;
            }
            path.unshift(name);
            element = element.parentElement;
        }

        return path.join(' > ');
    };

    // add unique id in target
    _addUniqueId(target) {
        if (!target._trackingId) {
            target._trackingId = `tracking-${Date.now()}-${Math.random()}`;
        }
        return target._trackingId;
    }

    initEventMonintoring() {
        document.addEventListener('click', this.captureEvent.bind(this), true);
    }
}
