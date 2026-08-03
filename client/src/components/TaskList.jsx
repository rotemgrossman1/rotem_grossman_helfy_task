import React, { useState, useEffect, useRef } from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

const API_URL = 'http://localhost:4000/api/tasks';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  
  const carouselRef = useRef(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Center scrollbar initially
  useEffect(() => {
    if (tasks.length > 0 && carouselRef.current) {
      const container = carouselRef.current;
      container.scrollLeft = container.scrollWidth / 3;
    }
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Infinite Seamless Reset
  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container || tasks.length === 0) return;

    const singleSetWidth = container.scrollWidth / 3;

    if (container.scrollLeft <= 10) {
      container.scrollLeft += singleSetWidth;
    } else if (container.scrollLeft >= singleSetWidth * 2 - 10) {
      container.scrollLeft -= singleSetWidth;
    }
  };

  // PC Mouse Drag Handlers
  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeftState(carouselRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity multiplier
    carouselRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Button Navigation
  const scrollByAmount = (distance) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  if (loading) return <div className="loading-state">Loading tasks...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;

  const displayTasks = [...tasks, ...tasks, ...tasks];

  return (
    <div className="task-list-page">
      <h2 className="page-title">Infinite Task Carousel</h2>

      <div className="carousel-container">
        {/* Previous Button */}
        <button className="nav-btn prev" onClick={() => scrollByAmount(-300)}>
          &#10094;
        </button>

        {/* Scrollable Track */}
        <div 
          className={`carousel-wrapper ${isMouseDown ? 'active' : ''}`}
          ref={carouselRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
        >
          <div className="carousel-track">
            {displayTasks.map((task, index) => (
              <TaskItem key={`${task.id}-${index}`} task={task} />
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button className="nav-btn next" onClick={() => scrollByAmount(300)}>
          &#10095;
        </button>
      </div>
    </div>
  );
}