import {action, makeObservable, observable} from "mobx";

class EventOperateStore {
    constructor() {
        makeObservable(this, {
            scale: observable,
            targets: observable,
            setScale: action,
            setTargets: action,
        })
    }

    /**
     * 缩放系数
     */
    scale: number = 1;

    /**
     * 可移动框架实例引用
     */
    movableRef: any = null;
    /**
     * 框选框架实例引用
     */
    selectorRef: any = null;

    /**
     * 被框选中的目标元素
     */
    targets: any[] = [];
    targetIds: string[] = [];

    maxOrder = 0;
    minOrder = 0;

    setMaxOrder = (order: number) => this.maxOrder = order;
    setMinOrder = (order: number) => this.minOrder = order;

    setScale = (scale: number) => this.scale = scale;

    setMovableRef = (ref: any) => this.movableRef = ref;

    setSelectorRef = (ref: any) => this.selectorRef = ref;

    setTargets = (targets: any[]) => this.targets = targets;

    setTargetIds = (targetIds: string[]) => this.targetIds = targetIds;
}

const eventOperateStore = new EventOperateStore();
export default eventOperateStore;