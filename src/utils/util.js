import moment from 'moment';
moment.locale('zh_cn');

const format = (formatFunc)=> (data)=> formatFunc(data);


const formatTime = (str)=> (dateStr)=> moment(dateStr).format(str);


const formatTimeStr = (d)=> format(formatTime('YYYY-MM-DD hh:mm:ss'))(d);

// format(formatTime('YYYY-MM-DD hh:mm'))(new Date());

function isValidInput(input){
    return !['',[],undefined,null].some(invalidStr=> {
        return invalidStr===input|| (Array.isArray(input) && input.length===0);
    });
}

export default{ format, formatTimeStr,isValidInput}