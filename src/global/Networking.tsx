import $ from 'jquery'
import { compress } from 'lz-string';

interface ISendRequestProps {
    url: string
    data?: any
    async?: boolean
    type?: 'POST' | 'GET' | 'DELETE' | 'PUT'
    onSuccess?:(data: any) => void
    onError?:(data: any) => void
}

interface ISendFiles {
    url: string
    uploadType: 'POST' | 'PUT'
    file: string
    onSuccess?:(data: any) => void
    onError?:(data: any) => void
}

export default class Networking {

    static baseURL : string = 'http://pedrosilva.tech:3000/api/1/';

    static sendRequest = (props: ISendRequestProps) : void => {
        $.ajax({
            url: props.url,
            type: props.type,
            data: props.data,
            async: props.async,
            dataType: 'json',
            crossDomain: true,
            success: props.onSuccess,
            error: props.onError});
    }

    static sendFile = (props: ISendFiles) : void => {
        Networking.sendRequest({
            url: props.url,
            data: { file: encodeURI(compress(props.file)) },
            type: props.uploadType,
            onSuccess: props.onSuccess,
            onError: props.onError
        });
    }

    static isValidHttpUrl = (value: string) : boolean => {
        let url;
        
        try { url = new URL(value); } catch (_) { return false;   }
      
        return url.protocol === "http:" || url.protocol === "https:";
    }

    static isBlobURL = (value: string) : boolean => {
        return value.search('blob:') == 1;
    }
}