$(function() {
	var java_salary = null; // java平均工资
	var cloud_salary = null; // java平均工资
	var bigdata_salary = null; // java平均工资
	var ui_salary = null; // java平均工资
	var avgByProvince = null;
	// java平均工资
	$.ajax({
		url: "http://localhost:8080/province",
		// type:"POST",
		data: {
			type: "java"
		},
		async: false, //同步请求，   默认异步
		success: function(result) {

			for (var i = 0; i < result.avgByProvince.length; i++) {
				java_salary += result.avgByProvince[i];
			}
			java_salary = (java_salary / result.avgByProvince.length).toFixed(2);
		}

	})
	// cloud_salary
	$.ajax({
		url: "http://localhost:8080/province",
		// type:"POST",
		data: {
			type: "cloud"
		},
		async: false, //同步请求，   默认异步
		success: function(result) {


			for (var i = 0; i < result.avgByProvince.length; i++) {
				cloud_salary += result.avgByProvince[i];
			}
			cloud_salary = (cloud_salary / result.avgByProvince.length).toFixed(2);
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

			for (var i = 0; i < result.avgByProvince.length; i++) {
				bigdata_salary += result.avgByProvince[i];
			}
			bigdata_salary = (bigdata_salary / result.avgByProvince.length).toFixed(2);
		}
	})
	// ui_salary
	$.ajax({
		url: "http://localhost:8080/province",
		data: {
			type: "ui"
		},
		async: false, //同步请求，   默认异步
		success: function(result) {

			for (var i = 0; i < result.avgByProvince.length; i++) {
				ui_salary += result.avgByProvince[i];
			}
			ui_salary = (ui_salary / result.avgByProvince.length).toFixed(2);
		}
	})
	// alert("java:"+java_salary+"bigdata:"+bigdata_salary+"cloud:"+cloud_salary+"ui:"+ui_salary);

	console.log($(".small-box .inner h3").eq(0).text())

	$(".small-box .inner h3").eq(0).text("￥" + java_salary);
	$(".small-box .inner h3").eq(1).text("￥" + bigdata_salary);
	$(".small-box .inner h3").eq(2).text("￥" + cloud_salary);
	$(".small-box .inner h3").eq(3).text("￥" + ui_salary);
});
