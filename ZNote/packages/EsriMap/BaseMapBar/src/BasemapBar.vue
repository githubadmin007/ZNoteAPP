<template>
    <div class="e-basemap-bar"
        :style="PositionStyle"
        @mouseenter="isMouseEnter=true"
        @mouseleave="isMouseEnter=false">
        <div class="switch"
            v-for="bmap in BaseMapLst"
            :key="bmap.id"
            v-show="CurrentById==bmap.id || !autofold || isMouseEnter"
            @click="setCurrentBaseMap(bmap.id)">
            <slot name="basemap-bar-item" v-bind="bmap">
                <div class="image" v-bind:style="{'background-image':'url('+bmap.thumbnailUrl+')'}">
                    <div class="text">{{bmap.title}}</div>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'EBasemapBar',
        data () {
            return {
                isMouseEnter: false // 鼠标是否进入
            }
        },
        props: {
            // MapHelper
            map: {
                type: Object,
                default: null
            },
            // 与父容器上边框的距离
            top: {
                type: String,
                default: ''
            },
            // 与父容器下边框的距离
            bottom: {
                type: String,
                default: '10px'
            },
            // 与父容器左边框的距离
            left: {
                type: String,
                default: ''
            },
            // 与父容器右边框的距离
            right: {
                type: String,
                default: '10px'
            },
            // 是否自动折叠
            autofold: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            // 组件位置
            PositionStyle () {
                let style = {};
                if (this.top) {
                    style.top = this.top;
                } else {
                    style.bottom = this.bottom;
                }
                if (this.left) {
                    style.left = this.left;
                } else {
                    style.right = this.right;
                }
                return style;
            },
            // 所有底图列表
            BaseMapLst () {
                return this.map == null ? [] : this.map.BaseMapMgr.baseMapLst;
            },
            // 当前底图id
            CurrentById () {
                return this.map == null ? null : this.map.BaseMapMgr.currentId;
            }
        },
        methods: {
            // 设置当前底图
            setCurrentBaseMap (id) {
                this.map.BaseMapMgr.setCurrentById(id);
            }
        },
        mounted () {
            
        }
    }
</script>

<style lang='scss' scoped>
    .e-basemap-bar {
        position:absolute;
        pointer-events:auto;
        .switch {
            width:90px;
            height:60px;
            display:inline-block;
            cursor:pointer;
            pointer-events:auto;
            .image {
                width:100%;
                height:100%;
                background-size:100% 100%;
                background-repeat:no-repeat;
                position: relative;
                .text {
                    width:calc(100% - 4px);
                    height:16px;
                    line-height:16px;
                    text-align:center;
                    font-size:12px;
                    position: absolute;;
                    bottom:0px;
                    margin:2px;
                    border-bottom-left-radius:5px;
                    border-bottom-right-radius:5px;
                    color:#fff;
                    background-color: rgba(0,0,0,0.6);
                }
            }
            &:hover {
                .text {
                    background-color: #0094ff;
                }
            }
        }
    }
</style>