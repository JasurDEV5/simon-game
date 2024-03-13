new Vue({
	el: '#app',
	data: {
		buttons: [0, 1, 2, 3], // Add more buttons if needed
		sequence: [],
		playerSequence: [],
		level: 1,
		isPlaying: false,
		difficulty: '',
		timeouts: [],
	},
	methods: {
		startGame(difficulty) {
			this.difficulty = difficulty
			this.level = 1
			this.playSequence()
		},
		playSequence() {
			this.isPlaying = true
			this.playerSequence = []
			this.sequence = this.generateSequence()
			this.showSequence()
		},
		generateSequence() {
			const sequence = []
			for (let i = 0; i < this.level; i++) {
				sequence.push(Math.floor(Math.random() * this.buttons.length))
			}
			return sequence
		},
		showSequence() {
			this.sequence.forEach((buttonIndex, index) => {
				const timeout = setTimeout(() => {
					this.activateButton(buttonIndex)
					if (index === this.sequence.length - 1) {
						setTimeout(() => {
							this.deactivateButtons()
						}, 500) // Adjust the delay between sequence items
					}
				}, index * this.getDifficultyDelay())
				this.timeouts.push(timeout)
			})
		},
		activateButton(index) {
			// Implement logic to visually activate the button (e.g., change color)
			console.log(`Activate button ${index}`)
		},
		deactivateButtons() {
			// Implement logic to visually deactivate all buttons
			console.log('Deactivate buttons')
		},
		getDifficultyDelay() {
			switch (this.difficulty) {
				case 'easy':
					return 1500 // 1.5 seconds
				case 'normal':
					return 1000 // 1 second
				case 'hard':
					return 400 // 0.4 seconds
				default:
					return 1000 // Default to normal difficulty
			}
		},
		isActive(index) {
			return this.playerSequence.includes(index)
		},
		handleButtonClick(index) {
			if (this.isPlaying) {
				this.playerSequence.push(index)
				this.activateButton(index)
				if (this.playerSequence.length === this.sequence.length) {
					this.checkSequence()
				}
			}
		},
		checkSequence() {
			const isCorrect = this.playerSequence.every(
				(value, index) => value === this.sequence[index]
			)
			if (isCorrect) {
				this.level++
				this.playSequence()
			} else {
				this.endGame()
			}
		},
		endGame() {
			alert('Game Over! Your score: ' + (this.level - 1))
			this.level = 1
			this.isPlaying = false
			this.clearTimeouts()
		},
		clearTimeouts() {
			this.timeouts.forEach(timeout => clearTimeout(timeout))
			this.timeouts = []
		},
	},
})
