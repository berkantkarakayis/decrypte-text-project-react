import React, { useState, useEffect } from "react";
import { Pane } from "tweakpane";
import Splitting from "splitting";
import "./App.css";

const App = () => {
  const [config, setConfig] = useState({
    debug: false,
    title: "Berkant KARAKAYIŞ",
    sub: "React & React Native Developer",
    theme: "system",
    track: 10,
    start: 1,
    end: -0.2,
  });

  useEffect(() => {
    const ctrl = new Pane({
      title: "Config",
      expanded: false,
    });

    const randomString = (length) => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?~";
      return [...Array(length)]
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join("");
    };

    const escapeHTML = (str) =>
      str.replace(
        /[&<>"']/g,
        (char) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          }[char])
      );

    const getWords = (txt) => {
      const hold = Object.assign(document.createElement("div"), {
        innerHTML: Splitting.html({ content: txt, whitespace: true }),
      });

      const chars = hold.querySelectorAll(".char, .whitespace");
      hold.firstChild.setAttribute("aria-hidden", "true");
      for (let c = 0; c < chars.length; c++) {
        const char = chars[c];
        char.dataset.char = char.innerHTML;
        char.innerHTML = `<span>${char.innerHTML}${escapeHTML(
          randomString(config.track)
        )}</span>`;
      }
      return hold.innerHTML;
    };

    const update = () => {
      document.querySelector(".encrypted").innerHTML = `
      <h1>
        <span class="sr-only">${config.title}</span>
        ${getWords(config.title)}
      </h1>
      <p>
        <span class="sr-only">${config.sub}</span>
        ${getWords(config.sub)}
      </p>
    `;
      document.documentElement.dataset.theme = config.theme;
      document.documentElement.dataset.debug = config.debug;
      document.documentElement.style.setProperty("--track", config.track);
      document.documentElement.style.setProperty("--start", config.start);
      document.documentElement.style.setProperty("--end", config.end);
    };

    const sync = (event) => {
      if (
        !document.startViewTransition ||
        event.target.controller.view.labelElement.innerText !== "Theme"
      )
        return update();
      document.startViewTransition(() => update());
    };

    ctrl.addBinding(config, "title", {
      label: "Text",
    });

    ctrl.addBinding(config, "sub", {
      label: "Sub",
    });

    ctrl.addBinding(config, "track", {
      min: 2,
      max: 50,
      step: 1,
      label: "Chars",
    });

    ctrl.addBinding(config, "theme", {
      label: "Theme",
      options: {
        System: "system",
        Light: "light",
        Dark: "dark",
      },
    });

    ctrl.on("change", sync);
    update();
  }, [config]);

  return (
    <div className="App">
      <header>
        <h1 className="fluid">Scroll to Decrypt</h1>
      </header>
      <main className="fluid">
        <div className="encrypted fluid"></div>
      </main>
      <footer>
        <span target="_blank" rel="noopener noreferrer">
          ( ◠‿◠ ) Berkant KARAKAYIŞ
        </span>
        &nbsp;&nbsp; &copy; '24
      </footer>
      <a
        className="logo-link"
        href="https://berkant.vercel.app"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span
          className="w-9"
          viewBox="0 0 969 955"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          BK
        </span>
      </a>
    </div>
  );
};

export default App;
