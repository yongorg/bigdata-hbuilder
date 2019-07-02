$(function() {
	var java_salary = null; // java平均工资
	var java_experience = null; // java_experience java工作經驗
	var java_count = null; // java全國數量
	$.ajax({
		url: "http://localhost:8080/province",
		data: {
			type: "bigdata"
		},
		async: false, //同步请求，   默认异步
		success: function(result) {

			for (var i = 0; i < result.avgByProvince.length; i++) {
				java_salary += result.avgByProvince[i];
				java_experience += result.experience[i];
				java_count += result.countByProvince[i];
			}
			java_salary = (java_salary / result.avgByProvince.length).toFixed(2);
			java_experience = (java_experience / result.avgByProvince.length).toFixed(2);
			$(".info-box-number").eq(0).text("￥" + java_salary); //  java全國平均薪資
			$(".info-box-number").eq(1).html(java_experience + " <small> Year</small>"); //  java工作經驗
			$(".info-box-number").eq(2).html(java_count); // java全國數量
		}

	})


})
