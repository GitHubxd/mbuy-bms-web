<template>
  <div class="menu">
    <Row>
      <Col :xs="{span:24}" :sm="{span:8}" :md="{span:6}">
      <Card style="max-height: 547px;overflow: auto">
        <!--<Tree :data="menu" show-checkbox title="name"></Tree>-->
        <pre>{{currentIndex}}{{curi}}</pre>
        <h5>编辑导航栏</h5>
        <Menu width="200" theme="light" :accordion="true" @on-select="selectFn" id="menu">
          <div v-for="(item,index) in menu " :key="index">
            <Submenu :name="index" v-if="item.childList && item.childList.length>0"
                     @click.native="showItem($event,item,index)">
              <template slot="title">
                <i class="icon iconfont " :class="item.icon ? item.icon :'icon-collection'"></i>
                {{item.name}}
                <Button type="warning" shape="circle" size="small" icon="ios-compose-outline"
                        v-if="currentIndex==index"></Button>
              </template>
              <Menu-item :name="sub.path" v-for="(sub,i) in item.childList" :key="i"
                         @click.native="showItem($event,sub,index,i)">
                <i class="icon iconfont " :class="sub.icon ? sub.icon : 'icon-collection'"></i>
                {{sub.name}}
                <Button type="warning" shape="circle" size="small" icon="ios-compose-outline" v-if="curi==i+1"></Button>
              </Menu-item>
            </Submenu>
            <div>
              <Menu-item :name="item.path" :key="index" v-if="item.childList.length==0"
                         @click.native="showItem($event,item,index,0)">
                <i class="icon iconfont " :class="item.icon ? item.icon :'icon-collection'"></i>
                {{item.name}}
                <Button type="warning" shape="circle" size="small" icon="ios-compose-outline"
                        v-if="currentIndex==index"></Button>
              </Menu-item>
            </div>
          </div>
        </Menu>
      </Card>
      </Col>
      <Col :xs="{span:24}" :sm="{span:16}" :md="{span:18}">
      <Card>
        <Form :model="formItem" :label-width="80" :rules="ruleValidate" ref="menuForm">
          <Form-item label="编辑状态">
            <Radio-group v-model="formItem.editType">
              <Radio :label="0">新增</Radio>
              <Radio :label="1">编辑</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="类型">
            <Radio-group v-model="formItem.level">
              <Radio :label="0" :disabled="formItem.editType==1">目录</Radio>
              <Radio :label="1" :disabled="formItem.editType==1">菜单</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="目录" v-if="formItem.level==1" prop="parentName">
            <Dropdown @on-click="selectParent" placement="bottom-start">
              <Input v-model="formItem.parentName" placeholder="请输入"></Input>
              <Dropdown-menu slot="list">
                <Dropdown-item v-for="(item,index) in formItem.options" :name="index">{{item.name}}</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
            <a @click="ps=true">规则说明！</a>
          </Form-item>
          <Form-item label="标题" prop="name">
            <Input v-model="formItem.name" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="路径" v-if="formItem.level==1" prop="path">
            <Input v-model="formItem.path" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="是否显示">
            <Radio-group v-model="formItem.showType">
              <Radio :label="0" >不显示</Radio>
              <Radio :label="1" >显示</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="图标">
            <code style="cursor: pointer">
              <i class="icon iconfont" :class="formItem.icon"></i>
            </code>
          </Form-item>
          <Form-item label="权限">
            <Select v-model="formItem.roleId" placeholder="请选择">
              <Option value="2">管理员</Option>
              <Option value="3">普通用户</Option>
              <Option value="4">游客</Option>
            </Select>
          </Form-item>
          <Form-item>
            <Button type="primary" @click="setMenu('menuForm')">提交</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
          </Form-item>
        </Form>
      </Card>
      </Col>
    </Row>
    <Modal
      v-model="ps"
      title="规则说明"
    >
      <h3>编辑状态</h3>
      <p>1.新增为追加目录或菜单</p>
      <p>2.不可以追加相同的目录</p>
      <p>3.编辑为修改左边选定的目录或菜单</p>
      <p>4.编辑时不可再修改它们的类型</p>
      <p>5.点击左侧编辑导航栏，右侧的编辑状态会变为编辑，此时可对左侧高亮的导航进行编辑</p>
      <h3>类型</h3>
      <p>1.目录即为菜单的组名称</p>
      <p>2.没有子菜单的目录不会在导航栏显示（但会在编辑导航栏显示）</p>
      <h3>目录</h3>
      <p>1.选择目录会在对应目录下创建菜单</p>
      <p>2.自定义目录则会在自定义的目录下创建菜单</p>
      <p>3.不输入目录则会直接创建菜单</p>
      <h3>标题</h3>
      <p>1.即为目录和菜单的名称</p>
      <h3>路径</h3>
      <p>1.路由已存在的路径</p>
      <p>2.不存在被指向404</p>
    </Modal>
  </div>
