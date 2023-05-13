import "./App.css";
import { useEffect, useRef } from "react";
const Matter = require("matter-js");

function App() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;
    // create an engine
    engineRef.current = Engine.create();

    // create a renderer
    renderRef.current = Render.create({
      canvas: canvasRef.current,
      engine: engineRef.current,
      options: {
        background: "transparent",
        wireframes: false,
      },
    });

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    Composite.add(engineRef.current.world, [boxA, boxB, ground]);

    // run the renderer
    Render.run(renderRef.current);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engineRef.current);

    const mouse = Mouse.create(renderRef.current.canvas);
    const mouseConstraint = MouseConstraint.create(engineRef.current, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });

    Composite.add(engineRef.current.world, mouseConstraint);
  }, []);

  return (
    <div className="App">
      {/* <div className="wrapper"> */}
      <canvas ref={canvasRef} className="canvas-class"></canvas>
      {/* </div> */}
    </div>
  );
}

export default App;
