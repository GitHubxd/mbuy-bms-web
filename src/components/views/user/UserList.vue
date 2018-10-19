<template>
  <Card>
    <div slot="title">
      <Button type="success" @click="gotoAdd">
        <Icon type="trash-a"></Icon>
        新增
      </Button>
      <Button type="error" @click="deleteMore">
        <Icon type="trash-a"></Icon>
        批量删除
      </Button>
    </div>
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
      },
      gotoAdd () {
        console.log('goto edit')
        this.$router.push({
          path: '/userIndex/userEdit'
        })
      },
      deleteMore () {
        console.log('delete more')
      }
    },
    created () {
      this.getDate()
    }
  }
</script>
