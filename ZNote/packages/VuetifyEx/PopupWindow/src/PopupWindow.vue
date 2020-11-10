<template>
    <div :id="id" v-if="dShow" class="popup-window-container">
        <div class="popup-window-shade" v-if="!dIsMinimize"></div>
        <div class="popup-window-window"
            :style="[ cPositionStyle ]">
            <!-- 头部 -->
            <div class="popup-window-head"
                :style="[ cTitleStyle ]"
                @mousedown="TitleMouseDown">
                <!-- 图标 -->
                <div class="icon" v-if="icon || iconimg">
                    <v-icon v-if="icon">{{icon}}</v-icon>
                    <v-avatar v-else :size="30" tile>
                        <v-img :src="iconimg"></v-img>
                    </v-avatar>
                </div>
                <!-- 标题 -->
                <div class="title" :title="title">{{title}}</div>
                <!-- 按钮 -->
                <div class="btns">
                    <v-icon class="btn" v-if="minimize && !dIsMinimize" @click="Minimize">mdi-window-minimize</v-icon>
                    <v-icon class="btn" v-if="maximize" @click="Maximize">
                        {{ dIsMinimize && !dIsMaximize || !dIsMinimize && dIsMaximize ? 'mdi-window-restore' : 'mdi-window-maximize' }}
                    </v-icon>
                    <v-icon class="btn" v-if="closeAble" @click="Close">mdi-window-close</v-icon>
                </div>
            </div>
            <!-- 内容 -->
            <div v-if="!dIsMinimize" class="popup-window-content">
                <iframe v-if="src" :src="src"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VPopupWindow',
    data () {
        return {
            dTopMoved: null, // 移动后的top
            dLeftMoved: null, // 移动后的left
            dIsMaximize: false, // 是否处于最大化状态
            dIsMinimize: false, // 是否处于最小化状态
            dShow: false
        };
    },
    props: {
        // id,
        id: {
            type: String
        },
        // 是否显示窗体
        value: {
            type: Boolean,
            default: false
        },
        // 标题
        title: {
            type: String
        },
        // 图标
        icon: {
            type: String
        },
        // 图标图片
        iconimg: {
            type: String
        },
        // 宽
        width: {
            type: [String, Number],
            default: '50%'
        },
        // 高
        height: {
            type: [String, Number],
            default: '50%'
        },
        // 弹窗位置
        position: {
            type: [String, Array],
            default: 'auto'
        },
        // 允许最小化
        minimize: {
            type: Boolean,
            default: false
        },
        // 允许最大化
        maximize: {
            type: Boolean,
            default: false
        },
        // 关闭按钮
        closeAble: {
            type: Boolean,
            default: true
        },
        // 允许拖动
        moveAble: {
            type: Boolean,
            default: false
        },
        // 全屏
        fullscreen: {
            type: Boolean,
            default: false
        },
        // 要打开的链接
        src: {
            type: String,
            default: null
        },
        // 关闭前的回调
        beforeClose: {
            type: Function
        }
    },
    computed: {
        // 窗体位置--top
        cTop () {
            if (this.dTopMoved) return this.dTopMoved;
            let position = this.position;
            if (typeof position === 'object') {
                if (position.length === 2) {
                    return position[0];
                }
            } else {
                switch (position) {
                    case 't':
                    case 'lt':
                    case 'rt':
                        return '0px';
                    case 'b':
                    case 'lb':
                    case 'rb':
                        return`calc(100% - ${this.height})`;
                    case 'l':
                    case 'r':
                    case 'auto':
                        return `calc((100% - ${this.height})/2)`;
                    default:
                        return position;
                }
            }
            return `calc((100% - ${this.height})/2)`;
        },
        // 窗体位置--left
        cLeft () {
            if (this.dLeftMoved) return this.dLeftMoved;
            let position = this.position;
            if (typeof position === 'object') {
                if (position.length === 2) {
                    return position[1];
                }
            } else {
                switch (position) {
                    case 'l':
                    case 'lt':
                    case 'lb':
                        return '0px';
                    case 'r':
                    case 'rt':
                    case 'rb':
                        return`calc(100% - ${this.width})`;
                    case 't':
                    case 'b':
                    case 'auto':
                        return `calc((100% - ${this.width})/2)`;
                }
            }
            return `calc((100% - ${this.width})/2)`;
        },
        // 窗体位置
        cPositionStyle () {
            let style;
            if (this.dIsMinimize) {
                style = {
                    width: '200px',
                    height: '40px',
                    bottom: '0px',
                    left: '0px'
                };
            } else if (this.dIsMaximize) {
                style = {
                    width: '100%',
                    height: '100%',
                    top: '0px',
                    left: '0px'
                };
            } else {
                style = {
                    width: this.width,
                    height: this.height,
                    top: this.cTop,
                    left: this.cLeft
                };
            }
            return style;
        },
        // 标题样式
        cTitleStyle () {
            let btnCount = 0;
            if (this.minimize && !this.dIsMinimize) btnCount++;
            if (this.maximize && ( !this.dIsMinimize && this.dIsMaximize || this.dIsMinimize && !this.dIsMaximize )) btnCount++;
            if (this.maximize && ( !this.dIsMinimize && !this.dIsMaximize || this.dIsMinimize && this.dIsMaximize )) btnCount++;
            if (this.closeAble) btnCount++;
            return {
                cursor: this.moveAble && !this.dIsMinimize && !this.dIsMaximize ? 'move' : 'default',
                'padding-left': this.icon || this.iconimg ? '40px' : '10px',
                'padding-right': btnCount * 40 + 'px'
            }
        }
    },
    watch: {
        value (newVal) {
            this.dShow = newVal;
        }
    },
    methods: {
        // 窗口最小化
        Minimize () {
            this.dIsMinimize = true;
        },
        // 窗口最大化、窗口正常化
        Maximize () {
            if (this.dIsMinimize) {
                this.dIsMinimize = false;
            } else {
                this.dIsMaximize = !this.dIsMaximize;
            }
        },
        // 显示窗口
        Show () {
            this.dShow = true;
        },
        // 关闭窗口
        Close (after) {
            let _this = this;
            function close() {
                _this.dShow = false;
                _this.$emit("input", false);
                if (typeof after === 'function') {
                    after();
                }
            }
            if (typeof this.beforeClose === 'function') {
                this.beforeClose(close);
            } else {
                close();
            }
        },
        // 移动窗体
        TitleMouseDown (e) {
            if (!this.moveAble || this.dIsMinimize || this.dIsMaximize) return;
            let elWindow = e.currentTarget.parentNode;   
            let disX = e.clientX - elWindow.offsetLeft;
            let disY = e.clientY - elWindow.offsetTop;
            document.onmousemove = (e) => {
                this.dLeftMoved = e.clientX - disX + 'px';
                this.dTopMoved = e.clientY - disY + 'px';       
            };
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    },
    mounted () {
        this.dIsMaximize = this.fullscreen;
    }
}
</script>

