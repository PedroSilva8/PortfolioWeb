import Networking from '@global/Networking'
import { IndexKind } from 'typescript';

export interface RestResponse {
    isValid: boolean
    code: number
    data: any
    other: any
}

export interface IGetItems {
    target: string,
    arguments?: any
    onSuccess: (Data: RestResponse) => void
    onError: (Data: RestResponse) => void
}

export interface IGetItemData {
    target: string
    id: IndexKind
    onSuccess: (Data: RestResponse) => void
    onError: (Data: RestResponse) => void
}

export interface ICreateItem {
    target: string
    Values: any,
    onSuccess?: (Data: RestResponse) => void
    onError?: (Data: RestResponse) => void
}

export interface IUpdateItem {
    target: string
    targetExtra?: string
    id: IndexKind
    Values: any
    onSuccess?: (Data: RestResponse) => void
    onError?: (Data: RestResponse) => void
}

export interface IUpdateFile {
    target: string
    id: IndexKind
    fileName: string
    fileData: string
    onSuccess?: (Data: RestResponse) => void
    onError?: (Data: RestResponse) => void
}

export interface IDeleteItem {
    target: string
    id: IndexKind
    onSuccess?: (Data: RestResponse) => void
    onError?: (Data: RestResponse) => void
}

export default class RestHelper {
    static apiVersion: number = 1;
    static baseURL: string = `http://pedrosilva.tech:3000/api/${RestHelper.apiVersion}/`;

    static DataToResponse = (Data: any) : RestResponse => {
        if (!Data.hasOwnProperty("status") || isNaN(parseInt(Data["status"])) || !Data.hasOwnProperty("data"))
            return { isValid: false, code:0, data: "", other: {} }
        
        var extra: { [index: string]: any } = {}

        Object.keys(Data).forEach(element => {
            if (element != "code" && element != "data")
                extra[element] = Data[element];
        });

        return { isValid: true, code: parseInt(Data["status"]), data: Data["data"], other: extra }
    }

    static ErrorToResponse = (Data: any) : RestResponse => {
        if (!Data.responseJSON.hasOwnProperty("code") || isNaN(parseInt(Data.responseJSON["code"])) || !Data.responseJSON.hasOwnProperty("data"))
            return { isValid: false, code:-1, data: "", other: {} }
        
        return { isValid: true, code: parseInt(Data.responseJSON["code"]), data: Data.responseJSON["data"], other: {} }
    }

    static GetItems = (props: IGetItems) => {
        Networking.sendRequest({
            url: `${RestHelper.baseURL}${props.target}`,
            type: 'GET',
            data: props.arguments,
            onSuccess: (Data) => {
                var Response = RestHelper.DataToResponse(Data);
                if (!Response.isValid || Response.code != 0)
                    if (props.onError)
                        props.onError(Response);
                if (props.onSuccess)
                    props.onSuccess(Response);
            },
            onError: (Data) => {
                if (props.onError)
                    props.onError(RestHelper.ErrorToResponse(Data));
            }
        });
    }

    static CreateItem = (props: ICreateItem) => {
        Networking.sendRequest({
            url: `${RestHelper.baseURL}${props.target}/`,
            type: 'POST',
            data: props.Values,
            onSuccess: (Data) => {
                var Response = RestHelper.DataToResponse(Data);
                if (!Response.isValid || Response.code != 0)
                    if (props.onError)
                        props.onError(Response);
                if (props.onSuccess)
                    props.onSuccess(Response);
            },
            onError: (Data) => {
                if (props.onError)
                    props.onError(RestHelper.ErrorToResponse(Data));
            }
        });
    }

    static GetItemData = (props: IGetItemData) => {
        Networking.sendRequest({
            url: `${RestHelper.baseURL}${props.target}/${props.id}`,
            type: 'GET',
            onSuccess: (Data) => {
                var Response = RestHelper.DataToResponse(Data);
                if (!Response.isValid || Response.code != 0)
                    if (props.onError)
                        props.onError(Response);
                if (props.onSuccess)
                    props.onSuccess(Response);
            },
            onError: (Data) => {
                if (props.onError)
                    props.onError(RestHelper.ErrorToResponse(Data));
            }
        });
    }

    static GetImage = (target: string, id: Number) => {
        return `${RestHelper.baseURL}${target}/${id}/Image`
    }

    static UpdateItems = (props: IUpdateItem) => {

        var targetExtra = (props.targetExtra ? props.targetExtra : "")

        Networking.sendRequest({
            url: `${RestHelper.baseURL}${props.target}/${props.id}${targetExtra}`,
            type: 'PUT',
            data: props.Values,
            onSuccess: (Data) => {
                var Response = RestHelper.DataToResponse(Data);
                if (!Response.isValid || Response.code != 0)
                    if (props.onError)
                        props.onError(Response);
                if (props.onSuccess)
                    props.onSuccess(Response);
            },
            onError: (Data) => {
                if (props.onError)
                    props.onError(RestHelper.ErrorToResponse(Data));
            }
        });
    }

    static UpdateFile = (props: IUpdateFile) => {
        Networking.sendFile({
            url: `${RestHelper.baseURL}${props.target}/${props.id}/${props.fileName}`,
            uploadType: 'PUT',
            file: props.fileData,
            onSuccess: (Data) => {
                var Response = RestHelper.DataToResponse(Data);
                if (!Response.isValid || Response.code != 0)
                    if (props.onError)
                        props.onError(Response);
                if (props.onSuccess)
                    props.onSuccess(Response);
            },
            onError: (Data) => {
                if (props.onError)
                    props.onError(RestHelper.ErrorToResponse(Data));
            }
        });
    }

    static DeleteItem = (props:IDeleteItem) => {
        Networking.sendRequest({
            url: `${RestHelper.baseURL}${props.target}/${props.id}`,
            type: 'DELETE',
            onSuccess: (Data) => {
                var Response = RestHelper.DataToResponse(Data);
                if (!Response.isValid || Response.code != 0)
                    if (props.onError)
                        props.onError(Response);
                if (props.onSuccess)
                    props.onSuccess(Response);
            },
            onError: (Data) => {
                if (props.onError)
                    props.onError(RestHelper.ErrorToResponse(Data));
            }
        });
    }
}