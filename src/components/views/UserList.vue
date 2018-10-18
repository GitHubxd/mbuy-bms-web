<template>
  <Card>
    <Table :columns="tableTitle" :data="userList"></Table>
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
            title: '姓名',
            key: 'userName'
          },
          {
            title: '登录账号',
            key: 'loginAccount'
          },
          {
            title: '邮箱',
            key: 'email'
          },
          {
            title: '手机',
            key: 'phone'
          }
        ],
        userList: []
      }
    },
    methods: {
      getDate () {
        var params = {}
        this.$api.userList(params).then((data) => {
          if (data.errorCode === 10000) {
            this.userList = data.result
          }
        })
      }
    },
    created () {
      this.getDate()
    }
  }
</script>
