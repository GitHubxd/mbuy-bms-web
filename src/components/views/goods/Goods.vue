<template>
  <Card>
    <div slot="title">
      <Button type="success">
        <Icon type="trash-a"></Icon>
        新增
      </Button>
      <Button type="primary" shape="circle" ><Icon type="funnel"></Icon> 筛选</Button>
      <Button type="error">
        <Icon type="trash-a"></Icon>
        批量删除
      </Button>
    </div>
    <Table :columns="tableTitle" :data="goodsList"></Table>
  </Card>
</template>

<script>
  export default {
    data () {
      return {
        tableTitle: [
          {
            title: 'ID',
            key: 'id'
          },
          {
            title: '名称',
            key: 'goodsName'
          },
          {
            title: '价格',
            key: 'goodsPrice'
          },
          {
            title: '规格',
            key: 'spec'
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#5cadff'
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    color: '#5cadff'
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#ff3300'
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        goodsList: []
      }
    },
    methods: {
      getAllGoods: function () {
        this.goodsList = null
        var params = {}
        this.$api.goodsList(params).then((data) => {
          if (data.errorCode === 10000) {
            this.goodsList = data.result
          }
        })
      }
    },
    mounted: function () {
      this.getAllGoods()
    }
  }
</script>

<style scoped>

</style>
