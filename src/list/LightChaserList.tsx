import React, {Component} from 'react';
import './style/LightChaserList.less';
import {withRouter} from "react-router-dom";
import AddNewScreenDialog from "./AddNewScreenDialog";
import {getAllProject, getImageFromLocalWithKey} from "../utils/LocalStorageUtil";
import listBottom from './icon/list-bottom.svg';
import templateMarket from './icon/template-market.svg';
import datasource from './icon/datasource.svg';
import LcButton from "../lib/lc-button/LcButton";

import listDelImg from './list-del.svg';
import listDisplay from './list-display.svg';
import listEdit from './list-edit.svg';
import {buildUrlParams} from "../utils/URLUtil";

class LightChaserList extends Component<any> {

    state: any = {
        addNewScreen: false,
        addNewData: {},
        data: [],
        imageIdToUrl: {}
    }

    componentDidMount() {
        getAllProject().then((data: any) => {
            if (data && data.length > 0) {
                this.setState({data});
                let imageIds: any = [];
                data.forEach((item: any) => {
                    let imageId = item.projectConfig.screenshot;
                    if (imageId && imageId !== '') {
                        imageIds.push(imageId);
                    }
                });
                const promise = imageIds.map((imageId: any) => getImageFromLocalWithKey(imageId));
                let imageIdToUrl: any = {};
                Promise.all(promise).then((res: any) => {
                    res.forEach((item: any) => {
                        const key = Object.keys(item)[0];
                        imageIdToUrl[key] = item[key];
                    });
                    this.setState({imageIdToUrl});
                });

            }
        })
    }

    addNewBigScreen = () => {
        const {addNewScreen} = this.state;
        this.setState({addNewScreen: !addNewScreen})
    }

    addNewBigScreenOk = () => {
        let {addNewData} = this.state;
        addNewData['action'] = 'create';
        let urlParams = buildUrlParams(addNewData);
        window.open(`/designer?${urlParams}`, '_blank');
    }

    addNewBigScreenCancel = () => {
        const {addNewScreen} = this.state;
        this.setState({addNewScreen: !addNewScreen, addNewData: {}})
    }

    addNewScreenDialogChanged = (data: { [k: string]: [v: any] }) => {
        const {addNewData} = this.state;
        this.setState({addNewData: {...addNewData, ...data}});
    }

    openScreen = (e: any) => {
        const {type} = e.target.dataset
        let id = parseInt(e.currentTarget.id);
        if (type === 'edit') {
            let params = buildUrlParams({
                id: id,
                action: 'edit'
            });
            window.open(`/designer?${params}`, '_blank');
        } else if (type === 'show') {
            window.open(`/view?id=${id}`, '_blank');
        }
    }

    render() {
        const {addNewScreen, data, imageIdToUrl} = this.state;
        let width = (window.innerWidth - 230 - (6 * 20)) / 6;
        let height = width * (9 / 16);
        return (
            <div className={'lc-console'}>
                <div className={'console-head'}>
                    <div className={'console-head-title'}>LC 控制台</div>
                </div>
                <div className={'console-body'}>
                    <div className={'console-list'}>
                        <div className={'console-list-item'}>
                            <div className={'item-icon'}><img src={listBottom} alt={'项目列表'}/></div>
                            <div className={'item-text'}>项目列表</div>
                        </div>
                        <div className={'console-list-item'}>
                            <div className={'item-icon'}><img src={datasource} alt={'数据源管理'}/></div>
                            <div className={'item-text'}>数据源管理</div>
                        </div>
                        <div className={'console-list-item'}>
                            <div className={'item-icon'}><img src={templateMarket} alt={'模板市场'}/></div>
                            <div className={'item-text'}>模板市场</div>
                        </div>
                    </div>
                    <div className={'console-content'}>
                        <div className={'content-body'}>
                            <div className={'project-list'}>
                                <div style={{width: width, height: height, margin: '0 20px 20px 0'}}>
                                    <LcButton onClick={this.addNewBigScreen}
                                              style={{width: width, height: height, fontSize: 20}}>+ 新建项目</LcButton>
                                </div>
                                {data && data.map((item: any) => {
                                    let bgImgUrl = imageIdToUrl[item.projectConfig?.screenshot];
                                    return (
                                        <div key={item.id + ''}
                                             style={{
                                                 width: width,
                                                 height: height,
                                                 backgroundImage: bgImgUrl && `url(${bgImgUrl})`,
                                             }}
                                             onClick={this.openScreen}
                                             id={item.id + ''}
                                             className={'project-item'}>
                                            <div className={'pro-list-content'} style={{zIndex: 1}}>
                                                <div className={'pro-content-title'}>{item.projectConfig?.name}</div>
                                                <div className={'pro-content-operates'}>
                                                    <div className={'operate-item'} data-type={'edit'}>
                                                        <img src={listEdit} alt={'编辑'}/>
                                                    </div>
                                                    <div className={'operate-item'} data-type={'del'}>
                                                        <img src={listDelImg} alt={'删除'}/>
                                                    </div>
                                                    <div className={'operate-item'} data-type={'show'}>
                                                        <img src={listDisplay} alt={'展示'}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <AddNewScreenDialog onOk={this.addNewBigScreenOk} onCancel={this.addNewBigScreenCancel}
                                    visible={addNewScreen} onChange={this.addNewScreenDialogChanged}/>
            </div>
        );
    }
}

export default withRouter(LightChaserList);