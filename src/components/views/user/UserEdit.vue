<template>
  <Card>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <Form-item label="登录账号" prop="loginAccount">
        <Input v-model="formValidate.loginAccount" placeholder="请输入登录账号"></Input>
      </Form-item>
      <Form-item label="姓名" prop="userName">
        <Input v-model="formValidate.userName" placeholder="请输入姓名"></Input>
      </Form-item>
      <Form-item label="性别" prop="sex">
        <Radio-group v-model="formValidate.sex">
          <Radio label="m">男</Radio>
          <Radio label="w">女</Radio>
        </Radio-group>
      </Form-item>
      <Form-item label="电话" prop="phone">
        <Input v-model="formValidate.phone" placeholder="请输入电话"></Input>
      </Form-item>
      <Form-item label="部门" prop="dept">
        <Select v-model="formValidate.dept" placeholder="请选择部门">
          <Option value="2">市场</Option>
          <Option value="3">账务</Option>
        </Select>
      </Form-item>
      <Form-item>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </Form-item>
    </Form>
  </Card>
</template>
<script>
  export default {
    data () {
      return {
        formValidate: {
          loginAccount: '',
          userName: '',
          sex: '',
          phone: '',
          dept: ''
        },
        ruleValidate: {
          loginAccount: [
            {required: true, message: '登录账号不能为空', trigger: 'blur'}
          ],
          userName: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '电话不能为空', trigger: 'blur'}
          ],
          dept: [
            {required: true, message: '请选择部门', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          var params = {
            loginAccount: this.formValidate.loginAccount,
            userName: this.formValidate.userName,
            sex: this.formValidate.sex,
            phone: this.formValidate.phone,
            deptId: this.formValidate.dept
          }
          if (valid) {
            this.$api.userAdd(params).then((data) => {
              if (data.errorCode === 10000) {
                this.$Message.success('提交成功!')
                this.$router.back()
              }
            })
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      }
    },
    mounted () {
      console.log('dddddd')
    },
    created () {
      console.log('---------')
    }
  }
</script>
