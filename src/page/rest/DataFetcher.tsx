import { TimelineItemModel } from 'react-chrono/dist/models/TimelineItemModel'

import RestHelper, { RestResponse } from '@global/RestHelper'

export interface ProjectModel {
    text: string
    image: string
    link: string
}

export interface IGetTimelineData {
    onSuccess: (value: TimelineItemModel[]) => void;
    onError: (Data: RestResponse) => void;
}

export interface IGetProjectData {
    onSuccess: (value: ProjectModel[]) => void;
    onError: (Data: RestResponse) => void;
}

export default class DataFetcher {

    static GetPicture = (picture: string) : string => { return `${RestHelper.baseURL}portfolio/pic/${picture}` }

    static GetTimelineData = (props: IGetTimelineData) : void => {
        RestHelper.GetItems({
            target: "portfolio/timeline",
            onSuccess: (Value) => props.onSuccess(JSON.parse(Value.data)),
            onError: props.onError
        })
    }

    static GetProjectData = (props: IGetProjectData) : void => {
        RestHelper.GetItems({
            target: "portfolio/projects",
            onSuccess: (Value) => props.onSuccess(JSON.parse(Value.data)),
            onError: props.onError
        })
    }
}