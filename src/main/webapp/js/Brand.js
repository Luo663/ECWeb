new Vue({
    el: "#home",

    mounted() {
        //当页面加载完成后，发送异步请求，获取数据
        this.selectUser();
        this.selectAll();
    },

    methods: {

        selectUser(){
            let _this = this;
          axios({
              method:"post",
              url:"http://localhost:8080/ECweb/userServlet",
          }).then(function (resp) {
              _this.sessionUser.userName = resp.data;
          })
        },

        // 查询分页数据
        selectAll() {

            axios({
                method: "post",
                url: "http://localhost:8080/ECweb/selectByPageAndConditionServlet?currentPage=" + this.currentPage + "&pageSize=" + this.pageSize,
                data: this.brand
            }).then(resp => {
                //设置表格数据
                this.tableData = resp.data.rows; // {rows:[],totalCount:100}
                //设置总记录数
                this.totalCount = resp.data.totalCount;
            })


        },

        tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        // 复选框选中后执行的方法
        handleSelectionChange(val) {
            this.multipleSelection = val;

        },
        // 查询方法
        onSubmit() {
            this.selectAll();

        },
        // 添加数据
        addBrand() {
            //console.log(this.brand);
            var _this = this;

            // 发送ajax请求，添加数据
            axios({
                method: "post",
                url: "http://localhost:8080/ECweb/addServlet",
                data: _this.brand
            }).then(function (resp) {
                if (resp.data === "success") {

                    //添加成功
                    //关闭窗口
                    _this.dialogVisible = false;

                    // 重新查询数据
                    _this.selectAll();
                    // 弹出消息提示
                    $('.box_correct1').show(400);

                    var aaa = 0
                    let a = setInterval(function () {
                        aaa++
                        if (aaa >= 3) {
                            aaa = 0
                            clearInterval(a)
                            $('.box_correct1').hide(400)
                        }
                    }, 1000)

                }
            })


        },

        //分页
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
            // 重新设置每页显示的条数
            this.pageSize = val;
            this.selectAll();
        },
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            // 重新设置当前页码
            this.currentPage = val;
            this.selectAll();
        },

        // 批量删除
        deleteByIds() {

            // 弹出确认提示框

            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //用户点击确认按钮

                //1. 创建id数组 [1,2,3], 从 this.multipleSelection 获取即可
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    let selectionElement = this.multipleSelection[i];
                    this.selectedIds[i] = selectionElement.id;

                }

                //2. 发送AJAX请求
                var _this = this;

                // 发送ajax请求，添加数据
                axios({
                    method: "post",
                    url: "http://localhost:8080/ECweb/deleteByIdsServlet",
                    data: _this.selectedIds
                }).then(function (resp) {
                    if (resp.data === "success") {
                        //删除成功

                        // 重新查询数据
                        _this.selectAll();
                        // 弹出消息提示
                        $('.box_correct').show(400);

                        var aaa = 0
                        let a = setInterval(function () {
                            aaa++
                            if (aaa >= 3) {
                                aaa = 0
                                clearInterval(a)
                                $('.box_correct').hide(400)
                            }
                        }, 1000)

                    }
                })
            }).catch(() => {
                //用户点击取消按钮

                // 右上弹窗警告动画
                var time_variables = 0

                $('.box_error_prompt').show(400)
                var a = setInterval(function () {
                    time_variables++
                    if (time_variables >= 3) {
                        time_variables = 0
                        clearInterval(a)
                        $('.box_error_prompt').hide(400)
                    }
                }, 1000)
            });
        }
    },
    data() {
        return {
            // 每页显示的条数
            pageSize: 5,
            // 总记录数
            totalCount: 100,
            // 当前页码
            currentPage: 1,
            // 添加数据对话框是否展示的标记
            dialogVisible: false,

            sessionUser: {
                userName: ''
            },
            // 品牌模型数据
            brand: {
                status: '',
                brandName: '',
                companyName: '',
                id: "",
                ordered: "",
                description: ""
            },
            // 被选中的id数组
            selectedIds: [],
            // 复选框选中数据集合
            multipleSelection: [],
            // 表格数据
            tableData: [{
                brandName: '华为',
                companyName: '华为科技有限公司',
                ordered: '100',
                status: "1"
            }, {
                brandName: '华为',
                companyName: '华为科技有限公司',
                ordered: '100',
                status: "1"
            }, {
                brandName: '华为',
                companyName: '华为科技有限公司',
                ordered: '100',
                status: "1"
            }, {
                brandName: '华为',
                companyName: '华为科技有限公司',
                ordered: '100',
                status: "1"
            },
                {
                    brandName: '华为',
                    companyName: '华为科技有限公司',
                    ordered: '100',
                    status: "1"
                }]
        }
    }
})