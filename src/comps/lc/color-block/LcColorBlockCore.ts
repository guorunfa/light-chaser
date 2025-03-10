import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig, ThemeItemType} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import LcColorBlock from "./LcColorBlock";
import {getDefaultMenuList} from "../../../designer/right/util";
import BaseInfo from "../../../lib/common-fragment/base-info/BaseInfo";
import AnimationConfig from "../../../lib/common-fragment/animation-config/AnimationConfig";
import {LcColorBlockConfig} from "./LcColorBlockConfig";
import ColorBlockImg from './color-block.png';

class LcColorBlockCore extends AbstractCustomComponentDefinition {
    updateTheme = (newTheme: ThemeItemType, sourceStyle: any) => {
    }

    getBaseInfo(): BaseInfoType | null {
        return {
            name: "颜色块",
            key: 'LcColorBlock',
            typeName: "颜色块",
            typeKey: "base",
            sourceName: "Lc",
            sourceKey: "lc",
        };
    }

    getChartImg(): any {
        return ColorBlockImg;
    }

    getComponent(): any {
        return LcColorBlock;
    }

    getInitConfig(): ElemConfig | Object | null {
        return {
            info: {
                id: '',
                name: '颜色块',
                type: 'LcColorBlock',
                des: 'Lc设计器默认颜色块',
            },
            style: {
                baseStyle: {
                    padding: "10px",
                    backgroundColor: "rgba(14,16,20,0.11)",
                    border: "2px solid #00deffff",
                    borderRadius: "3px"
                },
                chartStyle: {}
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: "基础文本"
                },
            },
            animation: {},
            theme: {
                themeId: '',
            },
        };
    }


    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList().filter((item: MenuInfo) => (item.name !== '数据' && item.name !== '主题'));
    }

    getMenuToConfigContentMap(): { [p: string]: any } {
        return {
            'info': BaseInfo,
            'style': LcColorBlockConfig,
            'animation': AnimationConfig,
        };
    }

}

export default LcColorBlockCore;