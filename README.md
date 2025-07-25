# Sorting Algorithm Visualizer

An interactive web-based educational tool that provides real-time visualization of various sorting algorithms through animated bar charts. Perfect for anyone interested in understanding how different sorting algorithms work.

## 🚀 Live Demo

[View Live Demo](https://soumyadip204.github.io/sorting-visualizer/)

## ✨ Features

### 🎯 Core Functionality
- **6 Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, and Heap Sort
- **Interactive Controls**: Start, pause, reset, and speed adjustment
- **Real-time Animation**: Step-by-step visualization with smooth transitions
- **Customizable Array**: Adjustable size (10-100 elements) and random generation

### 🎨 Visual Learning
- **Color-coded States**: 
  - ⚪ White: Unsorted elements
  - 🔴 Red: Elements being compared/processed
  - 🟢 Green: Sorted elements
  - 🟣 Violet: Pivot elements (Quick Sort)
- **Educational Information**: Algorithm descriptions, time complexity, and space complexity
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🎛️ User Controls
- **Algorithm Selection**: Dropdown menu to choose sorting algorithm
- **Array Size Control**: Slider to adjust number of elements (10-100)
- **Speed Control**: Animation speed adjustment (1-10 scale)
- **Playback Controls**: Start, pause, reset, and generate new array

## 🛠️ Technologies Used

- **HTML5**: Structure and Canvas element for visualization
- **CSS3**: Modern styling with Grid layout and responsive design
- **JavaScript**: Algorithm implementation and animation logic
- **Google Fonts**: Source Code Pro for technical aesthetic

## 🏗️ Architecture

### Core Components
- **SortingVisualizer Class**: Main application controller
- **Canvas Rendering**: HTML5 Canvas for smooth animations
- **Algorithm Implementations**: Individual sorting algorithm methods
- **State Management**: Handles animation states and user interactions

### Design Patterns
- **Object-Oriented**: ES6 class-based architecture
- **Async/Await**: Non-blocking animation sequences
- **State Machine**: Color-coded visual states
- **Observer Pattern**: UI updates based on algorithm state

## 🚀 Quick Start

### Modern web browser (Chrome, Firefox, Safari, Edge)

## 📚 Supported Algorithms

### 1. **Bubble Sort**
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Description**: Repeatedly compares adjacent elements and swaps them if in wrong order

### 2. **Selection Sort**
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Description**: Finds minimum element and places it at the beginning, repeats for remaining elements

### 3. **Insertion Sort**
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Description**: Builds sorted array one element at a time by inserting each element into proper position

### 4. **Merge Sort**
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)
- **Description**: Divides array into halves, sorts them separately, then merges sorted halves

### 5. **Quick Sort**
- **Time Complexity**: O(n log n) average, O(n²) worst
- **Space Complexity**: O(log n)
- **Description**: Selects pivot element, partitions array around it, recursively sorts partitions

### 6. **Heap Sort**
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(1)
- **Description**: Builds max heap, repeatedly extracts maximum element to build sorted array

## 🎨 Color Coding System

The visualizer uses a consistent color scheme to help users understand algorithm behavior:

| Color | State | Description |
|-------|--------|-------------|
| ⚪ White | Default | Unsorted elements in normal state |
| 🔴 Red | Comparing | Elements currently being compared or processed |
| 🟢 Green | Sorted | Elements in their final sorted position |
| 🟣 Violet | Pivot | Pivot element in Quick Sort algorithm |

## 🎛️ Controls Guide

### Algorithm Selection
- Use the dropdown menu to select any of the 6 sorting algorithms
- Algorithm information updates automatically with complexity details

### Array Customization
- **Size Slider**: Adjust array size from 10 to 100 elements
- **New Array Button**: Create new random array with current size setting

### Animation Controls
- **Start Button**: Begin sorting animation (changes to "Resume" when paused)
- **Pause Button**: Pause animation at any point
- **Reset Button**: Stop animation and generate new array
- **Speed Slider**: Control animation speed from slow (1) to fast (10)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Ideas
- Add new sorting algorithms (Radix Sort, Counting Sort, etc.)
- Implement different pivot selection strategies for Quick Sort
- Add sound effects for better user experience
- Improve mobile responsiveness
- Add algorithm step counter
- Implement array input functionality

## 🙏 Acknowledgments

- Inspired by algorithm visualization platforms
- Built with educational purpose in mind
- Thanks to the open-source community for inspiration and resources

## 📞 Contact

- **Email**: sahasoumyadip1802@gmail.com

⭐ If you found this project helpful, please consider giving it a star on GitHub!
