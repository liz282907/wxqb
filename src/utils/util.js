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
function generateTemplate(type,payload,count){
    switch(type){
        case 'input':{
            return `
                <div class="form-item">
                    <span class="form-left">{{payload.name}}</span>
                    <el-input
                      :placeholder="payload.placeholder"
                      v-model="input"-${count}>
                    </el-input>
                </div>`
            break;
        }
        case 'select':{
            return `<div class="form-item">
                    <span class="form-left">{{payload.name}}</span>
                     <el-select size="small" v-model="select"-${count} multiple>
                        <el-option
                          v-for="item in payload.options.split(',')"
                          :label="item"
                          :value="item">
                        </el-option>
                      </el-select>
                </div>
            `
            break;
        }
        case 'slider':{
            return `
                <div class="form-item">
                    <span class="form-left">slider
                        <el-tooltip class="item" effect="dark" :content="payload.slider.tooltip" placement="top-start">
                            <i class="iconfont">&#xe683;</i>
                        </el-tooltip>
                    :</span>
                    <el-slider class="form-right" v-model="slider"-${count} show-input></el-slider>
                </div>
            `
            break;
        }
    }
}

export default{ format, formatTimeStr,isValidInput,generateTemplate}