class SortingVisualizer {
    constructor() {
        this.canvas = document.getElementById('visualization-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.array = [];
        this.arraySize = 50;
        this.isAnimating = false;
        this.isPaused = false;
        this.animationSpeed = 100; // milliseconds
        this.currentAlgorithm = 'bubble';

        // Colors
        this.colors = {
            default: '#4299E1',
            comparing: '#F56565',
            sorted: '#48BB78',
            pivot: '#764BA2',
            background: '#FFFFFF'
        };

        // Algorithm information
        this.algorithmInfo = {
            bubble: {
                name: 'Bubble Sort',
                description: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)'
            },
            selection: {
                name: 'Selection Sort',
                description: 'Selection Sort finds the minimum element and places it at the beginning, then repeats for the remaining unsorted portion.',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)'
            },
            insertion: {
                name: 'Insertion Sort',
                description: 'Insertion Sort builds the sorted array one item at a time by inserting each element into its proper position.',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)'
            },
            merge: {
                name: 'Merge Sort',
                description: 'Merge Sort divides the array into halves, sorts them separately, then merges the sorted halves back together.',
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(n)'
            },
            quick: {
                name: 'Quick Sort',
                description: 'Quick Sort selects a pivot element and partitions the array around it, then recursively sorts the partitions.',
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(log n)'
            },
            heap: {
                name: 'Heap Sort',
                description: 'Heap Sort builds a max heap from the array, then repeatedly extracts the maximum element to build the sorted array.',
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(1)'
            }
        };

        this.initializeCanvas();
        this.generateArray();
        this.setupEventListeners();
        this.updateAlgorithmInfo();
    }

    initializeCanvas() {
        // Set canvas size
        this.canvas.width = 1000;
        this.canvas.height = 400;

        // Set canvas style for responsiveness
        this.canvas.style.width = '100%';
        this.canvas.style.height = 'auto';
        this.canvas.style.maxWidth = '1000px';
    }

    setupEventListeners() {
        // Algorithm selection
        document.getElementById('algorithm-select').addEventListener('change', (e) => {
            this.currentAlgorithm = e.target.value;
            this.updateAlgorithmInfo();
        });

        // Array size control
        const arraySizeSlider = document.getElementById('array-size');
        const sizeDisplay = document.getElementById('size-display');
        arraySizeSlider.addEventListener('input', (e) => {
            this.arraySize = parseInt(e.target.value);
            sizeDisplay.textContent = this.arraySize;
            if (!this.isAnimating) {
                this.generateArray();
            }
        });

        // Speed control
        const speedSlider = document.getElementById('speed-control');
        const speedDisplay = document.getElementById('speed-display');
        speedSlider.addEventListener('input', (e) => {
            const speed = parseInt(e.target.value);
            speedDisplay.textContent = speed;
            this.animationSpeed = 201 - (speed * 20); // Invert for intuitive control
        });

        // Control buttons
        document.getElementById('generate-btn').addEventListener('click', () => {
            if (!this.isAnimating) {
                this.generateArray();
            }
        });

        document.getElementById('start-btn').addEventListener('click', () => {
            this.startSorting();
        });

        document.getElementById('pause-btn').addEventListener('click', () => {
            this.pauseSorting();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetVisualization();
        });
    }

    generateArray() {
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push({
                value: Math.floor(Math.random() * 350) + 10,
                state: 'default'
            });
        }
        this.drawArray();
        this.updateStatus('Ready');
    }

    drawArray() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const barWidth = (this.canvas.width - 40) / this.arraySize;
        const maxHeight = this.canvas.height - 40;

        for (let i = 0; i < this.array.length; i++) {
            const bar = this.array[i];
            const barHeight = (bar.value / 360) * maxHeight;
            const x = 20 + i * barWidth;
            const y = this.canvas.height - 20 - barHeight;

            // Set color based on state
            let color = this.colors.default;
            switch (bar.state) {
                case 'comparing':
                    color = this.colors.comparing;
                    break;
                case 'sorted':
                    color = this.colors.sorted;
                    break;
                case 'pivot':
                    color = this.colors.pivot;
                    break;
            }

            // Draw bar
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, barWidth - 2, barHeight);

            // Add subtle border
            this.ctx.strokeStyle = '#E2E8F0';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(x, y, barWidth - 2, barHeight);
        }
    }

    async startSorting() {
        if (this.isAnimating && this.isPaused) {
            this.isPaused = false;
            this.updateButtons();
            return;
        }

        this.isAnimating = true;
        this.isPaused = false;
        this.updateButtons();
        this.updateStatus('Sorting...');

        // Reset array states
        this.array.forEach(bar => bar.state = 'default');

        try {
            switch (this.currentAlgorithm) {
                case 'bubble':
                    await this.bubbleSort();
                    break;
                case 'selection':
                    await this.selectionSort();
                    break;
                case 'insertion':
                    await this.insertionSort();
                    break;
                case 'merge':
                    await this.mergeSort(0, this.array.length - 1);
                    break;
                case 'quick':
                    await this.quickSort(0, this.array.length - 1);
                    break;
                case 'heap':
                    await this.heapSort();
                    break;
            }

            // Mark all as sorted
            this.array.forEach(bar => bar.state = 'sorted');
            this.drawArray();
            this.updateStatus('Completed!');

        } catch (error) {
            if (error.message !== 'Paused') {
                console.error('Sorting error:', error);
                this.updateStatus('Error occurred');
            }
        }

        this.isAnimating = false;
        this.updateButtons();
    }

    pauseSorting() {
        this.isPaused = true;
        this.updateStatus('Paused');
        this.updateButtons();
    }

    resetVisualization() {
        this.isAnimating = false;
        this.isPaused = false;
        this.generateArray();
        this.updateButtons();
    }

    async delay() {
        if (this.isPaused) {
            throw new Error('Paused');
        }
        return new Promise(resolve => setTimeout(resolve, this.animationSpeed));
    }

    async swap(i, j) {
        // Highlight elements being swapped
        this.array[i].state = 'comparing';
        this.array[j].state = 'comparing';
        this.drawArray();
        await this.delay();

        // Perform swap
        const temp = this.array[i].value;
        this.array[i].value = this.array[j].value;
        this.array[j].value = temp;

        // Reset states
        this.array[i].state = 'default';
        this.array[j].state = 'default';
        this.drawArray();
        await this.delay();
    }

    // Sorting Algorithms
    async bubbleSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (this.array[j].value > this.array[j + 1].value) {
                    await this.swap(j, j + 1);
                }
            }
            // Mark the last element as sorted
            this.array[n - 1 - i].state = 'sorted';
        }
    }

    async selectionSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;

            // Find minimum element
            for (let j = i + 1; j < n; j++) {
                this.array[j].state = 'comparing';
                this.array[minIdx].state = 'comparing';
                this.drawArray();
                await this.delay();

                if (this.array[j].value < this.array[minIdx].value) {
                    this.array[minIdx].state = 'default';
                    minIdx = j;
                } else {
                    this.array[j].state = 'default';
                }
            }

            // Swap if needed
            if (minIdx !== i) {
                this.array[minIdx].state = 'default';
                await this.swap(i, minIdx);
            }

            // Mark as sorted
            this.array[i].state = 'sorted';
        }
    }

    async insertionSort() {
        for (let i = 1; i < this.array.length; i++) {
            let key = this.array[i].value;
            let j = i - 1;

            this.array[i].state = 'comparing';
            this.drawArray();
            await this.delay();

            while (j >= 0 && this.array[j].value > key) {
                this.array[j].state = 'comparing';
                this.drawArray();
                await this.delay();

                this.array[j + 1].value = this.array[j].value;
                this.array[j].state = 'default';
                j--;

                this.drawArray();
                await this.delay();
            }

            this.array[j + 1].value = key;
            this.array[i].state = 'default';
        }
    }

    async mergeSort(left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);

            await this.mergeSort(left, mid);
            await this.mergeSort(mid + 1, right);
            await this.merge(left, mid, right);
        }
    }

    async merge(left, mid, right) {
        const leftArr = [];
        const rightArr = [];

        // Copy data to temp arrays
        for (let i = left; i <= mid; i++) {
            leftArr.push(this.array[i].value);
        }
        for (let i = mid + 1; i <= right; i++) {
            rightArr.push(this.array[i].value);
        }

        let i = 0, j = 0, k = left;

        // Merge the temp arrays back
        while (i < leftArr.length && j < rightArr.length) {
            this.array[k].state = 'comparing';
            this.drawArray();
            await this.delay();

            if (leftArr[i] <= rightArr[j]) {
                this.array[k].value = leftArr[i];
                i++;
            } else {
                this.array[k].value = rightArr[j];
                j++;
            }

            this.array[k].state = 'default';
            k++;
        }

        // Copy remaining elements
        while (i < leftArr.length) {
            this.array[k].value = leftArr[i];
            i++;
            k++;
        }
        while (j < rightArr.length) {
            this.array[k].value = rightArr[j];
            j++;
            k++;
        }

        this.drawArray();
        await this.delay();
    }

    async quickSort(low, high) {
        if (low < high) {
            const pi = await this.partition(low, high);
            await this.quickSort(low, pi - 1);
            await this.quickSort(pi + 1, high);
        }
    }

    async partition(low, high) {
        const pivot = this.array[high].value;
        this.array[high].state = 'pivot';
        let i = low - 1;

        for (let j = low; j < high; j++) {
            this.array[j].state = 'comparing';
            this.drawArray();
            await this.delay();

            if (this.array[j].value < pivot) {
                i++;
                if (i !== j) {
                    await this.swap(i, j);
                }
            } else {
                this.array[j].state = 'default';
            }
        }

        this.array[high].state = 'default';
        if (i + 1 !== high) {
            await this.swap(i + 1, high);
        }

        return i + 1;
    }

    async heapSort() {
        const n = this.array.length;

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await this.heapify(n, i);
        }

        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            await this.swap(0, i);
            this.array[i].state = 'sorted';
            await this.heapify(i, 0);
        }
    }

    async heapify(n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n) {
            this.array[left].state = 'comparing';
            this.drawArray();
            await this.delay();

            if (this.array[left].value > this.array[largest].value) {
                largest = left;
            }
            this.array[left].state = 'default';
        }

        if (right < n) {
            this.array[right].state = 'comparing';
            this.drawArray();
            await this.delay();

            if (this.array[right].value > this.array[largest].value) {
                largest = right;
            }
            this.array[right].state = 'default';
        }

        if (largest !== i) {
            await this.swap(i, largest);
            await this.heapify(n, largest);
        }
    }

    updateAlgorithmInfo() {
        const info = this.algorithmInfo[this.currentAlgorithm];
        document.getElementById('algorithm-name').textContent = info.name;
        document.getElementById('algorithm-info').textContent = info.description;
        document.getElementById('time-complexity').textContent = info.timeComplexity;
        document.getElementById('space-complexity').textContent = info.spaceComplexity;
    }

    updateStatus(status) {
        document.getElementById('status').textContent = status;
    }

    updateButtons() {
        const startBtn = document.getElementById('start-btn');
        const pauseBtn = document.getElementById('pause-btn');
        const generateBtn = document.getElementById('generate-btn');
        const resetBtn = document.getElementById('reset-btn');

        if (this.isAnimating && !this.isPaused) {
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            generateBtn.disabled = true;
            startBtn.textContent = 'Start Sorting';
        } else if (this.isAnimating && this.isPaused) {
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            generateBtn.disabled = true;
            startBtn.textContent = 'Resume';
        } else {
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            generateBtn.disabled = false;
            startBtn.textContent = 'Start Sorting';
        }
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const visualizer = new SortingVisualizer();

    // Handle window resize
    window.addEventListener('resize', () => {
        visualizer.drawArray();
    });
});