var province = null; //省份数据
		var avgByProvince = null; //平均工资
		var experience = null; //平均工作年限
		var countByProvince = null; //岗位需求量
		var mapData = null;
		// 		$.ajax({
		// 			url:"http://localhost:8080/java/map",
		// 			
		// 			async:false, //同步请求，   默认异步
		// 			success:function(result){
		// 				
		// 				mapData = result;
		// 				console.log(result);
		// 				
		// 			}	
		// 		})

		var mapChart = echarts.init(document.getElementById('china-map'));
		var oBack = document.getElementById("back");

		var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu',
			'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan',
			'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing',
			'tianjin', 'chongqing', 'xianggang', 'aomen'
		];

		var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南',
			'广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'
		];

		oBack.onclick = function() {
			initEcharts("china", "中国");
		};

		initEcharts("china", "中国");

		// 初始化echarts
		function initEcharts(pName, Chinese_) {
			var seriesData_count = null; // 岗位数量
			var seriesData_salary = null; // 平均工资
			var seriesData_year = null; // 工作年限
			if (pName == "china") {
				$.ajax({
					url: "http://localhost:8080/provinceMap",
					data: {
						type: "cloud"
					},
					async: false, //同步请求，   默认异步
					success: function(result) {
						seriesData_count = result;

					}
				})
				$.ajax({
					url: "http://localhost:8080/provinceAvgSalaryMap",
					data: {
						type: "cloud"
					},
					async: false, //同步请求，   默认异步
					success: function(result) {
						// 格式化數據
						for (var i = 0; i < result.length; i++) {
							result[i].value = result[i].value.toFixed(2)
						}
						seriesData_salary = result;

					}
				})
				$.ajax({
					url: "http://localhost:8080/provinceAvgExperienceMap",

					data: {
						type: "cloud"
					},
					async: false, //同步请求，   默认异步
					success: function(result) {
						// 格式化數據
						for (var i = 0; i < result.length; i++) {
							result[i].value = result[i].value.toFixed(2)
						}
						seriesData_year = result;

					}
				})

			} else {
				$.ajax({
					url: "http://localhost:8080/cityMap",

					data: {
						type: "cloud"
					},
					async: false, //同步请求，   默认异步

					success: function(result) {
						for (var i = 0; i < result.length; i++) {
							result[i].name += "市"
						}
						seriesData_count = result;
					}
				})
				$.ajax({
					url: "http://localhost:8080/cityAvgSalaryMap",

					data: {
						type: "cloud"
					},
					async: false, //同步请求，   默认异步
					success: function(result) {
						// 格式化數據
						for (var i = 0; i < result.length; i++) {
							result[i].name += "市";
							result[i].value = result[i].value.toFixed(2);
						}
						seriesData_salary = result;

					}
				})
				$.ajax({
					url: "http://localhost:8080/cityAvgExperienceMap",
					data: {
						type: "cloud"
					},
					async: false, //同步请求，   默认异步
					success: function(result) {
						// 格式化數據
						for (var i = 0; i < result.length; i++) {
							result[i].name += "市"
							result[i].value = result[i].value.toFixed(2)
						}
						seriesData_year = result;

					}
				})
			}



			var option = {
				title: {
					text: Chinese_ || pName,
					left: 'center'
				},
				visualMap: {
					min: 7500,
					max: 18000,
					left: 'left',
					top: 'bottom',
					text: ['高', '低'], // 文本，默认为数值文本
					calculable: true,
					// color: ["#f00",'#fff'],
					inRange: {
						color: ['lightskyblue', 'yellow', 'orangered']
					}

				},
				tooltip: {
					trigger: 'item',
					formatter: function(params) {
						//定义一个res变量来保存最终返回的字符结果,并且先把地区名称放到里面
						var res = params.name + '<br />';
						//定义一个变量来保存series数据系列
						var myseries = option.series;
						//循环遍历series数据系列
						//在内部继续循环series[i],从data中判断：当地区名称等于params.name的时候就将当前数据和名称添加到res中供显示
						for (var k = 0; k < myseries[0].data.length; k++) {
							//console.log(myseries[i].data[k].name);
							//如果data数据中的name和地区名称一样
							if (myseries[0].data[k].name == params.name) {
								//将series数据系列每一项中的name和数据系列中当前地区的数据添加到res中
								res += "岗位数量" + ':' + myseries[0].data[k].value + '<br />';
							}
						}
						for (var k = 0; k < myseries[1].data.length; k++) {
							//console.log(myseries[i].data[k].name);
							//如果data数据中的name和地区名称一样
							if (myseries[1].data[k].name == params.name) {
								//将series数据系列每一项中的name和数据系列中当前地区的数据添加到res中
								res += "平均工资" + ':' + myseries[1].data[k].value + '<br />';
							}
						}
						for (var k = 0; k < myseries[2].data.length; k++) {
							//console.log(myseries[i].data[k].name);
							//如果data数据中的name和地区名称一样
							if (myseries[2].data[k].name == params.name) {
								//将series数据系列每一项中的name和数据系列中当前地区的数据添加到res中
								res += "平均工作年限" + ':' + myseries[2].data[k].value + '<br />';
							}
						}
						return res;
					}
				},


				series: [{
						name: Chinese_ || pName,
						type: 'map',
						mapType: pName,
						roam: false, //是否开启鼠标缩放和平移漫游
						data: seriesData_count,
						top: "3%", //组件距离容器的距离
						zoom: 1.1,
						selectedMode: 'single',

						label: {
							normal: {
								show: true, //显示省份标签
								textStyle: {
									color: "#fbfdfe"
								} //省份标签字体颜色
							},
							emphasis: { //对应的鼠标悬浮效果
								show: true,
								textStyle: {
									color: "#323232"
								}
							}
						},
						itemStyle: {
							normal: {
								borderWidth: .5, //区域边框宽度
								borderColor: '#0550c3', //区域边框颜色
								areaColor: "#00c0ef", //区域颜色

							},

							emphasis: {
								borderWidth: .5,
								borderColor: '#4b0082',
								areaColor: "#ece39e",
							}
						},
					},

					{
						name: Chinese_ || pName,
						type: 'map',
						mapType: pName,
						roam: false, //是否开启鼠标缩放和平移漫游
						data: seriesData_salary,
						top: "3%", //组件距离容器的距离
						zoom: 1.1,
						selectedMode: 'single',

						label: {
							normal: {
								show: true, //显示省份标签
								textStyle: {
									color: "#fbfdfe"
								} //省份标签字体颜色
							},
							emphasis: { //对应的鼠标悬浮效果
								show: true,
								textStyle: {
									color: "#323232"
								}
							}
						},
						itemStyle: {
							normal: {
								borderWidth: .5, //区域边框宽度
								borderColor: '#0550c3', //区域边框颜色
								areaColor: "#4ea397", //区域颜色

							},

							emphasis: {
								borderWidth: .5,
								borderColor: '#4b0082',
								areaColor: "#ece39e",
							}
						},
					},
					{
						name: Chinese_ || pName,
						type: 'map',
						mapType: pName,
						roam: false, //是否开启鼠标缩放和平移漫游
						data: seriesData_year,
						top: "3%", //组件距离容器的距离
						zoom: 1.1,
						selectedMode: 'single',

						label: {
							normal: {
								show: true, //显示省份标签
								textStyle: {
									color: "#fbfdfe"
								} //省份标签字体颜色
							},
							emphasis: { //对应的鼠标悬浮效果
								show: true,
								textStyle: {
									color: "#323232"
								}
							}
						},
						itemStyle: {
							normal: {
								borderWidth: .5, //区域边框宽度
								borderColor: '#0550c3', //区域边框颜色
								areaColor: "#4ea397", //区域颜色

							},

							emphasis: {
								borderWidth: .5,
								borderColor: '#4b0082',
								areaColor: "#ece39e",
							}
						},
					}
				]

			};

			mapChart.setOption(option);

			mapChart.off("click");

			if (pName === "china") { // 全国时，添加click 进入省级
				mapChart.on('click', function(param) {
					console.log(param.name);
					// 遍历取到provincesText 中的下标  去拿到对应的省js
					for (var i = 0; i < provincesText.length; i++) {
						if (param.name === provincesText[i]) {
							//显示对应省份的方法
							showProvince(provinces[i], provincesText[i]);
							break;
						}
					}
					if (param.componentType === 'series') {
						var provinceName = param.name;
						$('#box').css('display', 'block');
						$("#box-title").html(provinceName);

					}
				});
			} else { // 省份，添加双击 回退到全国
				mapChart.on("dblclick", function() {
					initEcharts("china", "中国");
				});
			}
		}

		// 展示对应的省
		function showProvince(pName, Chinese_) {
			//这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
			loadBdScript('$' + pName + 'JS', './js/map/province/' + pName + '.js', function() {
				initEcharts(Chinese_);
			});
		}

		// 加载对应的JS
		function loadBdScript(scriptId, url, callback) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			if (script.readyState) { //IE
				script.onreadystatechange = function() {
					if (script.readyState === "loaded" || script.readyState === "complete") {
						script.onreadystatechange = null;
						callback();
					}
				};
			} else { // Others
				script.onload = function() {
					callback();
				};
			}
			script.src = url;
			script.id = scriptId;
			document.getElementsByTagName("head")[0].appendChild(script);
		};
