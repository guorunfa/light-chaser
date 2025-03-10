import React, {Component} from 'react';
import './BaseInfo.less';
import ConfigCard from "../../config-card/ConfigCard";
import ConfigItem from "../../config-item/ConfigItem";
import UnderLineInput from "../../lc-input/UnderLineInput";
import {ConfigType} from "../../../designer/right/ConfigType";

/**
 * lc组件基础信息
 */
class BaseInfo extends Component<ConfigType> {

    changeName = (value: any) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({info: {name: value}});
    }

    changeDesc = (value: any) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({info: {des: value}});
    }

    render() {
        console.log('base-info render');
        const {config = {}} = this.props;
        const {id, type, name, des} = config;
        return (
            <div className={'lc-base-info'}>
                <ConfigCard title={'基础信息'}>
                    <ConfigItem title={'ID号'}>{id}</ConfigItem>
                    <ConfigItem title={'名称'}>
                        <UnderLineInput type={'text'} onChange={this.changeName} defaultValue={name}/>
                    </ConfigItem>
                    <ConfigItem title={'类型'}>
                        <div className={'item-value'}>{type}</div>
                    </ConfigItem>
                    <ConfigItem title={'描述'}>
                        <UnderLineInput type={'text'} onChange={this.changeDesc} defaultValue={des}/>
                    </ConfigItem>
                </ConfigCard>
            </div>
        )
    }
}

export default BaseInfo;