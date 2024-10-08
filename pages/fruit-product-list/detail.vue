<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" :collection="collectionList" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
        <view>
          <text>名称</text>
          <text>{{data.title}}</text>
        </view>
        <view>
          <text>分类</text>
          <text>{{data.navid}}</text>
        </view>
        <view>
          <text>产品图</text>
          <uni-file-picker v-if="data.picurl && data.picurl.fileType == 'image'" :value="data.picurl" :file-mediatype="data.picurl && data.picurl.fileType" return-type="object" readonly></uni-file-picker>
          <uni-link v-else-if="data.picurl" :href="data.picurl.url" :text="data.picurl.url"></uni-link>
          <text v-else></text>
        </view>
        <view>
          <text>排序</text>
          <text>{{data.orderid}}</text>
        </view>
        <view>
          <text>价格</text>
          <text>{{data.price}}</text>
        </view>
        <view>
          <text>状态</text>
          <text>{{options.checked_valuetotext[data.checked]}}</text>
        </view>
      </view>
    </unicloud-db>
    <view class="btns">
      <button type="primary" @click="handleUpdate">修改</button>
      <button type="warn" class="btn-delete" @click="handleDelete">删除</button>
    </view>
  </view>
</template>

<script>
  // 由schema2code生成，包含校验规则和enum静态数据
  import { enumConverter } from '../../js_sdk/validator/fruit-product-list.js'
  const db = uniCloud.database()

  export default {
    data() {
      return {
        queryWhere: '',
        collectionList: [ db.collection('fruit-product-list').field('title,navid,picurl,orderid,price,checked').getTemp(),db.collection('fruit-product-nav').field('_id, classname as text').getTemp() ],
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
        options: {
          // 将scheme enum 属性静态数据中的value转成text
          ...enumConverter
        }
      }
    },
    onLoad(e) {
      this._id = e.id
    },
    onReady() {
      if (this._id) {
        this.collectionList = [ db.collection('fruit-product-list').where('_id=="' + this._id + '"').field('title,navid,picurl,orderid,price,checked').getTemp(),db.collection('fruit-product-nav').field('_id, classname as text').getTemp() ]
      }
    },
    methods: {
      handleUpdate() {
        // 打开修改页面
        uni.navigateTo({
          url: './edit?id=' + this._id,
          events: {
            // 监听修改页面成功修改数据后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      },
      handleDelete() {
        this.$refs.udb.remove(this._id, {
          success: (res) => {
            // 删除数据成功后跳转到list页面
            uni.navigateTo({
              url: './list'
            })
          }
        })
      }
    }
  }
</script>

<style>
  .container {
    padding: 10px;
  }

  .btns {
    margin-top: 10px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
  }

  .btns button {
    flex: 1;
  }

  .btn-delete {
    margin-left: 10px;
  }
</style>
