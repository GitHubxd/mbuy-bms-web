<template>
  <div class="login">
    <div class="bg">
    </div>
    <Modal class="login-modal" v-model="loginModal" width="360" :closable="false" :mask-closable="false">
      <div>
        <h2 style="margin:10px;color:#abcdef;text-align:center">
          <img :src="require('@/assets/img/logo.png')" alt="" height="50"></h2>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <Form-item prop="name">
            <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
          </Form-item>
          <Form-item prop="password">
            <Input v-model="formValidate.password" @keyup.native.enter="handleSubmit('formValidate')" type="password" placeholder="请输入密码"></Input>
          </Form-item>

          <Row>
            <Col span="12">
            <Checkbox-group v-model="formValidate.remember">
              <Checkbox label="记住我"></Checkbox>
            </Checkbox-group>
            </Col>
            <!--<Col span="12">
            <a style="float:right" @click="toRegister">新用户注册</a>
            </Col>-->
          </Row>

        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="modal_loading" @click="handleSubmit('formValidate')">登录
        </Button>
        <small style="text-align: center;display:block" class="subText">©copyright by Artiely</small>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data () {
      return {
        loginModal: true,
        modal_loading: false,
        formValidate: {
          name: '',
          password: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码错误', trigger: 'blur'}
          ]

        }
      }
    },
    methods: {
      handleSubmit (name) { // login
        this.$refs[name].validate((valid) => {
          this.modal_loading = true
          this.modal_loading = false
          if (valid) {
            var params = {
              'username': this.formValidate.name,
              'password': this.formValidate.password,
              'grant_type': 'password'
            }
            this.$api.userLogin(params).then((data) => {
              if (data.status === 10000) {
                this.$Message.success('登录成功!')
                localStorage.setItem('accessToken', data.access_token)
                this.$router.push('/index')
              } else {
                this.$Message.error('用户名或密码错误!')
              }
            })
          } else {
            this.$Notice.warning({
              title: '登录提示',
              desc: '用户名/密码 随意输入...'
            })
          }
        })
      },
      toRegister () {
        this.$router.push('/register')
      }
    }
  }
</script>