<style lang='scss' scoped>
    .popup-window-container{
        width:100%;
        height:100%;
        position:fixed;
        top:0px;
        left:0px;
        z-index: 1000;
        pointer-events: none;
    }
    .popup-window-shade{
        width:100%;
        height:100%;
        top:0px;
        left:0px;
        background: rgba(0,0,0,0.5);
        pointer-events: auto;
    }
    .popup-window-window{
        background: #F8F8F8;
        position:absolute;
        pointer-events: auto;
        .popup-window-head {
            width:100%;
            height:40px;
            background: #F8F8F8;
            border-bottom:1px solid #eee;
            // padding: 0px 120px 0px 40px;
            user-select: none;
            .icon{
                width:40px;
                height:40px;
                position:absolute;
                top:0px;
                left:0px;
                padding: 5px;
                .v-icon{
                    width:100%;
                    height:100%;
                }
            }
            .title{
                height:100%;
                line-height:40px;
                font-size: 16px;
                color:#333;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
            }
            .btns{
                height:40px;
                position:absolute;
                top:0px;
                right:0px;
                .btn{
                    width:40px;
                    height:40px;
                    cursor: pointer;
                    &:hover{
                        background-color: #ccc;
                    }
                }
            }
        }
        .popup-window-content{
            width:100%;
            height:calc(100% - 40px);
            iframe{
                width:100%;
                height:100%;
                border:0px;
            }
        }
    }
</style>
