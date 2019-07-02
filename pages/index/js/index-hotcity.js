var dom = document.getElementById("container_1");
var myChart = echarts.init(dom);
var app = {};
option = null;
var source = [
	[]
];
$.ajax({
	url: "http://localhost:8080/all",
	async: false, //同步请求，   默认异步
	success: function(result) {
		source = result;
		for (var i = 1; i <= source.length; i++) {
			for (var j = 1; j < source[i].length; j++) {
				source[i][j] = source[i][j].toFixed(2);
			}
		}
	}
})
setTimeout(function() {

	option = {

		color: ['#6dd8da', '#f00', '#b6a2de', '#58afed'], //环形图每块的颜色
		legend: {},
		tooltip: {
			trigger: 'axis',
			showContent: false
		},
		dataset: {
			source: source
		},
		xAxis: {
			type: 'category'
		},
		yAxis: {
			gridIndex: 0
		},
		grid: {
			top: '45%'
		},
		series: [{
				type: 'line',
				smooth: 0.2, // 设置线条弧度
				seriesLayoutBy: 'row'
			},
			{
				type: 'line',
				smooth: 0.2, // 设置线条弧度
				seriesLayoutBy: 'row'
			},
			{
				type: 'line',
				smooth: 0.2, // 设置线条弧度
				seriesLayoutBy: 'row'
			},
			{
				type: 'line',
				smooth: 0.2, // 设置线条弧度
				seriesLayoutBy: 'row'
			},
			{
				type: 'pie',
				id: 'pie',
				// radius: '30%',
				radius: ['15%', '35%'],
				center: ['50%', '25%'], // 位置
				label: {
					formatter: '{b}: {@2012} ({d}%)'
				},
				encode: {
					itemName: 'city',
					value: '2012',
					tooltip: '2012'
				}
			}
		]
	};

	myChart.on('updateAxisPointer', function(event) {
		var xAxisInfo = event.axesInfo[0];
		if (xAxisInfo) {
			var dimension = xAxisInfo.value + 1;
			myChart.setOption({
				series: {
					id: 'pie',
					label: {
						formatter: '{b}: {@[' + dimension + ']}'
					},
					encode: {
						value: dimension,
						tooltip: dimension
					}
				}
			});
		}
	});

	myChart.setOption(option);

});;
if (option && typeof option === "object") {
	myChart.setOption(option, true);
}
