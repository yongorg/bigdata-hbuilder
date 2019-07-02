window.onload = function() {

	var province = null; //省份数据
	var avgByProvince = null; //平均工资
	var experience = null; //平均工作年限
	var countByProvince = null; //岗位需求量
	$.ajax({
		url: "http://localhost:8080/province",
		data: {
			type: "java"
		},
		async: false, //同步请求，   默认异步
		success: function(result) {


			// console.log(result.province);
			province = result.province
			avgByProvince = result.avgByProvince;
			for (var i = 0; i < avgByProvince.length; i++) {
				avgByProvince[i] = avgByProvince[i].toFixed(2);
			}
			experience = result.experience;
			for (var i = 0; i < experience.length; i++) {
				experience[i] = experience[i].toFixed(2);
			}
			countByProvince = result.countByProvince;


		}
	})



	// 基于准备好的dom，初始化echarts实例
	var year_myChart = echarts.init(document.getElementById('main'));
	// 指定图表的配置项和数据
	var year_option = {
		backgroundColor: '#fff', //设置图标的背景颜色
		title: {
			text: '',
			subtext: '', //小标题
			subtextStyle: { //小标题颜色
				color: '#ff4536'
			},
			textStyle: { //标题颜色
				color: '#380c3c'
			}
		},
		xAxis: {
			type: 'category',
			splitLine: {
				show: false
			}, //去除x轴网格线
			splitArea: {
				show: false
			}, //去掉网格区域
			axisLine: { //设置x轴坐标线的样式
				lineStyle: {
					type: 'solid',
					color: '#161616', //x轴坐标线的颜色
					width: '1' //x轴坐标线的宽度
				}
			},
			axisLabel: { //x轴刻度数值颜色
				rotate: 10, //旋转x轴的文字
				interval: 0, //x轴每个项的距离  修改数据显示的个数
				textStyle: {
					color: '#1b1b1b'
				}
			},
			data: province //x轴数据项
		},
		yAxis: {
			type: 'value',
			splitArea: {
				show: false
			}, //去掉网格区域
			axisLine: { //设置y轴坐标线的样式
				lineStyle: {
					type: 'solid',
					color: '#161616', //y轴坐标线的颜色
					width: '1' //y轴坐标线的宽度
				}
			},
			axisLabel: { //y轴刻度数值颜色
				rotate: 10, //旋转y轴的文字
				interval: 0, //y轴每个项的距离  修改数据显示的个数
				textStyle: {
					color: '#1b1b1b'
				}
			},
		},
		toolbox: { //图形切换工具
			show: true,
			feature: {
				dataView: {
					show: true,
					readOnly: false
				},
				magicType: {
					show: true,
					type: ['line', 'bar']
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		legend: {
			data: ['岗位需求量', '工作年限', '平均工资'] //这里的值对应series的name
		},
		color: ['#f00', '#3CBDBC', '#ffa414'], //设置legend颜色
		grid: { //设置图标距离上下左右的距离 top一般默认
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		dataZoom: [ //放大缩小
			{
				type: 'inside'
			}
		],
		tooltip: { //鼠标移动到折线上 显示信息
			trigger: 'axis'
		},
		series: [ //显示的折线个量
			{
				name: '岗位需求量',
				type: 'bar',
				stack: 'java岗位需求量', //这里名字不要一样
				lineStyle: {
					normal: {
						color: '#f00',
						width: 3
					}
				},
				data: countByProvince
			},
			{
				name: '平均工资',
				type: 'line',
				// symbol:'none',  //去掉折线图每个节点的小圆点
				// smooth:'0.2',  //设置折线图的弧度 值：0-1之间
				stack: 'java平均工资',
				lineStyle: { //设置折线颜色
					normal: {
						color: '#3CBDBC',
						width: 3
					}
				},
				data: avgByProvince
			},
			{
				name: '工作年限',
				type: 'line',
				stack: 'java工作年限', //这里名字不要一样
				lineStyle: {
					normal: {
						color: '#30903f',
						width: 3
					}
				},
				data: experience
			},


		]
	};
	var zoomSize = 90; //放大缩小
	year_myChart.on('click', function(params) {
		// console.log(name[Math.max(params.dataIndex - zoomSize / 2, 0)]);
		year_myChart.dispatchAction({
			type: 'dataZoom',
		});
	});
	// 使用刚指定的配置项和数据显示图表。
	year_myChart.setOption(year_option);
}
