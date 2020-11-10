<template>
    <div class="e-view">
        <slot name="basemap-bar">
            <BasemapBar :map="map" v-bind="basemapConfig">
                <slot name="basemap-bar-item" slot-scope="bmap" v-bind="bmap"></slot>
            </BasemapBar>
        </slot>
    </div>
</template>

<script>
import { esri } from '../../base/EsriHelper'
import BasemapBar from '../../BaseMapBar'

export default {
    name: 'EView',
    data () {
        return {
            view: null
        }
    },
    components: {
        BasemapBar
    },
    props: {
        // MapHelper
        map: {
            type: Object,
            default: null
        },
        // View唯一标识符
        name: {
            type: String,
            default: Date.now().toString()
        },
        // 默认视图中心点
        center: {
            type: Array,
            default: () => [113, 23]
        },
        // 默认视图缩放级别
        zoom: {
            type: Number,
            default: 8
        },
        // 底图切换配置
        basemapConfig: {
            type: Object
        }
    },
    watch: {
        // 监视map变化，如变化则重新创建视图
        map: function ($map) {
            if($map != null){
                this.$view = $map.ViewMgr.create2DView(this.name, {
                    container: this.$el,
                    zoom: this.zoom
                });
                let _this = this;
                // 待加载完毕后才能读取到正确的坐标系信息
                this.$view.view.when(() => {
                    _this.$view.view.center = new esri.geometry.Point({
                        x: _this.center[0],
                        y: _this.center[1],
                        spatialReference: _this.$view.view.spatialReference
                    });
                });
            }
        }
    },
}
</script>

<style scoped>
    .e-view {
        width:100%;
        height:100%;
        position: relative;
    }
</style>