</template>
<script>
  import menu from '@/router/menu'
  import $ from 'jquery'
  export default {
    data () {
      return {
        ps: false,
        menu: {},
        currentIndex: -1, // -1为新增 其他为修改对应的索引
        curi: -1,
        parentIndex: 0,
        formItem: {
          editType: 0,
          level: 0,
          sort: 0,
          roleId: 0,
          icon: 'icon-collection',
          showType: 1,
          parentId: 0,
          parentName: '',
          path: '',
          names: '',
          options: {}
        },
        ruleValidate: {
          name: [
            {required: true, message: '标题不能为空'}
          ],
          path: [
            {required: true, message: '路径不能为空', trigger: 'change'}
          ]
        }
      }
    },
    watch: {
      currentIndex: {
        handler (val) {
          if (val !== -1) {
            this.formItem.editType = 1
            if (this.menu[val].level !== 1) {
              this.formItem.parentName = this.menu[val].name
            }
          }
        }
      },
      'formItem.parentId': {
        handler (val) {
          // 当目录改变时 创建一个parentIndex 保存该菜单应该添加的位置
          let c = this.menu.map(item => {
            if (val === item.name) {
              return true
            } else {
              return false
            }
          })
          let index = c.indexOf(true)
          // 返回 -1 标示目录不存在或自己创建的
          this.parentIndex = index
        }
      },
      formItem: {
        handler () {
          if (this.formItem.editType === 1) { // 编辑模式
            this.$refs['menuForm'].validate((valid) => {
              if (valid) {
                console.log('yes')
              }
            })
          }
        }
      }
    },
    methods: {
      selectFn () {
      },
      showItem ($event, item, index, i) {
        this.formItem = Object.assign({}, this.formItem, item)
        let currDomClass = $event.currentTarget.className
        $('#menu').find('li').removeClass('active')
        $event.currentTarget.className = currDomClass + ' active'
        if (i >= 0) {
          this.curi = i + 1
        }
        this.currentIndex = index
        this.parentIndex = index // 当前点击的索引 和目录默认的索引一开始是一致的
        console.log(this.formItem)
      },
      selectParent (val) {
        this.formItem.parentName = this.formItem.options[val].name
        this.formItem.parentId = this.formItem.options[val].parentId
      },
      setMenu (name) {
        this.$refs[name].validate((valid) => {
          if (valid) { // 验证通过
            let {name, showType, parentId, path, icon, roleId, sort, level, children} = this.formItem
            let data = {name, showType, path, icon, roleId, sort, children: [], level}
            if (this.formItem.editType === 0) { // 新增
              if (this.formItem.level === 0) { // 判断是目录还是菜单 是目录直接添加
                let there = this.menu.map(item => {
                  if (item.name === this.formItem.name) {
                    return true
                  } else {
                    return false
                  }
                })
                let has = there.indexOf(true)
                if (has !== -1) {
                  alert('已存在同名目录')
                } else {
                  console.log(data)
                  //this.menu.push(data)
                }
              } else { // 是菜单
                if (this.formItem.parentId === '') { // 如果目录为空则直接创建菜单
                console.log({name, showType, path, icon, roleId, sort, children: [], level})
                  let data = {name, showType, path, icon, roleId, sort, children: [], level}
                  this.addMenu(data)
                } else {
                  let catalogue = this.menu.map(item => {
                    if (item.name === this.formItem.parent) { // 判断目录是否已经存在
                      return true
                    } else {
                      return false
                    }
                  })
                  let index = catalogue.indexOf(true)
                  if (index !== -1) {  // 把菜单直接添加到已经存在的目录下
                    //this.menu[index].children.push(data)
                    this.addMenu(data)
                  } else { // 目录不存在 则生成目录 把菜单加到该目录下
                    let p = {
                      name: this.formItem.parent,
                      show,
                      path,
                      icon,
                      roleId,
                      sort,
                      children: [],
                      level: 0
                    }
                    p.children.push(data)
                    this.addMenu(data)
                    console.log(this.menu)
                  }
                }
              }
            } else { // 编辑
              let newData = {name, show, path, icon, roleId, children, sort, level}
              let subData = {name, show, path, icon, roleId, sort, level, children: []}
              if (this.curi && this.curi !== -1) { // 选择的菜单
                // 目录不变
//                this.$set(this.menu[this.currentIndex].children, this.curi, subData)
                // 目录变了
                // ...
                if (this.parentIndex !== -1) { // 目录存在则修改 目录存在也可能更换了目录 我们要先删除再添加
                  this.menu[this.currentIndex].children.splice(this.curi, 1) // 从当前的位置删除
                  this.$set(this.menu[this.parentIndex].children, this.curi, subData)
                } else {  // 目录不存在则添加
                  if (this.formItem.parent === '') { // 目录为空
                    this.menu.push(subData)
                  } else { // 自定义的目录
                    // 删除之前的
                    console.log('自定义的目录')
                    if (this.menu[this.currentIndex].level === 1 && this.menu[this.currentIndex].children.length === 0) {
                      this.menu.splice(this.currentIndex, 1)
                    } else {
                      this.menu[this.currentIndex].children.splice(this.curi, 1) // 从当前的位置删除
                    }

                    // 重新创建
                    let userData = {
                      name: this.formItem.parentId, show, path, icon, roleId, sort, level: 0, children: []
                    }
                    userData.children.push(subData)
                    this.menu.push(userData)
                  }
                }
              } else { // 选择的目录
//                this.menu[this.currentIndex] = newData
                this.$set(this.menu, this.currentIndex, newData)
                // vue数组响应数据变化
              }
            }
          }
        })
      },
      addMenu(data){
        this.$api.addMenu(data).then((result) => {
          console.log(result)
        })
      },
      getMenuAll(){
        this.$api.getMenuAll().then((data) => {
          if(data.status === 10000){
            this.menu = data.result
            this.formItem.options = this.menu.filter(item => { // 可选的目录
              if (item.level === 1) {
                return item
              }
            }).map(item => {
              return item
            })
          }
        })
      }
    },
    mounted() {
      this.getMenuAll()
    }
  }
</script>
<style scoped>
  .active {
    background: #f3f3f3;
  }
</style>
