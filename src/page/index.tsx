import React from 'react'

import Menu, { MenuType, Position } from '@element/Menu'
import MenuItem from '@root/private_modules/Element/Menu/menuItem'

import template from 'apply-loader!pug-loader!./teste.pug'

import '@scss/index.scss'
import '@scss/index3DScene.scss'

import ProfileCard from './customElements/ProfileCard'
import TabViewer from './customElements/TabViewer'
import Card from './customElements/Card'

import { Chrono } from "react-chrono";
import { TimelineItemModel } from 'react-chrono/dist/models/TimelineItemModel'
import ThemeHandler from '../global/ThemeHandler'
import DataFetcher, { ProjectModel } from './rest/DataFetcher'
import ProjectSelector from './customElements/ProjectSelector'
import RestHelper from '../global/RestHelper'

export interface IndexPageProps {

}

export interface IndexPageState {
    itemUpdateHack: TimelineItemModel[] /* Timeline doesn't update custom adding custom children */
    timelineItems : TimelineItemModel[]
    projectsItems: ProjectModel[]
}

export default class IndexPage extends React.Component<IndexPageProps, IndexPageState> {

    public static defaultProps: Partial<IndexPageProps> = {

    };

    constructor(props: IndexPageProps) {
        super(props)
        this.state = { timelineItems: [], projectsItems: [], itemUpdateHack: [ {}] }
        
        DataFetcher.GetTimelineData({
            onSuccess: (val) => { this.setState({timelineItems: val, itemUpdateHack: []}); },
            onError: (Data) => { alert(Data.data); }
        })

        DataFetcher.GetProjectData({
            onSuccess: (val) => this.setState({projectsItems: val}),
            onError: (Data) => { alert(Data.data); }
        })
    }

    getYearSinceDate = (date: string) => {
        return ~~((Date.now() - +new Date(date)) / (31557600000))
    }

    render() {
        return (
            <>
                <Menu logo={`${RestHelper.baseURL}portfolio/logo`} title="ORTFOLIO" type={MenuType.NORMAL} buttonsAlignment="End" position={Position.TOP}>
                    <MenuItem target='middle-content-who' tooltip='WHO AM I' icon="account" />
                    <MenuItem target='middle-content-time' tooltip='MY TIMELINE' icon="chart-timeline-variant" />
                    <MenuItem target='middle-content-projects' tooltip='MY PROJECTS' icon="code-tags" />
                    <MenuItem href='mailto:pedrosilva_02@outlook.com' tooltip='EMAIL' icon="at"/>
                    <MenuItem href='https://github.com/PedroSilva8' tooltip='GITHUB' icon="github"/>
                </Menu>
                <div id="content">
                    <div id="top-content">
                        <div id="top-text">
                            <h2>PEDRO SILVA</h2>
                            <h1>FULL-STACK DEVELOPER</h1>
                        </div>
                        <div id="cube_scene" dangerouslySetInnerHTML={{__html: template}}></div>
                    </div>
                    <div id="middle-content-who">
                        <div data-left>
                            <ProfileCard title='WHO AM I' >
                                <span style={{lineHeight: '30px'}}>
                                    Hi! My name is Pedro I'm a { this.getYearSinceDate("10/07/2002") } full-stack developer. 
                                    I started programing { this.getYearSinceDate("10/07/2014") } years ago when I joined <a target='_blank' href='https://www.coderdojo-lx.pt/'>CoderDojo LX</a><br/>
                                    Most programming-related skills I have learned have been from self-research. I was born on 10/07/2002 in Lisbon, I'm a Portuguese citizen and currently live in Lisbon.
                                </span>
                            </ProfileCard>
                        </div>
                        <div data-right>
                            <TabViewer default='SKILLS'>
                                { /* Tabs */}
                                <div className='tab-buttons'>
                                    <TabViewer.Tab label='SKILLS' />
                                    <TabViewer.Tab label='LANGUAGES' />
                                    <TabViewer.Tab label='APPS/OS' />
                                </div>

                                { /* Panels */ }
                                <TabViewer.Panel id='codePanel' label='SKILLS'>
                                    <Card title='C#'>
                                        { this.getYearSinceDate('10/07/2014') } Years of learning, decent knowledge of it
                                    </Card>
                                    <Card title='C++'>
                                        { this.getYearSinceDate('10/07/2017') } Years of learning, great knowledge of it
                                    </Card>
                                    <Card title='JS'>
                                        { this.getYearSinceDate('10/07/2018') } Years of learning, good knowledge of it
                                    </Card>
                                    <Card title='OpenGL'>
                                        { this.getYearSinceDate('10/07/2018') } Years of learning, decent knowledge of it
                                    </Card>
                                    <Card title='Vulkan'>
                                        { this.getYearSinceDate('10/07/2018') } Years of learning, good knowledge of it
                                    </Card>
                                </TabViewer.Panel>
                                <TabViewer.Panel id='langPanel' label='LANGUAGES'>
                                    <Card title='PORTUGUESE'>
                                        I have a greate knowledge of portuguese since it's my mother language, i can easly read and speak it
                                    </Card>
                                    <Card title='ENGLISH'>
                                        I have a good knowledge of english, i can easly read and in most situations speak it
                                    </Card>
                                    <Card title='JAPANESE'>
                                        I have a poor knowledge of japanese, i'm still learning hiragana and katakana
                                    </Card>
                                </TabViewer.Panel>
                                <TabViewer.Panel id='langPanel' label='APPS/OS'>
                                    <Card title='LINUX'>
                                        I have been using linux for the past { this.getYearSinceDate('10/07/2017') } years and have had experience with ubuntu, kde neon and arch. My daily driver is arch
                                    </Card>
                                    <Card title='BLENDER'>
                                        I have decent knowledge of blender having experience in UV maping, modeling and animation
                                    </Card>
                                    <Card title='3DS MAX'>
                                        I have minimal knowledge of 3ds max, i'm currently learning it in university
                                    </Card>
                                    <Card title='ILLUSTRATOR'>
                                    I have minimal knowledge of adobe illustrator, i'm currently learning it in university
                                    </Card>
                                </TabViewer.Panel>
                            </TabViewer>
                        </div>
                    </div>
                    <div id="middle-content-time" >
                        <ProfileCard title='MY TIMELINE'>
                            <Chrono mode='VERTICAL_ALTERNATING' items={this.state.itemUpdateHack} hideControls={true} allowDynamicUpdate={true} scrollable={false} useReadMore={false} theme={{
                                primary: ThemeHandler.Secondary(),
                                secondary: ThemeHandler.Content('surf'),
                                titleColor: ThemeHandler.Font(),
                                cardBgColor: ThemeHandler.Content(),
                                textColor: ThemeHandler.Font(),
                                cardForeColor: ThemeHandler.Font()
                            }}>
                                { this.state.timelineItems.map((val, index) => 
                                    <div key={index}>
                                        <div style={{fontSize: 30, fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: (val.cardTitle ? val.cardTitle : "")}}></div>
                                        <div style={{fontSize: 15}} dangerouslySetInnerHTML={{__html: (val.cardSubtitle ? val.cardSubtitle : "")}}></div>
                                    </div>
                                )}
                            </Chrono>
                        </ProfileCard>
                    </div>
                    <div id="middle-content-projects" >
                        <ProfileCard title='MY PROJECTS'>
                            { this.state.projectsItems.map((val, index) => <ProjectSelector text={val.text} link={val.link} image={DataFetcher.GetPicture(val.image)} key={index} /> ) }
                        </ProfileCard>
                    </div>
                </div>
            </>
        )
    }
}