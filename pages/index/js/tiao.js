var dom = document.getElementById("index-tiao-chart");
var myChart = echarts.init(dom);
var app = {};
option = null;
app.title = '岗位需求总量';

// ajax 数据
var java_count = null; // java岗位数量
var bigdata_count = null; // bigdata岗位数量
var cloud_count = null; // cloud岗位数量
var ui_count = null; // ui岗位数量
var data = [0, 1, 0, 0]; // 数据
// ajax获取java岗位数量 
$.ajax({
	url: "http://localhost:8080/province",
	data: {
		type: "java"
	},
	async: false, //同步请求，   默认异步
	success: function(result) {

		for (var i = 0; i < result.countByProvince.length; i++) {
			java_count += result.countByProvince[i];
		}
		data[0] = java_count;
	}

})
// bigdata_salary
$.ajax({
	url: "http://localhost:8080/province",
	data: {
		type: "bigdata"
	},
	async: false, //同步请求，   默认异步
	success: function(result) {

		for (var i = 0; i < result.countByProvince.length; i++) {
			bigdata_count += result.countByProvince[i];
		}
		data[1] = bigdata_count;
	}
})
// cloud_count
$.ajax({
	url: "http://localhost:8080/city",
	data: {
		type: "cloud"
	},
	async: false, //同步请求，   默认异步
	success: function(result) {

		for (var i = 0; i < result.countByCity.length; i++) {
			cloud_count += result.countByCity[i];
		}
		data[2] = cloud_count;
	}
})

// ui_count
$.ajax({
	url: "http://localhost:8080/province",
	data: {
		type: "ui"
	},
	async: false, //同步请求，   默认异步
	success: function(result) {

		for (var i = 0; i < result.countByProvince.length; i++) {
			ui_count += result.countByProvince[i];
		}
		data[3] = ui_count;
	}
})
// alert("java:"+java_count+"bigdata:"+bigdata_count+"cloud:"+cloud_count+"ui:"+ui_count);
// console.log(data);
// alert(data)


option = {
	title: {
		text: '全国岗位需求量', // 大标题
		subtext: '数据来源于前程无忧招聘网', // 小标题
		left: 'center' // 设置居中
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		data: ['全国岗位需求量']
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'value',
		boundaryGap: [0, 0.01],
		show: false
	},
	yAxis: {
		type: 'category',
		data: ['java', '大数据', '云计算', 'UI'],

	},
	series: [{
		type: 'bar',
		data: data,


		itemStyle: {
			//通常情况下：
			normal: {
				//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
				color: function(params) {
					var colorList = ['#65d186', '#f67287', '#f29e3c', '#c05bdd', '#7a65f2']; //每根柱子的颜色
					return colorList[params.dataIndex];
				}
			},
			//鼠标悬停时：
			emphasis: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
			}
		}
	}, ]
};;
if (option && typeof option === "object") {
	myChart.setOption(option, true);
}
