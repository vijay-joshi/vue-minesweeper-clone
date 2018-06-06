new Vue({
	el: '#app',
	data: {
		gridSize: 16,
		numMines: 40,
		mineArr: [],
		renderGame: false
	},
	mounted () {
		console.time('logic');
		/*
		 - place random mines
		 - place numbers elsewhere
		*/
		let arr = Array.apply(null, {length: (this.gridSize * this.gridSize)}).map(Function.call, Number);
		// shuffle this array
		let shuffled = this.shuffleArray(arr);
		
		let map = [];
		let map2 = {};
		for (let i = 0, len = (this.gridSize * this.gridSize); i < len; i++) {
			let key = shuffled[i];
			map2[key] = { 
				location: key,
				mine: false,
				count: 0
			};
			if (i < this.numMines ) {
				map2[key].mine = true;
			}
		}
//				console.log(map2);
		this.updateNeighbours(map2);
		console.timeEnd('logic');
		this.mineArr = map2;
		this.renderGame = true;
	},
	methods: {
		leftClick (e, row, col) {
			console.log(e, ' - ' , row, ' - ' ,col);
			// let location = ((row-1) * this.gridSize) + (col-1);
		},
		rightClick (e, row, col) {
			console.log(e, ' - ' , row, ' - ' ,col);
			e.preventDefault();
		},
		updateNeighbours (map) {
			let gs = this.gridSize;
			for (let property in map) {
				// for each cell that is a mine, update the map with neighbour count
//						console.log(property, ' - ' ,map[property]);
				let location = map[property].location;
				if (map[property].mine) {
					//top row
					let index1 = location - (gs - 1);
					let index2 = location - (gs)
					let index3  = location - (gs +1);

					let index4 = location - 1;
					// e dont check
					let index6 = location + 1;

					let index7 = location + (gs - 1);
					let index8 = location + (gs);
					let index9 = location + (gs + 1);
					this.updateCount(map, index1);
					this.updateCount(map, index2);
					this.updateCount(map, index3);
					this.updateCount(map, index4);
					this.updateCount(map, index6);
					this.updateCount(map, index7);
					this.updateCount(map, index8);
					this.updateCount(map, index9);
				}
			}
//				console.table(map);
		},
		updateCount (map, index) {
			if (map[index] !== undefined) {
				map[index].count++;
			}
		},
		populateCell (row, col) {
			let location = ((row-1) * this.gridSize) + (col-1);
			if (this.mineArr[location].mine) {
				return '☀️';
			}
			return this.mineArr[location].count ? this.mineArr[location].count : '';
		},
		shuffleArray (array) {
		  let i = 0
			, j = 0
			, temp = null

		  for (i = array.length - 1; i > 0; i -= 1) {
			j = Math.floor(Math.random() * (i + 1))
			temp = array[i]
			array[i] = array[j]
			array[j] = temp
		  }
		  return array;
		}
	}
})
