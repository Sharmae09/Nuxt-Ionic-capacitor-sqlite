// import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";

// export default defineNuxtPlugin({
//   name: "sqlite",
//   enforce: "pre",
//   hooks: {
//     async "app:beforeMount"() {
//       customElements.define("jeep-sqlite", JeepSqlite);
//       await customElements.whenDefined("jeep-sqlite");
//       const jeepSqliteEl = document.createElement("jeep-sqlite");
//       document.body.appendChild(jeepSqliteEl);
//     },
//   },
// });

// import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";

// export default defineNuxtPlugin({
//   name: "sqlite",
//   enforce: "pre",
//   hooks: {
//     async "app:beforeMount"() {
//       if (!customElements.get("jeep-sqlite")) {
//         customElements.define("jeep-sqlite", JeepSqlite);
//         await customElements.whenDefined("jeep-sqlite");
//       }

//       let jeepSqliteEl = document.querySelector("jeep-sqlite");
//       if (!jeepSqliteEl) {
//         jeepSqliteEl = document.createElement("jeep-sqlite");
//         document.body.appendChild(jeepSqliteEl);
//       }

//       // Ensure the component is initialized
//       await new Promise((resolve) => {
//         jeepSqliteEl?.addEventListener("jeepSqliteReady", resolve, { once: true });
//       });

//       console.log("JeepSqlite initialized and ready!");
//     },
//   },
// });
// import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";

// export default defineNuxtPlugin({
//   name: "sqlite",
//   enforce: "pre",
//   hooks: {
//     async "app:beforeMount"() {
//       if (!customElements.get("jeep-sqlite")) {
//         customElements.define("jeep-sqlite", JeepSqlite);
//       }

//       await customElements.whenDefined("jeep-sqlite");

//       if (!document.querySelector("jeep-sqlite")) {
//         const jeepSqliteEl = document.createElement("jeep-sqlite");
//         document.body.appendChild(jeepSqliteEl);
//       }
//     },
//   },
// });
// plugins/sqlite.ts
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";

export default defineNuxtPlugin({
  name: "sqlite",
  enforce: "pre",
  hooks: {
    async "app:beforeMount"() {
      if (!customElements.get("jeep-sqlite")) {
        customElements.define("jeep-sqlite", JeepSqlite);
      }
      await customElements.whenDefined("jeep-sqlite");
      if (!document.querySelector("jeep-sqlite")) {
        const jeepSqliteEl = document.createElement("jeep-sqlite");
        document.body.appendChild(jeepSqliteEl);
      }
    },
  },
});
