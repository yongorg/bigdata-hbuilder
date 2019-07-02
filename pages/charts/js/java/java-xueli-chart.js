var xueli_data = null;
$.ajax({
	url: "http://localhost:8080/education",
	data: {
		type: "java"
	},
	async: false, //同步请求，   默认异步
	success: function(result) {
		xueli_data = result;
	}
})

$(".info-box-number").eq(3).html((xueli_data[5][1].value + xueli_data[6][1].value + xueli_data[3][1].value).toFixed(2) +
	"%"); // java全國數量

// 基于准备好的dom，初始化echarts图表
var xueliChart = echarts.init(document.getElementById('xueliChart'));

var labelTop = {
	normal: {
		label: {
			show: true,
			position: 'center',
			formatter: '{b}',
			textStyle: {
				baseline: 'bottom'
			}
		},
		labelLine: {
			show: false
		}
	}
};
var labelFromatter = {
	normal: {
		label: {
			formatter: function(params) {
				return (100 - params.value).toFixed(2) + "%"
			},
			textStyle: {
				baseline: 'top',
				fontSize: 18
			}
		}
	},
}
var labelBottom = {
	normal: {
		color: '#ccc',
		label: {
			show: true,
			position: 'center'
		},
		labelLine: {
			show: false
		}
	},
	emphasis: {
		color: 'rgba(0,0,0,0)'
	}
};
var radius = [40, 55];
xueli_option = {
	color: ['#6dd8da', '#00c0ef', '#f00', '#58afed'],
	legend: {
		x: 'center',
		y: '20%',
		data: [
			'中专及以下', '大专', '本科', '硕士及以上'
		],
		textStyle: {
			fontSize: 20
		}
	},
	title: {
		text: 'Java岗位学历要求所占比例',
		subtext: 'bachelor degree or above',
		x: 'center'
	},
	toolbox: {
		show: true,
		feature: {
			dataView: {
				show: true,
				readOnly: false
			},
			magicType: {
				show: true,
				type: ['pie', 'funnel'],
				xueli_option: {
					funnel: {
						width: '20%',
						height: '30%',
						itemStyle: {
							normal: {
								label: {
									formatter: function(params) {
										return 'other\n' + params.value + '%\n'
									},
									textStyle: {
										baseline: 'middle',
										fontSize: 20
									}
								}
							},
						}
					}
				}
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
			type: 'pie',
			center: ['15%', '65%'],
			radius: ["30%", '45%'],
			x: '0%', // for funnel
			itemStyle: labelFromatter,
			data: [{
					name: 'other',
					value: 100 - (xueli_data[0][1].value + xueli_data[1][1].value + xueli_data[2][1].value + xueli_data[7][1].value),
					itemStyle: labelBottom
				},
				{
					name: '中专及以下',
					value: xueli_data[0][1].value + xueli_data[1][1].value + xueli_data[2][1].value + xueli_data[7][1].value,
					itemStyle: labelTop
				}
			]
		},



		{
			type: 'pie',
			center: ['38%', '65%'],
			radius: ["30%", '45%'],
			x: '80%', // for funnel
			itemStyle: labelFromatter,
			data: [{
					name: 'other',
					value: xueli_data[4][0].value,
					itemStyle: labelBottom
				},
				{
					name: '大专',
					value: xueli_data[4][1].value,
					itemStyle: labelTop
				}
			]
		},
		{
			type: 'pie',
			center: ['62%', '65%'],
			radius: ["30%", '45%'],
			y: '55%', // for funnel
			x: '0%', // for funnel
			itemStyle: labelFromatter,
			data: [{
					name: 'other',
					value: xueli_data[5][0].value,
					itemStyle: labelBottom
				},
				{
					name: '本科',
					value: xueli_data[5][1].value,
					itemStyle: labelTop
				}
			]
		},
		{
			type: 'pie',
			center: ['85%', '65%'],
			radius: ["30%", '45%'],
			y: '55%', // for funnel
			x: '20%', // for funnel
			itemStyle: labelFromatter,
			data: [{
					name: 'other',
					value: 100 - (xueli_data[6][1].value + xueli_data[3][1].value),
					itemStyle: labelBottom
				},
				{
					name: '硕士及以上',
					value: xueli_data[6][1].value + xueli_data[3][1].value,
					itemStyle: labelTop
				}
			]
		}
	]

};

// 为echarts对象加载数据 
xueliChart.setOption(xueli_option);
