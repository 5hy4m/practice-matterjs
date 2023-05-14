import "./App.css";
import { useEffect, useRef } from "react";
const {
  Engine,
  Bodies,
  Runner,
  Render,
  Composite,
  Mouse,
  MouseConstraint,
} = require("matter-js");

function App() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);

  useEffect(() => {
    // create an engine
    engineRef.current = Engine.create();

    // create a renderer
    renderRef.current = Render.create({
      canvas: canvasRef.current,
      engine: engineRef.current,
      options: {
        background: "transparent",
        wireframes: false,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });

    // create two boxes and a ground
    const guy = Bodies.rectangle(window.innerWidth / 2, 200, 100, 100, {
      render: {
        sprite: {
          texture: `https://ik.imagekit.io/Hello/practice_matter_js/tr:w-100,h-100/shyam.jpeg`,
        },
      },
    });

    var ground = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight,
      window.innerWidth,
      100,
      {
        isStatic: true,
      }
    );

    var rightWall = Bodies.rectangle(
      window.innerWidth,
      window.innerHeight,
      60,
      window.innerHeight * 2,
      {
        isStatic: true,
      }
    );

    var leftWall = Bodies.rectangle(
      0,
      window.innerHeight,
      60,
      window.innerHeight * 2,
      {
        isStatic: true,
      }
    );

    // add all of the bodies to the world
    Composite.add(engineRef.current.world, [guy, ground, rightWall, leftWall]);

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

  const createSquare = () => {
    const square = Bodies.rectangle(window.innerWidth / 2, 200, 80, 80);
    Composite.add(engineRef.current.world, square);
  };

  const createCircle = () => {
    const circle = Bodies.circle(window.innerWidth / 2, 80, 40);
    Composite.add(engineRef.current.world, circle);
  };

  const createFriends = () => {
    const height = 100;
    const width = 100;
    const friends = ["achu", "kipson", "vikki", "muthu", "ranjith"];
    const randomFriend = friends[Math.floor(Math.random() * friends.length)];
    const friend = Bodies.rectangle(window.innerWidth / 2, 200, 100, 100, {
      render: {
        sprite: {
          texture: `https://ik.imagekit.io/Hello/practice_matter_js/tr:w-${width},h-${height}/${randomFriend}.jpeg`,
        },
      },
    });
    Composite.add(engineRef.current.world, friend);
  };

  return (
    <div className="App">
      <canvas ref={canvasRef} className="canvas-class"></canvas>
      <div className="add-button" onClick={() => createFriends()}>
        Add friends
      </div>
      <div className="add-square-button" onClick={() => createSquare()}>
        Add squares
      </div>
      <div className="add-circle-button" onClick={() => createCircle()}>
        Add circles
      </div>
    </div>
  );
}

export default App;
