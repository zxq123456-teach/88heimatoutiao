<template>
  <div class='channel-select'>
      <el-select
      placeholder="请选择频道"
      :value='value'
      @input='onInput'>
          <el-option
          :label='channel.name'
          :value='channel.id'
          v-for='channel in channels'
          :key='channel.id'>
          </el-option>
      </el-select>
  </div>
</template>

<script>
export default {
  name: 'ChannelSelect',
  components: {},
  props: {
    value: {
      type: [String, Number],
      require: true
    }
  },
  data () {
    return {
      channels: [] // 储存频道列表
    }
  },
  computed: {},
  watch: {
  },
  created () {
    this.loadChannels()
  },
  methods: {
    loadChannels () {
      // 是否需要token由接口文档指示
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    },
    onInput (data) {
      // data是选中的option的value
      // 发布一个自定义事件 由于父组件使用v-model简写
      // 所以这里的事件名称必须叫input
      this.$emit('input', data)
    }
  }
}
</script>

<style>

</style>
