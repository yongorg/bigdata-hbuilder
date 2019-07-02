/**
 * 主页地图
 */


//////////////////////
// ajax 请求地图数据 //
//////////////////////
var java_map = null; // java 地图数据
var bigdata_map = null; // bigdata 地图数据
var cloud_map = null; // cloud 地图数据
var ui_map = null; // ui	地图数据

$.ajax({
	url: "http://localhost:8080/provinceMap",
	data: {
		type: "java"
	},
	async: false, //同步请求，   默认异步
	success: function(result) {
		java_map = result;
	}
})
$.ajax({
	url: "http://localhost:8080/provinceMap",
	data: {
		type: "bigdata"
	},
	async: false, //同步请求，   默认异步
	success: function(result) {
		bigdata_map = result;
	}
})
$.ajax({
	url: "http://localhost:8080/provinceMap",
	data: "cloud",
	data: {
		type: "cloud"
	},
	async: false, //同步请求，   默认异步
	success: function(result) {
		cloud_map = result;
	}
})
$.ajax({
	url: "http://localhost:8080/provinceMap",
	data: {
		type: "ui"
	},
	async: false, //同步请求，   默认异步
	success: function(result) {
		ui_map = result;
	}
})



var dom = document.getElementById("index-map-chart");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {

	title: {
		text: '热门岗位地域分析',
		subtext: '数据来源于前程无忧招聘网',
		left: 'center'
	},
	tooltip: {
		trigger: 'item'
	},
	legend: {
		orient: 'vertical',
		left: 'left',
		data: ['java', '大数据', '云计算', 'UI'],
		selected: {
			'大数据': false,
			'云计算': false,
			'UI': false
			//不想显示的都设置成false
		}
	},
	visualMap: {
		min: 0,
		max: 20000,
		left: 'left',
		top: 'bottom',
		text: ['高', '低'], // 文本，默认为数值文本
		calculable: true,
		// color: ["#f00",'#fff'],
		inRange: {
			color: ['lightskyblue', 'yellow', 'orangered']
		}

	},
	toolbox: {
		show: true,
		orient: 'vertical',
		left: 'right',
		top: 'center',
		feature: {
			mark: {
				show: true
			},
			dataView: {
				show: true,
				readOnly: false
			},
			restore: {
				show: true
			},
			saveAsImage: {
				show: true
			}
		}
	},
	series: [{
			name: 'java',
			type: 'map',
			mapType: 'china',
			roam: false,
			label: {
				normal: {
					show: false
				},
				emphasis: {
					show: true
				}
			},
			data: java_map
		},
		{
			name: '大数据',
			type: 'map',
			mapType: 'china',
			roam: false,
			label: {
				normal: {
					show: false
				},
				emphasis: {
					show: true
				}
			},
			data: bigdata_map
		},
		{
			name: '云计算',
			type: 'map',
			mapType: 'china',
			roam: false,
			label: {
				normal: {
					show: false
				},
				emphasis: {
					show: true
				}
			},
			data: cloud_map
		},
		{
			name: 'UI',
			type: 'map',
			mapType: 'china',
			roam: false,
			label: {
				normal: {
					show: false
				},
				emphasis: {
					show: true
				}
			},
			data: ui_map
		}
	]
};;

if (option && typeof option === "object") {
	myChart.setOption(option, true);
}
window.onresize=function(){
      myChart.resize();
}