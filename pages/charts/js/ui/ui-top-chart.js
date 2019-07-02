var city_data = null; //城市数据
var avgByCity = null; //平均工资
var experience = null; //平均工作年限
var countByCity = null; //岗位数量
$.ajax({
	url: "http://localhost:8080/city",
	data: {
		type: "ui"
	},
	async: false, //同步请求，   默认异步
	success: function(result) {
		console.log(result.avgByCity)
		city_data = result.city;
		avgByCity = result.avgByCity;
		experience = result.experience;
		for (var i = 0; i < avgByCity.length; i++) {
			avgByCity[i] = avgByCity[i].toFixed(2);
		}


		for (var i = 0; i < experience.length; i++) {
			experience[i] = experience[i].toFixed(2);
		}
		countByCity = result.countByCity;
	}
})



var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var app = {};
option = null;
var dataAxis = city_data;
var data = avgByCity;
var yMax = 500;
var dataShadow = [];

for (var i = 0; i < data.length; i++) {
	dataShadow.push(yMax);
}

option = {
	title: {
		text: '',
		subtext: ''
	},
	xAxis: {
		data: city_data,
		axisLabel: {
			inside: true,
			textStyle: {
				color: '#fff'
			}
		},
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		z: 10
	},
	yAxis: {
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLabel: {
			textStyle: {
				color: '#999'
			}
		}
	},
	dataZoom: [ // 缩放
		{
			type: 'inside',
			start: 30, //数据窗口范围的起始百分比,表示30% 
			end: 35, //数据窗口范围的结束百分比,表示70% 
			// 　　					  startValue:10, //数据窗口范围的起始数值 
			//  　　  				  endValue:100, //数据窗口范围的结束数值。
		}
	],

	tooltip: { //鼠标移动到折线上 显示信息
		trigger: 'axis'
	},
	series: [{ // For shadow
			type: 'bar',
			itemStyle: {
				normal: {
					color: 'rgba(0,0,0,0.05)'
				}
			},
			barGap: '-100%',
			barCategoryGap: '40%',
			// data: dataShadow,
			animation: false
		},
		{
			type: 'bar',
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1,
						[{
								offset: 0,
								color: '#f00'
							},
							{
								offset: 0.5,
								color: '#f50'
							},
							{
								offset: 1,
								color: '#f60'
							}
						]
					)
				},
				emphasis: {
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1,
						[{
								offset: 0,
								color: '#f00'
							},
							{
								offset: 0.7,
								color: '#f00'
							},
							{
								offset: 1,
								color: '#f60'
							}
						]
					)
				}
			},
			data: data
		}
	]
};

// Enable data zoom when user click bar.
var zoomSize = 6;
myChart.on('click', function(params) {
	// console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
	myChart.dispatchAction({
		type: 'dataZoom',
		startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 20, 0)],
		endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
	});
});;
if (option && typeof option === "object") {
	myChart.setOption(option, true);
}
