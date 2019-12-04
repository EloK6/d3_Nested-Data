const render = data => {
	let expensesByName = d3
		.nest()
		.key(d => d.name)
		.entries(data);
	console.log("Name", expensesByName);

	let expensesCount = d3
		.nest()
		.key(d => d.name)
		.rollup(v => v.length)
		.entries(data);
	console.log("Count", expensesCount);

	let expenseMetrics = d3
		.nest()
		.key(d => d.name)
		.rollup(v => {
			return {
				count: v.length,
				total: d3.sum(v, d => d.amount),
				avg: d3.mean(v, d => d.amount)
			};
		})
		.entries(data);
	console.log("Metrics", expenseMetrics);

	let expensesTotal = d3
		.nest()
		.key(d => d.name)
		.rollup(v => {
			return d3.sum(v, d => d.amount);
		})
		.object(data);
	console.log("Total", expensesTotal);

	let expensesTotalByDay = d3
		.nest()
		.key(d => d.name)
		.key(d => d.date)
		.rollup(v => {
			return d3.sum(v, d => d.amount);
		})
		.object(data);
	console.log("Total By Day", expensesTotalByDay);

	let expensesByYear = d3
		.nest()
		.key(d => {
			return d.date.split("/")[2];
		})
		.rollup(v => {
			return d3.sum(v, d => d.amount);
		})
		.object(data);
	console.log("Expenses By Year", expensesByYear);
};

const film = d3.csv("data.csv").then(data => {
	data.forEach(d => {
		d.amount = +d.amount;
	});
	// console.log(data);
	render(data);
});
