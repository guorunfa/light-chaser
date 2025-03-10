import {MenuInfo} from "../../designer/right/MenuType";
import React from "react";
import {BaseInfoType, ElemConfig, ThemeItemType} from "../../designer/DesignerType";

/**
 * 自动扫描抽象组件定义核心类。
 * 对于所有继承并实现了该抽象类的字类，都会被自动扫描到并注册到系统中。
 * 因此，所有要接入设计器的react组件都应该按照该类的约定实现所有的方法。
 */
export abstract class AbstractCustomComponentDefinition {

    /**
     * 返回组件基础信息，用于在组件列表中展示
     */
    abstract getBaseInfo(): BaseInfoType | null;

    /**
     * 返回React组件的类模板，在设计器拖拽创建组件实例时会使用到
     */
    abstract getComponent(): React.Component | React.FC | any;

    /**
     * 返回对应组件的默认配置，在拖拽生成组件实例后需要展示默认效果
     */
    abstract getInitConfig(): ElemConfig | Object | null

    /**
     * 返回组件图片缩略图，在组件列表中展示时使用。图片不要超过300kb,否则会影响设计器的加载速度
     */
    abstract getChartImg(): any;

    /**
     * 返回右侧菜单列表，双击组件时需要展示菜单列表
     */
    abstract getMenuList(): Array<MenuInfo>;

    /**
     * 返回右侧菜单对应的具体配置内容。这个返回结果是一个映射关系。以对象形式返回
     */
    abstract getMenuToConfigContentMap(): { [key: string]: React.Component | React.FC | any };

    /**
     * 更新本组件的主题样式方法，用于在全局切换主题时使用
     * @param newTheme 新主题
     * @param sourceStyle 组件原样式
     */
    abstract updateTheme(newTheme: ThemeItemType, sourceStyle: any): void;
}

